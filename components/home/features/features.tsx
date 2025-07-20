'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import {
    HiChartBar,
    HiCode,
    HiCog,
    HiGlobeAlt,
    HiLightningBolt,
    HiShieldCheck,
    HiSparkles,
    HiTrendingUp
} from 'react-icons/hi';

interface Feature {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
}

const featuresData: Feature[] = [
    {
        id: 1,
        title: 'Instant MDX Integration',
        description:
            'Drop AI-generated MDX content directly into your /content folder. No editing required - content renders instantly with perfect formatting and styling.',
        icon: <HiCode className='h-6 w-6' />,
        color: 'from-blue-500 to-blue-600',
        gradient: 'from-blue-500/10 to-blue-600/5'
    },
    {
        id: 2,
        title: 'Lightning Fast Performance',
        description:
            'Built on Next.js 15 with optimized Core Web Vitals. Achieve perfect Lighthouse scores out of the box with advanced caching and optimization.',
        icon: <HiLightningBolt className='h-6 w-6' />,
        color: 'from-yellow-500 to-orange-500',
        gradient: 'from-yellow-500/10 to-orange-500/5'
    },
    {
        id: 3,
        title: 'Production-Ready Security',
        description:
            'Enterprise-grade security features built-in. Authentication, authorization, and data protection configured from day one with best practices.',
        icon: <HiShieldCheck className='h-6 w-6' />,
        color: 'from-green-500 to-emerald-600',
        gradient: 'from-green-500/10 to-emerald-600/5'
    },
    {
        id: 4,
        title: 'SEO Supercharged',
        description:
            'Complete SEO infrastructure pre-configured: JSON-LD structured data, dynamic OG images, sitemaps, robots.txt, and RSS feeds for maximum visibility.',
        icon: <HiTrendingUp className='h-6 w-6' />,
        color: 'from-purple-500 to-purple-600',
        gradient: 'from-purple-500/10 to-purple-600/5'
    },
    {
        id: 5,
        title: 'Global Scale Ready',
        description:
            'Internationalization support, CDN optimization, and global deployment patterns built into the architecture for worldwide reach.',
        icon: <HiGlobeAlt className='h-6 w-6' />,
        color: 'from-indigo-500 to-blue-600',
        gradient: 'from-indigo-500/10 to-blue-600/5'
    },
    {
        id: 6,
        title: 'Developer Experience',
        description:
            'TypeScript, ESLint, Prettier, hot reload, and comprehensive tooling for the best developer experience possible. Ship with confidence.',
        icon: <HiCog className='h-6 w-6' />,
        color: 'from-gray-500 to-gray-600',
        gradient: 'from-gray-500/10 to-gray-600/5'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        x: -20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
        }
    }
};

export default function Features() {
    return (
        <section className='relative w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-8 xl:py-32'>
            {/* Clean Professional Background */}
            <div className='absolute inset-0 overflow-hidden'>
                {/* Simple gradient background */}
                <div className='from-canvas-bg to-canvas-bg-subtle absolute inset-0 bg-gradient-to-b'></div>

                {/* Subtle accent gradients */}
                <div className='from-primary-bg/6 absolute top-0 left-0 h-[600px] w-[600px] bg-gradient-to-br via-transparent to-transparent'></div>
                <div className='from-primary-solid/4 absolute right-0 bottom-0 h-[500px] w-[500px] bg-gradient-to-tl via-transparent to-transparent'></div>
            </div>

            <div className='relative z-10 mx-auto max-w-7xl'>
                {/* Enhanced Header */}
                <motion.div
                    className='mb-20 text-center'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}>
                    <div className='from-primary-bg/20 to-primary-bg/10 border-primary-border/30 mb-8 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm'>
                        {/* <HiSparkles className='text-primary-solid h-4 w-4' /> */}
                        ✨ 
                        <span className='text-primary-text-contrast font-semibold'>Everything You Need</span>
                    </div>

                    <h2 className='text-canvas-text-contrast mb-8 text-4xl leading-[1.1] font-bold text-balance sm:text-5xl lg:text-6xl xl:text-7xl'>
                        Ship Faster with
                        <br />
                        <span className='from-primary-solid via-primary-text to-primary-text-contrast relative bg-gradient-to-r bg-clip-text text-transparent'>
                            Battle-Tested Features
                        </span>
                    </h2>
                    <p className='text-canvas-text mx-auto max-w-4xl text-xl leading-relaxed text-balance sm:text-2xl'>
                        Every feature you need to build, launch, and scale your SaaS. Stop reinventing the wheel and
                        focus on what makes your product unique.
                    </p>
                </motion.div>

                {/* Enhanced Features Grid */}
                <motion.div
                    className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10'
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-50px' }}>
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            variants={{ itemVariants }}
                            className='group relative'
                            whileHover={{
                                y: -10,
                                transition: { type: 'spring', stiffness: 300, damping: 20 }
                            }}>
                            {/* Gradient glow effect */}
                            <div
                                className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-sm opacity-0 blur transition duration-500 group-hover:opacity-20`}></div>

                            <div
                                className={`from-canvas-base/90 to-canvas-base/50 border-canvas-border/50 hover:border-primary-border/50 group-hover:shadow-primary-bg/10 relative h-full rounded-sm border bg-gradient-to-br p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl lg:p-10`}>
                                {/* Background gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100`}></div>

                                {/* Content */}
                                <div className='relative z-10'>
                                    {/* Icon with enhanced styling */}
                                    <div className='relative mb-8'>
                                        <div className='from-primary-solid/20 to-primary-text/20 absolute inset-0 rounded-sm bg-gradient-to-r opacity-0 blur-md transition-opacity duration-300'></div>
                                        <div
                                            className={`relative inline-flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-r ${feature.color} text-white shadow-lg shadow-black/10 transition-all duration-300 group-hover:scale-110`}>
                                            {feature.icon}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div>
                                        <h3 className='text-canvas-text-contrast group-hover:text-primary-text-contrast mb-4 text-xl font-bold transition-colors duration-300 lg:text-2xl'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-canvas-text group-hover:text-canvas-text-contrast/90 text-lg leading-relaxed transition-colors duration-300'>
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Decorative element */}
                                    {/* <div className='absolute right-6 bottom-6 h-8 w-8 opacity-0 transition-opacity duration-500 group-hover:opacity-20'>
                                        <div
                                            className={`h-full w-full bg-gradient-to-br ${feature.color} rounded-full blur-sm`}></div>
                                    </div> */}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
