import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  childSelector?: string;
  scale?: number;
  clipPath?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const {
      y = 40,
      x = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      ease = 'power3.out',
      start = 'top 80%',
      childSelector,
      scale,
      clipPath,
    } = options;

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: y,
      x: x,
    };

    if (scale !== undefined) {
      fromVars.scale = scale;
    }

    if (clipPath) {
      fromVars.clipPath = 'inset(100% 0 0 0)';
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration: duration,
      delay: delay,
      ease: ease,
      scrollTrigger: {
        trigger: el,
        start: start,
        toggleActions: 'play none none none',
      },
    };

    if (scale !== undefined) {
      toVars.scale = 1;
    }

    if (clipPath) {
      toVars.clipPath = 'inset(0% 0 0 0)';
    }

    if (stagger > 0) {
      toVars.stagger = stagger;
    }

    gsap.fromTo(targets, fromVars, toVars);

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return ref;
}
