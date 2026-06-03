'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TocItem {
  id: string;
  label: string;
}

export function DynamicIslandToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track active section and scroll progress
  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;

    const handleScroll = () => {
      // Calculate overall page scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((winScroll / height) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => obs.observe(el));
    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const activeLabel = items.find((it) => it.id === activeId)?.label || 'Overview';

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay for expanded state */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-[rgba(28,60,168,0.4)] backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 left-0 right-0 z-[9999] flex justify-center md:hidden pointer-events-none px-4">
        <motion.div
          ref={containerRef}
          initial={false}
          animate={{
            width: isOpen ? '100%' : '280px',
            height: isOpen ? 'auto' : '52px',
            borderRadius: isOpen ? '28px' : '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
          }}
          transition={{
            type: 'tween',
            ease: 'circOut',
            duration: 0.25,
          }}
          className="pointer-events-auto overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 relative backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsOpen(true)}
                className="flex h-[52px] w-full items-center justify-between px-4"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Progress indicator circle */}
                  <div className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/5">
                    <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-500/20"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="62.8"
                        strokeDashoffset={62.8 - (progress / 100) * 62.8}
                        className="text-blue-500 transition-all duration-150 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="truncate font-sans text-[14px] font-medium text-ink">
                    {activeLabel}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 pl-3">
                  <div className="flex h-[18px] items-center rounded-full bg-ink/5 px-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  </div>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex w-full flex-col px-6 py-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-ink-subtle">
                    On this page
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink-subtle transition-colors hover:bg-ink/10 hover:text-ink"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <nav>
                  <ul className="flex flex-col gap-3 border-l border-blue-500/15">
                    {items.map((it) => {
                      const isActive = it.id === activeId;
                      return (
                        <li key={it.id} className="relative">
                          <a
                            href={`#${it.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(false);
                              document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth' });
                              setActiveId(it.id);
                            }}
                            className={`block py-1 pl-4 font-sans text-[14px] leading-[20px] transition-colors ${
                              isActive ? 'text-ink' : 'text-ink-subtle hover:text-ink'
                            }`}
                          >
                            {it.label}
                          </a>
                          {isActive && (
                            <motion.span
                              layoutId="mobileActiveLine"
                              aria-hidden="true"
                              className="absolute left-[-1px] top-1 h-[20px] w-[2px] rounded-full bg-blue-500"
                              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
