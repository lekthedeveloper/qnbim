'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function SignupPage() {
    const router = useRouter();
    const { submitApplication, isApplicationSubmitted } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const customNavLinks = [
        { name: 'Catalog', href: '/catalog' },
        { name: 'LTL Rates', href: '/ltl-rates' },
        { name: 'Application Status', href: isApplicationSubmitted ? '/application-status' : '#' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = {
            businessName: formData.get('businessName'),
            ein: formData.get('ein'),
            industry: formData.get('industry'),
            volume: formData.get('volume'),
            timestamp: new Date().toLocaleString(),
        };

        // Simulate application processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        submitApplication(data);
        setIsSubmitting(false);
        router.push('/application-status');
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar customLinks={customNavLinks} />

            <main className="flex-1 max-w-5xl mx-auto w-full py-12 px-6">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <div className="inline-block bg-teal-accent/10 text-teal-accent text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-teal-accent/20">
                        B2B Enrollment Protocol
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4 leading-none">Wholesale Application</h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Complete our three-step commercial vetting process to establish a wholesale credit line and LTL distribution agreement.
                    </p>
                </div>

                {/* Step Progress Indicator */}
                <div className="mb-10 md:mb-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between max-w-3xl mx-auto relative px-4 gap-6 md:gap-0">
                        {/* Horizontal line for desktop */}
                        <div className="hidden md:block absolute top-[20px] left-0 w-full h-[2px] bg-slate-200 -z-0"></div>
                        {/* Vertical line for mobile */}
                        <div className="md:hidden absolute left-[39px] top-4 bottom-4 w-[2px] bg-slate-200 -z-0"></div>

                        <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 bg-[#f8fafc] md:px-3">
                            <div className="w-10 h-10 rounded-full border-2 border-teal-600 bg-teal-accent text-white flex items-center justify-center font-black text-sm shadow-md ring-4 ring-white">1</div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">Business Identity</span>
                        </div>

                        <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 bg-[#f8fafc] md:px-3">
                            <div className="w-10 h-10 rounded-full border-2 border-slate-300 bg-white text-slate-300 flex items-center justify-center font-black text-sm">2</div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Buying Profile</span>
                        </div>

                        <div className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 bg-[#f8fafc] md:px-3">
                            <div className="w-10 h-10 rounded-full border-2 border-slate-300 bg-white text-slate-300 flex items-center justify-center font-black text-sm">3</div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Credit References</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    {/* Step 1: Business Identity */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-[8px] overflow-hidden transition-all hover:border-teal-accent/30">
                        <div className="bg-slate-50/50 px-6 md:px-8 py-4 md:py-5 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#001A2C] flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg text-teal-accent">business</span> Step 1: Business Identity
                            </h3>
                            <span className="hidden sm:inline text-[9px] md:text-[10px] font-bold text-teal-600 uppercase tracking-wider">Required Section</span>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Legal Business Name</label>
                                <input
                                    required
                                    name="businessName"
                                    className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] placeholder:text-slate-400 focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none transition-all bg-white"
                                    placeholder="Corporate Entity Name"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">EIN (Tax ID)</label>
                                <input
                                    required
                                    name="ein"
                                    className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] placeholder:text-slate-400 focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white"
                                    placeholder="XX-XXXXXXX"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">DBA (Doing Business As)</label>
                                <input
                                    className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] placeholder:text-slate-400 focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white"
                                    placeholder="Store Name (if different)"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Years in Business</label>
                                <input
                                    required
                                    className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] placeholder:text-slate-400 focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white"
                                    placeholder="e.g. 5"
                                    type="number"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Incorporation State</label>
                                <select required className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white">
                                    <option value="" className="text-slate-400">Select State</option>
                                    <option value="DE" className="text-[#001A2C]">Delaware</option>
                                    <option value="NY" className="text-[#001A2C]">New York</option>
                                    <option value="TX" className="text-[#001A2C]">Texas</option>
                                    <option value="CA" className="text-[#001A2C]">California</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Buying Profile */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-[8px] overflow-hidden transition-all hover:border-teal-accent/30">
                        <div className="bg-slate-50/50 px-6 md:px-8 py-4 md:py-5 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#001A2C] flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg text-teal-accent">analytics</span> Step 2: Buying Profile
                            </h3>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Primary Industry</label>
                                <select required name="industry" className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white">
                                    <option value="" className="text-slate-400">Select Industry</option>
                                    <option value="Retail Distribution" className="text-[#001A2C]">Retail Distribution</option>
                                    <option value="Hospitality & Leisure" className="text-[#001A2C]">Hospitality & Leisure</option>
                                    <option value="Industrial / Construction" className="text-[#001A2C]">Industrial / Construction</option>
                                    <option value="Government / Education" className="text-[#001A2C]">Government / Education</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Annual Volume</label>
                                <select required name="volume" className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white">
                                    <option value="" className="text-slate-400">Select Range</option>
                                    <option value="Under $100k" className="text-[#001A2C]">Under $100k</option>
                                    <option value="$100k - $500k" className="text-[#001A2C]">$100k - $500k</option>
                                    <option value="$500k - $2M" className="text-[#001A2C]">$500k - $2M</option>
                                    <option value="$2M+" className="text-[#001A2C]">$2M+</option>
                                </select>
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight mb-2 block">Product Categories</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    {[
                                        'Paper & Tissue Products',
                                        'Personal Care & Hygiene',
                                        'Cleaning & Janitorial Supplies',
                                        'Bulk Pet Food & Supplies'
                                    ].map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 text-[10px] md:text-[11px] font-black text-slate-900 uppercase cursor-pointer group bg-slate-50 p-4 border border-slate-200 rounded-[8px] hover:border-teal-accent transition-all active:scale-[0.98]">
                                            <input className="w-5 h-5 rounded text-teal-600 border-slate-300 focus:ring-teal-accent checked:border-teal-accent" type="checkbox" />
                                            <span className="group-hover:text-teal-600 transition-colors uppercase tracking-tight">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Credit References */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-[8px] overflow-hidden transition-all hover:border-teal-accent/30">
                        <div className="bg-slate-50/50 px-6 md:px-8 py-4 md:py-5 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#001A2C] flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg text-teal-accent">account_balance</span> Step 3: Credit References
                            </h3>
                            <span className="hidden sm:inline text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">3 References Required</span>
                        </div>
                        <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Ref {num}: Company Name</label>
                                        <input required className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] placeholder:text-slate-400 focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white" placeholder="Enter Company Name" type="text" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Contact Person</label>
                                        <input required className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] placeholder:text-slate-400 focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white" placeholder="Full Name" type="text" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black uppercase text-slate-900 tracking-tight">Phone/Email</label>
                                        <input required className="w-full border-slate-300 border rounded-[8px] text-[13px] md:text-sm font-bold text-[#001A2C] placeholder:text-slate-400 focus:ring-2 focus:ring-teal-accent focus:border-teal-accent py-3 md:py-2.5 px-4 outline-none bg-white" placeholder="accounts@vendor.com" type="text" />
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2">
                                <label className="text-[11px] font-black uppercase text-slate-900 mb-3 block tracking-tight italic">Upload Resale Certificate (Required)</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-[8px] p-8 md:p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-teal-accent transition-all cursor-pointer group border-spacing-4">
                                    <span className="material-symbols-outlined text-3xl md:text-4xl text-slate-400 group-hover:text-teal-accent mb-2 transition-colors">upload_file</span>
                                    <p className="text-[10px] md:text-[11px] text-slate-900 font-black uppercase tracking-widest text-center">Drag & drop or tap to browse</p>
                                    <p className="text-[9px] md:text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest text-center">PDF, JPG or PNG (MAX 10MB)</p>
                                    <input className="hidden" type="file" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-8 pt-8 border-t border-slate-200">
                        <div className="flex items-start gap-4 max-w-md bg-slate-50 p-4 md:p-0 md:bg-transparent rounded-[8px] md:rounded-none">
                            <input required className="mt-1 h-6 w-6 rounded text-teal-600 border-slate-300 focus:ring-teal-accent checked:border-teal-accent cursor-pointer" type="checkbox" id="auth-check" />
                            <label htmlFor="auth-check" className="text-[10px] md:text-[11px] text-slate-900 leading-tight font-black uppercase cursor-pointer italic">
                                I hereby authorize Heidi Store to contact the references provided and perform a commercial credit check. submitting false info will immediately disqualify my application.
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <button className="flex-1 md:flex-none border border-slate-300 text-slate-900 px-8 md:px-10 py-4 md:py-5 font-black text-xs uppercase tracking-widest hover:bg-white transition-all rounded-[8px] shadow-sm active:scale-[0.98]" type="button">
                                Save Draft
                            </button>
                            <button
                                disabled={isSubmitting}
                                className={`flex-1 md:flex-none bg-teal-accent text-white px-10 md:px-12 py-4 md:py-5 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-teal-900/10 rounded-[8px] flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-teal-700 active:scale-[0.98]'}`}
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Vetting Business...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Info Grid Footer */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-slate-200 pt-16">
                    <div className="flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-4xl text-teal-accent">support_agent</span>
                        <div>
                            <h4 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Live Assistance</h4>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-tight">Need help with your application?<br /><span className="text-primary font-bold">Call 1-800-HEIDI-B2B</span></p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-4xl text-teal-accent">schedule</span>
                        <div>
                            <h4 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Review Timeline</h4>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-tight">Vetting typically takes<br /><span className="text-primary font-bold">24-48 Business Hours</span></p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-4xl text-teal-accent">security</span>
                        <div>
                            <h4 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Industrial Data Security</h4>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-tight">Encrypted SSL Processing<br /><span className="text-primary font-bold">Compliant with PCI-DSS</span></p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
