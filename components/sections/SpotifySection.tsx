'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Music, ArrowUpRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import useReducedMotion from '@/hooks/useReducedMotion';

const PLAYLIST_ID = '0pwgfSRv1diGQJJOpGYNmP';
// theme=0 dark, theme=1 light — matches the site theme applied by next-themes
const embedUrl = (dark: boolean) =>
  `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=${dark ? 0 : 1}`;
// WHY: mobile fallback is a static list because Spotify embed artwork
// frequently shows grey placeholders on mobile. It WILL go stale when
// the playlist changes — update these constants when syncing.
const PLAYLIST_TITLE = '060226';
const PLAYLIST_OWNER = 'quincy';
const LAST_SYNCED = 'Nov 2026';
const MOBILE_TRACKS: [string, string, string][] = [
  ['Rewrite The Stars', 'James Arthur, Anne-Marie', '03:38'],
  ['All of the Stars', 'Ed Sheeran', '03:54'],
  ['Imagination', 'Shawn Mendes', '03:37'],
];

export default function SpotifySection() {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const embedSrc = embedUrl(resolvedTheme !== 'light');

  return (
    <section id="now-playing" className="bg-background py-20 md:py-32 pointer-events-auto">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-accent-text mb-4 flex items-center gap-2">
            <Music aria-hidden="true" className="h-4 w-4" />
            Now Playing
          </span>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4" aria-label="Spotify playlist">
            Spotify{' '}
            <span
              aria-hidden="true"
              className="text-transparent"
              style={{ WebkitTextStroke: '2px var(--foreground)' }}
            >
              Playlist
            </span>
          </h2>
          <p className="font-tech text-muted max-w-xl">
            What I listen to while coding and tuning models. Hits play, zero friction.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] items-stretch">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-md border border-line overflow-hidden bg-panel flex flex-col h-full">
              {/* Desktop: Spotify embed (works fine on wider screens) */}
              <iframe
                src={embedSrc}
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify playlist"
                className="hidden sm:block w-full border-0"
              />
              {/* Mobile: native list — embed artwork from Spotify CDN often
                  fails to load on mobile and shows grey placeholder boxes */}
              <div className="sm:hidden p-5">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 shrink-0 bg-accent text-accent-foreground flex items-center justify-center">
                    <Music aria-hidden="true" className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-lando text-2xl leading-none">{PLAYLIST_TITLE}</p>
                    <p className="font-tech text-xs text-muted mt-1">
                      {PLAYLIST_OWNER}, synced {LAST_SYNCED}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {MOBILE_TRACKS.map(([title, artist, duration]) => (
                    <li key={title} className="flex items-baseline justify-between gap-3 border-b border-line pb-3 last:border-0">
                      <div className="min-w-0">
                        <p className="font-tech text-sm text-foreground truncate">{title}</p>
                        <p className="font-tech text-xs text-muted truncate">{artist}</p>
                      </div>
                      <span className="font-tech text-xs text-faint shrink-0">{duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`https://open.spotify.com/playlist/${PLAYLIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 border-t border-line px-5 py-3.5 font-tech text-xs uppercase tracking-wider text-muted hover:text-accent-text transition-colors"
              >
                Open in Spotify
                <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative h-full min-h-[280px] lg:min-h-[400px] rounded-md border border-line overflow-hidden bg-panel"
          >
            <Image
              src="/images/wall.webp"
              alt="Kanisius Bagaskara at the Google office in Jakarta"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              loading="lazy"
            />
            {/* The caption sits on a flat dark plate, not only a gradient: the
                photo underneath is unknown, so a fade alone cannot guarantee
                the text stays legible. Literal colours here are correct
                because this plate is dark in both themes. */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="inline-block bg-black/80 px-3 py-2">
                <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-accent">Google Office</span>
                <p className="font-lando text-lg md:text-xl uppercase text-[#f4f4ed] leading-none mt-1">Jakarta, 2026</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
