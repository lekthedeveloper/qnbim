'use client';

import React, { useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuotesTable from '@/components/QuotesTable';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function MyQuotesPage() {
    const { isAuthenticated } = useCart();
    const router = useRouter();

    // Guard Logic
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?message=Please sign in to access the Partner Portal.');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;
    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-[#f1f5f9]">
            <TopBar />
            <Navbar />

            <main className="flex-1 p-8 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs and Title */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <nav className="flex text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                <a className="hover:text-primary" href="#">Home</a>
                                <span className="mx-2">/</span>
                                <a className="hover:text-primary" href="#">Account</a>
                                <span className="mx-2">/</span>
                                <span className="text-cobalt">Quotes</span>
                            </nav>
                            <h1 className="text-3xl font-black text-primary uppercase tracking-tighter">My Wholesale Quotes</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 text-xs font-bold uppercase hover:bg-slate-50 transition-colors rounded-sm shadow-sm">
                                <span className="material-symbols-outlined text-base">filter_list</span> Filter
                            </button>
                            <button className="flex items-center gap-2 bg-cobalt text-white px-4 py-2 text-xs font-bold uppercase hover:bg-royal transition-colors rounded-sm shadow-sm">
                                <span className="material-symbols-outlined text-base">add_circle</span> Request New Quote
                            </button>
                        </div>
                    </div>

                    <QuotesTable />

                    {/* Logistics Trust Banner */}
                    <div className="mt-12 bg-industrial-gray text-white p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-cobalt shadow-sm">
                        <div className="flex items-center gap-6">
                            <span className="material-symbols-outlined text-5xl text-cobalt">pallet</span>
                            <div>
                                <h3 className="font-black uppercase tracking-wider text-sm mb-1">Pallet Shipping & LTL Delivery</h3>
                                <p className="text-xs text-slate-300 max-w-lg">
                                    All approved quotes include standard dock-to-dock delivery. For lift-gate services or residential commercial delivery, please update your shipping profile before converting to order.
                                </p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap bg-white text-primary px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors rounded-sm">
                            Update Logistics Profile
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
