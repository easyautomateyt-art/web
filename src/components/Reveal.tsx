import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from 'react';

/**
 * Runs as a layout effect on the client (so the initial hidden state is applied
 * before the first paint, avoiding any flash) and as a no-op effect on the
 * server (so prerendered HTML renders the content fully visible — good for SEO
 * and no-JS users).
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type RevealState = 'idle' | 'hidden' | 'shown';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay before the entrance transition, in ms (useful for staggering). */
  delay?: number;
  /** Vertical offset to animate from, in px. */
  y?: number;
  threshold?: number;
}

/**
 * Reveals its children with a subtle fade + upward motion when scrolled into
 * view. Respects `prefers-reduced-motion` and is safe to prerender.
 */
export default function Reveal({
  children,
  as,
  className = '',
  delay = 0,
  y = 24,
  threshold = 0.15,
}: RevealProps) {
  const Tag = (as || 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  // 'idle' = server / first render: visible, no transition.
  const [state, setState] = useState<RevealState>('idle');

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setState('shown');
      return;
    }
    const el = ref.current;
    if (!el) {
      setState('shown');
      return;
    }
    setState('hidden');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState('shown');
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties =
    state === 'idle'
      ? {}
      : {
          opacity: state === 'shown' ? 1 : 0,
          transform: state === 'shown' ? 'none' : `translateY(${y}px)`,
          transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
          willChange: 'opacity, transform',
        };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
