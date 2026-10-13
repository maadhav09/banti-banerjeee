import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { MaskLines } from '@/components/primitives';
import { scrollToId } from '@/hooks/useLenis';
import { IMAGES } from '@/content/manifest';

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
      data-testid="hero-section"
    >
      {/* Atmospheric lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 right-[-10%] h-[80vh] w-[80vh] rounded-full bg-orange/25 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[55vh] w-[55vh] rounded-full bg-orange-deep/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,transparent_0%,rgba(10,10,11,0.55)_70%,#0a0a0b_100%)]" />
      </div>

      {/* Portrait */}
      <motion.div
        style={{ y: yImg, scale: scaleImg }}
        className="absolute inset-y-0 right-0 w-full md:w-[56%] lg:w-[50%]"
      >
        <motion.img
          src={IMAGES.hero}
          alt="Banti Banerjee on India's Got Latent — Bengali + Bihari Combo, Episode 10"
          initial={{ opacity: 0, scale: 1.12, filter: 'blur(14px) contrast(1) brightness(1)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px) contrast(1.08) brightness(1.04)' }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.1 }}
          className="h-full w-full object-cover object-left hero-igl-mask opacity-95"
        />
      </motion.div>

      {/* IGL winner tag card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
        className="absolute z-20 right-5 bottom-28 sm:right-10 sm:bottom-16 hidden sm:flex items-center gap-3 rounded-lg border border-white/10 bg-ink2/70 backdrop-blur-md px-4 py-3"
        data-testid="hero-igl-badge"
      >
        <img src={IMAGES.badge} alt="Banti Banerjee performing live" className="h-12 w-16 object-cover rounded" />
        <div className="leading-tight">
          <p className="eyebrow !text-ivory/50 !tracking-[0.2em]">Winner</p>
          <p className="font-impact text-lg tracking-wide">India's Got Latent · Ep 10</p>
        </div>
      </motion.div>

      {/* Text layer */}
      <motion.div
        style={{ y: yText, opacity: fade }}
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 min-h-[100svh] flex flex-col justify-center pt-20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="h-px w-10 bg-orange" />
          <span className="eyebrow !tracking-[0.3em]">Stand-up Comedian · Mumbai</span>
        </motion.div>

        <MaskLines
          lines={['BANTI', 'BANERJEE']}
          start={0.35}
          stagger={0.14}
          className="font-impact leading-[0.92] tracking-[-0.01em]"
          lineClass="text-[21vw] sm:text-[16vw] md:text-[12vw] lg:text-[10.5rem] text-ivory drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] pb-[0.08em]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
          className="mt-10 sm:mt-8 max-w-xl"
        >
          <p className="font-display text-xl sm:text-2xl text-ivory/90">
            Winner — <span className="text-orange italic">India's Got Latent</span>, Episode 10.
          </p>
          <p className="mt-3 text-ivory/60 text-sm sm:text-base leading-relaxed">
            Sharp storytelling and observational comedy, rooted in Bengali &amp; Bihari homes —
            custom-built for your stage.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollToId('booking')}
              data-testid="hero-book-btn"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-8 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.04] active:scale-95"
            >
              Book Banti
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => scrollToId('watch')}
              data-testid="hero-watch-btn"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/25 px-8 py-3.5 font-semibold text-ivory transition-colors hover:border-orange hover:text-orange"
            >
              Watch Her Comedy
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToId('meet')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex flex-col items-center gap-2 text-ivory/50 hover:text-orange transition-colors"
        data-testid="hero-scroll-cue"
        aria-label="Scroll to content"
      >
        <span className="eyebrow !text-[0.6rem] !text-ivory/40">Scroll</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={18} />
        </motion.span>
      </motion.button>
    </section>
  );
}
