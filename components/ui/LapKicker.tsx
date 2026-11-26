import type { ReactNode } from 'react';

/**
 * Section eyebrow styled as a timing-screen lap marker.
 * The checkered tile is decorative; the label carries the section name.
 */
export default function LapKicker({
  lap,
  children,
}: {
  lap: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span aria-hidden="true" className="finish-line h-2 w-7 shrink-0" />
      <span className="font-tech text-[11px] uppercase tracking-[0.25em] text-accent-text">
        <span className="mr-2 text-muted">Lap {lap} /</span>
        {children}
      </span>
    </div>
  );
}
