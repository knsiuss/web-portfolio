'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

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
  download
}: MagneticButtonProps) {
  const ref = useRef<any>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;
    x.set(distanceX);
    y.set(distanceY);
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
    style: { x: xSpring, y: ySpring },
    whileTap: { scale: 0.95 }
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} download={download} {...commonProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...commonProps}>
      {children}
    </motion.button>
  );
}
