import { Instagram, Youtube, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollToId } from '@/hooks/useLenis';
import { SOCIAL } from '@/content/manifest';

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: 'Instagram', href: SOCIAL.instagram, icon: Instagram, ext: true },
    { label: 'YouTube', href: SOCIAL.youtube, icon: Youtube, ext: true },
    { label: 'Booking', href: `mailto:${SOCIAL.bookingEmail}`, icon: Mail, ext: false },
  ];

  return (
    <footer className="relative bg-ink pt-24 md:pt-32 overflow-hidden" data-testid="footer">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p className="eyebrow mb-6">Your occasion. Your audience. Your inside jokes.</p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl text-ivory leading-[1.02]"
          >
            Let's make them <span className="italic text-orange">laugh.</span>
          </motion.h2>
          <button
            onClick={() => scrollToId('booking')}
            data-testid="footer-book-btn"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange px-9 py-4 font-semibold text-ink transition-transform hover:scale-[1.04] active:scale-95"
          >
            Book Banti <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <a
                key={l.label}
                href={l.href}
                {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                data-testid={`footer-link-${l.label.toLowerCase()}`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-ivory/80 hover:border-orange hover:text-orange transition-colors"
              >
                <Icon size={18} /> {l.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="mt-20 border-t border-white/10 overflow-hidden">
        <h3 className="font-impact text-[20vw] leading-[0.9] text-center tracking-tight text-ivory/5 select-none pt-6">
          BANTI BANERJEE
        </h3>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ivory/40">
          <p>© {year} Banti Banerjee · Stand-up Comedian</p>
          <p>Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}
