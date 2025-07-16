'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck, FaCopy, FaGithub, FaStar } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { HiShieldCheck } from 'react-icons/hi2';
import Image from 'next/image';
import { ImageError } from 'next/dist/server/image-optimizer';

export default function Hero() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText('npx create-bloggen-app');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const trustIndicators = [
        { icon: <HiLightningBolt className="w-4 h-4" />, text: "Launch in minutes" },
        { icon: <HiShieldCheck className="w-4 h-4" />, text: "Production ready" },
        { icon: <HiSparkles className="w-4 h-4" />, text: "SEO optimized" }
    ];

    return (
        <div className='relative px-4 sm:px-6 md:px-8 lg:px-0 py-10 overflow-hidden min-h-[90vh] flex items-center'>
    
            <div className='relative z-10 mx-auto max-w-7xl w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className='text-center lg:text-left order-1'>
                        
                        {/* Announcement Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='mb-8'>
                            <div className='inline-flex items-center gap-2 bg-gradient-to-r from-primary-bg/20 to-primary-bg/10 border border-primary-border/30 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm shadow-lg'>
                                <HiSparkles className='w-4 h-4 text-primary-solid' />
                                <span className='text-primary-text-contrast font-semibold'>Powered by Next.js 15 & Better Auth</span>
                            </div>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className='mb-8'>
                            <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-canvas-text-contrast mb-6 leading-[1.1]'>
                                Ship Your
                                <br />
                                <span className='bg-gradient-to-r from-primary-solid via-primary-text to-primary-text-contrast bg-clip-text text-transparent relative'>
                                    SaaS 10x
                                </span>
                                <br />
                                <span className='text-canvas-text-contrast'>Faster</span>
                            </h1>
                            <p className='text-xl sm:text-2xl lg:text-2xl text-canvas-text max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                                Production-ready Next.js template with built-in SEO, MDX content, and AI integration. 
                                From idea to launch in <span className='font-bold text-primary-text-contrast'>just 5 minutes</span>.
                            </p>
                        </motion.div>

                        {/* Trust Indicators */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className='flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-10'>
                            {trustIndicators.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className='flex items-center gap-2 bg-canvas-base/50 backdrop-blur-sm border border-canvas-border/30 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300'>
                                    <div className='text-primary-solid'>{item.icon}</div>
                                    <span className='text-sm font-medium text-canvas-text-contrast'>{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div> */}

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10'>
                            <Link
                                href='https://www.bloggen.dev/'
                                target='_blank'
                                rel='noopener noreferrer'>
                                <Button
                                    color='primary'
                                    variant='solid'
                                    size='lg'
                                    trailingIcon={
                                        <FaArrowRight className='h-4 w-4' />
                                    }>
                                    Start Building Free
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
                                    className='px-8 py-4 text-lg font-semibold rounded-sm backdrop-blur-sm border-2 hover:bg-primary-bg/10 transition-all duration-300'
                                    leadingIcon={<FaGithub className='h-5 w-5' />}>
                                    View Source
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Command Line */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className='max-w-md mx-auto lg:mx-0'>
                            <div className='bg-gradient-to-r from-canvas-base/80 to-canvas-base/60 border border-canvas-border/50 rounded-sm p-6 transition-all duration-300'>
                                <div className='flex items-center justify-between'>
                                    <code className='text-canvas-text-contrast font-mono text-sm sm:text-base font-medium'>
                                        $ npx create-bloggen-app
                                    </code>
                                    <Button
                                        onClick={handleCopy}
                                        size='sm'
                                        color='neutral'
                                        variant='ghost'
                                        iconOnly
                                        aria-label='Copy command'
                                        className='hover:bg-primary-bg/20 transition-all duration-200'
                                        leadingIcon={
                                            copied ? (
                                                <FaCheck className='text-success-text h-4 w-4' />
                                            ) : (
                                                <FaCopy className='text-canvas-default h-4 w-4' />
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Enhanced Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className='relative order-1 lg:order-2 flex justify-center lg:justify-end'>
                        
                        {/* Phone Container with Enhanced Styling */}
                        <div className='relative' style={{ perspective: '1000px' }}>
                            
                            {/* Phone Frame with enhanced shadows */}
                            <div className='relative rounded-[3rem] p-2 border border-canvas-border' style={{ transform: 'rotateY(-20deg) rotateX(0deg)', transformStyle: 'preserve-3d' }}>
                                {/* Phone Screen */}
                                <div className='bg-white rounded-[2.5rem] p-4 sm:min-h-[600px] sm:w-[300px] min-h-[400px] w-[200px] relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]'>
                                    {/* Screen content - Google PageSpeed Insights */}
                                    <div className='h-full flex flex-col'>
                                        <Image src={'/assets/SEO.png'} alt='Google PageSpeed Insights' width={600} height={600} className='w-full h-full object-contain' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
