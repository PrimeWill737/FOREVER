'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';

type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur' | 'line';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 900,
  threshold = 0.15,
  once = false,
  as: Tag = 'div',
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const directionRef = useScrollDirection();
  const [visible, setVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const dir = directionRef.current;

        if (entry.isIntersecting) {
          setVisible(true);
          hasBeenVisible.current = true;
        } else if (once && hasBeenVisible.current) {
          return;
        } else if (dir === 'up') {
          setVisible(false);
        } else if (dir === 'down') {
          setVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [directionRef, once, threshold]);

  const classes = [
    'reveal',
    `reveal--${variant}`,
    visible ? 'reveal--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const revealStyle = {
    ...style,
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
  } as CSSProperties;

  return (
    // @ts-expect-error dynamic tag ref typing
    <Tag ref={ref} className={classes} style={revealStyle}>
      {children}
    </Tag>
  );
}
