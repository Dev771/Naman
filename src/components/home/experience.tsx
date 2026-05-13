import { home } from '@/lib/assets';
import { CareerSection, RowIcon } from './career-section';

/**
 * Experience — Figma node 479:2558.
 * Each entry: company logo + name + role (left), date right-aligned.
 * 16px description below, indented under the icon.
 * Bottom border: blue 20% rgba(47,91,255,0.2).
 */
export function Experience() {
  return (
    <CareerSection title="Experience">
      <ul className="flex flex-col">
        {home.experience.map((job) => (
          <li
            key={job.name}
            className="group/row -mx-2 flex flex-col gap-2 border-b border-blue-500/20 px-2 py-4 transition-colors hover:bg-blue-500/[0.03]"
          >
            <div className="flex items-center gap-4">
              <RowIcon src={job.logo} alt={`${job.name} — ${job.role}`} />
              <div className="flex flex-1 flex-wrap items-center justify-between gap-x-8 gap-y-1">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-1">
                  <p className="font-sans text-[18px] font-medium leading-[30px] text-ink md:text-[20px]">
                    {job.name}
                  </p>
                  <p className="font-sans text-[16px] leading-[21px] text-ink-subtle md:text-[18px]">
                    {job.role}
                  </p>
                </div>
                <p className="font-sans text-[16px] leading-[30px] text-ink-subtle md:text-[18px]">
                  {job.period}
                </p>
              </div>
            </div>
            {/* Indent matches icon (50px) + gap (16px) = 66px so the
                description aligns with the name text above. */}
            <p className="hidden pl-[40px] font-sans text-[16px] leading-[21px] text-ink-subtle md:block">
              {job.description}
            </p>
          </li>
        ))}
      </ul>
    </CareerSection>
  );
}
