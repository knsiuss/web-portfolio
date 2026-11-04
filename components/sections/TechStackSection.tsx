'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Code2, BarChart3, Sparkles, Rocket, Wrench } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

type Tool = {
  name: string;
  logo: string;
  desc: string;
};

type Category = {
  number: string;
  title: string;
  desc: string;
  icon: ReactNode;
  tools: Tool[];
};

const categories: Category[] = [
  {
    number: '01',
    title: 'Programming',
    desc: 'Languages I use for data analysis, machine learning, and building applications.',
    icon: <Code2 className="w-5 h-5" />,
    tools: [
      { name: 'Python', logo: '/icons/python.svg', desc: 'Primary language' },
      { name: 'SQL', logo: '/icons/postgresql.svg', desc: 'Querying & modeling' },
      { name: 'TypeScript', logo: '/icons/typescript.svg', desc: 'Web & tooling' },
    ],
  },
  {
    number: '02',
    title: 'Data & Machine Learning',
    desc: 'Libraries for data processing, analysis, and machine learning.',
    icon: <BarChart3 className="w-5 h-5" />,
    tools: [
      { name: 'Pandas', logo: '/icons/pandas.svg', desc: 'Data manipulation' },
      { name: 'NumPy', logo: '/icons/numpy.svg', desc: 'Numerical computing' },
      { name: 'Scikit-Learn', logo: '/icons/scikit-learn.svg', desc: 'ML algorithms' },
      { name: 'PyTorch', logo: '/icons/pytorch.svg', desc: 'Deep learning' },
      { name: 'Matplotlib', logo: '/icons/matplotlib.svg', desc: 'Visualization' },
      { name: 'Seaborn', logo: '/icons/python.svg', desc: 'Statistical plots' },
      { name: 'Plotly', logo: '/icons/plotly.svg', desc: 'Interactive charts' },
    ],
  },
  {
    number: '03',
    title: 'AI Systems & Tools',
    desc: 'Tools for building and experimenting with modern AI systems.',
    icon: <Sparkles className="w-5 h-5" />,
    tools: [
      { name: 'Claude AI', logo: '/images/claude-ai-icon.png', desc: 'LLM integration' },
      { name: 'Codex / OpenAI', logo: '/icons/openai.svg', desc: 'Code generation' },
      { name: 'Jupyter', logo: '/icons/jupyter.svg', desc: 'Experimentation' },
      { name: 'Google Colab', logo: '/icons/colab.png', desc: 'Cloud notebooks' },
    ],
  },
  {
    number: '04',
    title: 'Engineering & Deployment',
    desc: 'Tools for building, deploying, and maintaining applications and data pipelines.',
    icon: <Rocket className="w-5 h-5" />,
    tools: [
      { name: 'FastAPI', logo: '/icons/fastapi.svg', desc: 'Backend development' },
      { name: 'Docker', logo: '/icons/docker.svg', desc: 'Containerization' },
      { name: 'GitHub Actions', logo: '/icons/github-actions.svg', desc: 'CI/CD' },
      { name: 'GitLab CI', logo: '/icons/gitlab.svg', desc: 'DevOps' },
      { name: 'Streamlit', logo: '/icons/streamlit.svg', desc: 'Data apps' },
    ],
  },
  {
    number: '05',
    title: 'Other Tools',
    desc: 'Tools I use for productivity and development.',
    icon: <Wrench className="w-5 h-5" />,
    tools: [
      { name: 'Git', logo: '/icons/git.svg', desc: 'Version control' },
      { name: 'VS Code', logo: '/icons/vscode.svg', desc: 'Code editor' },
      { name: 'Linux', logo: '/icons/linux.svg', desc: 'WSL2 dev env' },
      { name: 'Windows', logo: '/icons/windows8.svg', desc: 'Daily use' },
    ],
  },
];

// Cinematic cascade: tools pop in one-by-one — scale + rotate + slide, staggered.
const toolList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const toolItem: Variants = {
  hidden: { opacity: 0, x: -36, scale: 0.8, rotate: -4 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Parallax layers drift at different speeds as the section scrolls past.
  const bgX = useTransform(scrollYProgress, [0, 1], [40, -140]);
  const headerX = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} id="tech-stack" className="relative overflow-hidden bg-background py-20 md:py-32 pointer-events-auto">
      {/* Giant parallax watermark behind everything */}
      <motion.span
        style={prefersReducedMotion ? undefined : { x: bgX }}
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 font-lando text-[22vw] leading-none uppercase text-transparent opacity-[0.04] select-none whitespace-nowrap"
      >
        Stack Stack
      </motion.span>
      <div className="relative container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          style={prefersReducedMotion ? undefined : { x: headerX }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 120, skewY: 6, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-20 grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end will-change-transform"
        >
          <div>
            <span className="font-tech text-xs uppercase tracking-[0.3em] text-racing-red mb-4 block">
              Skills
            </span>
            <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
              Technical <span className="text-racing-red">Stack</span>
            </h2>
            <p className="font-tech text-sm md:text-base text-foreground/60 max-w-xl leading-relaxed">
              Tools and technologies I use to build, experiment, and learn. I focus on data,
              machine learning, and building real-world applications.
            </p>
          </div>
          <p className="font-tech text-xs text-foreground/50 leading-relaxed max-w-xs">
            <span className="inline-flex items-center gap-2 text-[#DFFF00] uppercase tracking-wider text-[10px] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] animate-pulse" />
              Always learning
            </span>
            <br />
            This stack evolves as I explore new technologies and work on new projects.
          </p>
        </motion.div>

        {/* Categories — Lando-style editorial list with cinematic reveal */}
        <div className="border-t border-foreground/10">
          {categories.map((category, index) => (
            <motion.article
              key={category.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 80, skewY: 4, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.08, 0.32) }}
              className="group relative border-b border-foreground/10 py-8 md:py-10 grid gap-6 md:grid-cols-[110px_minmax(0,280px)_1fr]"
            >
              {/* Accent line grows left-to-right as the row enters */}
              <motion.div
                initial={prefersReducedMotion ? {} : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-[#DFFF00]/70"
                aria-hidden="true"
              />

              <motion.span
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -80, scale: 1.4, rotate: -6 }}
                whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-lando text-6xl md:text-7xl leading-none text-transparent"
                style={{ WebkitTextStroke: '1.5px var(--color-foreground)' }}
                aria-hidden="true"
              >
                {category.number}
              </motion.span>

              <div>
                <div className="flex items-center gap-2.5 text-[#DFFF00]">
                  {category.icon}
                  {/* Title reveals from behind a clip mask */}
                  <span className="overflow-hidden">
                    <motion.h3
                      initial={prefersReducedMotion ? {} : { y: '110%' }}
                      whileInView={{ y: '0%' }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      className="font-lando text-2xl md:text-4xl uppercase leading-none text-foreground"
                    >
                      {category.title}
                    </motion.h3>
                  </span>
                </div>
                <motion.p
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="font-tech text-xs md:text-sm text-foreground/50 mt-2.5 leading-relaxed"
                >
                  {category.desc}
                </motion.p>
              </div>

              <motion.ul
                variants={toolList}
                initial={prefersReducedMotion ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 content-start"
              >
                {category.tools.map((tool) => (
                  <motion.li
                    key={tool.name}
                    variants={toolItem}
                    whileHover={prefersReducedMotion ? {} : { x: 8, scale: 1.08 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 min-w-0 cursor-default"
                  >
                    <Image
                      src={tool.logo}
                      alt=""
                      width={24}
                      height={24}
                      className="object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="min-w-0">
                      <div className="font-tech text-sm text-foreground leading-tight">{tool.name}</div>
                      <div className="font-tech text-[10px] text-foreground/40 leading-tight mt-0.5">{tool.desc}</div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>

        {/* Cinematic marquee — infinite horizontal scroll like Lando's gallery */}
        <div className="mt-14 overflow-hidden border-t border-foreground/10 pt-6" aria-hidden="true">
          <motion.div
            animate={prefersReducedMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="flex w-max whitespace-nowrap will-change-transform"
          >
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="font-lando text-4xl md:text-6xl uppercase leading-none text-foreground/80 pr-10"
              >
                Exploring Building Improving&nbsp;
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
