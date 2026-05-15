'use client';

import { home } from '@/lib/assets';
import { useHomeContext } from './home-context';

/**
 * Polaroid video frame — Figma node 479:2769.
 *
 * Sized to the actual video dimensions: Hero_mcaqpg.mp4 is 720×1280
 * (9:16 portrait). The polaroid wraps the video at its native aspect
 * with a thin top/side white border and a thicker "label" strip at
 * the bottom — exactly the proportions of a physical polaroid.
 *
 * Slight rotation + soft drop shadow give it the handheld feel the
 * user described.
 */

// Polaroid sizing (proportional to the 720x1280 source video)
const VIDEO_W = 220;
const VIDEO_H = 220;
const SIDE_BORDER = 10;
const TOP_BORDER = 10;
const BOTTOM_STRIP = 56;
const FRAME_W = VIDEO_W + SIDE_BORDER * 2;
const FRAME_H = VIDEO_H + TOP_BORDER + BOTTOM_STRIP;

export function PhotoFrame({ className }: { className?: string }) {
  return (
    <div
      style={{ width: FRAME_W, height: FRAME_H }}
      className={`relative rounded-[2px] bg-gradient-to-br from-white to-[#e9e9e9] shadow-[0_22px_50px_-14px_rgba(53,50,79,0.28),0_6px_14px_-6px_rgba(0,0,0,0.14)] transition-transform duration-300 hover:!rotate-[1deg] hover:!translate-y-0 hover:scale-[1.04] ${className || 'polaroid-wobble'}`}
    >
      <div
        style={{
          width: VIDEO_W,
          height: VIDEO_H,
          left: SIDE_BORDER,
          top: TOP_BORDER,
        }}
        className="absolute overflow-hidden"
      >
        <video
          src={home.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_3px_rgba(0,0,0,0.22)]"
        />
      </div>
    </div>
  );
}

/**
 * Desktop-only sticky wrapper used on the Homepage.
 *
 * Pinned to the top-right of the viewport from page load — stays
 * visible while scrolling. Hidden on mobile (Figma 479:3093 has no
 * polaroid slot on the mobile homepage).
 *
 * Fades out when any tracked section (WorkCards, Experience,
 * Education, SideProject) is hovered.
 */
export function StickyPhotoFrame() {
  const { sectionHovered } = useHomeContext();
  return (
    <div
      className={`pointer-events-none fixed bottom-6 right-6 z-30 hidden transition-opacity duration-300 md:block lg:right-10 xl:right-20 ${
        sectionHovered ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="pointer-events-auto">
        <PhotoFrame />
      </div>
    </div>
  );
}
