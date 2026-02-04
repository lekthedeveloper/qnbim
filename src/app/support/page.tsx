'use client';

import React, { useState } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessModal from '@/components/SuccessModal';

const SupportPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        department: 'general',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSuccess(true);
            setFormData({
                name: '',
                email: '',
                company: '',
                department: 'general',
                message: ''
            });
        }, 800);
    };

    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar />

            <main className="flex-1">
                {/* Hero section */}
                <section className="bg-[#0f172a] pt-16 pb-24 px-6 md:px-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-royal/20 to-transparent pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block bg-cobalt text-white text-[10px] font-black px-2 py-0.5 mb-6 uppercase tracking-widest">
                                Institutional Help Desk
                            </span>
                            <h1 className="text-white text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter mb-6" style={{ color: '#FFFFFF' }}>
                                Enterprise <span className="text-cobalt">Support</span> Protocol
                            </h1>
                            <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
                                Direct channel for wholesale account management, logistics coordination, and technical procurement assistance.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="max-w-7xl mx-auto -mt-12 px-6 pb-24 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Form Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 bg-white border border-slate-200 shadow-2xl overflow-hidden rounded-[8px]"
                        >
                            <div className="p-8 md:p-12">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-[#0f172a] tracking-widest">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full border border-slate-200 p-4 text-sm focus:ring-cobalt focus:border-cobalt outline-none text-[#0f172a] font-semibold rounded-[4px] bg-slate-50/50"
                                                placeholder="Executive Name"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-[#0f172a] tracking-widest">Business Email</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full border border-slate-200 p-4 text-sm focus:ring-cobalt focus:border-cobalt outline-none text-[#0f172a] font-semibold rounded-[4px] bg-slate-50/50"
                                                placeholder="ops@company.com"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-[#0f172a] tracking-widest">Company / Entity</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full border border-slate-200 p-4 text-sm focus:ring-cobalt focus:border-cobalt outline-none text-[#0f172a] font-semibold rounded-[4px] bg-slate-50/50"
                                                placeholder="Legal Business Name"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-[#0f172a] tracking-widest">Inquiry Type</label>
                                            <select
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                className="w-full border border-slate-200 p-4 text-sm focus:ring-cobalt focus:border-cobalt outline-none text-[#0f172a] font-semibold rounded-[4px] bg-slate-50/50 appearance-none"
                                            >
                                                <option value="general">General Support</option>
                                                <option value="sales">Account / Sales Inquiry</option>
                                                <option value="logistics">LTL / Shipping Logistics</option>
                                                <option value="billing">Invoicing & Payments</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black uppercase text-[#0f172a] tracking-widest">Secure Message / Work Order</label>
                                        <textarea
                                            required
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full border border-slate-200 p-4 text-sm focus:ring-cobalt focus:border-cobalt outline-none text-[#0f172a] font-semibold rounded-[4px] bg-slate-50/50 resize-none"
                                            placeholder="Please describe your requirements in detail..."
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <button
                                            type="submit"
                                            className="w-full md:w-auto bg-[#0f172a] text-white px-12 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 rounded-[4px]"
                                        >
                                            Transmit Message
                                        </button>
                                        <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                            Note: Messages are encrypted and queued for immediate review by account managers.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        {/* Info Sidebar */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-900 text-white p-8 rounded-[8px] border-l-4 border-cobalt shadow-xl"
                            >
                                <h3 className="text-xs font-black uppercase tracking-widest mb-4 italic text-cobalt">Immediate Assistance</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <span className="material-symbols-outlined text-cobalt">call</span>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Toll-Free Hotline</p>
                                            <p className="text-sm font-black tracking-widest">+1 (800) QNBM-CORP</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="material-symbols-outlined text-cobalt">mail</span>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary Inbox</p>
                                            <p className="text-sm font-black tracking-tighter">support@qnbim.com</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase">
                                            Official Response Matrix: 24/7 Monitoring for Global Logistics. Typical Human Response: &lt; 2 Hours.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white border border-slate-200 p-8 rounded-[8px] shadow-lg"
                            >
                                <h3 className="text-xs font-black uppercase tracking-widest mb-4 italic text-[#0f172a]">Operation HQ</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <span className="material-symbols-outlined text-slate-400">location_on</span>
                                        <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">
                                            5 Fedornak Fwy<br />
                                            Berkeley Township, NJ 08757
                                        </p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded border border-slate-100 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-cobalt">verified_user</span>
                                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Institutionally Verified Facility</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <SuccessModal
                isOpen={isSuccess}
                onClose={() => setIsSuccess(false)}
                title="Message Transmitted"
                message="Your support ticket has been established. An account manager or logistics coordinator will contact you via the provided business email shortly."
            />
        </div>
    );
};

export default SupportPage;
