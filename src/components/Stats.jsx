import { Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { Reveal, Eyebrow, Counter } from '@/components/primitives';
import { STATS } from '@/content/manifest';

const iconFor = (key) => (key === 'ig' ? Instagram : Youtube);

export default function Stats() {
  return (
    <section id="numbers" className="relative bg-ink2 py-24 md:py-36 overflow-hidden" data-testid="stats-section">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[40vh] w-[40vh] rounded-full bg-orange/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <Reveal><Eyebrow className="mb-6 justify-center">The Numbers Behind the Name</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[1.05]">
              An audience that <span className="italic text-orange">keeps showing up.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
          {STATS.map((s, i) => {
            const Icon = iconFor(s.key);
            return (
              <Reveal key={s.key} delay={i * 0.1} className="bg-ink2">
                <div className="p-8 sm:p-10 h-full flex flex-col" data-testid={`stat-${s.key}`}>
                  <Icon className="text-orange mb-8" size={26} />
                  <div className="font-impact text-6xl sm:text-7xl lg:text-8xl leading-none text-ivory tracking-tight">
                    <Counter end={s.end} decimals={s.decimals || 0} suffix={s.suffix || ''} comma={s.comma} />
                  </div>
                  <p className="mt-4 text-ivory/60 text-sm tracking-wider uppercase">{s.label}</p>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`stat-link-${s.key}`}
                    className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ivory/70 hover:text-orange transition-colors group w-fit"
                  >
                    {s.cta}
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-xs text-ivory/35">Figures are maintained manually and reflect the latest supplied values.</p>
        </Reveal>
      </div>
    </section>
  );
}
