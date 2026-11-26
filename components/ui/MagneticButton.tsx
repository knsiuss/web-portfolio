'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  magneticStrength?: number;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  'aria-label'?: string;
  'aria-haspopup'?: React.AriaAttributes['aria-haspopup'];
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  magneticStrength = 0.3,
  type = 'button',
  href,
  target,
  rel,
  download,
  'aria-label': ariaLabel,
  'aria-haspopup': ariaHasPopup,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // The pull is decorative movement, so it does nothing when motion is reduced.
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * magneticStrength);
    y.set((e.clientY - centerY) * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref,
    className,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: prefersReducedMotion ? undefined : { x: xSpring, y: ySpring },
    whileTap: prefersReducedMotion ? undefined : { scale: 0.95 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        aria-label={ariaLabel}
        aria-haspopup={ariaHasPopup}
        {...commonProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
      {...commonProps}
    >
      {children}
    </motion.button>
  );
}
