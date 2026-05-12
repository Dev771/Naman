import type { Metadata } from 'next';
import { WorkHero } from '@/components/work/work-hero';
import { FeaturedCards } from '@/components/work/featured-cards';
import { SideProject } from '@/components/home/side-project';
import { UiGrid } from '@/components/work/ui-grid';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Selected Work — Naman Bhateja',
};

export default function WorkPage() {
  return (
    <main className="page-enter flex flex-col gap-12 pt-6 pb-16 md:gap-16 md:pb-24">
      <WorkHero />
      <Reveal><FeaturedCards /></Reveal>
      <Reveal><SideProject /></Reveal>
      <Reveal><UiGrid /></Reveal>
    </main>
  );
}
