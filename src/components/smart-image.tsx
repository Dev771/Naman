'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * Image with a pulsing skeleton placeholder while it loads, fading in
 * when the actual asset arrives. Drop-in for next/image — same props,
 * plus an optional `wrapperClassName` for the skeleton container.
 *
 * Inherits border-radius from its parent so it can be used inside
 * already-rounded card containers without re-specifying the radius.
 */
type Props = Omit<ImageProps, 'placeholder'> & { wrapperClassName?: string };

export function SmartImage({ wrapperClassName = '', className = '', ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 animate-pulse rounded-[inherit] bg-ink/10 ${wrapperClassName}`}
        />
      )}
      <Image
        {...rest}
        onLoad={() => setLoaded(true)}
        className={`${className} rounded-[inherit] transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
