import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';

import '../global.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        // <body className='antialiased lg:mx-auto' suppressHydrationWarning>
        <>
            <Banner />
            <Header />
            {children}
            <Footer />
        </>
        // </body>
    );
}
