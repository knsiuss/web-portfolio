'use client';

import { motion } from 'framer-motion';
import { Rocket, Award, GraduationCap, Briefcase, Star } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

const timeline = [
  {
    year: "Early 2025",
    icon: <Rocket className="w-4 h-4" />,
    events: [
      {
        title: "Started ML Journey",
        desc: "Inspired by Iron Man's JARVIS — began learning Python fundamentals and data science basics",
        highlight: true,
      },
      {
        title: "First Classification Model",
        desc: "Built Iris dataset classifier using scikit-learn — the 'Hello World' of ML",
        highlight: false,
      },
      {
        title: "IBM Python for Data Science",
        desc: "Completed professional certificate — the foundation that made everything click",
        highlight: false,
      },
    ],
  },
  {
    year: "Mid 2025",
    icon: <Award className="w-4 h-4" />,
    events: [
      {
        title: "Joined Data Science Club",
        desc: "Jakarta, Indonesia — started teaching and community learning",
        highlight: false,
      },
      {
        title: "Google Student Ambassador",
        desc: "Awarded Rising Star Top 100 & Fully Funded Invitation for Graduation",
        highlight: true,
      },
      {
        title: "Google Gemini Certified",
        desc: "Both Educator and Student certifications",
        highlight: false,
      },
    ],
  },
  {
    year: "Late 2025",
    icon: <Star className="w-4 h-4" />,
    events: [
      {
        title: "F1 Analytics Dashboard",
        desc: "Launched real-time telemetry analysis tool — 23 race tracks across the season",
        highlight: true,
      },
      {
        title: "First ML Workshop",
        desc: "Conducted hands-on workshop training 100+ students in AI and data science",
        highlight: false,
      },
    ],
  },
  {
    year: "2026",
    icon: <GraduationCap className="w-4 h-4" />,
    events: [
      {
        title: "Stanford ML Specialization",
        desc: "Completed 3-course program — Jan–Feb 2026",
        highlight: true,
      },
      {
        title: "Deep Dive into ML",
        desc: "Implementing 8+ CS229 algorithms from scratch — performance on par with Scikit-Learn",
        highlight: false,
      },
      {
        title: "Currently Building",
        desc: "F1 tire degradation predictor with real-time weather integration",
        highlight: true,
        current: true,
      },
    ],
  },
];

export default function TimelineSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-foreground/5 dark:bg-background py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-racing-red mb-4 block">
            My Journey
          </span>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
            The Path <span className="text-racing-red">So Far</span>
          </h2>
          <p className="font-tech text-foreground/50 max-w-xl mx-auto">
            From watching Iron Man to becoming a Google Ambassador—every step counts.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {timeline.map((period, periodIndex) => (
            <motion.div
              key={period.year}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: periodIndex * 0.1 }}
              className="mb-8 last:mb-0"
            >
              {/* Year Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#DFFF00]/10 border border-[#DFFF00]/30 rounded-full flex items-center justify-center text-racing-red">
                  {period.icon}
                </div>
                <span className="font-lando text-2xl md:text-3xl text-foreground">{period.year}</span>
                <div className="flex-1 h-[1px] bg-white/10" />
              </div>

              {/* Events */}
              <div className="ml-5 pl-8 border-l border-foreground/10 space-y-4">
                {period.events.map((event, eventIndex) => (
                  <motion.div
                    key={eventIndex}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + eventIndex * 0.05 }}
                    className={`relative p-4 rounded-xl transition-all ${event.highlight
                      ? 'bg-[#DFFF00]/10 border border-[#DFFF00]/30'
                      : 'bg-white/5 border border-foreground/10 hover:border-foreground/20'
                      } ${event.current ? 'ring-2 ring-[#DFFF00] ring-offset-2 ring-offset-black' : ''}`}
                  >
                    {/* Dot */}
                    <div
                      className={`absolute -left-[39px] top-5 w-3 h-3 rounded-full border-2 border-[#0a0a0a] ${event.highlight ? 'bg-[#DFFF00]' : 'bg-white/30'
                        }`}
                    />

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className={`font-tech text-sm md:text-base mb-1 ${event.highlight ? 'text-foreground' : 'text-foreground/80'}`}>
                          {event.title}
                        </h4>
                        <p className="font-tech text-xs text-foreground/50">{event.desc}</p>
                      </div>
                      {event.current && (
                        <span className="shrink-0 font-tech text-[10px] uppercase px-2 py-1 bg-[#DFFF00] text-background rounded-full">
                          Now
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <p className="font-lando text-lg md:text-xl uppercase text-foreground/70 dark:text-foreground/40 italic">
            &ldquo;The journey of a thousand miles begins with a single step&rdquo;
          </p>
          <p className="font-tech text-xs text-foreground/60 dark:text-foreground/30 mt-2">— And a lot of Python debugging</p>
        </motion.div>
      </div>
    </section>
  );
}
