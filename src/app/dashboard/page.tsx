"use client";

import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function DashboardPage() {
    const { isAuthenticated } = useCart();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
                <span className="material-symbols-outlined text-6xl text-teal-accent mb-4 animate-pulse">lock</span>
                <h1 className="text-2xl font-black uppercase tracking-widest mb-2">Unauthorized Access</h1>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-tighter mb-8 max-w-md">
                    The requested logistics endpoint requires an active B2B Tier 1 Wholesale authentication token.
                </p>
                <Link href="/login" className="bg-teal-accent text-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-teal-700 transition-all rounded-sm">
                    Re-Authenticate Workstation
                </Link>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-[#f1f5f9]">
            <TopBar />
            <Navbar />

            <main className="flex-1 p-8 lg:px-20 max-w-7xl mx-auto w-full">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-teal-accent text-white text-[9px] font-black px-2 py-0.5 uppercase rounded-sm">Tier 1 Partner</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">W-9 Verified</span>
                        </div>
                        <h1 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">Logistics Dashboard</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Account Balance</p>
                        <p className="text-2xl font-black text-slate-900 leading-none">$14,250.00 <span className="text-xs text-slate-400">NET-30</span></p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Active Quotes', value: '5', icon: 'description', color: 'teal' },
                        { label: 'Shipments', value: '2', icon: 'local_shipping', color: 'blue' },
                        { label: 'Open Invoices', value: '3', icon: 'receipt', color: 'amber' },
                        { label: 'Total Volume', value: '14 PAL', icon: 'pallet', color: 'slate' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </div>
                            <span className={`material-symbols-outlined text-3xl opacity-20`}>{stat.icon}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-black uppercase tracking-widest text-[11px] text-slate-900">Real-Time Dispatch Feed</h3>
                            <button className="text-[10px] font-black text-teal-accent uppercase hover:underline">Export Logs</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {[
                                { status: 'Delivered', msg: 'HEI-8821 arrived at Atlantic HUB (Dock 4)', time: '2h ago', color: 'teal' },
                                { status: 'In Transit', msg: 'LTL Carrier (XPO) assigned to #QT-2026-8891', time: '5h ago', color: 'blue' },
                                { status: 'Processing', msg: 'Volume Discount applied to SKU: CLOROX-882', time: '1d ago', color: 'amber' },
                                { status: 'Draft', msg: 'New Quote Saved - 5 Pallet Mixed Load', time: '2d ago', color: 'slate' },
                            ].map((activity, i) => (
                                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${activity.color === 'teal' ? 'bg-teal-500' : activity.color === 'blue' ? 'bg-blue-500' : activity.color === 'amber' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-800">{activity.msg}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{activity.time}</p>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{activity.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Tools */}
                    <div className="space-y-6">
                        <div className="bg-primary text-white p-6 rounded-sm shadow-xl">
                            <h3 className="font-black uppercase tracking-[0.2em] text-xs mb-6 border-b border-white/10 pb-4">Logistics Core Tools</h3>
                            <div className="space-y-4">
                                <Link href="/ltl-rates" className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group">
                                    <span className="material-symbols-outlined text-teal-accent">calculate</span>
                                    <span className="text-[11px] font-black tracking-widest uppercase group-hover:translate-x-1 transition-transform">Freight Rate Engine</span>
                                </Link>
                                <Link href="/catalog" className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group">
                                    <span className="material-symbols-outlined text-teal-accent">grid_view</span>
                                    <span className="text-[11px] font-black tracking-widest uppercase group-hover:translate-x-1 transition-transform">Bulk Inventory Procurement</span>
                                </Link>
                                <Link href="/my-quotes" className="flex items-center gap-4 p-3 hover:bg-white/5 transition-colors group">
                                    <span className="material-symbols-outlined text-teal-accent">description</span>
                                    <span className="text-[11px] font-black tracking-widest uppercase group-hover:translate-x-1 transition-transform">Quote Repository</span>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/5 -mr-12 -mt-12 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
                            <h4 className="font-black uppercase text-[10px] text-slate-400 tracking-[0.2em] mb-4">Dedicated Support</h4>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-teal-accent">support_agent</span>
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase text-slate-900">Sarah Jenkins</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Senior Logistics Specialist</p>
                                </div>
                            </div>
                            <button className="w-full py-2.5 bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-teal-accent hover:text-white hover:border-teal-accent transition-all">
                                Connect To Rep
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
