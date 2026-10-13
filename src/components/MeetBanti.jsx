import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, Eyebrow } from '@/components/primitives';
import { IMAGES } from '@/content/manifest';

export default function MeetBanti() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="meet" ref={ref} className="relative bg-ink py-24 md:py-36 overflow-hidden" data-testid="meet-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Image */}
        <div className="lg:col-span-5 order-1">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 border border-orange/30 translate-x-4 translate-y-4" aria-hidden />
              {/* Poster — object-contain preserves full image, bg matches poster edge colour */}
              <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-[#8B1A0E]">
                <motion.img
                  style={{ y }}
                  src={IMAGES.poster}
                  alt="Pehchaan & Money Follows My Brother — Banti Banerjee solo shows"
                  className="absolute inset-0 h-[116%] w-full object-contain object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-4 left-4 rounded-full bg-ink/80 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-wider">
                PEHCHAAN · MONEY FOLLOWS MY BROTHER
              </div>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7 order-2">
          <Reveal><Eyebrow className="mb-6">Meet Banti Banerjee</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-ivory">
              Finding the funny
              <span className="block text-ivory/40 italic">in the familiar.</span>
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5 text-ivory/70 text-base sm:text-lg leading-relaxed max-w-2xl">
            <Reveal delay={0.1}>
              <p>
                Banti is a <span className="text-ivory">Mumbai-based stand-up comedian</span> with roots in
                Bengali and Bihari households — and it shows. Her comedy lives in the everyday: the relatives,
                the routines, the quiet absurdities of family life.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                She works in <span className="text-orange">observational humour and storytelling</span>,
                turning ordinary moments into sets that feel personal, honest and disarmingly relatable.
                Family-oriented themes, human behaviour, and the truths we don't say out loud — that's her stage.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
              {[['Based in', 'Mumbai'], ['Roots', 'Bengali · Bihari'], ['Solo Show', 'Pehchaan']].map(([k, v]) => (
                <div key={k}>
                  <p className="eyebrow !text-ivory/40 !tracking-[0.2em]">{k}</p>
                  <p className="mt-1.5 font-impact text-2xl tracking-wide text-ivory">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
