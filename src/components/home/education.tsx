import { home } from '@/lib/assets';
import { CareerSection, RowIcon } from './career-section';

/**
 * Education — Figma node 479:2601.
 *
 * Same row pattern as Experience: icon + name (+ full institution
 * name as a subtitle, like Experience's "role") + period.
 * The full name also drives the icon's hover tooltip.
 */
export function Education() {
  return (
    <CareerSection title="Education">
      <ul className="flex flex-col">
        {home.education.map((school) => (
          <li
            key={school.name}
            className="-mx-2 flex items-center gap-4 rounded-md border-b border-blue-500/20 px-2 py-4 transition-colors hover:bg-blue-500/[0.03]"
          >
            <RowIcon src={school.logo} alt={school.fullName} />
            <div className="flex flex-1 flex-wrap items-center justify-between gap-x-8 gap-y-1">
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1">
                <p className="font-sans text-[18px] font-medium leading-[30px] text-ink md:text-[20px]">
                  {school.name}
                </p>
              </div>
              <p className="font-sans text-[16px] leading-[30px] text-ink-subtle md:text-[18px]">
                {school.period}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </CareerSection>
  );
}
