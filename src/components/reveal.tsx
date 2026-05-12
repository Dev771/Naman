'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades + nudges children in as they scroll into view.
 *
 * Implementation: `IntersectionObserver` flips a state flag on first
 * intersection, which swaps Tailwind classes (`opacity-0 translate-y-4`
 * → `opacity-100 translate-y-0`). Respects `prefers-reduced-motion` —
 * if the user has it on, the content renders in its final state with
 * no transition at all.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  /** Delay in ms before the transition kicks in once visible */
  delay?: number;
  className?: string;
  /** Element to render — defaults to `div`. Use `section`, `article`, etc. for semantics. */
  as?: 'div' | 'section' | 'article' | 'span' | 'aside';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!ref.current || reduced) {
      if (reduced) setVisible(true);
      return;
    }
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const inViewAtMount = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

    if (inViewAtMount) {
      // Element is already on screen at first paint — kick the
      // transition on the *next* frame so the browser paints the
      // initial (opacity-0, translate-y-3) state first, then animates
      // toward the final state. Without the double-rAF React can
      // batch the state flip into the first paint and the animation
      // never plays.
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => setVisible(true));
        (el as HTMLElement).dataset.r2 = String(r2);
      });
      return () => cancelAnimationFrame(r1);
    }

    // Otherwise wait for scroll. Fire when the element is ~10% into
    // the viewport so the animation actually plays in front of the
    // user instead of completing before they see the section.
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  const TagAny = Tag as any;
  return (
    <TagAny
      ref={ref}
      className={`transition-[opacity,transform] duration-[450ms] ease-out ${
        visible || reduced
          ? 'translate-y-0 opacity-100'
          : 'translate-y-3 opacity-0'
      } ${className}`}
      style={{ transitionDelay: visible && !reduced ? `${delay}ms` : '0ms' }}
    >
      {children}
    </TagAny>
  );
}
