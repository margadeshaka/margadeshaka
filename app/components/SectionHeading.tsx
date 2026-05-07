import { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={align === 'center' ? 'text-center mx-auto max-w-[700px]' : 'max-w-[700px]'}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className="font-display text-white mt-3 leading-[1.1]"
        style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[17px] text-white/[0.62] leading-[1.6]">{subtitle}</p>
      )}
    </div>
  );
}
