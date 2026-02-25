'use client';

import { Github, Linkedin } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-black text-white py-12 md:py-16 pointer-events-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-lando text-2xl md:text-3xl mb-1 md:mb-2">KANISIUS</h3>
            <h3 className="font-lando text-2xl md:text-3xl mb-3 md:mb-4">BAGASKARA</h3>
            <p className="font-tech text-[10px] md:text-xs uppercase tracking-wider opacity-60">
              Machine Learning Engineer<br />
              Google Student Ambassador
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-tech text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4 opacity-60">Contact</h4>
            <a
              href="mailto:kanisius@novar.me"
              className="font-tech text-sm md:text-base hover:text-[#DFFF00] transition-colors block mb-1.5 md:mb-2"
            >
              kanisius@novar.me
            </a>

            <p className="font-tech text-xs md:text-sm opacity-60">Jakarta, Indonesia</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-tech text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4 opacity-60">Connect</h4>
            <div className="flex gap-3 md:gap-4">
              <a
                href="https://github.com/knsiuss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#DFFF00] hover:border-[#DFFF00] hover:text-black transition-all"
                aria-label="GitHub"
              >
                <Github size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
              <a
                href="https://linkedin.com/in/kanisiusbagas1212"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#DFFF00] hover:border-[#DFFF00] hover:text-black transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="font-tech text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] opacity-50 text-center md:text-left">
            © 2026 Kanisius Bagaskara. All Rights Reserved.
          </p>
          <p className="font-tech text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] opacity-30">
            Built with Next.js • TypeScript • Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
