'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';

const techRow1 = [
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', desc: 'Primary', color: '#3776AB', bg: 'bg-[#3776AB]/10' },
  { name: 'Claude AI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Anthropic_logo.svg/1024px-Anthropic_logo.svg.png', desc: 'LLM Integration', color: '#D4C5B9', bg: 'bg-[#D4C5B9]/10' },
  { name: 'Scikit-Learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', desc: 'ML Algorithms', color: '#F89939', bg: 'bg-[#F89939]/10' },
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', desc: 'Backend APIs', color: '#009688', bg: 'bg-[#009688]/10' },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', desc: 'Data Manipulation', color: '#130654', bg: 'bg-[#130654]/10' },
  { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', desc: 'Numerical', color: '#4D77CF', bg: 'bg-[#4D77CF]/10' },
  { name: 'Codex / OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', desc: 'Code Generation', color: '#10A37F', bg: 'bg-[#10A37F]/10' },
];

const techRow2 = [
  { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg', desc: 'Plotting', color: '#11557C', bg: 'bg-[#11557C]/10' },
  { name: 'Seaborn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', desc: 'Statistical Viz', color: '#4C72B0', bg: 'bg-[#4C72B0]/10' },
  { name: 'Plotly', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg', desc: 'Interactive', color: '#119DFF', bg: 'bg-[#119DFF]/10' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', desc: 'Containers', color: '#2496ED', bg: 'bg-[#2496ED]/10' },
  { name: 'GitHub Actions', logo: 'https://github.githubassets.com/images/modules/site/features/actions-icon.svg', desc: 'CI/CD', color: '#2088FF', bg: 'bg-[#2088FF]/10' },
  { name: 'GitLab CI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', desc: 'DevOps', color: '#FC6D26', bg: 'bg-[#FC6D26]/10' },
  { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', desc: 'Editor', color: '#007ACC', bg: 'bg-[#007ACC]/10' },
  { name: 'Google Colab', logo: 'https://colab.research.google.com/img/colab_favicon_256px.png', desc: 'Cloud', color: '#F9AB00', bg: 'bg-[#F9AB00]/10' },
  { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', desc: 'Notebooks', color: '#F37626', bg: 'bg-[#F37626]/10' },
  { name: 'Streamlit', logo: 'https://streamlit.io/images/brand/streamlit-mark-color.svg', desc: 'Data Apps', color: '#FF4B4B', bg: 'bg-[#FF4B4B]/10' },
];

function usePauseOnInvisible(ref: React.RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

interface TechCardProps {
  tech: typeof techRow1[0];
  index: number;
  rowOffset: number;
}

function TechCard({ tech, index, rowOffset }: TechCardProps) {
  return (
    <div
      className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[260px] h-[200px] sm:h-[260px] md:h-[340px] bg-[#1a1a1a] rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-6 flex flex-col justify-between group hover:border-[#DFFF00] transition-all hover:scale-[1.02] md:hover:scale-105 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(225,6,0,0.2)] md:hover:shadow-[0_0_30px_rgba(225,6,0,0.3)] duration-300"
      style={{
        willChange: 'transform',
        contain: 'layout style paint',
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl ${tech.bg} flex items-center justify-center p-1.5 md:p-2`}>
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
              width="64"
              height="64"
            />
          </div>
          <span className="font-lando text-xl sm:text-2xl md:text-4xl text-white/10 group-hover:text-[#DFFF00]/20 transition-colors">
            {String(index + 1 + rowOffset).padStart(2, '0')}
          </span>
        </div>
        <div>
          <h3 className="font-lando text-base sm:text-lg md:text-2xl uppercase mb-1 md:mb-2 group-hover:text-[#DFFF00] transition-colors">{tech.name}</h3>
          <p className="font-tech text-[10px] sm:text-xs text-white/60 uppercase tracking-wider">{tech.desc}</p>
          <div
            className="w-full h-0.5 md:h-1 mt-2 md:mt-3 rounded-full opacity-30 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: tech.color }}
          />
        </div>
      </div>
    </div>
  );
}

export default function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row1Visible = usePauseOnInvisible(row1Ref);
  const row2Visible = usePauseOnInvisible(row2Ref);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const shouldAnimate = !prefersReducedMotion && !isTouchDevice;

  return (
    <section className="bg-[#111] text-white py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 100, skewY: 5 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-between items-end"
        >
          <h2 className="font-lando text-3xl sm:text-5xl md:text-7xl uppercase">
            Tech<br />
            <span className="text-[#DFFF00]">Stack</span>
          </h2>
          <p className="font-tech text-xs uppercase tracking-wider opacity-60 hidden md:block">
            Hover to pause →
          </p>
        </motion.div>
      </div>

      {/* MARQUEE ROW 1 */}
      <div ref={row1Ref} className="relative mb-4 md:mb-8 overflow-hidden">
        <div
          className={`flex gap-3 md:gap-6 ${shouldAnimate ? 'marquee-left' : ''}`}
          style={{
            animationPlayState: row1Visible ? 'running' : 'paused',
          }}
        >
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-3 md:gap-6">
              {techRow1.map((tech, index) => (
                <TechCard key={`${setIndex}-${tech.name}`} tech={tech} index={index} rowOffset={0} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE ROW 2 */}
      <div ref={row2Ref} className="relative overflow-hidden">
        <div
          className={`flex gap-3 md:gap-6 ${shouldAnimate ? 'marquee-right' : ''}`}
          style={{
            animationPlayState: row2Visible ? 'running' : 'paused',
          }}
        >
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-3 md:gap-6">
              {techRow2.map((tech, index) => (
                <TechCard key={`${setIndex}-${tech.name}`} tech={tech} index={index} rowOffset={10} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
