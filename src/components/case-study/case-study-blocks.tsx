import {
  CaseStudyImage,
  CaseStudyImageRow,
  CaseStudyImageStack,
} from './case-study-image';
import type { Block } from '@/lib/case-studies';

/**
 * Renders a section body from typed content blocks defined in
 * `src/lib/case-studies.ts`. Plain `dangerouslySetInnerHTML` is used
 * for paragraphs and list items so authors can use inline markup
 * (<strong>, <em>, <br>, &amp; entities, emoji) directly in the
 * config without escaping back-and-forth.
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'para':
            return (
              <p
                key={i}
                className={`mb-3 ${b.bold ? 'font-bold' : ''}`}
                dangerouslySetInnerHTML={{ __html: b.html }}
              />
            );
          case 'list':
            return (
              <div key={i} className="mb-3">
                {b.lead && (
                  <p
                    className="mb-1 font-bold"
                    dangerouslySetInnerHTML={{ __html: b.lead }}
                  />
                )}
                <ul className="list-disc pl-6">
                  {b.items.map((item, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            );
          case 'image':
            return (
              <CaseStudyImage
                key={i}
                src={b.src}
                alt={b.alt ?? ''}
                caption={b.caption}
              />
            );
          case 'images': {
            const Wrapper = b.layout === 'row' ? CaseStudyImageRow : CaseStudyImageStack;
            return (
              <Wrapper key={i}>
                {b.items.map((img, j) => (
                  <CaseStudyImage
                    key={j}
                    src={img.src}
                    alt={img.alt ?? ''}
                    caption={img.caption}
                  />
                ))}
              </Wrapper>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}
