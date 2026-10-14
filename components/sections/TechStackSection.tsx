'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const categories: Category[] = [
  {
    number: '01',
    title: 'Programming',
    desc: 'Languages I use for data analysis, machine learning, and building applications.',
    icon: <Code2 className="w-5 h-5" />,
    tools: [
      { name: 'Python', logo: `${DEVICON}/python/python-original.svg`, desc: 'Primary language' },
      { name: 'SQL', logo: `${DEVICON}/postgresql/postgresql-original.svg`, desc: 'Querying & modeling' },
      { name: 'TypeScript', logo: `${DEVICON}/typescript/typescript-original.svg`, desc: 'Web & tooling' },
    ],
  },
  {
    number: '02',
    title: 'Data & Machine Learning',
    desc: 'Libraries for data processing, analysis, and machine learning.',
    icon: <BarChart3 className="w-5 h-5" />,
    tools: [
      { name: 'Pandas', logo: `${DEVICON}/pandas/pandas-original.svg`, desc: 'Data manipulation' },
      { name: 'NumPy', logo: `${DEVICON}/numpy/numpy-original.svg`, desc: 'Numerical computing' },
      { name: 'Scikit-Learn', logo: `${DEVICON}/scikitlearn/scikitlearn-original.svg`, desc: 'ML algorithms' },
      { name: 'PyTorch', logo: `${DEVICON}/pytorch/pytorch-original.svg`, desc: 'Deep learning' },
      { name: 'Matplotlib', logo: `${DEVICON}/matplotlib/matplotlib-original.svg`, desc: 'Visualization' },
      { name: 'Seaborn', logo: `${DEVICON}/python/python-original.svg`, desc: 'Statistical plots' },
      { name: 'Plotly', logo: `${DEVICON}/plotly/plotly-original.svg`, desc: 'Interactive charts' },
    ],
  },
  {
    number: '03',
    title: 'AI Systems & Tools',
    desc: 'Tools for building and experimenting with modern AI systems.',
    icon: <Sparkles className="w-5 h-5" />,
    tools: [
      { name: 'Claude AI', logo: '/images/claude-ai-icon.png', desc: 'LLM integration' },
      { name: 'Codex / OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', desc: 'Code generation' },
      { name: 'Jupyter', logo: `${DEVICON}/jupyter/jupyter-original.svg`, desc: 'Experimentation' },
      { name: 'Google Colab', logo: 'https://colab.research.google.com/img/colab_favicon_256px.png', desc: 'Cloud notebooks' },
    ],
  },
  {
    number: '04',
    title: 'Engineering & Deployment',
    desc: 'Tools for building, deploying, and maintaining applications and data pipelines.',
    icon: <Rocket className="w-5 h-5" />,
    tools: [
      { name: 'FastAPI', logo: `${DEVICON}/fastapi/fastapi-original.svg`, desc: 'Backend development' },
      { name: 'Docker', logo: `${DEVICON}/docker/docker-original.svg`, desc: 'Containerization' },
      { name: 'GitHub Actions', logo: `${DEVICON}/githubactions/githubactions-original.svg`, desc: 'CI/CD' },
      { name: 'GitLab CI', logo: `${DEVICON}/gitlab/gitlab-original.svg`, desc: 'DevOps' },
      { name: 'Streamlit', logo: 'https://streamlit.io/images/brand/streamlit-mark-color.svg', desc: 'Data apps' },
    ],
  },
  {
    number: '05',
    title: 'Other Tools',
    desc: 'Tools I use for productivity and development.',
    icon: <Wrench className="w-5 h-5" />,
    tools: [
      { name: 'Git', logo: `${DEVICON}/git/git-original.svg`, desc: 'Version control' },
      { name: 'VS Code', logo: `${DEVICON}/vscode/vscode-original.svg`, desc: 'Code editor' },
      { name: 'Linux', logo: `${DEVICON}/linux/linux-original.svg`, desc: 'WSL2 dev env' },
      { name: 'Windows', logo: `${DEVICON}/windows8/windows8-original.svg`, desc: 'Daily use' },
    ],
  },
];

export default function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="tech-stack" className="bg-background py-20 md:py-32 pointer-events-auto">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-20 grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end"
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
          <div className="border border-[#DFFF00]/30 bg-[#DFFF00]/5 rounded-xl px-5 py-4 max-w-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-racing-red animate-pulse" />
              <span className="font-tech text-[10px] uppercase tracking-wider text-racing-red">
                Always learning
              </span>
            </div>
            <p className="font-tech text-xs text-foreground/50 leading-relaxed">
              This stack evolves as I explore new technologies and work on new projects.
            </p>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="space-y-4 md:space-y-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            >
              <article className="relative rounded-2xl md:rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 md:p-8 grid md:grid-cols-[minmax(0,240px)_1fr] gap-5 md:gap-8">
                <span className="hidden md:block absolute right-6 top-5 font-lando text-4xl text-foreground/5 select-none">
                  {category.number}
                </span>

                <div className="flex md:flex-col items-center md:items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#DFFF00]/10 border border-[#DFFF00]/30 flex items-center justify-center text-racing-red">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-lando text-base md:text-xl uppercase leading-tight">
                      {category.title}
                    </h3>
                    <p className="font-tech text-xs text-foreground/50 mt-1.5 leading-relaxed">
                      {category.desc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="rounded-xl border border-foreground/10 bg-foreground/5 p-3 flex items-center gap-3 hover:border-[#DFFF00]/40 transition-colors"
                    >
                      <Image
                        src={tool.logo}
                        alt=""
                        width={28}
                        height={28}
                        className="object-contain shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-tech text-xs text-foreground leading-tight">{tool.name}</div>
                        <div className="font-tech text-[10px] text-foreground/40 leading-tight mt-0.5">{tool.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-foreground/10 pt-6"
        >
          <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            Exploring &middot; Building &middot; Improving
          </span>
          <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-foreground/40">
            Currently a student &middot; Open to internship opportunities
          </span>
        </motion.div>
      </div>
    </section>
  );
}
