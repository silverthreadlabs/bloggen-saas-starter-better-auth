import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/auth';
import DashboardLayout from '@/components/settings/layout';
import Sidebar from '@/components/settings/components/sidebar';
import SidebarItem from '@/components/settings/components/sidebar-items';
import SecuritySection from '@/components/settings/views/security-section';
import { User, Users, Shield, CreditCard, Settings } from 'lucide-react';

export default async function SecurityPage() {
    const [session, activeSessions] = await Promise.all([
        auth.api.getSession({
            headers: await headers()
        }),
        auth.api.listSessions({
            headers: await headers()
        })
    ]).catch((e) => {
        console.log(e);
        throw redirect('/sign-in');
    });

    const sidebar = (
        <Sidebar>
            <SidebarItem label="Profile" href="/settings" icon={<User />} />
            <SidebarItem label="Organization" href="/settings/organization" icon={<Users />} />
            <SidebarItem label="Security" href="/settings/security" icon={<Shield />} />
            {/* <SidebarItem label="Billing" href="/settings/billing" icon={<CreditCard />} />
            <SidebarItem label="Settings" href="/settings/settingss" icon={<Settings />} /> */}
        </Sidebar>
    );

    return (
        <DashboardLayout sidebar={sidebar}>
            <SecuritySection
                session={JSON.parse(JSON.stringify(session))}
                activeSessions={JSON.parse(JSON.stringify(activeSessions))}
            />
        </DashboardLayout>
    );
} 