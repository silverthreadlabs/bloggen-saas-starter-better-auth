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
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="py-8 sm:py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-canvas-text-contrast sm:text-4xl">
                            Dashboard
                        </h1>
                        <p className="mt-2 text-lg text-canvas-text">
                            Manage your account, organization, and subscription settings.
                        </p>
                    </div>
                    
                    {/* Dashboard Grid */}
                    <div className="grid gap-6 lg:grid-cols-2">
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
            </div>
        </div>
    );
}
