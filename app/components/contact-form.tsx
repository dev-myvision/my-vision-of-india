'use client';

import { useEffect, useRef, useState } from 'react';

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function check(form: FormData): Errors {
  const errors: Errors = {};
  if (!String(form.get('name') ?? '').trim()) errors.name = 'Please write your name.';
  if (!EMAIL.test(String(form.get('email') ?? '').trim())) errors.email = 'Please check your email address.';
  if (String(form.get('message') ?? '').trim().length < 10) errors.message = 'Please write a message of at least a few words.';
  return errors;
}

// The letter on the Contact page. It checks the fields as the reader sends it, posts to
// /api/contact, and says plainly whether the message arrived.
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [failure, setFailure] = useState('');
  const [sender, setSender] = useState('');
  const startedAt = useRef(0);
  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const found = check(form);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(form), startedAt: startedAt.current }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Your message could not be sent just now. Please try again in a little while.');
      setSender(String(form.get('name')).trim().split(/\s+/)[0]);
      setState('sent');
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch (error) {
      setFailure((error as Error).message);
      setState('failed');
    }
  }

  if (state === 'sent') {
    return (
      <div className="pg-sent" role="status">
        <h2 ref={doneRef} tabIndex={-1}>Thank you, {sender}.</h2>
        <p>Your letter has arrived. We read every message and will answer by email.</p>
      </div>
    );
  }

  const field = (name: Field) => ({
    name,
    id: `c-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `c-${name}-error` : undefined,
  });
  const error = (name: Field) =>
    errors[name] ? <p className="pg-error" id={`c-${name}-error`}>{errors[name]}</p> : null;

  return (
    <form className="pg-form" method="post" onSubmit={onSubmit} noValidate>
      <div className="pg-field">
        <label htmlFor="c-name">Your name</label>
        <input {...field('name')} autoComplete="name" maxLength={100} required />
        {error('name')}
      </div>
      <div className="pg-field">
        <label htmlFor="c-email">Your email</label>
        <input {...field('email')} type="email" autoComplete="email" spellCheck={false} maxLength={200} required />
        {error('email')}
      </div>
      <div className="pg-field">
        <label htmlFor="c-message">Your message</label>
        <textarea {...field('message')} rows={8} maxLength={5000} required />
        {error('message')}
      </div>
      {/* Left empty by people; bots that fill every field give themselves away. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="pg-status" role="status">
        {state === 'failed' ? failure : state === 'sending' ? 'Sending…' : ''}
      </p>
      <button type="submit" className="pg-send" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending' : 'Send'}
      </button>
    </form>
  );
}
