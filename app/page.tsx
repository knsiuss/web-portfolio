'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

// Hooks
import useLenis from '@/hooks/useLenis';

// UI Components
import LoadingScreen from '@/components/ui/LoadingScreen';
import ShaderBackground from '@/components/ui/ShaderBackground';

// Feature Components
import EasterEgg from '@/components/EasterEgg';
import Navigation from '@/components/Navigation';
import MobileMenu from '@/components/MobileMenu';

// Sections
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechStackSection from '@/components/sections/TechStackSection';
import StatsSection from '@/components/sections/StatsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import TimelineSection from '@/components/sections/TimelineSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import AboutSection from '@/components/sections/AboutSection';
import StorySection from '@/components/sections/StorySection';
import ContactSection from '@/components/sections/ContactSection';
import CurrentlySection from '@/components/sections/CurrentlySection';
import FooterSection from '@/components/sections/FooterSection';
import SignatureSection from '@/components/sections/SignatureSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  // Initialize smooth scroll
  useLenis();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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

      {/* Main Content */}
      <main
        ref={containerRef}
        className={`min-h-screen bg-transparent text-white font-sans relative ${isLoading ? 'overflow-hidden' : ''
          }`}
      >
        {/* CINEMATIC VIDEO BACKGROUND LAYER */}
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505]">
          {/* Math & Physics WebGL Shader Background (Isolines) */}
          <ShaderBackground />

          {/* Tech Grid Overlay - Made extremely faint so it doesn't overpower the shader */}
          <div className="absolute inset-0 bg-grid-tech opacity-[0.05] z-0 pointer-events-none" />

          {/* Subtle Static Light Effects with Parallax */}
          <motion.div
            className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#DFFF00] opacity-10 blur-[120px] pointer-events-none"
            style={{ y: glowY1 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-black opacity-5 blur-[100px] pointer-events-none"
            style={{ y: glowY2 }}
          />
        </div>

        {/* Background Pattern Mask */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80 pointer-events-none z-0" />

        {/* --- HEADER --- */}
        <Navigation onMenuOpen={() => setIsMenuOpen(true)} />

        {/* --- FIXED HERO SECTION --- */}
        <HeroSection onMenuOpen={() => setIsMenuOpen(true)} />

        {/* --- SCROLLABLE CONTENT WRAPPER --- */}
        <div className="relative z-10 w-full pointer-events-auto">
          {/* Spacer to Show Hero */}
          <div className="h-screen w-full pointer-events-none" />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Tech Stack Section */}
          <TechStackSection />

          {/* Stats Section */}
          <StatsSection />

          {/* Achievements Section */}
          <AchievementsSection />

          {/* Timeline Section */}
          <TimelineSection />

          {/* Certifications Section */}
          <CertificationsSection />

          {/* About Section */}
          <AboutSection />

          {/* Story Section */}
          <StorySection />

          {/* Contact Section */}
          <ContactSection />

          {/* Signature Animation Sector */}
          <SignatureSection />

          {/* Currently Section */}
          <CurrentlySection />

          {/* Footer */}
          <FooterSection />
        </div>
      </main>
    </>
  );
}
