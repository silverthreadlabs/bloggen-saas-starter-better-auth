'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary-bg text-primary-text border border-primary-border shadow-sm'
          : 'text-canvas-text hover:bg-canvas-bg-hover hover:text-canvas-text-contrast'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem; 