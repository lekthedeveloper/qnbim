'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import WholesaleForm from '@/components/WholesaleForm';
import { motion } from 'framer-motion';

export default function WholesaleApplication() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <TopBar />
            <Navbar />

            <main className="flex-1">
                {/* Hero section for the page */}
                <div className="bg-slate-900 py-16 px-10 border-b border-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-accent rounded-full blur-[100px] -mr-48 -mt-48"></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-teal-accent"></span>
                                <span className="text-teal-accent text-[11px] font-black uppercase tracking-[0.3em]">Institutional Access</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter" style={{ color: '#FFFFFF' }}>
                                Wholesale <span className="text-teal-accent">Procurement</span> Application
                            </h1>
                            <p className="text-slate-400 text-sm max-w-2xl font-medium leading-relaxed uppercase tracking-wider">
                                Register your business entity for full access to our inventory, pallet rates, and dedicated account management.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto py-12 px-5 md:px-10">
                    <div className="bg-white border border-slate-200 shadow-2xl rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-3">
                        {/* Sidebar Info */}
                        <div className="bg-slate-50 border-r border-slate-200 p-8 md:p-12 space-y-10">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-teal-accent text-lg">verified</span>
                                    Verified Accounts
                                </h3>
                                <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                                    qnbim Wholesale operates as a closed distribution network. All partners must provide valid tax documentation and business credentials.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Required Documents</h4>
                                <ul className="space-y-3">
                                    {[
                                        'Valid State Resale Certificate',
                                        'W-9 / Federal Tax ID (EIN)',
                                        'Warehouse / Shipping Address',
                                        'Primary Point of Contact'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-black text-slate-700 uppercase tracking-widest">
                                            <span className="w-5 h-5 rounded-full bg-teal-accent/10 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[12px] text-teal-accent font-bold">check</span>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 bg-slate-900 rounded-sm">
                                <p className="text-[10px] text-teal-accent font-black uppercase tracking-widest mb-2 italic">Priority Processing</p>
                                <p className="text-white text-[11px] font-bold uppercase leading-relaxed tracking-widest">
                                    Verified industrial accounts receive approval within 24 hours for immediate pallet procurement.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <WholesaleForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
