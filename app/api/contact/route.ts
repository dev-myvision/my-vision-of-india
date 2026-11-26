import { SHEET_URL, absoluteUrl } from '../../site';

// The contact form posts here. The message is checked, then handed to the Apps Script in
// google-sheet-script.gs, which writes it to the "Messages" tab and emails it to the sheet's owner.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 200, message: 5000 };

// A few messages a minute from one address is plenty; this stops a script from flooding the sheet.
const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  times.push(now);
  recent.set(ip, times);
  return times.length > 5;
}

const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'The form could not be read. Please try again.' }, 400);
  }

  const text = (key: string) => (typeof data[key] === 'string' ? (data[key] as string).trim() : '');
  const name = text('name');
  const email = text('email');
  const message = text('message');

  // Bots fill the hidden field, or send the form faster than a person can type.
  const startedAt = Number(data.startedAt) || 0;
  if (text('website') || !startedAt || Date.now() - startedAt < 3000) return json({ ok: true });

  if (!name || name.length > LIMITS.name) return json({ error: 'Please write your name.' }, 422);
  if (!EMAIL.test(email) || email.length > LIMITS.email) return json({ error: 'Please check your email address.' }, 422);
  if (message.length < 10 || message.length > LIMITS.message) {
    return json({ error: 'Please write a message of at least a few words (up to 5,000 characters).' }, 422);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) return json({ error: 'You have sent several messages already. Please wait a few minutes.' }, 429);

  // The subject and the reply wish ride at the top of the message, so the sheet script needs no change.
  const topic = text('topic').slice(0, 80);
  const heading = [topic && `Writing about: ${topic}`, data.reply === false && 'No reply needed.'].filter(Boolean);
  const letter = heading.length ? `${heading.join('\n')}\n\n${message}` : message;

  try {
    const res = await fetch(SHEET_URL, {
      method: 'POST',
      body: new URLSearchParams({ form: 'message', name, email, message: letter, page: absoluteUrl('/contact') }),
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    });
    if ((await res.text()).trim() === 'ok') return json({ ok: true });
  } catch {
    // falls through to the error below
  }
  return json({ error: 'Your message could not be sent just now. Please try again in a little while.' }, 502);
}
