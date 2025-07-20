'use client';

import React from 'react';

import Link from 'next/link';

import { Pricing } from '@/components/blocks/pricing';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck, FaGithub, FaRocket } from 'react-icons/fa';
import { HiLightningBolt, HiSparkles } from 'react-icons/hi';

const demoPlans = [
    {
        name: 'STARTER',
        price: '50',
        yearlyPrice: '40',
        period: 'per month',
        features: ['Up to 10 projects', 'Basic analytics', '48-hour support response time', 'Limited API access'],
        description: 'Perfect for individuals and small projects',
        buttonText: 'Start Free Trial',
        href: '/sign-up',
        isPopular: false
    },
    {
        name: 'PROFESSIONAL',
        price: '99',
        yearlyPrice: '79',
        period: 'per month',
        features: [
            'Unlimited projects',
            'Advanced analytics',
            '24-hour support response time',
            'Full API access',
            'Priority support'
        ],
        description: 'Ideal for growing teams and businesses',
        buttonText: 'Get Started',
        href: '/sign-up',
        isPopular: true
    },
    {
        name: 'ENTERPRISE',
        price: '299',
        yearlyPrice: '239',
        period: 'per month',
        features: [
            'Everything in Professional',
            'Custom solutions',
            'Dedicated account manager',
            '1-hour support response time',
            'SSO Authentication',
            'Advanced security'
        ],
        description: 'For large organizations with specific needs',
        buttonText: 'Contact Sales',
        href: '/support',
        isPopular: false
    }
];

//     {
//         name: 'Open Source',
//         price: 'Free',
//         description: 'Perfect for developers and startups',
//         features: [
//             'Next.js 15 Template',
//             'SEO Pre-configured',
//             'MDX Content Support',
//             'Dynamic OG Images',
//             'GitHub Repository Access',
//             'Community Support'
//         ],
//         cta: 'Get Started',
//         ctaLink: 'https://github.com/silverthreadlabs/bloggen-seo-starter',
//         icon: <FaGithub className="w-5 h-5" />,
//         popular: false
//     },
//     {
//         name: 'Pro Template',
//         price: '$49',
//         originalPrice: '$99',
//         description: 'Enhanced version with premium features',
//         features: [
//             'Everything in Open Source',
//             'Advanced Component Library',
//             'Premium Themes',
//             'Priority Email Support',
//             'Lifetime Updates',
//             'Commercial License',
//             'Additional Templates',
//             'Custom Integrations'
//         ],
//         cta: 'Get Pro Version',
//         ctaLink: 'https://www.bloggen.dev/',
//         icon: <FaRocket className="w-5 h-5" />,
//         popular: true
//     },
//     {
//         name: 'Enterprise',
//         price: 'Custom',
//         description: 'For teams and large organizations',
//         features: [
//             'Everything in Pro',
//             'Custom Development',
//             'Dedicated Support',
//             'Team Training',
//             'Custom Integrations',
//             'SLA Guarantee',
//             'White-label Rights',
//             'Priority Feature Requests'
//         ],
//         cta: 'Contact Sales',
//         ctaLink: '/support',
//         icon: <HiLightningBolt className="w-5 h-5" />,
//         popular: false
//     }
// ];

export default function HomePricing() {
    return (
        <section className='w-full px-4 pt-20 sm:px-6 lg:px-8 xl:pt-20'>
            <div className='mx-auto max-w-7xl'>
                {/* Header */}
                <motion.div
                    className='text-center'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}>
                    <div className='bg-primary-bg/10 border-primary-border/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium'>
                        {/* <HiSparkles className='text-primary-solid h-4 w-4' /> */}
                        ✨ 
                        <span className='text-primary-text-contrast'>Simple Pricing</span>
                    </div>

                    <h2 className='text-canvas-text-contrast mb-6 text-4xl font-bold text-balance sm:text-5xl lg:text-6xl'>
                        Choose Your
                        <br />
                        <span className='from-primary-solid via-primary-text to-primary-text-contrast bg-gradient-to-r bg-clip-text text-transparent'>
                            Development Path
                        </span>
                    </h2>
                </motion.div>

                {/* Pricing Cards */}

                <Pricing plans={demoPlans} />
            </div>
        </section>
    );
}
