import { Reveal, Eyebrow } from '@/components/primitives';
import { STRENGTHS } from '@/content/manifest';

const Row = ({ items, direction = 'left' }) => (
  <div className="relative flex overflow-hidden select-none" aria-hidden>
    <div className={`flex shrink-0 whitespace-nowrap ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
      {[...items, ...items].map((s, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-impact text-[13vw] md:text-[9vw] leading-[0.95] px-6 ${
              i % 2 === 0 ? 'text-ivory' : 'text-outline'
            }`}
          >
            {s}
          </span>
          <span className="text-orange text-[6vw] md:text-[4vw] px-2">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default function ArtOfBeing() {
  const half = Math.ceil(STRENGTHS.length / 2);
  return (
    <section id="art" className="relative bg-ink2 py-24 md:py-36 overflow-hidden" data-testid="art-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
          <div className="md:col-span-7">
            <Reveal><Eyebrow className="mb-6">The Art of Being Banti</Eyebrow></Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] text-ivory">
                Every story has a point.
                <span className="block text-orange italic">Hers has a punchline.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Reveal delay={0.1}>
              <p className="text-ivory/60 text-base sm:text-lg leading-relaxed max-w-md md:ml-auto">
                She finds the funny in the familiar — turning observation into something sharp,
                honest and impossible to look away from.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="space-y-2 md:space-y-4">
        <Row items={STRENGTHS.slice(0, half)} direction="left" />
        <Row items={STRENGTHS.slice(half)} direction="right" />
      </div>

      {/* readable list for a11y / mobile clarity */}
      <div className="sr-only">
        <ul>{STRENGTHS.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
    </section>
  );
}
