import type { Metadata } from 'next';
import { MeHero } from '@/components/about/me-hero';
import { PhotoGallery } from '@/components/about/photo-gallery';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'About — Naman Bhateja',
};

export default function AboutPage() {
  return (
    <main className="cursor-pokemon page-enter flex flex-col gap-8 pb-16 md:gap-20 md:pb-24">
      <MeHero />
      <Reveal><PhotoGallery /></Reveal>
    </main>
  );
}
