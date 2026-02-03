'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Mock Data Model
const MOCK_APPLICATIONS = [
    { id: '#HS-88291-VX', name: 'popnsizzle', step: 2, status: 'Under Review' },
    { id: '#HS-WHSE-77', name: 'Global Logistics', step: 3, status: 'Finalizing' }
];

export default function ApplicationStatusPage() {
    const { applicationData, isAuthenticated } = useCart();
    const router = useRouter();

    // Guard Logic
    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?message=Please sign in to access the Partner Portal.');
        }
    }, [isAuthenticated, router]);

    // Prevent rendering flicker
    if (!isAuthenticated) return null;

    // States
    const [searchId, setSearchId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [foundApplication, setFoundApplication] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSearching(true);

        // Professional delay to simulate database query
        await new Promise(resolve => setTimeout(resolve, 1200));

        const match = MOCK_APPLICATIONS.find(app => app.id.toUpperCase() === searchId.trim().toUpperCase());

        if (match) {
            setFoundApplication(match);
        } else {
            setError('Invalid Reference Number. Please check your email for the correct ID or contact compliance@heidi.store.');
        }
        setIsSearching(false);
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById('printable-application');
        if (!element) return;

        element.style.display = 'block';
        const canvas = await html2canvas(element, { scale: 2, logging: false, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`HeidiStore_Application_${foundApplication?.name.replace(/\s+/g, '_')}.pdf`);
        element.style.display = 'none';
    };

    const submittedOn = applicationData?.timestamp || "February 3, 2026";

    // VIEW: Lookup Gateway
    if (!foundApplication) {
        return (
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f1f5f9]">
                <TopBar />
                <Navbar />

                <main className="flex-1 flex items-center justify-center p-6 py-20 relative z-10">
                    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#001A2C 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                    <div className="max-w-md w-full bg-white border border-slate-200 rounded-sm shadow-2xl overflow-hidden relative z-10">
                        <div className="bg-primary py-4 px-8 border-b border-slate-800">
                            <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="material-symbols-outlined text-teal-accent text-sm">shield</span>
                                Secure Status Tracking
                            </h2>
                        </div>

                        <div className="p-10">
                            <div className="text-center mb-8">
                                <span className="material-symbols-outlined text-5xl text-slate-300 font-thin mb-4">manage_search</span>
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Application Lookup</h3>
                                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                                    Enter your institutional reference code to retrieve real-time verification status.
                                </p>
                            </div>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reference Number</label>
                                    <input
                                        type="text"
                                        placeholder="#HS-XXXXX-XX"
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                        className={`w-full bg-slate-50 border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-sm px-4 py-4 text-sm font-black text-primary focus:ring-2 focus:ring-teal-accent outline-none transition-all placeholder:text-slate-300`}
                                        required
                                    />
                                </div>

                                {error && (
                                    <p className="text-[10px] text-red-500 font-black uppercase tracking-tight leading-relaxed animate-in fade-in slide-in-from-top-2">
                                        {error}
                                    </p>
                                )}

                                <button
                                    disabled={isSearching}
                                    type="submit"
                                    className="w-full bg-teal-accent text-white py-4 text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition-all rounded-sm flex items-center justify-center gap-3 shadow-lg shadow-teal-accent/20 disabled:opacity-50"
                                >
                                    {isSearching ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Searching Database...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-sm">database</span>
                                            Check Status
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    Lost your ID? <Link href="/signup" className="text-primary underline decoration-teal-accent underline-offset-4">Resubmit enrollment package</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // VIEW: Dashboard Result State
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f1f5f9] selection:bg-teal-accent selection:text-white">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#001A2C 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <TopBar />
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-20 relative z-10 animate-in fade-in duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Progress Tracker */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-[#e2e8f0] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden transition-all duration-700">
                            <div className="bg-primary py-1.5 px-8"></div>
                            <div className="p-10">
                                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Application Status</h1>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                                            Reference: <span className="text-primary italic">{foundApplication.id}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Last Update</p>
                                        <p className="text-xs font-black text-slate-900">{submittedOn}</p>
                                    </div>
                                </div>

                                {/* Vertical Stepper */}
                                <div className="space-y-12 relative">
                                    <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-100"></div>

                                    {/* Step 1: Completed */}
                                    <div className="relative flex items-start gap-8 group">
                                        <div className="relative z-10 w-10 h-10 rounded-full bg-teal-accent text-white flex items-center justify-center border-4 border-white shadow-lg">
                                            <span className="material-symbols-outlined text-xl">check</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">Step 1: Application Submitted</h3>
                                            <p className="text-xs text-slate-500 font-medium">Digital enrollment package received and timestamped.</p>
                                            <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest mt-2 block">COMPLETED</span>
                                        </div>
                                    </div>

                                    {/* Step 2: In Progress / Completed */}
                                    <div className={`relative flex items-start gap-8 group ${foundApplication.step < 2 ? 'opacity-40' : ''}`}>
                                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${foundApplication.step > 2 ? 'bg-teal-accent text-white' : 'bg-amber-50 text-amber-500'
                                            }`}>
                                            {foundApplication.step > 2 ? (
                                                <span className="material-symbols-outlined text-xl">check</span>
                                            ) : (
                                                <div className="w-2.4 h-2.4 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">Step 2: Identity & EIN Verification</h3>
                                            <p className="text-xs text-slate-500 font-medium italic">
                                                {foundApplication.step === 2
                                                    ? "We are currently verifying your EIN with the IRS database. No action is required from you at this time."
                                                    : "Business identity and tax credentials have been successfully verified."}
                                            </p>
                                            <span className={`text-[9px] font-black uppercase tracking-widest mt-2 block ${foundApplication.step > 2 ? 'text-teal-600' : 'text-amber-600 animate-pulse'
                                                }`}>
                                                {foundApplication.step > 2 ? 'COMPLETED' : 'UNDER REVIEW'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Step 3: Pending / In Progress */}
                                    <div className={`relative flex items-start gap-8 group ${foundApplication.step < 3 ? 'opacity-40' : ''}`}>
                                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${foundApplication.step === 3 ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            {foundApplication.step === 3 ? (
                                                <div className="w-2.4 h-2.4 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                                            ) : (
                                                <span className="text-xs font-black">03</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">Step 3: Credit Line Approval</h3>
                                            <p className="text-xs text-slate-500 font-medium">Finalizing Net-30 credit terms and LTL freight rate card.</p>
                                            <span className={`text-[9px] font-black uppercase tracking-widest mt-2 block ${foundApplication.step === 3 ? 'text-amber-600 animate-pulse' : 'text-slate-400'
                                                }`}>
                                                {foundApplication.step === 3 ? 'IN PROGRESS' : 'PENDING'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message Center */}
                        <div className="bg-[#001A2C] border border-slate-800 rounded-sm p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-accent/5 -mr-16 -mt-16 rounded-full"></div>
                            <div className="flex items-start gap-4 relative z-10">
                                <div className="p-2 bg-slate-800 rounded-sm border border-slate-700">
                                    <span className="material-symbols-outlined text-teal-accent text-xl">info</span>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Internal Message Center</h4>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                        "Hello <span className="text-white font-bold">{foundApplication.name}</span>, our team is processing your Resale Certificate. Your account will automatically switch to tax-exempt status once verified. You can still browse the catalog and save drafts in the meantime."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Key Details & Actions */}
                    <div className="space-y-6">
                        <div className="bg-white border border-[#e2e8f0] p-8 rounded-sm shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/5 -mr-12 -mt-12 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
                            <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6">Quick Actions</h4>
                            <div className="space-y-3">
                                <button
                                    onClick={handleDownloadPDF}
                                    className="w-full bg-teal-accent text-white px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 transition-all flex items-center justify-center gap-2 rounded-sm shadow-lg shadow-teal-accent/10"
                                >
                                    <span className="material-symbols-outlined text-sm">description</span>
                                    Download Application PDF
                                </button>
                                <button
                                    onClick={() => setFoundApplication(null)}
                                    className="w-full border-2 border-slate-200 text-slate-900 px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 rounded-sm"
                                >
                                    <span className="material-symbols-outlined text-sm">manage_search</span>
                                    Track another application
                                </button>
                                <Link
                                    href="/"
                                    className="w-full border-2 border-slate-200 text-slate-900 px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 rounded-sm"
                                >
                                    <span className="material-symbols-outlined text-sm">home</span>
                                    Back to Warehouse
                                </Link>
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm">
                            <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-4">Verification Details</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <span className="text-[10px] font-black uppercase text-slate-500">Entity</span>
                                    <span className="text-[10px] font-black uppercase text-primary">{foundApplication.name}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <span className="text-[10px] font-black uppercase text-slate-500">Tier</span>
                                    <span className="text-[10px] font-black uppercase text-primary">Industrial Wholesale</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase text-slate-500">Review SLA</span>
                                    <span className="text-[10px] font-black uppercase text-primary">24h Priority</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-dashed border-slate-200 p-8 rounded-sm text-center">
                            <span className="material-symbols-outlined text-3xl text-slate-300 mb-2">contact_support</span>
                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Questions?</p>
                            <p className="text-xs font-black text-slate-900 mt-1">compliance@heidi.store</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Hidden Template for PDF Capture */}
            <div id="printable-application" style={{ position: 'fixed', top: '-10000px', width: '800px', background: 'white', padding: '60px', color: '#001A2C', fontFamily: 'sans-serif', display: 'none' }}>
                <div style={{ borderBottom: '4px solid #001A2C', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', margin: 0, letterSpacing: '-1px' }}>Heidi Store</h1>
                        <p style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0 0 0', color: '#64748b' }}>Industrial Distribution & Logistics</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '12px', fontWeight: '900', margin: 0 }}>OFFICIAL PROCUREMENT DOCUMENT</p>
                        <p style={{ fontSize: '10px', margin: '2px 0 0 0', color: '#64748b' }}>Ref: {foundApplication.id}</p>
                    </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>Application Summary</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px 0', fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', width: '200px' }}>Legal Business Name</td>
                                <td style={{ padding: '10px 0', fontSize: '11px', fontWeight: '900' }}>{foundApplication.name}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 0', fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Current Status</td>
                                <td style={{ padding: '10px 0', fontSize: '11px', fontWeight: '900' }}>{foundApplication.status}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 0', fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Review Phase</td>
                                <td style={{ padding: '10px 0', fontSize: '11px', fontWeight: '900' }}>Phase {foundApplication.step} of 3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ background: '#f8fafc', padding: '30px', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '15px' }}>Official Status Verification</h2>
                    <p style={{ fontSize: '10px', lineHeight: '1.6', margin: 0 }}>This document provides the real-time status of the wholesale enrollment package associated with ID {foundApplication.id}. Our compliance team is currently overseeing Phase {foundApplication.step}.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
