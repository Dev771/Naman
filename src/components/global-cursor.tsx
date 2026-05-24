'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function GlobalCursor() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate refs
  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });

  // Determine if cursor should be active on this route
  const isExcludedRoute = pathname?.startsWith('/admin') || pathname === '/about';

  useEffect(() => {
    // Disable on touch devices or excluded routes
    if (isExcludedRoute || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
      setIsActive(false);
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    setIsActive(true);
    document.body.classList.add('has-custom-cursor');

    return () => {
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isExcludedRoute]);

  useEffect(() => {
    if (!isActive) return;

    let animationFrameId: number;
    const speed = 0.25; // Smooth but snappy interpolation

    const render = () => {
      cursor.current.x += (mouse.current.x - cursor.current.x) * speed;
      cursor.current.y += (mouse.current.y - cursor.current.y) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Instantly snap to cursor if it was hidden off-screen
      if (cursor.current.x === -100 && cursor.current.y === -100) {
        cursor.current.x = e.clientX;
        cursor.current.y = e.clientY;
      }
    };

    // Event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractiveElement = target.closest('a, button, [role="button"], input, select, textarea');
      setIsInteractive(!!isInteractiveElement);

      const isTransparentElement = target.closest('[data-cursor-transparent="true"]');
      setIsTransparent(!!isTransparentElement);

      const isHiddenElement = target.closest('.cs-card-link');
      setIsHidden(!!isHiddenElement);

      const isWhiteElement = target.closest('[data-cursor-white="true"]');
      setIsWhite(!!isWhiteElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-200 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      style={{ willChange: 'transform' }}
    >
      <div 
        className={`flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isInteractive 
            ? `h-20 w-20 bg-transparent ${isWhite ? 'border-white/80' : 'border-[#2f5bff]/60'}` 
            : isTransparent
              ? `h-24 w-24 bg-transparent ${isWhite ? 'border-white/60' : 'border-[#2f5bff]/40'}`
              : `h-12 w-12 bg-transparent ${isWhite ? 'border-white/60' : 'border-[#2f5bff]/40'}`
          }
        `}
      />
    </div>
  );
}
