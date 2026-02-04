"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QuoteCard = ({ carrier, type, price, oldPrice, time, stats, icon, iconColor = "text-teal-accent" }: any) => (
    <div className="bg-white/5 border border-white/10 p-5 rounded-sm hover:border-teal-accent/50 transition-all cursor-pointer group hover:bg-white/[0.08]">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-white font-black text-sm uppercase tracking-tight">{carrier}</h4>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{type}</span>
            </div>
            <div className="text-right">
                <div className="text-teal-accent font-black text-xl leading-none">${price}</div>
                {oldPrice && <span className="text-[10px] text-slate-500 line-through font-bold">${oldPrice}</span>}
            </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-white/5 pt-3">
            <span className="flex items-center gap-1.5 font-medium">
                <span className={`material-symbols-outlined text-sm ${iconColor}`}>{icon}</span>
                {time}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-sm text-slate-400">verified</span>
                {stats}
            </span>
        </div>
    </div>
);

export default function LtlRatesPage() {
    const [pallets, setPallets] = useState(1);
    const [weight, setWeight] = useState(1500);
    const [fclass, setFclass] = useState("50");
    const [zip, setZip] = useState("90210");
    const [options, setOptions] = useState<string[]>([]);

    const toggleOption = (opt: string) => {
        setOptions(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
    };

    const rates = useMemo(() => {
        const base = 150 + (pallets * 75);
        const accessorials = (options.includes('Liftgate Required') ? 50 : 0) +
            (options.includes('Residential Delivery') ? 75 : 0) +
            (options.includes('Appointment Required') ? 25 : 0) +
            (options.includes('Limited Access') ? 40 : 0);

        const classMultiplier = parseInt(fclass) / 50;
        const totalBase = (base + accessorials) * classMultiplier;

        return [
            {
                carrier: "RapidFreight Systems",
                type: "Standard LTL",
                price: (totalBase * 0.95).toFixed(2),
                oldPrice: (totalBase * 1.2).toFixed(2),
                time: "Est. 3 Days",
                stats: "98% On-time",
                icon: "schedule"
            },
            {
                carrier: "Express Logistics",
                type: "Guaranteed Priority",
                price: (totalBase * 1.3).toFixed(2),
                time: "Est. 1-2 Days",
                stats: "High Reliability",
                icon: "bolt",
                iconColor: "text-yellow-400"
            },
            {
                carrier: "Oceania Ground",
                type: "Economy Hub",
                price: (totalBase * 0.82).toFixed(2),
                time: "Est. 5-7 Days",
                stats: "Basic Track",
                icon: "event_note",
                iconColor: "text-blue-400"
            }
        ];
    }, [pallets, weight, fclass, options]);

    const customNavLinks = [
        { name: 'Catalog', href: '/catalog' },
        { name: 'LTL Rates', href: '/ltl-rates' },
        { name: 'Wholesale Application', href: '/wholesale-application' },
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar customLinks={customNavLinks} />

            <main className="flex-1 max-w-[1440px] mx-auto w-full py-10 px-6 md:px-10">
                <div className="mb-10 text-left">
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2 leading-none italic">Freight Rate Calculator</h1>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-tight">
                        Real-time LTL quoting for commercial dock-to-dock deliveries. Residential and lift-gate services subject to additional fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border border-slate-200 p-8 shadow-sm rounded-sm">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-teal-accent mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-teal-50 text-teal-accent flex items-center justify-center border border-teal-100 font-black text-sm">01</span>
                                Shipment Configuration
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-slate-400 flex justify-between tracking-widest">
                                        Pallet Count
                                        <span className="text-teal-accent font-black tracking-tighter">48" x 40" Std</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={pallets}
                                            onChange={(e) => setPallets(Math.min(26, Math.max(1, parseInt(e.target.value) || 1)))}
                                            className="w-full border-slate-200 border rounded-sm text-sm focus:ring-1 focus:ring-teal-accent focus:border-teal-accent py-4 pl-5 pr-16 font-black text-primary outline-none transition-all"
                                            max="26" min="1" placeholder="0" type="number"
                                        />
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-black tracking-widest uppercase">Pallets</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Limit 26 pallets per standard LTL shipment.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Freight Class</label>
                                    <select
                                        value={fclass}
                                        onChange={(e) => setFclass(e.target.value)}
                                        className="w-full border-slate-200 border rounded-sm text-sm focus:ring-1 focus:ring-teal-accent focus:border-teal-accent py-4 font-black text-primary outline-none bg-white px-5"
                                    >
                                        <option value="50">Class 50 - Standard</option>
                                        <option value="60">Class 60</option>
                                        <option value="70">Class 70</option>
                                        <option value="100">Class 100 - Fragile/Bulk</option>
                                        <option value="150">Class 150</option>
                                        <option value="250">Class 250</option>
                                    </select>
                                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Class affects pricing based on density & handling.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Total Weight (LBS)</label>
                                    <div className="relative">
                                        <input
                                            value={weight}
                                            onChange={(e) => setWeight(Math.max(0, parseInt(e.target.value) || 0))}
                                            className="w-full border-slate-200 border rounded-sm text-sm focus:ring-1 focus:ring-teal-accent focus:border-teal-accent py-4 pl-5 pr-16 font-black text-primary outline-none transition-all"
                                            placeholder="0" type="number"
                                        />
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-black tracking-widest uppercase">LBS</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Destination Zip Code</label>
                                    <div className="relative">
                                        <input
                                            value={zip}
                                            onChange={(e) => setZip(e.target.value)}
                                            className="w-full border-slate-200 border rounded-sm text-sm focus:ring-1 focus:ring-teal-accent focus:border-teal-accent py-4 pl-14 font-black text-primary outline-none uppercase transition-all tracking-widest"
                                            placeholder="XXXXX" type="text"
                                        />
                                        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 p-8 shadow-sm rounded-sm">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-teal-accent mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-teal-50 text-teal-accent flex items-center justify-center border border-teal-100 font-black text-sm">02</span>
                                Delivery Options
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Liftgate Required', desc: 'No loading dock at destination', icon: 'keyboard_double_arrow_down' },
                                    { label: 'Residential Delivery', desc: 'Home or private business access', icon: 'home' },
                                    { label: 'Appointment Required', desc: 'Driver must call before arrival', icon: 'call' },
                                    { label: 'Limited Access', desc: 'Schools, military, or construction', icon: 'security' },
                                ].map((opt) => (
                                    <label key={opt.label} className="flex items-center gap-4 p-5 border border-slate-100 rounded-sm hover:bg-slate-50 cursor-pointer transition-all group hover:border-teal-accent/20">
                                        <input
                                            checked={options.includes(opt.label)}
                                            onChange={() => toggleOption(opt.label)}
                                            className="mb-0.5 rounded text-teal-accent focus:ring-teal-accent border-slate-300 w-5 h-5"
                                            type="checkbox"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                                                {opt.label}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{opt.desc}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-primary rounded-sm flex items-start gap-5 text-white/90 border-l-4 border-teal-accent shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-teal-accent text-3xl">info</span>
                            <div>
                                <p className="text-[11px] font-black uppercase text-white mb-2 tracking-widest">Origin Details (Fixed Center)</p>
                                <p className="text-[11px] leading-relaxed font-medium">
                                    All shipments currently originate from <span className="text-teal-accent font-bold">qnbim Main Distribution Center, NJ 08757</span>. To request quotes from our West Coast or Midwest hubs, please contact your account manager.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-primary rounded-sm overflow-hidden flex flex-col h-full sticky top-28 shadow-2xl border border-white/5">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                                <h3 className="text-xs font-black uppercase tracking-widest text-teal-accent italic">Real-time Quotes</h3>
                                <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live API Data
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-5 max-h-[600px] custom-scrollbar">
                                {rates.map((rate, idx) => (
                                    <QuoteCard key={idx} {...rate} />
                                ))}
                            </div>

                            <div className="p-8 bg-slate-900 mt-auto border-t border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shipment Units</span>
                                        <span className="text-sm font-black text-white italic">{pallets} Standard Pallet{pallets > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Gravity</span>
                                        <span className="text-sm font-black text-white uppercase">{weight.toLocaleString()} LBS</span>
                                    </div>
                                </div>
                                <button className="w-full bg-teal-accent text-white py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-700 transition-all shadow-xl shadow-teal-900/20 active:scale-[0.98]">
                                    Proceed to Booking
                                </button>
                                <p className="text-[10px] text-slate-500 mt-5 text-center uppercase tracking-tighter font-medium px-4">
                                    Quotes valid for <span className="text-slate-400">24 hours</span>. Includes current fuel surcharges & dock-to-dock service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
