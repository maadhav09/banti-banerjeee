import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Reveal, Eyebrow } from '@/components/primitives';
import { GALLERY } from '@/content/manifest';

const flat = GALLERY.flatMap((g) => g.items.map((it) => ({ ...it, group: g.title })));

function Lightbox({ index, setIndex }) {
  const open = index !== null;
  const close = useCallback(() => setIndex(null), [setIndex]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + flat.length) % flat.length), [setIndex]);
  const next = useCallback(() => setIndex((i) => (i + 1) % flat.length), [setIndex]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, prev, next]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
          onClick={close}
          data-testid="lightbox"
        >
          <button className="absolute top-5 right-5 h-11 w-11 grid place-items-center rounded-full border border-white/15 text-ivory hover:bg-orange hover:text-ink transition-colors" onClick={close} data-testid="lightbox-close" aria-label="Close">
            <X size={20} />
          </button>
          <button className="absolute left-4 sm:left-8 h-12 w-12 grid place-items-center rounded-full border border-white/15 text-ivory hover:bg-orange hover:text-ink transition-colors" onClick={(e) => { e.stopPropagation(); prev(); }} data-testid="lightbox-prev" aria-label="Previous"><ChevronLeft /></button>
          <button className="absolute right-4 sm:right-8 h-12 w-12 grid place-items-center rounded-full border border-white/15 text-ivory hover:bg-orange hover:text-ink transition-colors" onClick={(e) => { e.stopPropagation(); next(); }} data-testid="lightbox-next" aria-label="Next"><ChevronRight /></button>

          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={flat[index].src} alt={flat[index].alt} className="max-h-[75vh] w-auto object-contain rounded-sm" />
            <figcaption className="mt-4 text-center">
              <p className="font-impact text-2xl tracking-wide text-ivory">{flat[index].label}</p>
              <p className="text-ivory/50 text-sm mt-1">{flat[index].place} · {flat[index].group}</p>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ratioClass = { tall: 'aspect-[3/4]', wide: 'aspect-[16/11]' };

export default function Gallery() {
  const [index, setIndex] = useState(null);
  let running = -1;

  return (
    <section id="shows" className="relative bg-ink py-24 md:py-36" data-testid="gallery-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-4xl mb-16 md:mb-20">
          <Reveal><Eyebrow className="mb-6">The Archive</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-impact text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-ivory">
              THE STAGES.<br />
              <span className="text-outline">THE STORIES.</span><br />
              THE SHOWS.
            </h2>
          </Reveal>
        </div>

        <div className="space-y-20 md:space-y-28">
          {GALLERY.map((group, gi) => (
            <div key={group.id}>
              <Reveal>
                <div className="flex items-baseline gap-4 border-b border-white/10 pb-4 mb-8">
                  <span className="font-impact text-xl text-orange">{group.kicker}</span>
                  <div>
                    <h3 className="font-impact text-2xl sm:text-3xl tracking-wide text-ivory">{group.title}</h3>
                    <p className="text-ivory/50 text-sm">{group.subtitle}</p>
                  </div>
                </div>
              </Reveal>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
                {group.items.map((it, ii) => {
                  running += 1;
                  const flatIdx = running;
                  return (
                    <Reveal key={ii} delay={ii * 0.06} className="break-inside-avoid">
                      <button
                        onClick={() => setIndex(flatIdx)}
                        className="group relative block w-full overflow-hidden rounded-sm bg-ink2"
                        data-testid={`gallery-item-${group.id}-${ii}`}
                        aria-label={`View ${it.label}`}
                      >
                        <div className={`${ratioClass[it.ratio] || ratioClass.tall} overflow-hidden`}>
                          <img
                            src={it.src}
                            alt={it.alt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                        <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between translate-y-1 group-hover:translate-y-0 transition-transform">
                          <div className="text-left">
                            <p className="font-impact text-lg sm:text-xl tracking-wide text-ivory leading-tight">{it.label}</p>
                            <p className="text-ivory/60 text-xs">{it.place}</p>
                          </div>
                          <span className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-orange text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus size={16} />
                          </span>
                        </div>
                      </button>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox index={index} setIndex={setIndex} />
    </section>
  );
}
