import { ReactNode, HTMLAttributes } from 'react';

type Variant = 'default' | 'elevated' | 'interactive' | 'accent';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  default: 'glass-card',
  elevated: 'glass-card-elevated',
  interactive: 'glass-card-interactive',
  accent: 'glass-card glass-card-accent',
};

export default function GlassCard({
  variant = 'default',
  className = '',
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div className={`${variantClass[variant]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
