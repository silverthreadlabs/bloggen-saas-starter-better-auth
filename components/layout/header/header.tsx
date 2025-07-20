'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { LogoDark, LogoLight } from '@/components/logo/logo';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth/auth-client';
import { Session } from '@/lib/auth/auth-types';

import { LogOut, Settings } from 'lucide-react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const NAV_ITEMS = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' }
];

export default function Header({ session }: { session: Session }) {
    console.log('Crafted by Silverthread Labs:', 'https://www.silverthreadlabs.com');
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobile = () => setMobileOpen((open) => !open);

    return (
        <header
            className='bg-canvas-bg-subtle border-canvas-bg-hover sticky top-0 z-50 w-full border-b shadow-sm'
            role='banner'>
            <div className='mx-auto max-w-7xl px-4 xl:px-0'>
                <div className='flex h-16 items-center justify-between'>
                    <Link href='/' className='flex flex-row items-center gap-2'>
                        <div className='dark:hidden'>
                            <LogoLight />
                        </div>
                        <div className='hidden dark:block'>
                            <LogoDark />
                        </div>
                        <div className='text-canvas-text mt-0.5 flex text-sm font-bold'>SaaS Starter</div>
                    </Link>

                    {/* Desktop nav - hidden on small screens, visible on md and up */}
                    <nav aria-label='Primary navigation' className='hidden items-center space-x-4 md:flex'>
                        <ul className='flex space-x-3'>
                            {NAV_ITEMS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className='text-canvas-text hover:text-canvas-text-contrast rounded-sm px-3 py-2 text-base font-medium transition-colors'>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className='hidden items-center gap-2 md:flex'>
                        {/* <Link href='/support' className='flex'>
                            <Button
                                color='primary'
                                size='default'
                                variant='solid'
                                aria-label='Contact Us'
                                name='Contact Us'>
                                Contact
                            </Button>
                        </Link> */}

                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        color='primary'
                                        size='default'
                                        variant='outline'
                                        aria-label='User menu'
                                        name='User menu'
                                        iconOnly
                                        leadingIcon={<FaUser />}
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end' className='w-48'>
                                    <DropdownMenuItem className='cursor-pointer hover:bg-canvas-base transition-all duration-300' asChild>
                                        <Link href='/settings' className='flex items-center'>
                                            <Settings className='mr-2 h-4 w-4' />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            await signOut({
                                                fetchOptions: {
                                                    onSuccess: () => {
                                                        window.location.href = '/';
                                                    }
                                                }
                                            });
                                        }}
                                        className='text-alert-text flex cursor-pointer items-center hover:bg-canvas-base transition-all duration-300'>
                                        <LogOut className='mr-2 h-4 w-4' />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href='/sign-in' className='flex'>
                                <Button
                                    color='primary'
                                    size='default'
                                    variant='solid'
                                    aria-label='Sign In'
                                    name='Sign In'>
                                    Get Started
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button - visible on small screens, hidden on md and up */}
                    <Button
                        onClick={toggleMobile}
                        aria-label='Toggle menu'
                        name='Toggle menu'
                        aria-controls='mobile-menu'
                        aria-expanded={mobileOpen}
                        className='block md:hidden' // Changed from md:hidden to block md:hidden for clarity
                        color='neutral'
                        variant='ghost'
                        iconOnly
                        leadingIcon={
                            mobileOpen ? (
                                <FaTimes className='text-canvas-text h-5 w-5' />
                            ) : (
                                <FaBars className='text-canvas-text h-5 w-5' />
                            )
                        }
                    />
                </div>
            </div>

            {/* Mobile overlay menu - only rendered when mobileOpen is true */}
            {mobileOpen && (
                <nav
                    id='mobile-menu'
                    aria-label='Mobile navigation'
                    aria-labelledby='mobile-menu-label'
                    aria-describedby='mobile-menu-description'
                    role='dialog'
                    aria-modal='true'
                    className='bg-canvas-base/95 sticky inset-0 top-[100px] z-50 h-screen backdrop-blur-sm md:hidden'>
                    <ul className='border-canvas-border space-y-3 border-t p-4'>
                        {NAV_ITEMS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={toggleMobile}
                                    className='text-canvas-text hover:bg-canvas-bg hover:text-primary-text block rounded-sm px-4 py-2 text-base font-medium transition-colors'>
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <div className='flex flex-col gap-3'>
                                {/* <Link href='/support' onClick={toggleMobile} className='flex-1'>
                                    <Button color='primary' size='default' variant='solid' fullWidth name='Contact Us'>
                                        Contact
                                    </Button>
                                </Link> */}
                                {session && (
                                    <Link href='/settings' className='flex'>
                                        <Button
                                            color='primary'
                                            size='default'
                                            variant='solid'
                                            aria-label='Settings'
                                            name='Settings'
                                            fullWidth>
                                            Settings
                                        </Button>
                                    </Link>
                                )}
                                <div className='flex flex-col gap-2'>
                                    {session ? (
                                        <Button
                                            color='primary'
                                            size='default'
                                            variant='outline'
                                            aria-label='Sign Out'
                                            name='Sign Out'
                                            fullWidth
                                            onClick={async () => {
                                                await signOut({
                                                    fetchOptions: {
                                                        onSuccess: () => {
                                                            window.location.href = '/';
                                                        }
                                                    }
                                                });
                                            }}>
                                            Sign Out
                                        </Button>
                                    ) : (
                                        <Button
                                            color='primary'
                                            size='default'
                                            variant='solid'
                                            aria-label='Sign In'
                                            name='Sign In'
                                            fullWidth
                                            onClick={() => {
                                                window.location.href = '/sign-in';
                                            }}>
                                            Get Started
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
