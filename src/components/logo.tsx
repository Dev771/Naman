import Image from 'next/image';

/**
 * Naman logo — the user-provided /public/logo.svg.
 * Used in the Top Bar, the favicon (configured in app/layout.tsx),
 * and as the OG/share icon.
 */
export function Logo({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Naman"
      width={size}
      height={size}
      priority
      unoptimized
      className={className}
    />
  );
}
