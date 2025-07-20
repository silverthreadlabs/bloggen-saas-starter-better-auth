'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGithub, FaRocket } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

export default function Cta() {
    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 py-20 xl:py-32'>
            <div className='mx-auto max-w-7xl'>
                <div className='relative overflow-hidden rounded-sm bg-gradient-to-br from-primary-bg/10 via-primary-bg/5 to-transparent border border-primary-border/20 p-8 sm:p-12 lg:p-16'>
                    {/* Background Effects */}
                    <div className='absolute -top-40 -right-40 w-80 h-80 bg-primary-bg/20 rounded-full blur-3xl'></div>
                    <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-primary-bg/10 rounded-full blur-3xl'></div>

                    {/* Content */}
                    <div className='relative z-10 text-center max-w-4xl mx-auto'>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className='mb-8'>
                            <div className='inline-flex items-center gap-2 bg-primary-bg/20 border border-primary-border/30 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm'>
                                {/* <FaRocket className='w-4 h-4 text-primary-solid' /> */}
                                🚀
                                <span className='text-primary-text-contrast'>Ready to Launch?</span>
                            </div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='mb-8'>
                            <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-canvas-text-contrast mb-6 text-balance'>
                                Start Building Your
                                <br />
                                <span className='bg-gradient-to-r from-primary-solid via-primary-text to-primary-text-contrast bg-clip-text text-transparent'>
                                    Next Big Thing
                                </span>
                            </h2>
                            <p className='text-xl sm:text-2xl text-canvas-text max-w-3xl mx-auto text-balance'>
                                Join 1000+ developers who chose the fastest path from idea to production. 
                                Your next breakthrough is just one command away.
                            </p>
                        </motion.div>

                        {/* Benefits */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='flex flex-wrap justify-center items-center gap-6 mb-10'>
                            <div className='flex items-center gap-2 text-canvas-text'>
                                {/* <HiLightningBolt className='w-5 h-5 text-primary-solid' /> */}
                                ⚡
                                <span className='font-medium'>5-minute setup</span>
                            </div>
                            <div className='flex items-center gap-2 text-canvas-text'>
                                {/* <HiSparkles className='w-5 h-5 text-primary-solid' /> */}
                                ✨
                                <span className='font-medium'>Production ready</span>
                            </div>
                            <div className='flex items-center gap-2 text-canvas-text'>
                                {/* <FaRocket className='w-5 h-5 text-primary-solid' /> */}
                                🚀
                                <span className='font-medium'>Deploy anywhere</span>
                            </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
                            <Link href='https://www.bloggen.dev/' target='_blank' rel='noopener noreferrer'>
                                <Button
                                    color='primary'
                                    variant='solid'
                                    size='lg'
                                    className='group relative overflow-hidden px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-bg/25'
                                    trailingIcon={
                                        <FaArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                                    }>
                                    <span className='relative z-10'>Start Building Free</span>
                                    <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full'></div>
                                </Button>
                            </Link>

                            <Link
                                href='https://github.com/silverthreadlabs/bloggen-seo-starter'
                                target='_blank'
                                rel='noopener noreferrer'>
                                <Button
                                    color='primary'
                                    variant='outline'
                                    size='lg'
                                    className='px-8 py-4 text-lg font-semibold backdrop-blur-sm'
                                    leadingIcon={<FaGithub className='h-5 w-5' />}>
                                    View on GitHub
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Command */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className='max-w-md mx-auto'>
                            <div className='bg-canvas-base/80 border border-canvas-border/50 rounded-sm p-4 backdrop-blur-sm'>
                                <code className='text-canvas-text-contrast font-mono text-sm sm:text-base block'>
                                    $ npx create-bloggen-app
                                </code>
                            </div>
                        </motion.div>

                        {/* Trust indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className='mt-8 text-sm text-canvas-text'>
                            No credit card required • Free forever • Open source
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
