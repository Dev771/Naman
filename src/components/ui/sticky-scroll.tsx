'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import { about } from '@/lib/assets';

const StickyScroll = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const images = about.carousel;
  // Split into three columns
  const col1 = images.slice(0, 6);
  const col2 = images.slice(6, 11);
  const col3 = images.slice(11, 17);

  return (
    <ReactLenis root>
      <main className='bg-cream' ref={ref} {...props}>
        <div className='wrapper'>
          <section className='text-ink w-full bg-cream pt-32 pb-16 sticky top-0'>
            <div className="mx-auto w-full max-w-page">
              <header className="flex flex-col gap-4 px-4 md:px-0">
                <h2 className="font-sans text-[20px] font-medium leading-[24px] text-ink">
                  {about.photoDumpTitle}
                </h2>
                <p className="font-sans text-[18px] leading-normal text-ink-subtle">
                  {about.photoDumpDescription}
                </p>
              </header>
            </div>
          </section>
        </div>

        <section className='text-ink w-full bg-cream relative z-10'>
          <div className='mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-4 px-4'>
            {/* Column 1 - naturally sized to preserve aspect ratio */}
            <div className='grid gap-4 md:col-span-4 h-fit'>
              {col1.map((img) => (
                <figure key={img.id} className='w-full'>
                  <img
                    src={img.src}
                    alt=''
                    loading="lazy"
                    className='transition-all duration-300 w-full h-auto align-bottom object-contain'
                  />
                </figure>
              ))}
            </div>

            {/* Column 2 - sticky */}
            <div className='hidden md:grid sticky top-4 h-[calc(100vh-2rem)] w-full col-span-4 gap-4 grid-rows-3'>
              {col2.slice(0, 3).map((img) => (
                <figure key={img.id} className='w-full h-full'>
                  <img
                    src={img.src}
                    alt=''
                    loading="lazy"
                    className='transition-all duration-300 h-full w-full align-bottom object-cover'
                  />
                </figure>
              ))}
            </div>

            {/* Column 2 (Mobile Fallback) - naturally sized */}
            <div className='grid gap-4 md:hidden h-fit'>
              {col2.map((img) => (
                <figure key={img.id} className='w-full'>
                  <img
                    src={img.src}
                    alt=''
                    loading="lazy"
                    className='transition-all duration-300 w-full h-auto align-bottom object-contain'
                  />
                </figure>
              ))}
            </div>

            {/* Column 3 - naturally sized to preserve aspect ratio */}
            <div className='grid gap-4 md:col-span-4 h-fit'>
              {col3.map((img) => (
                <figure key={img.id} className='w-full'>
                  <img
                    src={img.src}
                    alt=''
                    loading="lazy"
                    className='transition-all duration-300 w-full h-auto align-bottom object-contain'
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <footer className='group bg-cream pt-20 pb-10'>
          <div className='bg-cream h-20 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

StickyScroll.displayName = 'StickyScroll';

export default StickyScroll;
