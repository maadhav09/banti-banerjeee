import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, Eyebrow } from '@/components/primitives';
import { IMAGES } from '@/content/manifest';

const FAMILY_ALTS = [
  'Banti Banerjee performing stand-up comedy at a family show',
  'Banti Banerjee taking a selfie with the audience at a family comedy show',
  'Banti Banerjee on stage at a family comedy performance',
];
const FAMILY_LABELS = ['FAMILY SHOW · LIVE', 'A FULL HOUSE', 'ALL-AGES COMEDY · STAGE'];

export default function FamilyShow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section
      id="family-show"
      ref={ref}
      className="relative bg-ink2 py-24 md:py-36 overflow-hidden"
      data-testid="family-show-section"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-1/4 left-[-15%] h-[50vh] w-[50vh] rounded-full bg-orange/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-[-10%] h-[40vh] w-[40vh] rounded-full bg-orange-deep/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 md:mb-16">
          <Reveal><Eyebrow className="mb-4">Also Performs</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[1.02]">
              Family Show
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-ivory/60 text-base sm:text-lg leading-relaxed">
              Clean, inclusive stand-up crafted for all ages — from grandparents to grandkids.
              Warm storytelling that brings families together.
            </p>
          </Reveal>
        </div>

        {/* Gallery grid — three portrait images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-start">
          {IMAGES.familyShow.map((src, i) => (
            <Reveal key={i} delay={0.08 + i * 0.08}>
              <div className={`relative ${i === 1 ? 'sm:mt-12' : ''}`}>
                <div className={`absolute -inset-2 border border-orange/20 ${i === 1 ? '-translate-x-2' : 'translate-x-2'} translate-y-2`} aria-hidden />
                <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
                  <motion.img
                    style={{ y: i === 1 ? y2 : y1 }}
                    src={src}
                    alt={FAMILY_ALTS[i]}
                    className="h-full w-full object-cover object-top scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-ink/80 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-wider text-ivory">
                  {FAMILY_LABELS[i]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tag strip */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {['Family Friendly', 'Clean Humour', 'All Ages', 'Inclusive', 'Festivals & Celebrations'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ivory/15 px-4 py-1.5 text-xs tracking-wider text-ivory/60 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
