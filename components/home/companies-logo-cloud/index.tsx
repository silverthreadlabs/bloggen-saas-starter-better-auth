'use client';

import React from 'react';

import Image from 'next/image';

import InfiniteCarousel from '@/components/infinite-carousel';

import { AhrfeIcon } from '../../../public/assets/seo-tools/ahref';
import { GtmetrixIcon } from '../../../public/assets/seo-tools/gtmetrix';
import { LighthouseIcon } from '../../../public/assets/seo-tools/lighthouse';
import { PageSpeedIcon } from '../../../public/assets/seo-tools/pagespeed';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi';

const logos = [
    {
        name: 'PageSpeed Insights',
        content: (
            <div className='group flex flex-col items-center gap-4'>
                <PageSpeedIcon width={225} />
            </div>
        )
    },
    {
        name: 'Lighthouse',
        content: (
            <div className='group flex flex-col items-center gap-4'>
                <LighthouseIcon width={200} />
            </div>
        )
    },
    {
        name: 'GTmetrix',
        content: (
            <div className='group flex flex-col items-center gap-4'>
                <GtmetrixIcon width={144} />
            </div>
        )
    },
    {
        name: 'Ahrefs',
        content: (
            <div className='group flex flex-col items-center gap-4'>
                <AhrfeIcon width={128} />
            </div>
        )
    }
];

// const logos = [
//     {
//         name: 'Transistor',
//         src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg',
//         width: 158,
//         height: 48
//     },
//     {
//         name: 'Reform',
//         src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg',
//         width: 158,
//         height: 48
//     },
//     {
//         name: 'Tuple',
//         src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg',
//         width: 158,
//         height: 48
//     },
//     {
//         name: 'SavvyCal',
//         src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg',
//         width: 158,
//         height: 48
//     },
//     {
//         name: 'Statamic',
//         src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg',
//         width: 158,
//         height: 48
//     }
// ];

export default function CompaniesLogoCloud() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };
    
return (
        <div className='w-full px-4 py-20 sm:px-6 lg:px-8 xl:py-20'>
            <section
                id='Trusted Companies'
                aria-label='Trusted by Companies'
                className='z-0 flex flex-shrink-0 flex-col items-center self-stretch overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='mb-4 text-center'>
                    <div className='from-primary-bg/20 to-primary-bg/10 border-primary-border/30 mb-8 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm'>
                        {/* <HiSparkles className='text-primary-solid h-4 w-4' /> */}
                        ✨ 
                        <span className='text-primary-text-contrast font-semibold'>Trusted by Industry Leaders</span>
                    </div>

                    <h2 className='text-canvas-text-contrast mb-6 text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl'>
                        Trusted by the most
                        <br />
                        <span className='from-primary-solid via-primary-text to-primary-text-contrast relative bg-gradient-to-r bg-clip-text text-transparent'>
                            {' '}
                            innovative companies{' '}
                        </span>
                        <br />
                        in the world
                    </h2>

                    <p className='text-canvas-text mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-balance'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed.
                        Quam a scelerisque amet ullamcorper eu enim et fermentum, augue.
                    </p>
                </motion.div>
                <div className='relative w-full overflow-hidden'>
                    <motion.div
                        className='mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center lg:gap-12 lg:px-0'
                        variants={container}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.2 }}>
                        <InfiniteCarousel speed={40} direction='left'>
                            {logos.map((logo, index) => (
                                <div
                                    key={index}
                                    className='mx-6 flex flex-shrink-0 flex-row items-center justify-center px-8'>
                                    {logo.content}
                                </div>
                            ))}
                        </InfiniteCarousel>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
