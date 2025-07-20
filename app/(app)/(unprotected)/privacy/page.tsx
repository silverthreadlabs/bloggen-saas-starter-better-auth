import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';

export const metadata: Metadata = createPageMetadata({
    path: 'privacy',
    description:
        'Read our Privacy Policy to understand how we handle your data and personal information.'
});

// Reusable section component
const PrivacySection = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
    <div className='mb-8'>
        <h2 className=' text-canvas-text-contrast mb-4 text-3xl leading-snug font-semibold tracking-normal md:text-4xl'>
            {number}. {title}
        </h2>
        <p className=' text-canvas-text text-base leading-relaxed font-normal tracking-normal md:text-lg'>
            {children}
        </p>
    </div>
);

// Privacy Policy component
export default function PrivacyPolicy() {
    const sections = [
        {
            title: 'Introduction',
            content:
                'This Privacy Policy explains how Silverthread Labs collects, uses, discloses, and safeguards your information when you visit our website or use our services.'
        },
        {
            title: 'Information We Collect',
            content:
                'We may collect personal information such as your name, email address, and usage data. This includes information you provide directly and data collected automatically through your use of the site.'
        },
        {
            title: 'How We Use Your Information',
            content:
                'We use your information to provide and improve our services, respond to inquiries, send updates, and ensure the security of our platform.'
        },
        {
            title: 'Sharing Your Information',
            content:
                'We do not sell your personal information. We may share it with trusted third parties who help us operate our website and deliver services, subject to strict confidentiality obligations.'
        },
        {
            title: 'Cookies and Tracking Technologies',
            content:
                'We use cookies and similar technologies to enhance user experience, analyze site traffic, and personalize content. You can control cookie settings through your browser.'
        },
        {
            title: 'Data Security',
            content:
                'We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, or destruction.'
        },
        {
            title: 'Your Rights and Choices',
            content:
                'You have the right to access, update, or delete your personal information. You may also opt out of receiving marketing communications at any time.'
        },
        {
            title: 'Third-Party Services',
            content:
                'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third parties.'
        },
        {
            title: 'Children’s Privacy',
            content:
                'Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children.'
        },
        {
            title: 'Changes to This Policy',
            content:
                'We may update this Privacy Policy from time to time. The latest version will always be posted on this page with the effective date.'
        },
        {
            title: 'Contact Us',
            content:
                'If you have questions about this Privacy Policy, you can contact us at privacy@silverthreadlabs.com.'
        }
    ];

    return (
        <div className='mx-auto mt-16 min-h-screen max-w-7xl px-4 xl:px-0'>
            <div className='mx-auto max-w-7xl py-12'>
                <h1 className='text-canvas-text-contrast mb-8 text-4xl leading-tight font-bold tracking-tight md:text-6xl'>
                    Privacy Policy
                </h1>

                <p className='text-canvas-text mb-8 text-base leading-relaxed font-normal tracking-normal md:text-lg'>
                    Last updated: May 20, 2025
                </p>

                <div className='space-y-8'>
                    {sections.map((section, index) => (
                        <PrivacySection key={index} number={index + 1} title={section.title}>
                            {section.content}
                        </PrivacySection>
                    ))}
                </div>
            </div>
        </div>
    );
}
