'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { HiSparkles, HiAcademicCap } from 'react-icons/hi';

const testimonials = [
    {
        title: 'Solid foundation for any project',
        quote: "I've used BlogGen for 3 client projects now and it streamlines. I love the build it comes with the best things that I need to efficiently create quality projects.",
        author: 'Savita Green',
        role: 'Full-stack Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        company: 'TechFlow'
    },
    {
        title: 'Efficient Collaborating',
        quote: 'BlogGen Pro has definitely saved me time when it comes to cross-disciplinary collaboration and understanding.',
        author: 'Joseph McFall',
        role: 'Senior UX Designer at Microsoft',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        company: 'Microsoft'
    },
    {
        title: 'Solid foundation for any project',
        quote: "I honestly look forward to using BlogGen Pro. I'm excited to see how the team continuously delivers innovative content that can help with your next.",
        author: 'Michael Singh',
        role: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        company: 'TechCorp'
    },
    {
        title: 'A must-have for designers',
        quote: "This is such a simple and beautiful set of patterns to use. I've used it for my latest projects and it makes designing so much faster and easier.",
        author: 'Lara Byrd',
        role: 'Senior Designer at Tesla',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        company: 'Tesla'
    },
    {
        title: 'Mindblowing workflow and variants',
        quote: 'BlogGen provides a robust set of design tokens, typography scales, and breakpoints that play well with engineering handoff and production workflows.',
        author: 'Michael Gough',
        role: 'Lead Designer at Microsoft',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        company: 'Microsoft'
    },
    {
        title: 'Mindblowing workflow and variants',
        quote: 'BlogGen Pro has been a wonderful resource for our team at Microsoft. The templates and components are right where to jumpstart enhanced.',
        author: 'Michael Gough',
        role: 'Lead Designer at Microsoft',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        company: 'Microsoft'
    }
];

export default function Performance() {
    return (
        <section className='overflow-hidden px-4 py-24 sm:px-6 md:px-8 lg:px-0 xl:py-32'>
            <div className='z-10 mx-auto max-w-7xl'>
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='mb-16 text-center'>
                    <div className='from-primary-bg/20 to-primary-bg/10 border-primary-border/30 mb-8 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm'>
                        {/* <HiAcademicCap className='text-primary-solid h-4 w-4' /> */}
                        ✨ 
                        <span className='text-primary-text-contrast font-semibold'>Join the best teams</span>
                    </div>

                    <h2 className='text-canvas-text-contrast mb-6 text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl'>
                        Join the
                        <span className='from-primary-solid via-primary-text to-primary-text-contrast relative bg-gradient-to-r bg-clip-text text-transparent'>
                            {' '}
                            Best Teams{' '}
                        </span>
                        <br />
                        Building Amazing Products
                    </h2>

                    <p className='text-canvas-text mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-balance'>
                        Developers from top companies choose our template for rapid, reliable product launches. Join the
                        community of builders shipping faster.
                    </p>
                </motion.div>

                {/* <CompanyLogo /> */}

                {/* Testimonials Grid */}
                <div className='mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className='rounded-sm border border-canvas-border bg-canvas-bg p-6 transition-all duration-300 hover:border-canvas-border-hover'>
                            <div className='mb-4'>
                                <h3 className='mb-3 text-lg font-semibold text-canvas-text-contrast'>{testimonial.title}</h3>
                                <p className='text-sm leading-relaxed text-canvas-text'>"{testimonial.quote}"</p>
                            </div>

                            {testimonial.author && (
                                <div className='flex items-center gap-3'>
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                                        <AvatarFallback className='text-xs'>
                                            {testimonial.author
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className='text-sm font-medium text-canvas-text-contrast'>{testimonial.author}</div>
                                        <div className='text-xs text-canvas-text'>{testimonial.role}</div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
