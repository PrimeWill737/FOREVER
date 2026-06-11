'use client';

import { useEffect, useRef } from 'react';

export type ScrollDirection = 'down' | 'up';

export function useScrollDirection() {
  const directionRef = useRef<ScrollDirection>('down');
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastYRef.current) {
        directionRef.current = y > lastYRef.current ? 'down' : 'up';
        lastYRef.current = y;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return directionRef;
}
