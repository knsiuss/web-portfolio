'use client';

import { motion } from 'framer-motion';
import { Mail, Calendar, ArrowUpRight, FileDown } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';
import MagneticButton from '@/components/ui/MagneticButton';

// Brand-coloured hover per channel would put six extra hues on the page.
// One accent governs the list instead.
const contactMethods = [
  {
    label: "Email",
    value: "kanisius@novar.me",
    href: "mailto:kanisius@novar.me",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kanisiusbagas1212",
    href: "https://linkedin.com/in/kanisiusbagas1212",
  },
  {
    label: "GitHub",
    value: "github.com/knsiuss",
    href: "https://github.com/knsiuss",
  },
  {
    label: "Hugging Face",
    value: "huggingface.co/knss12",
    href: "https://huggingface.co/knss12",
  },
  {
    label: "X",
    value: "x.com/grey_stardust",
    href: "https://x.com/grey_stardust",
  },
  {
    label: "Instagram",
    value: "instagram.com/p_knsss",
    href: "https://www.instagram.com/p_knsss/",
  },
];

const opportunities = [
  "ML Engineering internships",
  "Freelance data science projects",
  "F1 analytics collaboration",
  "Guest speaking at tech events",
];

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="relative bg-background overflow-hidden z-0">
      {/* Full-bleed lime strip — Lando-style close before footer */}
      <div className="relative bg-accent text-accent-foreground py-12 md:py-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-10 left-0 font-lando text-[22vw] leading-none uppercase text-accent-foreground/[0.08] whitespace-nowrap pointer-events-none select-none"
        >
          CONTACT CONTACT
        </div>
        <div className="mx-auto max-w-6xl px-4 md:px-6 relative">
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="finish-line-accent h-2 w-7 shrink-0" />
            <span className="font-tech text-[11px] uppercase tracking-[0.25em]">
              <span className="mr-2 text-accent-foreground/60">Lap 06 /</span>
              Get In Touch
            </span>
          </div>
          <h2 className="font-lando text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight mb-6">
            Let&apos;s Build<br />Something
          </h2>
          <p className="font-tech text-accent-foreground/80 max-w-xl">
            Currently open to opportunities. Usually respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        {/* Header (sub-copy kept minimal; lime strip above carries the headline) */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-lando text-3xl md:text-5xl uppercase tracking-tight">
            Work With Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Opportunities */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-lando text-xl uppercase mb-6 text-foreground">
              Open For
            </h3>
            <ul className="space-y-3 mb-8">
              {opportunities.map((opp) => (
                <li key={opp} className="flex items-center gap-3">
                  <span aria-hidden="true" className="block h-1.5 w-1.5 bg-accent-text" />
                  <span className="font-tech text-muted">{opp}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticButton
                href="mailto:kanisius@novar.me"
                magneticStrength={0.2}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-accent text-accent-foreground font-tech uppercase tracking-wider px-6 rounded-md hover:brightness-110 transition-[filter]"
              >
                <Mail aria-hidden="true" className="w-4 h-4" />
                Start a Conversation
              </MagneticButton>
              <MagneticButton
                href="/assets/resume-kanisius-bagaskara.pdf"
                download
                magneticStrength={0.2}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-line-strong text-foreground font-tech uppercase tracking-wider px-6 rounded-md hover:bg-foreground/10 transition-colors"
              >
                <FileDown aria-hidden="true" className="w-4 h-4" />
                Download CV
              </MagneticButton>
            </div>

            <div className="mt-6 flex items-center gap-2 text-muted">
              <Calendar aria-hidden="true" className="w-4 h-4" />
              <span className="font-tech text-xs">Usually respond within 24 hours</span>
            </div>
          </motion.div>

          {/* Right - Contact Methods */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 min-h-[60px] bg-panel border border-line rounded-md transition-colors hover:border-accent-soft"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-tech text-[10px] uppercase tracking-wider text-faint block">{method.label}</span>
                  <span className="font-tech text-sm text-foreground truncate block">{method.value}</span>
                </div>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0 text-muted" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
