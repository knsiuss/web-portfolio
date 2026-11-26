'use client';

import { ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/knsiuss', Icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kanisiusbagas1212', Icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/p_knsss/', Icon: Instagram },
];

export default function FooterSection() {
  return (
    <footer className="bg-background text-foreground pointer-events-auto">
      {/* Finish line — the contact section already owns the email CTA */}
      <div className="finish-line h-2 opacity-60" aria-hidden="true" />
      <div className="border-y border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-tech text-[10px] uppercase tracking-[0.35em] text-accent-text">
              Chequered Flag
            </span>
            <p className="font-lando text-4xl md:text-5xl uppercase leading-[0.85] mt-2">
              End of Race
            </p>
            <p className="font-tech text-xs text-muted mt-3">
              Thanks for stopping by. Pit lane is open whenever you are.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-11 items-center gap-2 font-tech text-xs uppercase tracking-wider border border-line-strong px-5 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
          >
            Back to top
            <ArrowUp aria-hidden="true" size={15} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <p className="font-lando text-2xl md:text-3xl leading-[0.9] text-accent-text">
              KANISIUS
            </p>
            <p className="font-lando text-2xl md:text-3xl leading-[0.9] text-foreground mb-3 md:mb-4">
              BAGASKARA
            </p>
            <p className="font-tech text-[10px] md:text-xs uppercase tracking-wider text-muted">
              Machine Learning Engineer<br />
              AI for Physical World
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-tech text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4 text-faint">
              Contact
            </h2>
            <a
              href="mailto:kanisius@novar.me"
              className="inline-flex min-h-11 items-center font-tech text-sm md:text-base text-foreground hover:text-accent-text transition-colors mb-1.5 md:mb-2"
            >
              kanisius@novar.me
            </a>
            <p className="font-tech text-xs md:text-sm text-muted">Jakarta, Indonesia</p>
          </div>

          {/* Links */}
          <div>
            <h2 className="font-tech text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4 text-faint">
              Connect
            </h2>
            <div className="flex gap-3 md:gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 border border-line-strong rounded-md flex items-center justify-center text-muted hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
                  aria-label={`${label} profile`}
                >
                  <Icon aria-hidden="true" size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="font-tech text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-faint text-center md:text-left">
            © {new Date().getFullYear()} Kanisius Bagaskara. All rights reserved.
          </p>
          <p className="font-tech text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-faint">
            Built with Next.js, TypeScript, Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
