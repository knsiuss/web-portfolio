'use client';

const ITEMS = [
  'F1 Analytics',
  'Rising Star Top 100',
  'Stanford ML',
  'ML Engineering',
  'Jakarta, ID',
  'Gen AI',
];

export default function TickerSection() {
  const sequence = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-line bg-background py-2 md:py-3 select-none"
      aria-hidden="true"
    >
      <div className="ticker-track flex w-max items-center gap-8 md:gap-14 whitespace-nowrap">
        {sequence.map((item, index) => (
          <span key={index} className="flex items-center gap-4 md:gap-8">
            <span className="finish-line h-2 w-2 shrink-0 opacity-70" />
            <span className="font-lando text-lg md:text-3xl uppercase leading-none text-muted">
              {item}
            </span>
            <span className="block h-1.5 w-1.5 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
