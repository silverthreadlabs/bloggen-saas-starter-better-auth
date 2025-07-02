import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{ enabled: true }}
      nav={{ enabled: true }}
      searchToggle={{ enabled: true }}
    >
      {children}
    </DocsLayout>
  );
}
