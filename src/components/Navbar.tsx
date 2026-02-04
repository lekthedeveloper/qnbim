'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface NavLink {
    name: string;
    href: string;
}

interface NavbarProps {
    padding?: string;
    showAccountManager?: boolean;
    businessName?: string;
    customLinks?: NavLink[];
}

const defaultLinks = [
    { name: 'Catalog', href: '/catalog' },
    { name: 'Wholesale Application', href: '/wholesale-application' },
    { name: 'Warehouses', href: '/warehouse-locations' },
    { name: 'LTL Rates', href: '/ltl-rates' },
    { name: 'Support', href: '/support' },
];

const Navbar: React.FC<NavbarProps> = ({
    padding = 'px-6 md:px-10',
    showAccountManager = false,
    businessName,
    customLinks
}) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { searchQuery, setSearchQuery } = useCart();
    const router = useRouter();

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (pathname !== '/catalog') {
                router.push('/catalog');
            }
        }
    };

    const links = customLinks || defaultLinks;

    return (
        <header className={`flex flex-col border-b border-white/10 bg-primary sticky top-0 md:top-[31px] z-50 shadow-sm`}>
            {/* Main Bar */}
            <div className={`flex items-center justify-between px-5 md:px-10 py-2.5 w-full`}>
                <div className="flex items-center gap-2 md:gap-8">
                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-white active:scale-95 transition-transform"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>

                    <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity" style={{ color: '#FFFFFF' }}>
                        <span className="material-symbols-outlined text-3xl md:text-4xl text-cobalt">forklift</span>
                        <h2 className="text-[20px] md:text-[26px] font-black leading-none tracking-tighter text-white !font-sans flex items-baseline gap-1" style={{ color: '#FFFFFF', fontWeight: 900 }}>
                            <span className="uppercase">QNBIM</span>
                            <span className="uppercase font-medium opacity-70 text-[0.6em] tracking-[0.2em] whitespace-nowrap">wholesale store</span>
                        </h2>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-5">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-[11px] font-black uppercase tracking-widest transition-all pb-1 group ${isActive
                                        ? 'text-white'
                                        : 'text-white/70 hover:text-white'
                                        }`}
                                    style={{ color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)' }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-cobalt"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Desktop Search */}
                {!showAccountManager && (
                    <div className="hidden lg:flex flex-1 max-w-md mx-8 group">
                        <div className="flex w-full rounded-sm border border-white/20 bg-white/10 overflow-hidden focus-within:border-cobalt shadow-inner">
                            <div className="flex items-center px-4 text-white/50">
                                <span className="material-symbols-outlined text-lg">search</span>
                            </div>
                            <input
                                className="w-full bg-transparent border-none text-[11px] font-bold uppercase tracking-widest focus:ring-0 py-2.5 outline-none placeholder-white/40 text-white"
                                placeholder="SKU / PRODUCT / CATEGORY"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center gap-2">
                        {/* Support Center Button */}
                        <Link
                            href="/support"
                            className="flex items-center gap-2 text-[10px] font-black px-4 md:px-6 py-2.5 md:py-3 bg-cobalt text-white uppercase tracking-widest transition-all rounded-sm shadow-md hover:bg-royal active:scale-95"
                        >
                            <span className="material-symbols-outlined text-base">support_agent</span>
                            Support Center
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar (Sticky below main nav) */}
            <div className="lg:hidden px-4 pb-3">
                <div className="flex w-full rounded-sm border border-white/20 bg-white/10 overflow-hidden focus-within:border-cobalt shadow-sm">
                    <div className="flex items-center px-3 text-white/50">
                        <span className="material-symbols-outlined text-base">search</span>
                    </div>
                    <input
                        className="w-full bg-transparent border-none text-[11px] font-bold uppercase tracking-widest focus:ring-0 py-2.5 outline-none placeholder:text-white/40 text-center pr-10 text-white"
                        placeholder="QUICK SKU LOOKUP..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                </div>
            </div>

            {/* Mobile Navigation Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-slate-900 z-50 md:hidden flex flex-col border-r border-slate-800 shadow-2xl"
                        >
                            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-2xl text-cobalt">forklift</span>
                                    <span className="text-white font-black uppercase italic tracking-tighter">qnbim HUB</span>
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 hover:text-white">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center justify-between py-4 border-b border-slate-800/50 text-xs font-black uppercase tracking-widest ${pathname === link.href ? 'text-cobalt' : 'text-slate-400'
                                            }`}
                                    >
                                        {link.name}
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </Link>
                                ))}

                                {/* Mobile Support Link */}
                                <div className="pt-8 space-y-3">
                                    <Link
                                        href="/support"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full block py-4 bg-cobalt text-center text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm shadow-lg shadow-royal/20"
                                    >
                                        Support center access
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-800 bg-slate-950/50">
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] text-center italic">
                                    Verified Industrial Gateway v2.4
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
