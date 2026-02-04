'use client';

import React, { useState } from 'react';
import SuccessModal from './SuccessModal';

const WholesaleForm = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSuccess(true);
    };

    return (
        <div className="lg:col-span-2 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* ... business info ... */}
                <div>
                    <h2 className="text-xs font-black uppercase tracking-widest text-teal-accent mb-6 flex items-center gap-2">
                        <span className="w-6 h-px bg-teal-accent"></span> Business Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase text-[#001A2C]">Contact Name</label>
                            <input
                                className="w-full border border-slate-300 rounded text-sm focus:ring-teal-accent focus:border-teal-accent py-2.5 px-3 outline-none text-[#001A2C] font-semibold placeholder:text-slate-400"
                                placeholder="John Doe"
                                type="text"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase text-[#001A2C]">Company Name</label>
                            <input
                                className="w-full border border-slate-300 rounded text-sm focus:ring-teal-accent focus:border-teal-accent py-2.5 px-3 outline-none text-[#001A2C] font-semibold placeholder:text-slate-400"
                                placeholder="Acme Logistics LLC"
                                type="text"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase text-[#001A2C]">Tax ID / EIN</label>
                            <input
                                className="w-full border border-slate-300 rounded text-sm focus:ring-teal-accent focus:border-teal-accent py-2.5 px-3 outline-none text-[#001A2C] font-semibold placeholder:text-slate-400"
                                placeholder="XX-XXXXXXX"
                                type="text"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase text-[#001A2C]">Business Type</label>
                            <select className="w-full border border-slate-300 rounded text-sm focus:ring-teal-accent focus:border-teal-accent py-2.5 px-3 bg-white outline-none text-[#001A2C] font-semibold" required>
                                <option value="">Select Category</option>
                                <option value="retail">Brick & Mortar Retail</option>
                                <option value="ecommerce">E-commerce Vendor</option>
                                <option value="hospitality">Hospitality / Hotel</option>
                                <option value="property">Property Management</option>
                                <option value="nonprofit">Non-Profit Organization</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[11px] font-bold uppercase text-[#001A2C]">Estimated Monthly Volume</label>
                            <select className="w-full border border-slate-300 rounded text-sm focus:ring-teal-accent focus:border-teal-accent py-2.5 px-3 bg-white outline-none text-[#001A2C] font-semibold" required>
                                <option value="">Select Range</option>
                                <option value="1">Under $5,000</option>
                                <option value="2">$5,000 - $15,000</option>
                                <option value="3">$15,000 - $50,000</option>
                                <option value="4">$50,000+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Document Upload */}
                <div>
                    <h2 className="text-xs font-black uppercase tracking-widest text-teal-accent mb-6 flex items-center gap-2">
                        <span className="w-6 h-px bg-teal-accent"></span> Document Upload
                    </h2>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase text-slate-500">Resale Certificate (PDF, JPG, PNG)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-teal-accent mb-2">cloud_upload</span>
                            <p className="text-xs font-medium text-slate-600">Click to upload or drag and drop</p>
                            <p className="text-[10px] text-slate-400 mt-1">Maximum file size: 10MB</p>
                            <input className="hidden" type="file" />
                        </div>
                    </div>
                </div>

                {/* Footer / Submit */}
                <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input className="mt-1 rounded text-teal-accent focus:ring-teal-accent border-slate-300" type="checkbox" required />
                        <span className="text-[11px] text-[#001A2C] font-bold leading-tight uppercase">
                            I certify that I am a business owner or authorized representative and that all information provided is accurate.
                        </span>
                    </label>
                    <button
                        className="w-full md:w-auto bg-teal-accent text-white px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/10 active:scale-95"
                        type="submit"
                    >
                        SUBMIT APPLICATION
                    </button>
                </div>
            </form>

            <SuccessModal
                isOpen={isSuccess}
                onClose={() => setIsSuccess(false)}
                title="Application Received"
                message="Your wholesale procurement application has been submitted successfully. Our logistics division will verify your credentials within 24-48 business hours."
            />
        </div>
    );
};

export default WholesaleForm;
