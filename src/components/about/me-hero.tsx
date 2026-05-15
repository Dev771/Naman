'use client';

import { useRef } from 'react';
import { about, home } from '@/lib/assets';
import { SmartImage } from '@/components/smart-image';
import Image from 'next/image';
import { useHeroAudio } from '@/hooks/use-hero-audio';


/**
 * About Me hero — Redesigned editorial layout.
 * Features a mountain background artwork and a polaroid-style card
 * containing the profile image and intro text.
 *
 * Ambient audio: same birds / nature soundscape as the home hero plays
 * while this section is visible (shared AmbientAudioContext — no overlap).
 */
export function MeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroAudio(sectionRef, 'about-hero');

  return (
    <section ref={sectionRef} className="relative flex w-full flex-col items-center pb-8">
      {/* Background Artwork - Mountain scene with 40% opacity fading at bottom */}
      <div className="absolute top-[-100px] left-0 w-full h-[844px] -z-10 opacity-40 pointer-events-none overflow-hidden">
        <Image
          src={home.heroBg}
          alt="Mountain background"
          fill
          className="object-cover object-top"
          unoptimized
          priority
        />
        {/* Soft gradient to blend the background image seamlessly into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fffefc]"></div>
      </div>

      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-10 pt-12 md:pt-16 px-4 md:px-0">
        {/* Main Heading */}
        <h1 className="text-center font-display text-[56px] leading-[1.05] text-[#35324f] md:text-[96px]">
          Well this is <span className="text-[#2f5bff]">Me!</span>
        </h1>

        {/* Polaroid Profile Card */}
        <div
          className="flex w-full flex-col gap-6 bg-gradient-to-br from-[#ffffff] to-[#e9e9e9] px-4 pt-3 pb-8 md:px-[24px] md:pt-[12px] md:pb-[24px]"
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.15))' }}
        >
          {/* Hero Image */}
          <div className="relative h-[300px] w-full overflow-hidden md:h-[400px]">
            <SmartImage
              src={about.hero}
              alt="Naman Bhateja"
              fill
              sizes="(min-width: 1000px) 1000px, 100vw"
              priority
              className="object-cover object-[center_30%]"
            />
          </div>

          {/* Intro Text */}
          <div className="flex w-full flex-col gap-4 md:px-2">
            <p className="font-sans text-[20px] font-medium leading-[29.25px] text-[#35324f]">
              {about.greeting}
            </p>
            <div className="flex flex-col gap-4">
              {about.bio.map((p, i) => (
                <p
                  key={i}
                  className="font-sans text-[18px] md:text-[20px] leading-[29.25px] text-[#8e8e8e]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
