'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, MessageCircle, Calendar, Download, ArrowUpRight } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimatedCollab from '@/components/ui/AnimatedCollab';

const contactMethods = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "kanisius@novar.me",
    href: "mailto:kanisius@novar.me",
    color: "hover:bg-blue-500/20 hover:border-blue-500/50",
    description: "For professional inquiries",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/kanisiusbagas1212",
    href: "https://linkedin.com/in/kanisiusbagas1212",
    color: "hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50",
    description: "Connect professionally",
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    value: "github.com/maxvyquincy9393",
    href: "https://github.com/maxvyquincy9393",
    color: "hover:bg-white/20 hover:border-white/50",
    description: "See my code",
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    label: "Twitter",
    value: "@maxquincy18",
    href: "https://x.com/maxquincy18",
    color: "hover:bg-sky-500/20 hover:border-sky-500/50",
    description: "Follow my updates",
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
    <section id="contact" className="relative bg-[#0a0a0a] py-20 md:py-32 overflow-hidden z-0">
      {/* Background Graphic - Lowest Layer */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center opacity-30 pointer-events-none mix-blend-screen">
        <AnimatedCollab className="w-full max-w-[1400px] mx-auto h-auto opacity-50" />
      </div>

      {/* Background Glow - Above Graphic */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DFFF00]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#DFFF00] mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-lando text-4xl md:text-6xl lg:text-7xl uppercase mb-4">
            Let&apos;s Build{" "}
            <span className="text-[#DFFF00]">Something</span>
          </h2>
          <p className="font-tech text-white/50 max-w-xl mx-auto">
            Currently open to opportunities. Usually respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left - Opportunities */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-lando text-xl uppercase mb-6 text-white/80">
              Open For
            </h3>
            <div className="space-y-3 mb-8">
              {opportunities.map((opp, index) => (
                <motion.div
                  key={opp}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-[#DFFF00] rounded-full" />
                  <span className="font-tech text-white/70">{opp}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticButton
                href="mailto:kanisius@novar.me"
                magneticStrength={0.2}
                className="inline-flex items-center justify-center gap-2 bg-[#DFFF00] text-black font-tech uppercase tracking-wider px-6 py-3 rounded-lg hover:brightness-110 transition-all group"
              >
                <Mail className="w-4 h-4" />
                Start a Conversation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </MagneticButton>
              <a
                href="/assets/resume-kanisius-bagaskara.pdf"
                download
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-tech uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-white/10 transition-all"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            {/* Response Time */}
            <div className="mt-6 flex items-center gap-2 text-white/40">
              <Calendar className="w-4 h-4" />
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
                className={`flex items-center gap-4 p-4 bg-[#111] border border-white/10 rounded-xl transition-all ${method.color} group`}
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-xs uppercase text-white/40">{method.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                  <span className="font-tech text-sm text-white truncate block">{method.value}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
