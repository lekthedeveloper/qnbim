'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface TopBarProps {
    padding?: string;
    leftContent?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ padding = 'px-10', leftContent }) => {
    const { isAuthenticated, taxExemptStatus } = useCart();

    return (
        <div className={`bg-primary text-white text-[11px] py-1.5 px-5 md:px-10 flex justify-between items-center font-bold tracking-wider uppercase border-b border-slate-800 sticky top-0 md:relative z-[60]`}>
            <div className="flex gap-4 md:gap-6">
                {leftContent || (
                    <>
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-teal-accent">local_shipping</span>
                            <span className="hidden sm:inline">Pallet Shipping & LTL Delivery Nationwide</span>
                            <span className="sm:hidden">LTL ACTIVE</span>
                        </span>
                        <span className="hidden md:flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-teal-accent">inventory</span>
                            50,000+ Units In Stock
                        </span>
                    </>
                )}
            </div>
            <div className="flex gap-4 md:gap-6 items-center">
                <Link className="hover:text-teal-accent transition-colors underline decoration-teal-accent whitespace-nowrap" href="/discounts">
                    <span className="hidden sm:inline">Volume Discounts Guide</span>
                    <span className="sm:hidden">DISCOUNTS</span>
                </Link>
            </div>
        </div>
    );
};

export default TopBar;
