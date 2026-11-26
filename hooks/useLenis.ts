'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    // WHY 1.1s (was 1.8s): long inertia feels heavy on every wheel tick.
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Lenis scrolls the window programmatically, so `body { overflow: hidden }`
    // does not stop it: wheel events still move the page behind an open menu.
    // The modal toggles this attribute instead.
    const syncLock = () => {
      if (document.body.hasAttribute('data-scroll-lock')) {
        if (!lenis.isStopped) lenis.stop();
      } else if (lenis.isStopped) {
        lenis.start();
      }
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-scroll-lock'] });
    syncLock();

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
