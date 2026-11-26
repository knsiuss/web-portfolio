'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

// Hooks
import useLenis from '@/hooks/useLenis';

// UI Components
import LoadingScreen from '@/components/ui/LoadingScreen';
import ScrollProgress from '@/components/ui/ScrollProgress';
import RaceStrip from '@/components/ui/RaceStrip';
import CheckeredDivider from '@/components/ui/CheckeredDivider';

// Background canvas dimuat setelah hydration: LoadingScreen sudah menutupi
// layar saat ini, sehingga three.js pergi dari critical path tanpa beda visual.
const ShaderBackground = dynamic(
  () => import('@/components/ui/ShaderBackground'),
  { ssr: false },
);

// Feature Components
import EasterEgg from '@/components/EasterEgg';
import Navigation from '@/components/Navigation';
import MobileMenu from '@/components/MobileMenu';

// Sections
import HeroSection from '@/components/sections/HeroSection';
import SpotifySection from '@/components/sections/SpotifySection';
import QuoteSection from '@/components/sections/QuoteSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechStackSection from '@/components/sections/TechStackSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import CurrentlySection from '@/components/sections/CurrentlySection';
import FooterSection from '@/components/sections/FooterSection';
import SignatureSection from '@/components/sections/SignatureSection';
import TickerSection from '@/components/sections/TickerSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize smooth scroll
  useLenis();

  // Prevent scroll when menu is open. The attribute (not inline overflow) also
  // stops Lenis, which scrolls the window on its own and would otherwise glide
  // the page behind the dialog.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.setAttribute('data-scroll-lock', '');
    } else {
      document.body.removeAttribute('data-scroll-lock');
    }
    return () => {
      document.body.removeAttribute('data-scroll-lock');
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Easter Egg */}
      <EasterEgg />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ScrollProgress />
      <RaceStrip />

      {/* Main Content */}
      <main
        id="home"
        className={`min-h-screen bg-transparent text-foreground font-sans relative ${isLoading ? 'overflow-hidden' : ''
          }`}
      >
        {/* Persistent background: the topographic shader alone carries the
            racing identity. The grid, glows and vignette that used to stack on
            top of it competed with the linework instead of supporting it. */}
        <div className="fixed inset-0 z-0 overflow-hidden bg-background">
          <ShaderBackground />
        </div>

        {/* --- HEADER --- */}
        <Navigation onMenuOpen={() => setIsMenuOpen(true)} />

        {/* --- FIXED HERO SECTION --- */}
        <HeroSection onMenuOpen={() => setIsMenuOpen(true)} />

        {/* --- SCROLLABLE CONTENT WRAPPER --- */}
        <div className="relative z-10 w-full pointer-events-auto">
          {/* Spacer to Show Hero */}
          <div className="h-screen w-full pointer-events-none" />

          <TickerSection />
          <CheckeredDivider label="Lap 01 / Selected Work" />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Tech Stack Section */}
          <TechStackSection />

          {/* Certifications Section */}
          <CertificationsSection />
          <CheckeredDivider label="Lap 04 / About" />

          {/* About Section */}
          <AboutSection />

          {/* Signature Animation Sector */}
          <SignatureSection />

          {/* Currently Section */}
          <CurrentlySection />

          {/* Spotify Playlist — moved below Projects/About: proof of work
              converts better than a playlist above the fold; embed adds
              no SEO signal that early placement would improve */}
          <SpotifySection />
          <QuoteSection />
          <CheckeredDivider label="Lap 06 / Finish" />

          {/* Contact Section */}
          <ContactSection />

          {/* Footer */}
          <FooterSection />
        </div>
      </main>
    </>
  );
}
