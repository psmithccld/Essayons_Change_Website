import type { ReactNode } from "react";

interface EditorialSectionProps {
  id?: string;
  number?: string;
  label: string;
  labelledBy?: string;
  aside?: ReactNode;
  children: ReactNode;
}

/**
 * Two-column editorial section: a narrow label column that stays in view on wide
 * screens, and a reading column for the content. Sections are separated by a
 * rule rather than background bands so the page reads as one continuous scroll.
 */
export default function EditorialSection({
  id,
  number,
  label,
  labelledBy,
  aside,
  children,
}: EditorialSectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="border-t">
      <div className="container max-w-6xl py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-14">
          <div className="flex flex-col gap-3 self-start md:sticky md:top-28">
            <div className="flex flex-col gap-1">
              {number && <span className="text-sm text-muted-foreground">{number}</span>}
              <span className="text-[15px] font-bold text-primary">{label}</span>
            </div>
            {aside}
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
