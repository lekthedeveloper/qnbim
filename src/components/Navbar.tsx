'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
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

const Navbar: React.FC<NavbarProps> = ({
    padding = 'px-6 md:px-10',
    showAccountManager = false,
    businessName,
    customLinks
}) => {
    const pathname = usePathname();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { subtotal, searchQuery, setSearchQuery, isAuthenticated, logout, user } = useCart();
    const router = useRouter();

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (pathname !== '/catalog') {
                router.push('/catalog');
            }
        }
    };

    const defaultLinks = [
        { name: 'Catalog', href: '/catalog' },
        {
            name: 'Dashboard',
            href: isAuthenticated ? '/dashboard' : `/login?redirect=dashboard&from=/dashboard`
        },
        {
            name: 'My Quotes',
            href: isAuthenticated ? '/my-quotes' : `/login?redirect=quotes&from=/my-quotes`
        },
        { name: 'LTL Rates', href: '/ltl-rates' },
    ];

    const links = customLinks || defaultLinks;

    return (
        <header className={`flex flex-col border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 md:top-[31px] z-50 shadow-sm`}>
            {/* Main Bar */}
            <div className={`flex items-center justify-between px-5 md:px-10 py-2.5 w-full`}>
                <div className="flex items-center gap-2 md:gap-8">
                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-slate-600 active:scale-95 transition-transform"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>

                    <Link href="/" className="flex items-center gap-2 text-primary dark:text-white hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-3xl md:text-4xl text-teal-accent">forklift</span>
                        <h2 className="text-[16px] md:text-xl font-black leading-tight tracking-tighter uppercase italic">
                            Heidi<span className="hidden xs:inline sm:inline"> Store</span> <span className="text-teal-accent">Wholesale</span>
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
                                        ? 'text-teal-accent'
                                        : 'text-slate-500 hover:text-teal-accent'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-accent"
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
                        <div className="flex w-full rounded-sm border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-teal-accent shadow-inner">
                            <div className="flex items-center px-4 text-slate-400">
                                <span className="material-symbols-outlined text-lg">search</span>
                            </div>
                            <input
                                className="w-full bg-transparent border-none text-[11px] font-bold uppercase tracking-widest focus:ring-0 py-2.5 outline-none placeholder-slate-400"
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
                        {/* Compact Cart Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center gap-2 text-[10px] font-black px-3 md:px-5 py-2 md:py-2.5 bg-teal-accent text-white uppercase tracking-widest transition-all rounded-sm shadow-md hover:shadow-lg"
                        >
                            <span className="material-symbols-outlined text-lg">shopping_cart</span>
                            <span className="hidden xs:inline">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </motion.button>

                        {/* Portal / Manager (Desktop) */}
                        <div className="hidden md:flex items-center gap-2">
                            {isAuthenticated ? (
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 text-[10px] font-black px-4 py-2.5 bg-slate-900 text-white uppercase tracking-widest rounded-sm"
                                >
                                    <span className="material-symbols-outlined text-base">dashboard</span>
                                    Portal
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 text-[10px] font-black px-4 py-2.5 bg-slate-100 text-slate-900 border border-slate-200 uppercase tracking-widest rounded-sm"
                                >
                                    <span className="material-symbols-outlined text-base">lock</span>
                                    Log In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar (Sticky below main nav) */}
            <div className="lg:hidden px-4 pb-3">
                <div className="flex w-full rounded-sm border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-teal-accent shadow-sm">
                    <div className="flex items-center px-3 text-slate-400">
                        <span className="material-symbols-outlined text-base">search</span>
                    </div>
                    <input
                        className="w-full bg-transparent border-none text-[11px] font-bold uppercase tracking-widest focus:ring-0 py-2.5 outline-none placeholder:text-slate-400 text-center pr-10"
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
                                    <span className="material-symbols-outlined text-2xl text-teal-accent">forklift</span>
                                    <span className="text-white font-black uppercase italic tracking-tighter">HEIDI HUB</span>
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
                                        className={`flex items-center justify-between py-4 border-b border-slate-800/50 text-xs font-black uppercase tracking-widest ${pathname === link.href ? 'text-teal-accent' : 'text-slate-400'
                                            }`}
                                    >
                                        {link.name}
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </Link>
                                ))}

                                {/* Mobile Portal Links */}
                                <div className="pt-8 space-y-3">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="bg-slate-800/50 p-4 rounded-sm border border-slate-700">
                                                <p className="text-[10px] text-teal-accent font-black uppercase tracking-widest mb-1 italic">{user?.tier || 'Tier 1'} Member</p>
                                                <p className="text-white font-black uppercase text-[11px] truncate">{user?.name}</p>
                                            </div>
                                            <button
                                                onClick={() => { logout(); setIsMenuOpen(false); }}
                                                className="w-full py-4 text-center text-red-400 text-[10px] font-black uppercase tracking-[0.2em] border border-red-900/30 rounded-sm"
                                            >
                                                Sign Out of System
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full block py-4 bg-teal-accent text-center text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm shadow-lg shadow-teal-900/20"
                                        >
                                            Secure Access Login
                                        </Link>
                                    )}
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

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
};

export default Navbar;
