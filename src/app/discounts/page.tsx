'use client';

import React from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DiscountsPage() {
    const tiers = [
        {
            name: "Tier 1: Standard",
            volume: "1-10 Cases",
            pricing: "Market Rate",
            shipping: "Calculated on Invoice",
            benefits: ["Basic Commercial Access", "Standard LTL Rates", "Digital Invoicing"],
            active: false
        },
        {
            name: "Tier 2: Business",
            volume: "11-50 Cases",
            pricing: "5% Direct Discount",
            shipping: "Free Zone-1 LTL Shipping",
            benefits: ["Regional Priority Dispatch", "Dynamic Price Locking", "Bulk Freight Optimization"],
            active: true
        },
        {
            name: "Tier 3: Enterprise",
            volume: "50+ Cases / Full Pallet",
            pricing: "12% Master Discount",
            shipping: "Free Nationwide LTL",
            benefits: ["Dedicated Account Manager", "White-Glove Pallet Service", "Stock Reservation Access"],
            active: false
        }
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f1f5f9]">
            <TopBar />
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-20 relative z-10">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <div className="inline-block bg-teal-accent/10 text-teal-accent text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 border border-teal-accent/20">
                        Institutional Pricing Matrix
                    </div>
                    <h1 className="text-5xl font-black text-[#001A2C] uppercase tracking-tight mb-6 leading-none">Wholesale Volume Discounts</h1>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed italic">
                        "Maximize margins through tiered inventory acquisition. Our logistics engine calculates pallet density to reduce your landed cost-per-unit by up to 20% on full-load orders."
                    </p>
                </div>

                {/* Pricing Tiers Table */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className={`relative bg-white border rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${tier.name.includes('Business') ? 'border-teal-accent border-2 z-10 shadow-xl' : 'border-slate-200'
                            }`}>
                            {tier.name.includes('Business') && (
                                <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-teal-accent text-white text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em]">
                                    Most Efficient Tier
                                </div>
                            )}
                            <div className="p-10">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{tier.name}</h3>
                                <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6 underline decoration-slate-200 decoration-2 underline-offset-8">{tier.volume}</p>

                                <div className="space-y-6 mb-10 pb-10 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100">
                                            <span className="material-symbols-outlined text-sm text-teal-accent">payments</span>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Price Delta</p>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{tier.pricing}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100">
                                            <span className="material-symbols-outlined text-sm text-teal-accent">local_shipping</span>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Logistic Freight</p>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{tier.shipping}</p>
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {tier.benefits.map((benefit, bIdx) => (
                                        <li key={bIdx} className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-teal-accent text-sm mt-0.5">verified_user</span>
                                            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/wholesale-application"
                                    className={`block w-full text-center py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${tier.name.includes('Business')
                                        ? 'bg-primary text-white hover:bg-[#001A2C] shadow-lg shadow-primary/20'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    Activate Tier Access
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pallet Optimization Section */}
                <div className="bg-[#001A2C] rounded-sm overflow-hidden shadow-2xl border border-slate-800 relative group">
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
                        <div className="p-16 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-teal-accent/20 border border-teal-accent/30 rounded-sm flex items-center justify-center">
                                    <span className="material-symbols-outlined text-teal-accent text-2xl">grid_view</span>
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter" style={{ color: '#FFFFFF' }}>Pallet Optimization</h2>
                            </div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
                                Why aim for Tier 3? Full pallet orders (approx. 50-60 cases depending on SKU weight) utilize maximum cube space in LTL trucks. This density allows our freight carriers to offer lower rates, which we pass directly to you. A full pallet reduces "landed cost-per-unit" by **20%** compared to shipping individual cases.
                            </p>
                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div className="bg-slate-800/50 p-6 rounded-sm border border-slate-700">
                                    <p className="text-2xl font-black text-white tracking-tighter">20%</p>
                                    <p className="text-[9px] text-teal-accent font-black uppercase tracking-widest mt-1">Landed Cost Reduction</p>
                                </div>
                                <div className="bg-slate-800/50 p-6 rounded-sm border border-slate-700">
                                    <p className="text-2xl font-black text-white tracking-tighter">100%</p>
                                    <p className="text-[9px] text-teal-accent font-black uppercase tracking-widest mt-1">Freight Efficiency</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-teal-accent/10 border-l border-slate-800 p-16 flex flex-col items-center justify-center text-center">
                            <span className="material-symbols-outlined text-7xl text-teal-accent mb-8 animate-pulse">container</span>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight" style={{ color: '#FFFFFF' }}>
                                NEED EVEN MORE? <br /> LOAD-SCALE PROCUREMENT
                            </h3>
                            <p className="text-white/60 text-xs font-medium max-w-xs mb-10 leading-relaxed uppercase tracking-widest">
                                For container loads (24+ pallets) or direct factory shipments, we provide custom FTL (Full Truckload) rate cards and master distributor pricing.
                            </p>
                            <button className="bg-white text-primary px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all rounded-sm shadow-xl flex items-center gap-3">
                                <span className="material-symbols-outlined text-sm">request_quote</span>
                                Request Custom Quote for Container Loads
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
