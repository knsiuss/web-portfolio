'use client';

import { motion } from 'framer-motion';
import { BookOpen, Wrench, Trophy, ExternalLink } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';
import LapKicker from '@/components/ui/LapKicker';

const currentActivities = [
  {
    icon: BookOpen,
    label: "Reading",
    content: "'Designing Machine Learning Systems' by Chip Huyen",
    link: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/",
  },
  {
    icon: Wrench,
    label: "Building",
    content: "Aphelion Judge and its agentic RAG loop, retrieval that grades its own evidence",
    link: "https://github.com/knsiuss/aphelion-judge",
  },
  {
    icon: Trophy,
    label: "Recent Win",
    content: "Completed the Stanford ML Specialization (3 courses)",
    link: null,
  },
];

// Hand-maintained, not live. The date is shown so the reader can judge freshness.
const lastUpdated = "26 Nov 2026";

export default function CurrentlySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="currently" className="relative bg-background py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <LapKicker lap="05">Currently</LapKicker>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8 md:mb-12"
        >
          <h2 className="font-lando text-2xl md:text-4xl uppercase">
            Currently
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <span className="font-tech text-[10px] uppercase tracking-[0.15em] text-muted">
            Updated {lastUpdated}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {currentActivities.map(({ icon: Icon, label, content, link }, index) => (
            <motion.div
              key={label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ActivityCard label={label} content={content} link={link} Icon={Icon} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ActivityCardProps {
  label: string;
  content: string;
  link: string | null;
  Icon: typeof BookOpen;
}

function ActivityCard({ label, content, link, Icon }: ActivityCardProps) {
  const body = (
    <>
      <div className="flex items-center gap-2.5 mb-3">
        <Icon aria-hidden="true" className="w-4 h-4 text-accent-text" />
        <span className="font-tech text-[10px] uppercase tracking-[0.15em] text-muted">
          {label}
        </span>
      </div>
      <p className="font-tech text-sm md:text-base text-muted leading-relaxed">
        {content}
      </p>
      {link && (
        <span className="mt-3 flex min-h-11 items-center gap-1.5 font-tech text-[10px] uppercase tracking-wider text-muted group-hover:text-accent-text transition-colors">
          Open
          <ExternalLink aria-hidden="true" className="w-3 h-3" />
        </span>
      )}
    </>
  );

  const frame = "relative h-full bg-panel border border-line rounded-md p-5 md:p-6 transition-colors";

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block ${frame} hover:border-accent-soft`}
      >
        {body}
      </a>
    );
  }

  return <div className={frame}>{body}</div>;
}
