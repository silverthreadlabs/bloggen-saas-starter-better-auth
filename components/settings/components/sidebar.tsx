'use client';

import React, { useState } from 'react';

import { Button } from '../../ui/button';
import { Menu, X } from 'lucide-react';
import { FiArrowRight } from 'react-icons/fi';

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <div className='fixed top-28 left-4 z-40 md:hidden'>
                {!isOpen && (
                    <Button color='neutral' variant='surface' size='sm' className='!rounded-full' onClick={() => setIsOpen(!isOpen)}>
                        <FiArrowRight size={20} />
                    </Button>
                )}
            </div>

            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className='bg-canvas-bg-subtle/80 fixed inset-0 z-40 backdrop-blur-sm md:hidden'
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <nav
                className={`bg-canvas-subtle border-canvas-border fixed inset-y-0 left-0 z-40 w-64 transform border-r transition-transform duration-300 ease-in-out md:sticky mt-[100px] md:mt-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 '} flex flex-col`}>
                {/* Sidebar header */}
                <div className='border-canvas-border border-b p-6'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-canvas-text-contrast text-lg font-semibold'>Settings</h2>
                        <Button variant='ghost' size='sm' onClick={() => setIsOpen(false)} className='md:hidden'>
                            <X size={16} />
                        </Button>
                    </div>
                </div>

                {/* Sidebar content */}
                <div className='flex-1 space-y-2 overflow-y-auto p-6'>{children}</div>
            </nav>
        </>
    );
};

export default Sidebar;
