'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

const PLAYLIST_ID = '0pwgfSRv1diGQJJOpGYNmP';
const EMBED_URL = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`;

export default function SpotifySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="now-playing" className="bg-background py-20 md:py-32 pointer-events-auto">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-racing-red mb-4 flex items-center gap-2">
            <Music className="h-4 w-4" />
            Now Playing
          </span>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
            Spotify{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px var(--color-foreground)' }}
            >
              Playlist
            </span>
          </h2>
          <p className="font-tech text-foreground/60 max-w-xl">
            What I listen to while coding and tuning models. Hits play, zero friction.
          </p>
        </motion.div>

        {/* Player + side info */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] items-stretch">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl md:rounded-3xl border border-foreground/10 overflow-hidden bg-foreground/5 flex flex-col h-full">
              <iframe
                src={EMBED_URL}
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
                className="block w-full border-0"
              />
              <a
                href={`https://open.spotify.com/playlist/${PLAYLIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-t border-foreground/10 px-5 py-3.5 font-tech text-xs uppercase tracking-wider text-foreground/50 hover:text-[#DFFF00] transition-colors"
              >
                Open in Spotify →
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative h-full min-h-[280px] lg:min-h-[400px] rounded-2xl md:rounded-3xl border border-foreground/10 overflow-hidden bg-foreground/5"
          >
            <Image
              src="/images/wall.jpg"
              alt="Kanisius Bagaskara at Google office"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
