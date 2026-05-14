import { home } from '@/lib/assets';
import { CareerSection, RowIcon } from './career-section';

/**
 * Education — Figma node 479:2601.
 *
 * Same row pattern as Experience: icon + name + period.
 * Hovering a row reveals the full institution name as a subtitle
 * under the abbreviated name with a smooth expand transition.
 */
export function Education() {
  return (
    <CareerSection title="Education">
      <ul className="flex flex-col">
        {home.education.map((school) => (
          <li
            key={school.name}
            className="group -mx-2 flex items-center gap-3 border-b border-blue-500/20 px-2 py-3 transition-colors hover:bg-blue-500/[0.03] md:gap-4 md:py-4"
          >
            <RowIcon src={school.logo} alt={school.fullName} />
            <div className="flex flex-1 items-center justify-between gap-x-2 md:gap-x-8">
              <div className="flex flex-1 flex-col">
                <p className="font-sans text-[15px] font-medium leading-tight text-ink md:text-[20px] md:leading-[30px]">
                  {school.name}
                </p>
                <p className="max-h-0 overflow-hidden font-sans text-[12px] leading-[16px] text-ink-subtle opacity-0 transition-all duration-300 group-hover:max-h-[48px] group-hover:opacity-100 group-hover:pt-1 md:text-[14px] md:leading-[20px]">
                  {school.fullName}
                </p>
              </div>
              <p className="shrink-0 font-sans text-[13px] leading-tight text-ink-subtle md:text-[18px] md:leading-[30px]">
                {school.period}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </CareerSection>
  );
}
