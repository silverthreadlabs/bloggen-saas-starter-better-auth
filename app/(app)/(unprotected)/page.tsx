import { Metadata } from 'next';

import CompaniesLogoCloud from '@/components/home/companies-logo-cloud';
import Cta from '@/components/home/cta/cta';
import Faq from '@/components/home/faq/faq';
import Features from '@/components/home/features/features';
import Hero from '@/components/home/hero/hero';
import Performance from '@/components/home/perfomance/performance';
import HomePricing from '@/components/home/pricing/pricing';
import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';
import FAQSchema from '@/lib/seo/schema/faq';
import HomeSchema from '@/lib/seo/schema/home';

export const metadata: Metadata = createPageMetadata({
    path: ''
});

export default function Page() {
    return (
        <main className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
            <HomeSchema />
            <FAQSchema />
            <Hero />
            <CompaniesLogoCloud />
            <Performance />
            <Features />
            <HomePricing />
            <Faq />
            <Cta />
        </main>
    );
}
