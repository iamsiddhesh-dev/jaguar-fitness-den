'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { programs } from '@/content/programs';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const inputClasses =
  'h-12 w-full rounded-btn border border-ivory-50/15 bg-charcoal-800 px-4 font-sans text-sm text-ivory-50 placeholder:text-smoke-500 focus-visible:border-gold-400';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!WEB3FORMS_ACCESS_KEY) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never fill this hidden field.
    if (formData.get('company_website')) {
      setStatus('success');
      form.reset();
      return;
    }

    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New enquiry from Jaguar Fitness Den website');
    formData.delete('company_website');

    setStatus('submitting');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      const result: { success: boolean } = await response.json();

      if (result.success) {
        setStatus('success');
        trackEvent(ANALYTICS_EVENTS.FORM_SUBMIT, { status: 'success' });
        form.reset();
      } else {
        setStatus('error');
        trackEvent(ANALYTICS_EVENTS.FORM_SUBMIT, { status: 'error' });
      }
    } catch {
      setStatus('error');
      trackEvent(ANALYTICS_EVENTS.FORM_SUBMIT, { status: 'error' });
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col gap-3 py-8 text-center">
        <p className="text-gold-300 font-display text-xl">Enquiry sent</p>
        <p className="text-smoke-300 font-sans text-sm leading-relaxed">
          Thanks — we&rsquo;ll get back to you shortly to schedule your trial session.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-3 self-center"
          onClick={() => setStatus('idle')}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const formDisabled = !WEB3FORMS_ACCESS_KEY || status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5" noValidate={false}>
      {/* Honeypot — hidden from real visitors, left open for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="company_website">Company website</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="text-smoke-300 mb-2 block font-sans text-sm">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClasses}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-smoke-300 mb-2 block font-sans text-sm">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          className={inputClasses}
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      <div>
        <label htmlFor="interest" className="text-smoke-300 mb-2 block font-sans text-sm">
          I&rsquo;m interested in
        </label>
        <select id="interest" name="interest" required className={inputClasses}>
          <option value="">Select a program</option>
          <option value="general">General enquiry / free trial</option>
          {programs.map((program) => (
            <option key={program.slug} value={program.slug}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-smoke-300 mb-2 block font-sans text-sm">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="border-ivory-50/15 bg-charcoal-800 placeholder:text-smoke-500 focus-visible:border-gold-400 rounded-btn text-ivory-50 w-full border px-4 py-3 font-sans text-sm"
          placeholder="Tell us a bit about your goals"
        />
      </div>

      <Button type="submit" size="lg" className="mt-2" disabled={formDisabled}>
        {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
      </Button>

      {status === 'error' && (
        <p role="alert" className="font-sans text-xs text-red-400">
          Something went wrong sending your enquiry. Please call or WhatsApp us directly instead.
        </p>
      )}

      {!WEB3FORMS_ACCESS_KEY && (
        <p className="text-smoke-500 font-sans text-xs">
          Enquiry submissions are coming soon — call or WhatsApp us directly below in the meantime.
        </p>
      )}
    </form>
  );
}
