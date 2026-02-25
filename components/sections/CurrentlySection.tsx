'use client';

import { motion } from 'framer-motion';
import { BookOpen, Wrench, Trophy, Clock, ExternalLink } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

const currentActivities = [
  {
    icon: <BookOpen className="w-4 h-4 md:w-5 md:h-5" />,
    label: "Reading",
    content: "'Designing Machine Learning Systems' by Chip Huyen",
    link: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
  },
  {
    icon: <Wrench className="w-4 h-4 md:w-5 md:h-5" />,
    label: "Building",
    content: "Real-time F1 tire degradation predictor with weather integration",
    link: "https://github.com/knsiuss",
    color: "from-[#DFFF00]/20 to-orange-600/10",
    borderColor: "border-[#DFFF00]/30",
    iconBg: "bg-[#DFFF00]/20",
  },
  {
    icon: <Trophy className="w-4 h-4 md:w-5 md:h-5" />,
    label: "Recent Win",
    content: "Completed Stanford ML Specialization (3 courses)",
    link: null,
    color: "from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-500/30",
    iconBg: "bg-yellow-500/20",
  },
];

const lastUpdated = "February 2026";

export default function CurrentlySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#0a0a0a] py-16 md:py-24 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-[#DFFF00]/5 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-ping opacity-75" />
            </div>
            <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-green-500">
              Live
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          <h2 className="font-lando text-2xl md:text-4xl uppercase">
            Currently
          </h2>
        </motion.div>

        {/* Cards Grid - Stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {currentActivities.map((activity, index) => (
            <motion.div
              key={activity.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {activity.link ? (
                <a
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                  data-cursor
                  data-cursor-text="View"
                >
                  <ActivityCard activity={activity} />
                </a>
              ) : (
                <ActivityCard activity={activity} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-white/10"
        >
          <div className="flex items-center gap-2 text-white/40">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            <span className="font-tech text-[10px] md:text-xs uppercase tracking-wider">
              Last updated: {lastUpdated}
            </span>
          </div>

          <p className="font-tech text-[10px] md:text-xs text-white/30 text-center md:text-right">
            {/* Removed misleading auto-update claim */}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

interface Activity {
  icon: React.ReactNode;
  label: string;
  content: string;
  link: string | null;
  color: string;
  borderColor: string;
  iconBg: string;
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div
      className={`relative h-full bg-gradient-to-br ${activity.color} border ${activity.borderColor} rounded-xl md:rounded-2xl p-5 md:p-6 group-hover:border-opacity-60 transition-all duration-300 hover:scale-[1.01] md:hover:scale-[1.02]`}
    >
      {/* Icon & Label */}
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className={`w-8 h-8 md:w-10 md:h-10 ${activity.iconBg} rounded-lg flex items-center justify-center text-white`}>
          {activity.icon}
        </div>
        <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] text-white/50">
          {activity.label}
        </span>
      </div>

      {/* Content */}
      <p className="font-tech text-sm md:text-base text-white/90 leading-relaxed mb-3 md:mb-4">
        {activity.content}
      </p>

      {/* Link Indicator */}
      {activity.link && (
        <div className="flex items-center gap-1.5 md:gap-2 text-white/40 group-hover:text-[#DFFF00] transition-colors">
          <span className="font-tech text-[10px] md:text-xs uppercase tracking-wider">
            View
          </span>
          <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      )}

      {/* Corner Decoration */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/10 rounded-tr-md md:rounded-tr-lg opacity-50" />
    </div>
  );
}
