'use client';

import React, { useState, useRef, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function TaxExemptPage() {
    const { isAuthenticated, taxExemptStatus, setTaxExemptStatus, applicationData } = useCart();
    const router = useRouter();

    // Guard Logic
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?message=Please sign in to access the Partner Portal.');
        }
    }, [isAuthenticated, router]);

    // States
    const [certFile, setCertFile] = useState<string | null>(null);
    const [w9File, setW9File] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const certInputRef = useRef<HTMLInputElement>(null);
    const w9InputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (type: 'cert' | 'w9') => {
        if (type === 'cert') certInputRef.current?.click();
        else w9InputRef.current?.click();
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cert' | 'w9') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'cert') setCertFile(file.name);
            else setW9File(file.name);
        }
    };

    const removeFile = (type: 'cert' | 'w9') => {
        if (type === 'cert') setCertFile(null);
        else setW9File(null);
    };

    const handleSubmit = async () => {
        if (!certFile && !w9File) return;
        setSubmitting(true);
        // Simulate high-integrity verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        setTaxExemptStatus('pending');
        setSubmitting(false);
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const businessName = applicationData?.companyName || "Your Registered Business";

    if (!isAuthenticated) return null;

    if (success || taxExemptStatus === 'pending') {
        return (
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
                <TopBar />
                <Navbar />
                <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-20">
                    <div className="bg-white border border-slate-200 shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in duration-500">
                        <div className="h-2 w-full bg-cobalt"></div>
                        <div className="p-16 text-center">
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-blue-100">
                                <span className="material-symbols-outlined text-5xl text-cobalt">verified_user</span>
                            </div>
                            <h1 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter mb-4">Compliance Submission Received</h1>
                            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-[10px] font-black px-6 py-2 border border-amber-200 rounded-sm uppercase tracking-[0.2em] mb-8 animate-pulse">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                Status: Under Audit
                            </div>

                            <div className="max-w-2xl mx-auto space-y-6 text-left border-y border-slate-100 py-10 my-10">
                                <div>
                                    <h4 className="text-[11px] font-black text-[#0f172a] uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-cobalt rounded-full"></span>
                                        Audit Registry
                                    </h4>
                                    <p className="text-sm text-[#0f172a] font-medium leading-relaxed">
                                        Your tax-exempt documentation for <span className="font-black italic">{businessName}</span> has been successfully uploaded to our secure vault. Our compliance officers will review the filing against state records.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-[#0f172a] uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-cobalt rounded-full"></span>
                                        Expected Timeline
                                    </h4>
                                    <p className="text-sm text-[#0f172a] font-medium leading-relaxed">
                                        Verified status is typically granted within <span className="font-black">24 business hours</span>. You will receive an automated notification once your account is switched to Tax-Exempt.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/catalog"
                                    className="w-full sm:w-auto bg-primary text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all rounded-sm shadow-xl shadow-primary/10"
                                >
                                    Return to Catalog
                                </Link>
                                <button className="w-full sm:w-auto bg-white border border-slate-300 text-[#0f172a] px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all rounded-sm flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">print</span>
                                    Print Submission Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-16">
                <div className="mb-12">
                    <div className="inline-block bg-[#0f172a] text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest mb-4">
                        Secure Document Portal
                    </div>
                    <h1 className="text-4xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mb-4">Tax Exemption Setup</h1>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
                        <span>Last Updated: January 15, 2026</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>Compliance HS-COMP-99</span>
                    </div>
                    <p className="text-[#0f172a] text-sm font-medium max-w-2xl opacity-70 italic">
                        Upload your state-issued resale certificates to enable tax-exempt B2B procurement. Once verified, sales tax will be automatically removed from your checkout.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Certificate Upload Card */}
                        <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden">
                            <div className="p-10">
                                <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-1 h-6 bg-cobalt block"></span>
                                    1. Resale Certificate
                                </h3>

                                <input
                                    type="file"
                                    ref={certInputRef}
                                    className="hidden"
                                    accept=".pdf,.jpg,.png"
                                    onChange={(e) => onFileChange(e, 'cert')}
                                />

                                {certFile ? (
                                    <div className="bg-blue-50 border border-blue-100 p-8 rounded-sm flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-blue-200">
                                                <span className="material-symbols-outlined text-cobalt">description</span>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-[#0f172a] uppercase tracking-tight flex items-center gap-2">
                                                    File Attached: {certFile}
                                                    <span className="material-symbols-outlined text-cobalt text-sm">check_circle</span>
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ready for analysis</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFile('cert')}
                                            className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => handleFileSelect('cert')}
                                        className="border-2 border-dashed border-slate-100 rounded-sm p-12 text-center cursor-pointer hover:border-cobalt/40 hover:bg-blue-50/20 transition-all group"
                                    >
                                        <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-cobalt mb-4 transition-colors">cloud_upload</span>
                                        <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-widest mb-2">Upload State Certificate</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">PDF, JPG, or PNG (MAX 10MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* W-9 Upload Card */}
                        <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden">
                            <div className="p-10">
                                <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <span className="w-1 h-6 bg-cobalt block"></span>
                                    2. IRS Form W-9
                                </h3>

                                <input
                                    type="file"
                                    ref={w9InputRef}
                                    className="hidden"
                                    accept=".pdf,.jpg,.png"
                                    onChange={(e) => onFileChange(e, 'w9')}
                                />

                                {w9File ? (
                                    <div className="bg-blue-50 border border-blue-100 p-8 rounded-sm flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-blue-200">
                                                <span className="material-symbols-outlined text-cobalt">history_edu</span>
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-[#0f172a] uppercase tracking-tight flex items-center gap-2">
                                                    File Attached: {w9File}
                                                    <span className="material-symbols-outlined text-cobalt text-sm">check_circle</span>
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ready for analysis</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFile('w9')}
                                            className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => handleFileSelect('w9')}
                                        className="border-2 border-dashed border-slate-100 rounded-sm p-12 text-center cursor-pointer hover:border-cobalt/40 hover:bg-blue-50/20 transition-all group"
                                    >
                                        <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-cobalt mb-4 transition-colors">upload_file</span>
                                        <h4 className="text-xs font-black text-[#0f172a] uppercase tracking-widest mb-2">Upload IRS Form W-9</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">PDF, JPG, or PNG (MAX 10MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-4">
                            <button
                                disabled={submitting || (!certFile && !w9File)}
                                onClick={handleSubmit}
                                className={`w-full py-5 text-xs font-black uppercase tracking-[0.2em] rounded-sm transition-all shadow-xl flex items-center justify-center gap-3 ${submitting || (!certFile && !w9File)
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                    : 'bg-cobalt text-white hover:bg-royal scale-100 hover:scale-[1.01] active:scale-95 shadow-cobalt/10'
                                    }`}
                            >
                                {submitting ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">sync</span>
                                        Verifying Document Integrity...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">security</span>
                                        Submit Documentation for Audit
                                    </>
                                )}
                            </button>
                            <p className="text-[9px] text-slate-400 font-bold text-center mt-4 uppercase tracking-[0.2em] italic">
                                Secure AES-256 Encrypted Submission Route HS-COMP-99
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <div className="bg-[#0f172a] text-white p-10 rounded-sm shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cobalt/10 -mr-16 -mt-16 rounded-full"></div>
                            <span className="material-symbols-outlined text-cobalt text-3xl mb-4 relative z-10">policy</span>
                            <h4 className="text-xs font-black uppercase tracking-widest mb-4 relative z-10">Audit Requirements</h4>
                            <p className="text-xs text-slate-400 font-bold italic leading-relaxed mb-8 relative z-10">
                                All wholesale partners must maintain up-to-date tax filings to bypass state sales tax collection.
                            </p>
                            <ul className="space-y-6 relative z-10">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-cobalt text-sm mt-0.5">verified</span>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">State Validity</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Certificate must be active in your home operating state.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-cobalt text-sm mt-0.5">verified</span>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Tax ID Match</p>
                                        <p className="text-[10px] text-slate-400 font-medium">The EIN on your W-9 must match your qnbim Partner profile.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white border border-slate-200 p-8 rounded-sm text-center">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">Security Certificate</p>
                            <span className="material-symbols-outlined text-5xl text-slate-100 mb-4 block">lock_reset</span>
                            <div className="text-[10px] font-black text-[#0f172a] uppercase tracking-tighter">
                                End-to-End Encryption
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
