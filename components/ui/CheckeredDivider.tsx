/**
 * Thin checkered band that separates the page's racing "sectors".
 * Purely decorative, so screen readers skip it.
 */
export default function CheckeredDivider({ label }: { label?: string }) {
  return (
    <div className="relative h-3 border-y border-line bg-background" aria-hidden="true">
      <div className="finish-line absolute inset-x-0 top-0 h-[5px] opacity-40" />
      {label && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 font-tech text-[10px] uppercase tracking-[0.3em] text-muted">
          {label}
        </span>
      )}
    </div>
  );
}
