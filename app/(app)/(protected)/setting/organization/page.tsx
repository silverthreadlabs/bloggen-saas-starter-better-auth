import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/auth';
import DashboardLayout from '@/components/setting/setting-layout';
import Sidebar from '@/components/ui/sidebar';
import SidebarItem from '@/components/ui/sidebar-items';
import OrganizationSection from '@/components/setting/organization-section';
import { User, Users, Shield, CreditCard, Settings } from 'lucide-react';

export default async function OrganizationPage() {
    const [session, organization] = await Promise.all([
        auth.api.getSession({
            headers: await headers()
        }),
        auth.api.getFullOrganization({
            headers: await headers()
        })
    ]).catch((e) => {
        console.log(e);
        throw redirect('/sign-in');
    });

    const sidebar = (
        <Sidebar>
            <SidebarItem label="Profile" href="/setting" icon={<User />} />
            <SidebarItem label="Organization" href="/setting/organization" icon={<Users />} />
            <SidebarItem label="Security" href="/setting/security" icon={<Shield />} />
            {/* <SidebarItem label="Billing" href="/setting/billing" icon={<CreditCard />} />
            <SidebarItem label="Settings" href="/setting/settings" icon={<Settings />} /> */}
        </Sidebar>
    );

    return (
        <DashboardLayout sidebar={sidebar}>
            <OrganizationSection
                session={JSON.parse(JSON.stringify(session))}
                activeOrganization={JSON.parse(JSON.stringify(organization))}
            />
        </DashboardLayout>
    );
} 