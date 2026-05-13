import { Hero } from '@/components/home/hero';
import { WorkCards } from '@/components/home/work-cards';
import { Experience } from '@/components/home/experience';
import { Education } from '@/components/home/education';
import { SideProject } from '@/components/home/side-project';
import { StickyPhotoFrame } from '@/components/home/photo-frame';
import { Reveal } from '@/components/reveal';

export default function HomePage() {
  return (
    <>
      <main className="page-enter flex flex-col gap-12 pb-16 md:gap-16 md:pb-24">
        <Hero />
        <Reveal><WorkCards /></Reveal>
        <Reveal><Experience /></Reveal>
        <Reveal><Education /></Reveal>
        <Reveal><SideProject /></Reveal>
      </main>
      {/* Only renders on the homepage — StickyPhotoFrame reacts to HomeContext
          which is now provided by layout.tsx, so footer hover works too. */}
      <StickyPhotoFrame />
    </>
  );
}
