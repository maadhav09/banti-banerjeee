import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CalendarClock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { Reveal, Eyebrow } from '@/components/primitives';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SOCIAL, OCCASIONS } from '@/content/manifest';

const AUDIENCE = ['Under 50', '50 – 150', '150 – 500', '500+'];
const EASE = [0.22, 1, 0.36, 1];

const emphasis = ['NO RECYCLED JOKES.', 'MADE FOR YOUR AUDIENCE.', 'A COMPLETELY ORIGINAL SET.'];

export default function Booking() {
  const [form, setForm] = useState({ name: '', contact: '', eventType: '', date: '', venue: '', audience: '', details: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => {
    const v = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Please add your name';
    if (!form.contact.trim()) er.contact = 'Add an email or phone';
    if (!form.eventType) er.eventType = 'Select an event type';
    if (!form.date) er.date = 'Pick a date';
    if (!form.details.trim()) er.details = 'Tell us a little about the event';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please complete the required fields.');
      return;
    }

    /* ── Formspree (preferred — direct email delivery) ── */
    if (SOCIAL.formspreeEndpoint) {
      setSending(true);
      try {
        const res = await fetch(SOCIAL.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `Booking enquiry — ${form.eventType}`,
            name: form.name,
            contact: form.contact,
            event_type: form.eventType,
            date: form.date,
            venue: form.venue || '—',
            audience: form.audience || '—',
            details: form.details,
          }),
        });
        if (res.ok) {
          setSent(true);
          toast.success('Enquiry sent! Banti\'s team will be in touch soon.');
        } else {
          throw new Error('Formspree error');
        }
      } catch {
        toast.error('Could not send — try emailing directly below.');
      } finally {
        setSending(false);
      }
      return;
    }

    /* ── Fallback: mailto (opens email client) ── */
    const subject = `Booking enquiry — ${form.eventType}`;
    const body = [
      `Name: ${form.name}`,
      `Contact: ${form.contact}`,
      `Event type: ${form.eventType}`,
      `Date: ${form.date}`,
      `City / Venue: ${form.venue || '—'}`,
      `Expected audience: ${form.audience || '—'}`,
      '',
      'Event details & custom-comedy ideas:',
      form.details,
    ].join('\n');
    window.location.href = `mailto:${SOCIAL.bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    toast.success('Opening your email to send the enquiry…');
  };

  return (
    <section id="booking" className="relative bg-ink2 py-24 md:py-36 overflow-hidden" data-testid="booking-section">
      <div className="pointer-events-none absolute -bottom-1/4 right-[-5%] h-[60vh] w-[60vh] rounded-full bg-orange/12 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative grid lg:grid-cols-2 gap-14 lg:gap-20">
        {/* Pitch */}
        <div>
          <Reveal><Eyebrow className="mb-6">Why Book Banti Banerjee?</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.03] text-ivory">
              Because your event deserves comedy that's
              <span className="italic text-orange"> made for you.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-ivory/70 text-base sm:text-lg leading-relaxed max-w-xl">
              No recycled jokes. No generic scripts. No one-size-fits-all comedy. Banti creates fresh,
              customized material specifically for your event, audience and occasion — whether it's a corporate
              event, brand roast, wedding, baby shower, birthday, or even a divorce party.
            </p>
          </Reveal>

          <div className="mt-10 space-y-3">
            {emphasis.map((t, i) => (
              <Reveal key={t} delay={0.12 + i * 0.07}>
                <p className="font-impact text-3xl sm:text-4xl tracking-wide">
                  <span className={i === 1 ? 'text-orange' : 'text-ivory'}>{t}</span>
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <span key={o} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-ivory/75" data-testid="occasion-chip">{o}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex items-start gap-3 rounded-sm border border-orange/40 bg-orange/10 p-5" data-testid="advance-notice">
              <CalendarClock className="text-orange shrink-0 mt-0.5" size={22} />
              <p className="text-ivory">
                <span className="font-semibold">Book at least 2 months in advance</span> and Banti will craft a
                brand-new set built exclusively around your occasion, audience and inside jokes.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <div>
          <Reveal delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}
                className="rounded-lg border border-white/10 bg-ink p-10 text-center"
                data-testid="booking-success"
              >
                <CheckCircle2 className="text-orange mx-auto mb-5" size={48} />
                <h3 className="font-display text-3xl text-ivory">
                  {SOCIAL.formspreeEndpoint ? 'Enquiry sent!' : 'Almost there.'}
                </h3>
                <p className="mt-3 text-ivory/65 max-w-sm mx-auto">
                  {SOCIAL.formspreeEndpoint
                    ? "Your enquiry has been delivered to Banti's inbox. Her team will get back to you soon."
                    : "Your email app should have opened with the enquiry pre-filled. Just hit send and Banti's team will get back to you. Didn't open?"}
                </p>
                {!SOCIAL.formspreeEndpoint && (
                  <a href={`mailto:${SOCIAL.bookingEmail}`} className="mt-5 inline-flex items-center gap-2 text-orange font-semibold hover:underline">
                    <Mail size={16} /> {SOCIAL.bookingEmail}
                  </a>
                )}
                <div>
                  <button onClick={() => setSent(false)} className="mt-6 text-sm text-ivory/50 hover:text-ivory underline">
                    Send another enquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="rounded-lg border border-white/10 bg-ink p-6 sm:p-8 space-y-5" data-testid="booking-form" noValidate>
                <h3 className="font-impact text-3xl tracking-wide text-ivory">Start an enquiry</h3>

                <Field label="Your name" error={errors.name}>
                  <Input data-testid="booking-name" value={form.name} onChange={set('name')} placeholder="Full name" className="bg-ink2 border-white/15 h-11" />
                </Field>

                <Field label="Email or phone" error={errors.contact}>
                  <Input data-testid="booking-contact" value={form.contact} onChange={set('contact')} placeholder="you@email.com / +91…" className="bg-ink2 border-white/15 h-11" />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Event type" error={errors.eventType}>
                    <Select value={form.eventType} onValueChange={set('eventType')}>
                      <SelectTrigger data-testid="booking-eventtype" className="bg-ink2 border-white/15 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {[...OCCASIONS, 'Other'].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Event date" error={errors.date}>
                    <Input data-testid="booking-date" type="date" value={form.date} onChange={set('date')} className="bg-ink2 border-white/15 h-11 [color-scheme:dark]" />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="City & venue">
                    <Input data-testid="booking-venue" value={form.venue} onChange={set('venue')} placeholder="City, venue" className="bg-ink2 border-white/15 h-11" />
                  </Field>
                  <Field label="Expected audience">
                    <Select value={form.audience} onValueChange={set('audience')}>
                      <SelectTrigger data-testid="booking-audience" className="bg-ink2 border-white/15 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {AUDIENCE.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field label="About the event & custom-comedy ideas" error={errors.details}>
                  <Textarea data-testid="booking-details" value={form.details} onChange={set('details')} rows={4} placeholder="Occasion, vibe, inside jokes, dos & don'ts…" className="bg-ink2 border-white/15 resize-none" />
                </Field>

                <button type="submit" data-testid="booking-submit" disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
                  {sending ? 'Sending…' : 'Send Booking Enquiry →'}
                </button>
                <p className="text-xs text-ivory/40 text-center">
                  {SOCIAL.formspreeEndpoint
                    ? 'Your enquiry will be sent directly to Banti\'s inbox.'
                    : 'Enquiries open your email app addressed to Banti\'s booking inbox.'}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const Field = ({ label, error, children }) => (
  <div className="space-y-2">
    <Label className="text-ivory/70 text-sm">{label}</Label>
    {children}
    {error && <p className="text-xs text-destructive" data-testid="field-error">{error}</p>}
  </div>
);
