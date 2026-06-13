'use client';

import { ScrollReveal } from '@/components/ScrollReveal';

interface AdminPageShellProps {
  label?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AdminPageShell({
  label = 'Control',
  title,
  subtitle,
  children,
}: AdminPageShellProps) {
  return (
    <div className="admin-page">
      <ScrollReveal variant="line" className="admin-page__header" once>
        <span className="admin-page__label">{label}</span>
        <h1 className="admin-page__title">{title}</h1>
        {subtitle && <p className="admin-page__subtitle">{subtitle}</p>}
      </ScrollReveal>
      <div className="admin-page__body">{children}</div>
    </div>
  );
}
