"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function LoginContent() {
    const { login } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [authError, setAuthError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAuthError('');

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');

        // Simulate professional delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email === 'admin@heidistore.com' && password === 'wholesale2026') {
            login({
                name: 'Popnsizzle',
                email: 'admin@heidistore.com',
                tier: 'Master Wholesale'
            });
            setLoading(false);
            setSuccess(true);

            const redirectParam = searchParams.get('redirect');
            const fromPath = searchParams.get('from') || '/catalog';

            // Construct redirect URL with grant flag if needed
            let redirectUrl = fromPath;
            if (redirectParam === 'csv_import') {
                redirectUrl = `${fromPath}${fromPath.includes('?') ? '&' : '?'}csv_granted=true`;
            }

            setTimeout(() => {
                router.push(redirectUrl);
            }, 1000);
        } else {
            setAuthError('Security Error: Unauthorized Access. Credentials do not match our database.');
            setLoading(false);
        }
    };

    const redirectType = searchParams.get('redirect');

    const getAlertMessage = () => {
        if (redirectType === 'csv_import') {
            return "To use the Bulk CSV Import tool and Pallet Optimization features, please sign in to your Heidi Store Wholesale account.";
        }
        if (redirectType === 'quotes') {
            return "Please sign in to view your Active Quotes and customized wholesale pricing.";
        }
        if (redirectType === 'dashboard') {
            return "Sign in to your Management Dashboard to view order history and account metrics.";
        }
        if (redirectType === 'portal') {
            return "Please sign in to access your Heidi Store Wholesale partner tools and secure account management.";
        }
        return null;
    };

    const alertMessage = getAlertMessage();

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-slate-900">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-slate-900/70 z-10" />
                <img
                    alt="Organized warehouse"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwxKD9KX2HFQtQdzP1aDKTJzKfBfGpLPwpsz4QpJnKTgl25UT9Y_sgImEsLy-f9rykGFSe1HTP3_qtFKMjikWk1BWL15_6T5w-ItYNQ0ySmqttcOovV9q9MKtbFtVnUyugQ_Sfdk_09eItrPNvcgYSgc4PyaCBiAr8IPAGTdvEbeo5m9OyYbkaQmZZstyuR8d0p_1f7v1BJzUEoMBS3EPrKMt_I9riTfckoGBBhlywXD4ylhqfKbLmz3U9ze9jbkLG6124_A4XMO8"
                />
            </div>

            {/* Success Toast */}
            {success && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-teal-accent text-white px-8 py-4 rounded-sm shadow-2xl flex items-center gap-3 animate-bounce">
                    <span className="material-symbols-outlined text-2xl">verified</span>
                    <span className="text-xs font-black uppercase tracking-widest">Access Granted: Tier 1 Wholesale Protocol Active</span>
                </div>
            )}

            {/* Login Card */}
            <div className={`relative z-20 w-full max-w-[450px] bg-white shadow-2xl overflow-hidden border border-slate-200 transition-all duration-500 ${success ? 'scale-95 opacity-50 blur-sm' : ''}`}>
                <div className="h-1.5 w-full bg-teal-accent" />

                <div className="p-10">
                    <div className="flex flex-col items-center mb-6">
                        <Link href="/" className="flex items-center gap-2 text-primary mb-2 hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-teal-accent">forklift</span>
                            <h1 className="text-2xl font-black leading-tight tracking-tighter uppercase italic">
                                Heidi Store <span className="text-teal-accent">Wholesale</span>
                            </h1>
                        </Link>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Authorized B2B Portal</p>
                    </div>

                    {alertMessage && (
                        <div className="bg-blue-50 border border-teal-500 p-4 mb-6 rounded-sm flex items-start gap-3">
                            <span className="material-symbols-outlined text-teal-600 text-xl flex-shrink-0">lock_open</span>
                            <p className="text-[11px] text-slate-700 font-bold uppercase leading-relaxed tracking-tight">
                                <span className="text-teal-600 block mb-1 font-black">Authentication Required:</span> {alertMessage}
                            </p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2" htmlFor="email">
                                Business Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 text-lg">mail</span>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-sm text-sm focus:ring-1 focus:ring-teal-accent focus:border-teal-accent outline-none placeholder-slate-400 font-bold"
                                    id="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    required
                                    type="email"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider" htmlFor="password">
                                    Password
                                </label>
                                <a className="text-[10px] font-black text-teal-accent hover:text-teal-700 uppercase tracking-tighter" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-sm text-sm focus:ring-1 focus:ring-teal-accent focus:border-teal-accent outline-none font-bold"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    type="password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                className="h-4 w-4 text-teal-accent focus:ring-teal-accent border-slate-300 rounded-sm cursor-pointer"
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                            />
                            <label className="ml-2 block text-xs text-slate-500 font-bold uppercase tracking-tighter cursor-pointer" htmlFor="remember-me">
                                Remember this workstation
                            </label>
                        </div>

                        {authError && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                                <p className="text-[10px] text-red-700 font-black uppercase tracking-tight">{authError}</p>
                            </div>
                        )}

                        {searchParams.get('message') && (
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                                <p className="text-[10px] text-amber-700 font-black uppercase tracking-tight">{searchParams.get('message')}</p>
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className={`w-full bg-slate-900 text-white py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-700 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            type="submit"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">sync</span>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Login to Dashboard
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-[11px] text-slate-500 mb-3 font-bold uppercase tracking-tight italic">Need a wholesale account for your business?</p>
                        <Link
                            href="/signup"
                            className="inline-block text-[11px] font-black text-slate-900 uppercase tracking-widest hover:text-teal-accent border-b-2 border-slate-900 hover:border-teal-accent transition-all pb-1 italic"
                        >
                            Apply for Access
                        </Link>
                    </div>
                </div>

                <div className="bg-slate-900 px-10 py-5 flex justify-between items-center border-t border-white/5">
                    <div className="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm text-teal-accent">verified_user</span>
                        SECURE AES-256 ENCRYPTION
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-slate-400 font-black tracking-widest uppercase italic">
                        1-800-HEIDI-B2B
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading Security Protocol...</div>}>
            <LoginContent />
        </Suspense>
    );
}
