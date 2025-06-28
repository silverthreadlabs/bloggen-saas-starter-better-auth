import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import AccountSwitcher from '@/components/account-switch';
import { auth } from '@/lib/auth/auth';

import { OrganizationCard } from './organization-card';
import UserCard from './user-card';

export default async function DashboardPage() {
    const [session, activeSessions, deviceSessions, organization, subscriptions] = await Promise.all([
        auth.api.getSession({
            headers: await headers()
        }),
        auth.api.listSessions({
            headers: await headers()
        }),
        auth.api.listDeviceSessions({
            headers: await headers()
        }),
        auth.api.getFullOrganization({
            headers: await headers()
        }),
        auth.api.listActiveSubscriptions({
            headers: await headers()
        })
    ]).catch((e) => {
        console.log(e);
        throw redirect('/sign-in');
    });

    return (
        <div className='mx-auto min-h-screen w-full max-w-7xl space-y-8 py-10 px-4 sm:px-0 sm:py-16'>
            <div className='flex flex-col gap-4'>
                <AccountSwitcher sessions={JSON.parse(JSON.stringify(deviceSessions))} />
                <UserCard
                    session={JSON.parse(JSON.stringify(session))}
                    activeSessions={JSON.parse(JSON.stringify(activeSessions))}
                    subscription={subscriptions.find((sub) => sub.status === 'active' || sub.status === 'trialing')}
                />
                <OrganizationCard
                    session={JSON.parse(JSON.stringify(session))}
                    activeOrganization={JSON.parse(JSON.stringify(organization))}
                />
            </div>
        </div>
    );
}
