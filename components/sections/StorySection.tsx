'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

export default function StorySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-foreground py-16 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-[#DFFF00]/10 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-blue-600/5 rounded-full blur-[100px] md:blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.3em] text-racing-red mb-2 md:mb-4 block">
            Random Facts
          </span>
          <h2 className="font-lando text-3xl sm:text-5xl md:text-7xl uppercase">
            How I Got <span className="text-transparent" style={{ WebkitTextStroke: '1.5px var(--racing-red)' }}>Here</span>
          </h2>
        </motion.div>

        {/* Story Content - Stack on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-24">
          {/* Card 1 */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            className="group"
          >
            <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl md:rounded-2xl p-6 md:p-8 h-full hover:border-[#DFFF00]/30 transition-all">
              <span className="font-lando text-4xl md:text-6xl text-foreground/5 group-hover:text-[#DFFF00]/10 transition-colors block mb-2 md:mb-4">
                01
              </span>
              <h3 className="font-lando text-xl md:text-2xl uppercase mb-3 md:mb-4 text-foreground group-hover:text-[#DFFF00] transition-colors">
                The Iron Man Thing
              </h3>
              <p className="font-tech text-sm md:text-base text-foreground/60 leading-relaxed">
                Honestly? I got into Data Science because of Iron Man. Watching JARVIS talk, analyze data in real-time, 
                help Tony make decisions—I thought, "Damn, I wanna build something like that." Started learning Python, 
                fell into ML, and now I'm stuck here (in a good way).
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group"
          >
            <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl md:rounded-2xl p-6 md:p-8 h-full hover:border-[#DFFF00]/30 transition-all">
              <span className="font-lando text-4xl md:text-6xl text-foreground/5 group-hover:text-[#DFFF00]/10 transition-colors block mb-2 md:mb-4">
                02
              </span>
              <h3 className="font-lando text-xl md:text-2xl uppercase mb-3 md:mb-4 text-foreground group-hover:text-[#DFFF00] transition-colors">
                From Bedroom to Stage
              </h3>
              <p className="font-tech text-sm md:text-base text-foreground/60 leading-relaxed">
                Used to be just some kid coding alone in my room. Next thing I know, I'm a Google Student Ambassador. 
                I was the guy who got nervous talking to 5 people. Now I can teach workshops with 100+ people. 
                Didn't see that coming, but turns out teaching is fun—it actually makes me understand stuff better.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-xl md:rounded-2xl p-6 md:p-8 h-full hover:border-[#DFFF00]/30 transition-all">
              <span className="font-lando text-4xl md:text-6xl text-foreground/5 group-hover:text-[#DFFF00]/10 transition-colors block mb-2 md:mb-4">
                03
              </span>
              <h3 className="font-lando text-xl md:text-2xl uppercase mb-3 md:mb-4 text-foreground group-hover:text-[#DFFF00] transition-colors">
                The Stubbornness
              </h3>
              <p className="font-tech text-sm md:text-base text-foreground/60 leading-relaxed">
                I never aim to be the best. I just know that when I have a target, I chase it until I get it. 
                Like F1—it's not about being perfect, it's about improving every single lap. Code broke? Fix it. 
                Algorithm failed? Try again. Just keep moving forward.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Big Quote - Smaller on mobile */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute -top-4 md:-top-8 left-0 md:-left-8">
            <Quote className="w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 text-racing-red opacity-20" />
          </div>
          
          <div className="bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center">
            <blockquote>
              <p className="font-lando text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase leading-tight mb-4 md:mb-6">
                <span className="text-foreground">I'm not perfect, </span>
                <span className="text-foreground/40">but when I have a goal,</span>
                <br />
                <span className="text-racing-red">I DON'T STOP UNTIL I GET IT.</span>
              </p>
            </blockquote>
            
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="h-[1px] w-8 md:w-12 bg-[#DFFF00]/50" />
              <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-foreground/30">
                Too stubborn to quit
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-[#DFFF00]/50" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Tags - Smaller and wrap on mobile */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mt-10 md:mt-16"
        >
          {['Always Learning', 'Too Stubborn To Quit', 'F1 > Football'].map((tag) => (
            <span 
              key={tag}
              className="font-tech text-[10px] md:text-xs uppercase px-3 md:px-4 py-1.5 md:py-2 border border-foreground/10 rounded-full text-foreground/50"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
