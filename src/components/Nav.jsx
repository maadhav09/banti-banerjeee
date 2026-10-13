import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollToId } from '@/hooks/useLenis';

const LINKS = [
  { id: 'meet', label: 'Meet' },
  { id: 'art', label: 'The Art' },
  { id: 'shows', label: 'Shows' },
  { id: 'family-show', label: 'Family Show' },
  { id: 'numbers', label: 'Numbers' },
  { id: 'watch', label: 'Watch' },
];

const Logo = () => (
  <button
    onClick={() => scrollToId('home')}
    className="flex items-center gap-2.5 group"
    data-testid="nav-logo"
    aria-label="Banti Banerjee — home"
  >
    <span className="grid place-items-center h-9 w-9 rounded-md border border-orange/60 text-ivory font-display font-bold text-lg transition-colors group-hover:bg-orange group-hover:text-ink">
      B
    </span>
    <span className="hidden sm:block font-impact text-xl tracking-[0.14em] leading-none pt-1">
      BANTI&nbsp;BANERJEE
    </span>
  </button>
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
        data-testid="navbar"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-testid={`nav-${l.id}`}
                className="text-sm font-medium text-ivory/70 hover:text-ivory transition-colors relative after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-orange after:transition-all hover:after:w-full"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go('booking')}
              data-testid="nav-book-btn"
              className="hidden sm:inline-flex items-center rounded-full bg-orange px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.04] active:scale-95"
            >
              Book Banti
            </button>
            <button
              className="md:hidden grid place-items-center h-10 w-10 rounded-md border border-white/10"
              onClick={() => setOpen((v) => !v)}
              data-testid="nav-mobile-toggle"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 inset-x-0 z-40 md:hidden bg-ink/95 backdrop-blur-xl border-b border-white/10"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-left py-3 text-2xl font-display text-ivory/90 border-b border-white/5"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go('booking')}
                className="mt-5 rounded-full bg-orange px-6 py-3 font-semibold text-ink"
              >
                Book Banti
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
