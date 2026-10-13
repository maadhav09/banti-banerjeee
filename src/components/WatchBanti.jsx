import { Play, Youtube, Instagram, ArrowUpRight } from 'lucide-react';
import { Reveal, Eyebrow } from '@/components/primitives';
import { MEDIA, SOCIAL } from '@/content/manifest';

function ytThumb(url) {
  const m = url && url.match(/(?:v=|\/shorts\/|youtu\.be\/|\/embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : null;
}

function MediaCard({ item, vertical, platform }) {
  const thumb = item.thumbnail || (platform === 'YouTube' ? ytThumb(item.url) : null);
  const Icon = platform === 'Instagram' ? Instagram : Youtube;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="media-card"
      className="group block overflow-hidden rounded-sm bg-ink2 border border-white/5 hover:border-orange/40 transition-colors"
    >
      <div className={`relative overflow-hidden ${vertical ? 'aspect-[9/16]' : 'aspect-video'} bg-ink3`}>
        {thumb ? (
          <img
            src={thumb}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { e.currentTarget.style.opacity = 0; }}
          />
        ) : (
          /* Graceful on-brand fallback until a real thumbnail is supplied */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_30%,rgba(217,92,20,0.18),transparent_70%)]">
            <Icon className="text-orange/80" size={30} />
            <span className="eyebrow !text-ivory/40 !tracking-[0.25em]">{platform}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="h-14 w-14 grid place-items-center rounded-full bg-orange/90 text-ink transition-transform group-hover:scale-110">
            <Play size={22} className="translate-x-0.5" fill="currentColor" />
          </span>
        </span>
      </div>
      <div className="p-4 flex items-start justify-between gap-3">
        <p className="font-medium text-ivory leading-snug line-clamp-2">{item.title}</p>
        <ArrowUpRight size={18} className="shrink-0 text-ivory/40 group-hover:text-orange transition-colors" />
      </div>
    </a>
  );
}

function EmptyState({ platform, href, vertical }) {
  const Icon = platform === 'Instagram' ? Instagram : Youtube;
  return (
    <div
      className="col-span-full flex flex-col items-center justify-center text-center rounded-sm border border-dashed border-white/15 py-14 px-6"
      data-testid="media-empty"
    >
      <Icon className="text-orange mb-5" size={32} />
      <p className="font-display text-2xl text-ivory">New clips, dropping soon.</p>
      <p className="mt-2 text-ivory/50 max-w-md text-sm">
        Fresh {vertical ? 'vertical clips' : 'videos'} are added here regularly. In the meantime, catch everything on {platform}.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-ink hover:scale-[1.04] transition-transform"
      >
        Open {platform} <ArrowUpRight size={16} />
      </a>
    </div>
  );
}

const SUBS = [
  { key: 'standup', num: '01', title: 'YouTube Videos', blurb: 'Full stand-up sets and longer cuts.', vertical: false, platform: 'YouTube', href: SOCIAL.youtube, cta: 'Visit YouTube channel' },
  { key: 'shorts', num: '02', title: 'YouTube Shorts', blurb: 'Quick, punchy vertical moments.', vertical: true, platform: 'YouTube', href: SOCIAL.youtube, cta: 'Visit YouTube channel' },
  { key: 'reels', num: '03', title: 'Instagram Reels', blurb: 'Straight from the gram.', vertical: true, platform: 'Instagram', href: SOCIAL.instagram, cta: 'Visit Instagram profile' },
];

export default function WatchBanti() {
  return (
    <section id="watch" className="relative bg-ink py-24 md:py-36" data-testid="watch-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl mb-16">
          <Reveal><Eyebrow className="mb-6">Watch Banti</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-impact text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-ivory">
              THE MEDIA LIBRARY
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-ivory/60 text-base sm:text-lg max-w-xl">
              Stand-up videos, shorts and reels — each one links straight to the original.
            </p>
          </Reveal>
        </div>

        <div className="space-y-20 md:space-y-28">
          {SUBS.map((sub) => {
            const items = MEDIA[sub.key] || [];
            return (
              <div key={sub.key} data-testid={`watch-sub-${sub.key}`}>
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4 mb-8">
                    <div className="flex items-baseline gap-4">
                      <span className="font-impact text-xl text-orange">{sub.num}</span>
                      <div>
                        <h3 className="font-impact text-2xl sm:text-4xl tracking-wide text-ivory">{sub.title}</h3>
                        <p className="text-ivory/50 text-sm">{sub.blurb}</p>
                      </div>
                    </div>
                    <a
                      href={sub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`watch-channel-${sub.key}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ivory/70 hover:text-orange transition-colors"
                    >
                      {sub.cta}
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </Reveal>

                <div className={`grid gap-5 ${sub.vertical ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {items.length > 0
                    ? items.map((it, i) => (
                        <Reveal key={i} delay={i * 0.06}>
                          <MediaCard item={it} vertical={sub.vertical} platform={sub.platform} />
                        </Reveal>
                      ))
                    : <EmptyState platform={sub.platform} href={sub.href} vertical={sub.vertical} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
