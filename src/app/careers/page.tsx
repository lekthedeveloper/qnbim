'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock Job Data
const MOCK_JOBS = [
    {
        id: 'DB-WH-001',
        title: 'Warehouse Fulfillment Lead',
        type: 'Full-time',
        department: 'Warehouse',
        location: 'Atlanta',
        deptColor: 'bg-blue-50 text-blue-700'
    },
    {
        id: 'DB-LOG-002',
        title: 'Supply Chain Analyst',
        type: 'Full-time',
        department: 'Logistics',
        location: 'Chicago',
        deptColor: 'bg-purple-50 text-purple-700'
    },
    {
        id: 'DB-SAL-003',
        title: 'B2B Account Executive',
        type: 'Commission',
        department: 'Sales',
        location: 'Remote',
        deptColor: 'bg-blue-50 text-royal'
    },
    {
        id: 'DB-LOG-004',
        title: 'LTL Dispatch Coordinator',
        type: 'Full-time',
        department: 'Logistics',
        location: 'Dallas',
        deptColor: 'bg-purple-50 text-purple-700'
    },
    {
        id: 'DB-WH-005',
        title: 'Heavy Equipment Mechanic',
        type: 'Full-time',
        department: 'Warehouse',
        location: 'Atlanta',
        deptColor: 'bg-blue-50 text-blue-700'
    },
    {
        id: 'DB-SAL-006',
        title: 'Regional Sales Director',
        type: 'Full-time',
        department: 'Sales',
        location: 'Remote',
        deptColor: 'bg-blue-50 text-royal'
    },
    {
        id: 'DB-CORP-007',
        title: 'Corporate Finance Manager',
        type: 'Full-time',
        department: 'Corporate',
        location: 'Chicago',
        deptColor: 'bg-slate-50 text-slate-700'
    },
    {
        id: 'DB-LOG-008',
        title: 'Freight Procurement Specialist',
        type: 'Full-time',
        department: 'Logistics',
        location: 'Dallas',
        deptColor: 'bg-purple-50 text-purple-700'
    }
];

const BENEFITS = [
    {
        icon: 'payments',
        title: 'B2B Sales Incentives',
        desc: 'Industry-leading commission structures for wholesale account managers.'
    },
    {
        icon: 'school',
        title: 'Fleet Training',
        desc: 'Paid CDL certification and heavy machinery operation workshops.'
    },
    {
        icon: 'health_and_safety',
        title: 'Premium Healthcare',
        desc: 'Comprehensive medical, dental, and vision coverage from Day 1.'
    },
    {
        icon: 'schedule',
        title: 'Flexible Shifts',
        desc: 'Multiple shift options including 4x10 warehouse schedules.'
    }
];

export default function CareersPage() {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDepartment, setActiveDepartment] = useState('All');
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    // Navigation Links
    const customNavLinks = [
        { name: 'About Us', href: '/about-logistics' },
        { name: 'Departments', href: '#departments' },
        { name: 'Benefits', href: '#benefits' },
    ];

    // Filter Logic
    const filteredJobs = useMemo(() => {
        return MOCK_JOBS.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = activeDepartment === 'All' || job.department === activeDepartment;
            return matchesSearch && matchesDept;
        });
    }, [searchTerm, activeDepartment]);

    const handleViewDetails = (job: any) => {
        setSelectedJob(job);
        setIsModalOpen(true);
        setIsEmailSubmitted(false);
        setEmail('');
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate email submission
        setTimeout(() => {
            setIsEmailSubmitted(true);
        }, 500);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f1f5f9]">
            <TopBar
                leftContent={
                    <div className="flex gap-6">
                        <span className="flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                            Global Supply Chain Network
                        </span>
                        <span className="flex items-center gap-1 font-bold">
                            <span className="material-symbols-outlined text-sm">engineering</span>
                            Fleet & Logistics Excellence
                        </span>
                    </div>
                }
            />
            <Navbar customLinks={customNavLinks} />

            <main className="flex-1 w-full pb-20">
                {/* Careers Hero */}
                <section className="bg-primary py-24 px-10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                    <div className="max-w-6xl mx-auto relative z-10">
                        <span className="text-cobalt text-xs font-black tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-2">Building the Future of Commerce</span>
                        <h1 className="text-6xl font-black text-white uppercase tracking-tighter mb-6 max-w-4xl leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ color: '#FFFFFF' }}>
                            Join the <span className="text-cobalt italic">Supply Chain</span> Revolution
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            From complex warehouse logistics to B2B field sales, qnbim Wholesale is looking for driven professionals to scale our wholesale operations.
                        </p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Benefits */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div id="benefits" className="bg-white border border-slate-200 p-8 shadow-xl rounded-sm">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-cobalt block"></span> Employee Benefits
                            </h3>
                            <ul className="space-y-8">
                                {BENEFITS.map((benefit, idx) => (
                                    <li key={idx} className="group">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-10 h-10 bg-slate-50 rounded-sm border border-slate-100 flex items-center justify-center group-hover:bg-cobalt group-hover:border-cobalt transition-all duration-300">
                                                <span className="material-symbols-outlined text-cobalt text-xl group-hover:text-white transition-colors">{benefit.icon}</span>
                                            </div>
                                            <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{benefit.title}</p>
                                        </div>
                                        <p className="text-[11px] text-slate-500 ml-14 leading-relaxed font-bold">
                                            {benefit.desc}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-primary p-8 rounded-sm shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cobalt/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-cobalt mb-4 relative z-10">Our Mission</p>
                            <p className="text-sm italic leading-relaxed opacity-90 font-black relative z-10">
                                "To create the most efficient, transparent, and resilient wholesale distribution network in the industry."
                            </p>
                        </div>
                    </aside>

                    {/* Job Listings Area */}
                    <div className="lg:col-span-3 space-y-6 relative z-10">
                        {/* Search & Tabs */}
                        <div className="bg-white border border-slate-200 p-6 shadow-xl flex flex-wrap items-center justify-between gap-6 rounded-sm">
                            <div className="flex items-center gap-2 flex-wrap">
                                {['All', 'Warehouse', 'Logistics', 'Sales', 'Corporate'].map(dept => (
                                    <button
                                        key={dept}
                                        onClick={() => setActiveDepartment(dept)}
                                        className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all shadow-sm ${activeDepartment === dept
                                            ? 'bg-cobalt text-white shadow-cobalt/20'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                                            }`}
                                    >
                                        {dept === 'All' ? 'All Positions' : dept}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-80 group">
                                <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors ${searchTerm ? 'text-cobalt' : 'text-slate-400'}`}>search</span>
                                <input
                                    className="w-full pl-11 pr-4 py-3 text-sm font-black text-primary bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-cobalt/20 focus:border-cobalt outline-none transition-all placeholder:text-slate-300 placeholder:font-bold"
                                    placeholder="Search by title or location..."
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Job Table */}
                        <div className="bg-white border border-slate-200 shadow-2xl overflow-hidden rounded-sm transition-all duration-500">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Position Title</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Department</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
                                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredJobs.length > 0 ? (
                                            filteredJobs.map((job) => (
                                                <tr key={job.id} className="hover:bg-blue-50/30 transition-all group cursor-default">
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm font-black text-slate-900 group-hover:text-cobalt transition-colors mb-1">{job.title}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 border border-slate-100 uppercase tracking-tighter">{job.id}</span>
                                                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-tight">{job.type}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-2.5 py-1 ${job.deptColor} text-[10px] font-black uppercase rounded shadow-sm border border-black/5`}>
                                                            {job.department}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-black uppercase tracking-tight">
                                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                            {job.location} Hub
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <button
                                                            onClick={() => handleViewDetails(job)}
                                                            className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 hover:bg-cobalt transition-all rounded-sm shadow-md active:scale-95"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-20 text-center">
                                                    <span className="material-symbols-outlined text-4xl text-slate-200 mb-4 block">search_off</span>
                                                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-loose">
                                                        No open positions match your criteria. <br />
                                                        <span className="text-cobalt underline cursor-pointer" onClick={() => { setSearchTerm(''); setActiveDepartment('All'); }}>Reset filters</span> or join our talent pipeline below.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-between items-center px-8">
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                    Showing <span className="text-primary">{filteredJobs.length}</span> of <span className="text-primary">{MOCK_JOBS.length}</span> open positions
                                </p>
                                <div className="flex gap-2">
                                    <button className="w-9 h-9 flex items-center justify-center border border-slate-200 bg-white text-slate-400 cursor-not-allowed rounded-sm">
                                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                                    </button>
                                    <button className="w-9 h-9 flex items-center justify-center border border-slate-300 bg-white text-slate-900 hover:border-cobalt hover:bg-cobalt hover:text-white transition-all rounded-sm shadow-sm">
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* General Application CTA */}
                        <div className="bg-white border-2 border-dashed border-slate-200 p-12 text-center rounded-sm group hover:border-cobalt/50 transition-all shadow-lg hover:shadow-2xl">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-slate-100 group-hover:bg-cobalt group-hover:border-cobalt transition-all duration-500">
                                <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-white transition-colors">rocket_launch</span>
                            </div>
                            <h4 className="text-slate-900 font-black uppercase tracking-tight text-2xl mb-3">Don't see your ideal role?</h4>
                            <p className="text-slate-500 text-xs mb-8 max-w-sm mx-auto font-bold uppercase tracking-widest leading-relaxed">
                                Our network is constantly expanding. Send us your resume for future opportunities in logistics or B2B sales.
                            </p>
                            <button className="bg-primary text-white px-12 py-5 font-black text-[10px] uppercase tracking-widest hover:bg-cobalt transition-all shadow-xl shadow-primary/20 rounded-sm active:scale-95">
                                General Application
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Position on Hold Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-primary/95 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

                    <div className="relative bg-white max-w-lg w-full rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in duration-300 border border-white/5">
                        <div className="h-2 w-full bg-amber-500"></div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <div className="p-12 text-center">
                            {isEmailSubmitted ? (
                                <div className="animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-4xl text-royal">mark_email_read</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Priority Listed</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-xs mx-auto">
                                        We've logged your interest for <span className="text-primary">{selectedJob?.title}</span>. You will receive an immediate notification once the position re-opens.
                                    </p>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-10 bg-slate-900 text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-cobalt transition-all"
                                    >
                                        Return to Listings
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <span className="bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-sm border border-amber-100 flex items-center justify-center gap-2 w-fit mx-auto mb-6">
                                            <span className="material-symbols-outlined text-xs animate-pulse">pause_circle</span>
                                            Current Status: On Hold
                                        </span>
                                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Position Temporary On Hold</h3>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                            The <span className="text-primary font-black italic">{selectedJob?.title}</span> role is currently under internal review. Enter your professional email below to be notified the moment hiring resumes.
                                        </p>
                                    </div>

                                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">mail</span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter professional email"
                                                required
                                                className="w-full bg-slate-50 border border-slate-200 px-12 py-5 text-sm font-black text-primary outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all rounded-sm placeholder:text-slate-300"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-slate-900 text-white py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-all rounded-sm shadow-xl"
                                        >
                                            Notify me on Re-opening
                                        </button>
                                    </form>

                                    <p className="mt-8 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                        qnbim Privacy Protocol Active &bull; No Spam Guaranteed
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
