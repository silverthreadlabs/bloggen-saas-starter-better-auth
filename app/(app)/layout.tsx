import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';

import '../global.css';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/auth';
import { Session } from '@/lib/auth/auth-types';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    return (
        <>
            <Banner />
            <Header session={session as unknown as Session} />
            {children}
            <Footer />
        </>
    );
}
