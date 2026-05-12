import { Hero } from '@/components/home/hero';
import { WorkCards } from '@/components/home/work-cards';
import { Experience } from '@/components/home/experience';
import { Education } from '@/components/home/education';
import { SideProject } from '@/components/home/side-project';
import { Tools } from '@/components/home/tools';
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
        <Reveal><Tools /></Reveal>
      </main>
      <StickyPhotoFrame />
    </>
  );
}
