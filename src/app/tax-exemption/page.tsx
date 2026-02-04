import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TaxExemptionPage() {
    const customNavLinks = [
        { name: 'Catalog', href: '/catalog' },
        { name: 'LTL Rates', href: '/ltl-rates' },
        { name: 'Compliance', href: '/tax-exemption' },
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar customLinks={customNavLinks} />

            <main className="flex-1 max-w-6xl mx-auto w-full py-12 px-6">
                <div className="mb-10 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4 leading-none">Tax Exemption Compliance</h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Complete your business profile to enable tax-exempt purchasing. Your account will remain in 'Pending' status until all documentation is verified by our compliance team.
                    </p>

                    <div className="mt-12 flex items-center justify-center gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-teal-accent text-white flex items-center justify-center ring-4 ring-teal-50 shadow-lg shadow-teal-900/10">
                                <span className="material-symbols-outlined">how_to_reg</span>
                            </div>
                            <span className="text-[10px] font-black uppercase mt-3 tracking-widest text-teal-accent">Application</span>
                        </div>
                        <div className="h-[2px] w-20 bg-teal-accent"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center ring-4 ring-amber-50 shadow-lg shadow-amber-900/10">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <span className="text-[10px] font-black uppercase mt-3 tracking-widest text-amber-500">Verification</span>
                        </div>
                        <div className="h-[2px] w-20 bg-slate-200"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center ring-4 ring-slate-50">
                                <span className="material-symbols-outlined">task_alt</span>
                            </div>
                            <span className="text-[10px] font-black uppercase mt-3 tracking-widest text-slate-400">Verified</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="space-y-8">
                        <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm transition-all hover:border-teal-accent/20">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-teal-accent text-xl">info</span> Filing Instructions
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-xs font-black text-teal-accent bg-teal-50 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">01</span>
                                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                        <span className="font-black text-slate-900 uppercase tracking-tighter block mb-1">Resale Certificate</span>
                                        Upload a signed certificate for each state where you have nexus. PDF is preferred for data audit integrity.
                                    </p>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-black text-teal-accent bg-teal-50 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">02</span>
                                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                        <span className="font-black text-slate-900 uppercase tracking-tighter block mb-1">W-9 Form</span>
                                        Ensure the W-9 reflects the legal entity name and EIN used for your wholesale account registration.
                                    </p>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-black text-teal-accent bg-teal-50 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">03</span>
                                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                        <span className="font-black text-slate-900 uppercase tracking-tighter block mb-1">Audit Review</span>
                                        Our compliance team typically reviews documents within 24-48 business hours. You will receive an automated alert upon status change.
                                    </p>
                                </li>
                            </ul>
                            <div className="mt-8 pt-8 border-t border-slate-100 italic">
                                <a className="text-[11px] font-black text-teal-accent flex items-center gap-2 hover:underline uppercase tracking-widest" href="#">
                                    <span className="material-symbols-outlined text-base">download</span> Download W-9 Template
                                </a>
                            </div>
                        </div>

                        <div className="bg-primary text-white p-8 rounded-sm shadow-xl shadow-primary/10">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-accent mb-3 italic">Support Contact</p>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium mb-6">
                                Having trouble with your documents? Our compliance specialists are here to help during standard business hours.
                            </p>
                            <div className="space-y-1">
                                <p className="text-sm font-black italic tracking-tight">compliance@devbusinc.com</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global response time: ~4 hours</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden">
                            <div className="p-8 md:p-12">
                                <form action="#" className="space-y-10">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                                                <span className="w-10 h-[2px] bg-teal-accent"></span> 1. Resale Certificate
                                            </h2>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Crucial</span>
                                        </div>
                                        <div className="border-2 border-dashed border-slate-200 rounded-sm p-16 flex flex-col items-center justify-center bg-slate-50 hover:border-teal-accent hover:bg-teal-50/20 transition-all cursor-pointer group">
                                            <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-teal-accent transition-colors">upload_file</span>
                                            </div>
                                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Drop Resale Certificate here</p>
                                            <p className="text-[11px] text-slate-500 mt-2 font-medium">or click to browse local secure storage</p>
                                            <div className="mt-6 px-5 py-2 bg-white border border-slate-200 rounded-sm text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] shadow-sm">
                                                Accepted Patterns: PDF, JPG, PNG (Max 15MB)
                                            </div>
                                            <input className="hidden" type="file" />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-3">
                                                <span className="w-10 h-[2px] bg-teal-accent"></span> 2. Request for Taxpayer ID (W-9)
                                            </h2>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Crucial</span>
                                        </div>
                                        <div className="border-2 border-dashed border-slate-200 rounded-sm p-16 flex flex-col items-center justify-center bg-slate-50 hover:border-teal-accent hover:bg-teal-50/20 transition-all cursor-pointer group">
                                            <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-teal-accent transition-colors">assignment</span>
                                            </div>
                                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Drop signed W-9 Form here</p>
                                            <p className="text-[11px] text-slate-500 mt-2 font-medium">Ensure the form is physically or digitally signed</p>
                                            <div className="mt-6 px-5 py-2 bg-white border border-slate-200 rounded-sm text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] shadow-sm">
                                                Accepted Pattern: PDF Only
                                            </div>
                                            <input className="hidden" type="file" />
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-sm">
                                        <label className="flex items-start gap-5 cursor-pointer">
                                            <input className="mt-1.5 w-5 h-5 rounded text-teal-accent focus:ring-teal-accent border-slate-300 transition-all" type="checkbox" id="tax-auth" />
                                            <div className="space-y-2">
                                                <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Declaration of Compliance Authenticity</p>
                                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                                    I declare under penalty of perjury that the documentation provided is true, correct, and current. I understand that DevBusinc Wholesale Store relies on this information for sales tax exemption purposes across state jurisdictions.
                                                </p>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="pt-8 flex flex-col md:flex-row items-center justify-end gap-6 border-t border-slate-100">
                                        <button className="w-full md:w-auto text-slate-400 font-black text-xs uppercase tracking-widest px-10 py-5 hover:text-slate-900 transition-colors">
                                            Save for Later
                                        </button>
                                        <button className="w-full md:w-auto bg-teal-accent text-white px-14 py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-700 transition-all shadow-xl shadow-teal-900/20 flex items-center justify-center gap-3 active:scale-[0.98]" type="submit">
                                            <span className="material-symbols-outlined text-xl">verified_user</span>
                                            Submit for Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
