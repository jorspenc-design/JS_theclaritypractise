// Signup for "A Pastor's Guide to AI".
//
// The site's form posts here. This function checks the input and passes it to
// Kit's public form endpoint, the same address an embedded Kit form uses, so
// no API key or other secret is needed. Kit then sends the confirmation email,
// and its button downloads the PDF.
//
// Works with or without JavaScript:
//   - plain form post  -> 303 redirect to /guide/thanks (or back to /guide on error)
//   - fetch with "Accept: application/json" -> JSON { ok, message }

const KIT_FORM_ID = '10167665'; // Kit form: "A Pastor's Guide to AI"
const KIT_URL = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;

const MAX_BODY = 4096;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

function clean(value, max) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
}

export default async (req) => {
  const wantsJson = (req.headers.get('accept') || '').includes('application/json');
  const site = new URL(req.url);

  const reply = (ok, message, status) => {
    if (wantsJson) return Response.json({ ok, message }, { status });
    const to = ok ? '/guide/thanks' : '/guide?error=1#get-the-guide';
    return Response.redirect(new URL(to, site), 303);
  };

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  // Only accept submissions from this site's own pages.
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== site.host) {
    return reply(false, 'This form only works from joshuaspence.co.', 403);
  }

  const length = Number(req.headers.get('content-length') || 0);
  if (length > MAX_BODY) return reply(false, 'That submission was too large.', 413);

  let form;
  try {
    form = await req.formData();
  } catch {
    return reply(false, 'Something went wrong reading the form. Please try again.', 400);
  }

  // Honeypot: real people never see or fill this field. Bots usually do.
  // Pretend it worked so the bot moves on, and send nothing to Kit.
  if (clean(form.get('company'), 200)) return reply(true, 'Thanks.', 200);

  const email = clean(form.get('email'), 254).toLowerCase();
  const firstName = clean(form.get('first_name'), 60);

  if (!EMAIL_RE.test(email)) {
    return reply(false, 'Please enter a valid email address.', 422);
  }

  const body = new URLSearchParams({ email_address: email });
  if (firstName) body.set('fields[first_name]', firstName);

  try {
    const res = await fetch(KIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      // Log the status only. Never log the person's email or name.
      console.error(`Kit signup failed with status ${res.status}`);
      return reply(false, 'The signup service had a problem. Please try again in a minute.', 502);
    }
  } catch (err) {
    console.error(`Kit signup request failed: ${err?.name || 'error'}`);
    return reply(false, 'The signup service had a problem. Please try again in a minute.', 502);
  }

  return reply(true, 'Check your inbox for the guide.', 200);
};

export const config = {
  path: '/api/guide',
  // A handful of signups per minute from one visitor is plenty for a real person.
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
