import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 30, className = '', once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: '-70px' }}
    transition={{ duration: 0.85, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className="h-px w-8 bg-orange" />
    <span className="eyebrow" data-testid="eyebrow">{children}</span>
  </div>
);

/* Masked line-by-line reveal for big headings */
export const MaskLines = ({ lines, className = '', lineClass = '', start = 0.1, stagger = 0.12, trigger = 'load' }) => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: start } },
  };
  const item = {
    hidden: { y: '115%' },
    show: { y: 0, transition: { duration: 0.9, ease: EASE } },
  };
  const motionProps = trigger === 'load'
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } };
  return (
    <motion.div className={className} variants={container} {...motionProps}>
      {lines.map((ln, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div variants={item} className={lineClass}>{ln}</motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export const Counter = ({ end, decimals = 0, suffix = '', comma = false, duration = 1900 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          if (reduce) { setVal(end); return; }
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(end * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  const display = comma ? Math.round(val).toLocaleString('en-US') : val.toFixed(decimals);
  return <span ref={ref} data-testid="counter">{display}{suffix}</span>;
};
