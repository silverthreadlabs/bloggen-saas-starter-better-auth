import type { ReactNode } from 'react';

import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';
// import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';


import { baseOptions, linkItems, logo } from '@/app/layout.config';

import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { Sparkles } from 'lucide-react';
// import { AISearchTrigger } from '@/components/ai';
// import 'katex/dist/katex.min.css';


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* <DocsLayout tree={source.pageTree} sidebar={{ enabled: true }} children={children} /> */}
            <DocsLayout
                {...baseOptions}
                tree={source.pageTree}
                // just icon items
                links={linkItems.filter((item) => item.type === 'icon')}
                searchToggle={{
                    components: {
                        lg: (
                            <div className='flex gap-1.5 max-md:hidden'>
                                <LargeSearchToggle className='flex-1' />
                                {/* <AISearchTrigger
                                    aria-label='Ask AI'
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                            className: 'text-fd-muted-foreground'
                                        })
                                    )}>
                                    <Sparkles className='size-4' />
                                </AISearchTrigger> */}
                            </div>
                        )
                    }
                }}
                nav={{
                    ...baseOptions.nav,
                    title: (
                        <>
                            {logo}
                            <span className='font-medium max-md:hidden [.uwu_&]:hidden'>Silverthreadlabs</span>
                        </>
                    ),
                    children: (
                        // <AISearchTrigger
                        //     className={cn(
                        //         buttonVariants({
                        //             variant: 'secondary',
                        //             size: 'sm',
                        //             className:
                        //                 'text-fd-muted-foreground absolute top-1/2 left-1/2 -translate-1/2 gap-2 rounded-full md:hidden'
                        //         })
                        //     )}>
                        //     <Sparkles className='size-4.5 fill-current' />
                        //     Ask AI
                        // </AISearchTrigger>
                        <></>
                    )
                }}
                sidebar={{
                    tabs: {
                        transform(option, node) {
                            const meta = source.getNodeMeta(node);
                            if (!meta || !node.icon) return option;

                            const color = `var(--${meta.path.split('/')[0]}-color, var(--color-canvas-bg-subtle))`;

                            return {
                                ...option,
                                icon: (
                                    <div
                                        className='size-full rounded-lg text-(--tab-color) max-md:border max-md:bg-(--tab-color)/10 max-md:p-1.5 [&_svg]:size-full'
                                        style={
                                            {
                                                '--tab-color': color
                                            } as object
                                        }>
                                        {node.icon}
                                    </div>
                                )
                            };
                        }
                    }
                }}>
                {children}
            </DocsLayout>
        </>
    );
}
