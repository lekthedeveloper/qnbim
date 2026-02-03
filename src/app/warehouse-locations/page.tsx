'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { warehouses, Warehouse } from '@/data/warehouses';
import { jsPDF } from 'jspdf';

// --- Components ---

const CountUp = ({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const totalFrames = duration * 60;
        const increment = end / totalFrames;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [end, duration]);

    return (
        <span className="tabular-nums">
            {count % 1 === 0 ? count : count.toFixed(1)}{suffix}
        </span>
    );
};

const SchedulingModal = ({
    isOpen,
    onClose,
    warehouse
}: {
    isOpen: boolean;
    onClose: () => void;
    warehouse: Warehouse | null
}) => {
    const [step, setStep] = useState<'datetime' | 'contact' | 'success'>('datetime');
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const timeSlots = ["08:00 AM", "09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

    // Mock calendar for Feb 2026 (Starts on Sunday)
    const daysInMonth = 28;
    const startDay = 0; // Sunday

    const handleConfirm = () => {
        setStep('success');
    };

    if (!warehouse) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 rounded-[8px]"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-6 flex justify-between items-center border-b border-slate-800">
                            <div>
                                <h3 className="text-white font-black uppercase tracking-tight text-lg md:text-xl">
                                    {warehouse.dockPickup ? 'Schedule Dock Pickup' : 'Schedule Logistics Consult'}
                                </h3>
                                <p className="text-teal-accent text-[10px] font-black uppercase tracking-widest mt-1">
                                    Facility: {warehouse.code} | {warehouse.city}, {warehouse.state}
                                </p>
                            </div>
                            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row">
                            {/* Sidebar Info - Hidden on mobile or stacked */}
                            <div className="hidden md:block w-72 bg-slate-50 p-8 border-r border-slate-200">
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Facility Rules</span>
                                        <ul className="space-y-3">
                                            {[
                                                { icon: 'safety_check', text: 'ANSI Z87.1 EYEWEAR' },
                                                { icon: 'engineering', text: 'CLASS 2 VEST REQ.' },
                                                { icon: 'emergency_home', text: 'ID REQUIRED AT GATE' }
                                            ].map((rule, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-[10px] font-black text-slate-700">
                                                    <span className="material-symbols-outlined text-sm text-teal-accent">{rule.icon}</span>
                                                    {rule.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-6 border-t border-slate-200">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Protocol Note</span>
                                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase">
                                            Dock arrivals must check in at least 15 minutes prior to appointment for verification.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 p-6 md:p-8">
                                {step === 'datetime' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                        <div>
                                            <h4 className="text-[11px] font-black uppercase text-slate-900 mb-4 tracking-widest flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-teal-accent">calendar_month</span> 1. Select Operation Date
                                            </h4>
                                            <div className="grid grid-cols-7 gap-1 md:gap-2">
                                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                                    <div key={d} className="text-[9px] text-center font-black text-slate-400 py-1">{d}</div>
                                                ))}
                                                {Array.from({ length: 28 }).map((_, i) => {
                                                    const day = i + 1;
                                                    const isWeekend = (i % 7 === 0 || i % 7 === 6);
                                                    return (
                                                        <button
                                                            key={i}
                                                            disabled={isWeekend}
                                                            onClick={() => setSelectedDate(day)}
                                                            className={`aspect-square md:h-10 text-[11px] font-black rounded-sm border transition-all flex items-center justify-center
                                                                ${isWeekend ? 'bg-slate-50 text-slate-200 border-transparent cursor-not-allowed' :
                                                                    selectedDate === day ? 'bg-teal-accent text-white border-teal-600 shadow-md' :
                                                                        'bg-white text-slate-900 border-slate-200 hover:border-teal-accent'}`}
                                                        >
                                                            {day}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[11px] font-black uppercase text-slate-900 mb-4 tracking-widest flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-teal-accent">schedule</span> 2. Allocation Window
                                            </h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {timeSlots.map(time => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-2 px-3 text-[10px] font-black rounded-sm border transition-all uppercase tracking-tight
                                                            ${selectedTime === time ? 'bg-slate-900 text-white border-slate-900 shadow-lg' :
                                                                'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-accent hover:text-teal-accent'}`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            disabled={!selectedDate || !selectedTime}
                                            onClick={() => setStep('contact')}
                                            className="w-full bg-teal-accent text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-sm disabled:opacity-50 shadow-xl shadow-teal-900/10 active:scale-[0.98] transition-all"
                                        >
                                            Establish Identity Protocol
                                        </button>
                                    </motion.div>
                                )}

                                {step === 'contact' && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                        <div className="bg-slate-50 p-4 border border-slate-200 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-teal-accent">calendar_today</span>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Appointment</p>
                                                    <p className="text-xs font-black text-slate-900 uppercase">Feb {selectedDate}, 2026 @ {selectedTime}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setStep('datetime')} className="text-[10px] font-black text-teal-600 uppercase hover:underline">Change</button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Business Email</label>
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full border border-slate-200 p-3 text-sm focus:ring-teal-accent focus:border-teal-accent outline-none text-[#001A2C] font-semibold"
                                                    placeholder="ops@yourcompany.com"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Phone Number</label>
                                                <input
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full border border-slate-200 p-3 text-sm focus:ring-teal-accent focus:border-teal-accent outline-none text-[#001A2C] font-semibold"
                                                    placeholder="(XXX) XXX-XXXX"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            disabled={!email || !phone}
                                            onClick={handleConfirm}
                                            className="w-full bg-teal-accent text-white py-4 font-black text-xs uppercase tracking-widest disabled:opacity-30 transition-all hover:bg-teal-700 shadow-xl shadow-teal-900/10"
                                        >
                                            Confirm Appointment
                                        </button>
                                    </motion.div>
                                )}

                                {step === 'success' && (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="py-10 text-center space-y-6"
                                    >
                                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-accent">
                                            <span className="material-symbols-outlined text-5xl">check_circle</span>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Logistics Appointment Confirmed</h3>
                                            <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                                                A meeting link and gate pass have been sent to your email. Please ensure your driver has proper PPE.
                                            </p>
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                onClick={onClose}
                                                className="bg-slate-900 text-white px-10 py-3 font-black text-xs uppercase tracking-widest hover:bg-slate-800"
                                            >
                                                Return to Portal
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- Main Page ---

export default function WarehouseLocationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [dockOnly, setDockOnly] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

    const filteredWarehouses = useMemo(() => {
        return warehouses.filter(w => {
            const matchesSearch = w.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                w.zip.includes(searchQuery) ||
                w.state.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDock = !dockOnly || w.dockPickup;
            return matchesSearch && matchesDock;
        });
    }, [searchQuery, dockOnly]);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(0, 26, 44); // Dark Navy
        doc.rect(0, 0, 210, 40, 'F');

        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.text("HEIDI STORE WHOLESALE", 20, 25);

        doc.setFontSize(10);
        doc.setTextColor(20, 184, 166); // Teal Accent
        doc.text("LOGISTICS & SAFETY PROTOCOL v2.1", 20, 32);

        // Content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text("Warehouse Safety Guidelines", 20, 55);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const lines = [
            "1. Required PPE: All visitors must wear high-visibility safety vests and steel-toed footwear.",
            "2. Speed Limit: The facility speed limit is 5 MPH. Follow all signage and directional arrows.",
            "3. Dock Procedures: Drivers must chock wheels and release trailer air before loading begins.",
            "4. Paperwork: Gate pass or Appointment Confirmation must be presented at the check-in window.",
            "5. Loading Protocol: Standard dock-height loading only. Hand-loading is not permitted on-site.",
            "",
            "Issued by: Heidi Store Logistics Division",
            "Effective Date: January 2026"
        ];

        lines.forEach((line, i) => {
            doc.text(line, 20, 70 + (i * 10));
        });

        doc.save("Heidi_Store_Warehouse_Policy.pdf");
    };

    const openScheduling = (warehouse: Warehouse) => {
        setSelectedWarehouse(warehouse);
        setIsModalOpen(true);
    };

    const customNavLinks = [
        { name: 'Catalog', href: '/catalog' },
        { name: 'LTL Rates', href: '/ltl-rates' },
        { name: 'Warehouses', href: '/warehouse-locations' },
        { name: 'Application Status', href: '/signup' },
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar customLinks={customNavLinks} />

            <main className="flex-1 w-full pb-20">
                {/* Hubs Hero with Map */}
                <section className="bg-primary pt-10 md:pt-12 pb-16 md:pb-24 px-4 md:px-10 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-8 md:mb-12 gap-6 md:gap-8 text-center md:text-left">
                            <div className="max-w-xl mx-auto md:mx-0">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3 md:mb-4 leading-none"
                                >
                                    Logistics & <span className="text-teal-accent">Distribution Hubs</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium"
                                >
                                    Our nationwide network of distribution centers ensures rapid fulfillment and competitive LTL freight rates. Commercial accounts may schedule dock pickups at select locations below.
                                </motion.p>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
                                <div className="text-center">
                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Hubs</p>
                                    <p className="text-xl md:text-2xl font-black text-white"><CountUp end={12} /></p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total SQ FT</p>
                                    <p className="text-xl md:text-2xl font-black text-white"><CountUp end={4.2} suffix="M" /></p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">On-Time</p>
                                    <p className="text-xl md:text-2xl font-black text-teal-accent"><CountUp end={99.8} suffix="%" /></p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive SVG Map */}
                        <div className="bg-slate-900 border border-slate-800 rounded-[8px] h-[300px] md:h-[500px] w-full relative industrial-grid overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none"></div>

                            {/* Simplified US SVG Map */}
                            <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full p-4 md:p-12 opacity-20 text-slate-600 fill-current">
                                <path d="M10,15 L20,12 L35,14 L50,12 L65,14 L85,10 L95,15 L95,45 L85,50 L70,48 L55,52 L40,50 L25,52 L10,48 Z" />
                            </svg>

                            {/* Markers */}
                            {filteredWarehouses.map((w) => (
                                <div
                                    key={w.id}
                                    style={{
                                        left: `${w.mapCoordinates.x}%`,
                                        top: `${w.mapCoordinates.y}%`
                                    }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                                    onMouseEnter={() => setHoveredMarker(w.id)}
                                    onMouseLeave={() => setHoveredMarker(null)}
                                >
                                    <div className="relative">
                                        <motion.span
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-teal-accent rounded-full -m-2 block"
                                        />
                                        <motion.span
                                            whileHover={{ scale: 1.2 }}
                                            className={`relative block h-2 md:h-3 w-2 md:w-3 rounded-full cursor-pointer shadow-lg transition-colors
                                                ${hoveredMarker === w.id ? 'bg-white' : 'bg-teal-accent'}`}
                                        />

                                        {/* Tooltip */}
                                        <AnimatePresence>
                                            {hoveredMarker === w.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, x: '-50%' }}
                                                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                                                    exit={{ opacity: 0, y: -10, x: '-50%' }}
                                                    className="absolute bottom-6 left-1/2 bg-white text-slate-900 px-4 py-2 border border-teal-500 shadow-2xl z-50 rounded-sm pointer-events-none"
                                                >
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-600 leading-none mb-1">{w.code}</p>
                                                    <p className="text-xs font-black uppercase whitespace-nowrap">{w.name}</p>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}

                            {/* Map Legend */}
                            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-slate-900/80 border border-slate-700 p-3 md:p-5 rounded-[8px] backdrop-blur-sm z-40">
                                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 md:mb-3 italic">Map Legend</h4>
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-teal-accent"></span>
                                        <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-widest">Active Hub</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                        <span className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest">Future Hub</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search & Filter Bar */}
                <div className="max-w-7xl mx-auto -mt-8 md:-mt-10 relative z-40 px-4 md:px-10">
                    <div className="bg-white border border-slate-200 shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center rounded-[8px]">
                        <div className="flex-1 min-w-0 relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg md:text-xl">location_on</span>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 md:pl-12 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-[8px] text-[13px] md:text-sm focus:ring-teal-accent focus:border-teal-accent outline-none text-[#001A2C] font-black placeholder:text-slate-400 placeholder:font-bold"
                                placeholder="CITY OR ZIP CODE..."
                                type="text"
                            />
                        </div>

                        <div className="flex items-center justify-between md:justify-start gap-4 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-[8px] md:rounded-none border border-slate-100 md:border-0">
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => setDockOnly(!dockOnly)}
                                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors
                                        ${dockOnly ? 'bg-teal-accent' : 'bg-slate-200'}`}
                                >
                                    <motion.div
                                        animate={{ x: dockOnly ? 24 : 0 }}
                                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                    />
                                </div>
                                <span className="text-[10px] md:text-[11px] font-black text-[#001A2C] uppercase tracking-widest">Dock Pickup Only</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDownloadPDF}
                            className="bg-primary text-white h-12 md:h-auto px-6 md:px-8 py-3 md:py-4 font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 rounded-[8px]"
                        >
                            <span className="material-symbols-outlined text-base">download</span>
                            <span className="sm:inline">Download Protocol</span>
                        </button>
                    </div>
                </div>

                {/* Locations List */}
                <section className="max-w-7xl mx-auto mt-12 md:mt-16 px-4 md:px-10">
                    <div className="grid grid-cols-1 gap-6 md:gap-8">
                        {filteredWarehouses.length > 0 ? (
                            filteredWarehouses.map((loc) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={loc.id}
                                    className="bg-white border border-slate-200 rounded-[8px] flex flex-col lg:flex-row overflow-hidden hover:border-teal-accent transition-all group shadow-sm hover:shadow-xl"
                                >
                                    <div className="lg:w-1/4 bg-slate-50 p-6 md:p-8 flex flex-row lg:flex-col justify-between items-center lg:items-start border-b lg:border-b-0 lg:border-r border-slate-200 relative">
                                        <div>
                                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Hub Code</span>
                                            <p className="text-lg md:text-xl font-black text-primary uppercase mt-1 leading-tight tracking-tight">{loc.code}</p>
                                        </div>
                                        <div className="lg:mt-8">
                                            {loc.dockPickup ? (
                                                <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-2.5 md:px-3 py-1.5 md:py-2 rounded-[8px] border border-teal-100 shadow-sm">
                                                    <span className="material-symbols-outlined text-sm md:text-base">local_shipping</span>
                                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none">Dock Active</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400 bg-slate-100 px-2.5 md:px-3 py-1.5 md:py-2 rounded-[8px] border border-slate-200">
                                                    <span className="material-symbols-outlined text-sm md:text-base">block</span>
                                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none">Restricted</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">Region / Hub</h4>
                                                <p className="text-base md:text-lg font-black text-slate-900 uppercase leading-snug">{loc.name}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">Facility Address</h4>
                                                <p className="text-[11px] md:text-xs font-bold text-slate-700 leading-relaxed uppercase">
                                                    {loc.address}<br />{loc.city}, {loc.state} {loc.zip}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50/50 p-4 rounded-[8px] border border-slate-100">
                                            <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Operational Hours</h4>
                                            <div className="space-y-2.5">
                                                <div className="flex justify-between items-center text-[10px] md:text-[11px] border-b border-slate-200/50 pb-2">
                                                    <span className="font-bold text-slate-500 uppercase">Dock:</span>
                                                    <span className={`font-black uppercase ${loc.dockPickup ? 'text-teal-600' : 'text-slate-400'}`}>
                                                        {loc.dockPickup ? 'ENABLED' : 'RESTRICTED'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] md:text-[11px] border-b border-slate-200/50 pb-2">
                                                    <span className="font-bold text-slate-500 uppercase">Fleet:</span>
                                                    <span className="font-black uppercase text-slate-900">ACTIVE</span>
                                                </div>
                                                <div className="flex justify-between items-start text-[10px] md:text-[11px]">
                                                    <span className="font-bold text-slate-500 uppercase">Hours:</span>
                                                    <span className="font-bold text-slate-700 text-right max-w-[120px] leading-tight uppercase">
                                                        {loc.hours}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-between items-stretch lg:items-end gap-5">
                                            <div className="text-left lg:text-right">
                                                <h4 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Regional Hotline</h4>
                                                <p className="text-sm md:text-base font-black text-primary tracking-widest">{loc.phone}</p>
                                            </div>

                                            <button
                                                onClick={() => openScheduling(loc)}
                                                className={`w-full lg:w-48 py-3.5 md:py-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-md active:scale-[0.98] rounded-[8px]
                                                    ${loc.dockPickup ? 'bg-teal-accent text-white hover:bg-teal-700' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                                            >
                                                {loc.dockPickup ? 'Schedule Pickup' : 'General Inquiry'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-sm"
                            >
                                <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">location_off</span>
                                <h3 className="text-sm font-black text-[#001A2C] uppercase tracking-[0.2em]">No Facilities Found in Protocol</h3>
                                <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold">Try adjusting your zip code or searching by state code</p>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Guidelines Banner */}
                <section className="max-w-7xl mx-auto mt-20 px-6 md:px-10">
                    <div className="bg-slate-900 text-white p-12 rounded-[8px] shadow-2xl relative overflow-hidden border-l-8 border-teal-accent">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-[120px]">verified_user</span>
                        </div>
                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center justify-between">
                            <div className="max-w-3xl">
                                <h4 className="font-black uppercase tracking-[0.2em] text-xl mb-4 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-teal-accent"></span>
                                    Safety & Compliance Protocol
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    Heidi Store operates under strict institutional safety standards. Pickup appointments must be synchronized with our WMS at least 24 hours prior to arrival. All logistics partners must adhere to PPE requirements—including steel-toed boots and high-vis vests—without exception. Failures to comply will result in dock access denial.
                                </p>
                            </div>
                            <button
                                onClick={handleDownloadPDF}
                                className="whitespace-nowrap bg-teal-accent text-white px-12 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-700 transition-all shadow-xl shadow-teal-900/20 active:scale-95 flex items-center gap-3 rounded-[8px]"
                            >
                                <span className="material-symbols-outlined">description</span>
                                Download Protocol PDF
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <SchedulingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                warehouse={selectedWarehouse}
            />
        </div>
    );
}
