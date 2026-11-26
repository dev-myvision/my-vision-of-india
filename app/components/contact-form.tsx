'use client';

import { useEffect, useRef, useState } from 'react';

type Field = 'first' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TOPICS = [
  'A question about a reform',
  'A correction',
  'A better idea',
  'An invitation to discuss the book',
  'Something else',
];

function check(form: FormData): Errors {
  const errors: Errors = {};
  if (!String(form.get('first') ?? '').trim()) errors.first = 'Please write your first name.';
  if (!EMAIL.test(String(form.get('email') ?? '').trim())) errors.email = 'Please check your email address.';
  if (String(form.get('message') ?? '').trim().length < 10) errors.message = 'Please write a message of at least a few words.';
  return errors;
}

// The form on the Contact page. It checks the fields as the reader sends it, posts to
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
    const firstName = String(form.get('first')).trim();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${String(form.get('last') ?? '').trim()}`.trim(),
          email: form.get('email'),
          topic: form.get('topic'),
          reply: form.get('reply') === 'yes',
          message: form.get('message'),
          website: form.get('website'),
          startedAt: startedAt.current,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Your message could not be sent just now. Please try again in a little while.');
      setSender(firstName.split(/\s+/)[0]);
      setState('sent');
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch (error) {
      setFailure((error as Error).message);
      setState('failed');
    }
  }

  if (state === 'sent') {
    return (
      <div className="cf-sent" role="status">
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
    errors[name] ? <p className="cf-error" id={`c-${name}-error`}>{errors[name]}</p> : null;

  return (
    <form className="cf-form" method="post" onSubmit={onSubmit} noValidate>
      <fieldset className="cf-group">
        <legend>Name (required)</legend>
        <div className="cf-pair">
          <div className="cf-field">
            <label htmlFor="c-first">First name</label>
            <input {...field('first')} autoComplete="given-name" maxLength={50} required />
            {error('first')}
          </div>
          <div className="cf-field">
            <label htmlFor="c-last">Last name</label>
            <input id="c-last" name="last" autoComplete="family-name" maxLength={50} />
          </div>
        </div>
      </fieldset>

      <div className="cf-group">
        <label className="cf-legend" htmlFor="c-topic">Writing about</label>
        <select id="c-topic" name="topic" defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="cf-group">
        <label className="cf-legend" htmlFor="c-email">Email (required)</label>
        <input {...field('email')} type="email" autoComplete="email" spellCheck={false} maxLength={200} required />
        {error('email')}
        <label className="cf-check">
          <input type="checkbox" name="reply" value="yes" defaultChecked />
          <span>I would like a reply by email</span>
        </label>
      </div>

      <div className="cf-group">
        <label className="cf-legend" htmlFor="c-message">Your letter (required)</label>
        <textarea {...field('message')} rows={3} maxLength={4800} required />
        {error('message')}
      </div>

      {/* Left empty by people; bots that fill every field give themselves away. */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="cf-status" role="status">
        {state === 'failed' ? failure : state === 'sending' ? 'Sending…' : ''}
      </p>
      <button type="submit" className="cf-send" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending' : 'Send'}
      </button>
    </form>
  );
}
