'use client';

import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const {
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalWeight,
        bulkDiscount,
        palletUtilization
    } = useCart();

    const palletCount = Math.ceil(palletUtilization / 100) || (cart.length > 0 ? 1 : 0);
    const estFreight = cart.length > 0 ? (palletCount * 145.00) : 0;
    const totalAmount = subtotal - bulkDiscount + estFreight;

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f1f5f9]">
            <TopBar />
            <Navbar />

            <main className="flex-1 max-w-[1600px] mx-auto w-full p-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <nav className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            <Link className="hover:text-teal-accent" href="/catalog">Catalog</Link>
                            <span className="mx-2">/</span>
                            <span className="text-slate-600">Cart</span>
                        </nav>
                        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Your Wholesale Order</h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                            Order Ref: <span className="text-primary font-black bg-slate-200 px-2 py-0.5 rounded-sm">#HS-B2B-98442-XL</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 bg-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-base">print</span> Print Quote
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 bg-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-base">download</span> Export PDF
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 overflow-x-auto">
                        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-sm">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-slate-900 text-white border-b border-slate-800">
                                    <tr style={{ color: '#FFFFFF' }}>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em]">Product Details</th>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em]">SKU</th>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em]">Pack Size</th>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-right">Unit Net</th>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-right">Case Price</th>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-center">Quantity</th>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-right">Line Total</th>
                                        <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {cart.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="p-20 text-center">
                                                <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">shopping_cart_off</span>
                                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Your warehouse cart is empty</p>
                                                <Link href="/catalog" className="inline-block mt-4 text-xs font-black text-teal-accent uppercase tracking-widest hover:underline">Start Procurement</Link>
                                            </td>
                                        </tr>
                                    ) : (
                                        cart.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/80 transition-all group">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-20 h-20 bg-slate-50 border border-slate-200 p-1 flex-shrink-0 group-hover:border-teal-accent/30 transition-colors">
                                                            <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url('${item.image}')` }}></div>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight group-hover:text-teal-accent transition-colors">{item.name}</div>
                                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-accent"></span> {item.category}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5 text-[11px] font-black text-slate-600 font-mono tracking-tighter">{item.sku}</td>
                                                <td className="p-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.packSize}</td>
                                                <td className="p-5 text-[11px] font-black text-slate-900 text-right italic">${item.unitPrice.toFixed(2)}</td>
                                                <td className="p-5 text-[11px] font-black text-slate-900 text-right">${item.casePrice.toFixed(2)}</td>
                                                <td className="p-5">
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex border border-slate-300 rounded-sm overflow-hidden bg-white shadow-sm">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="px-3 py-1.5 hover:bg-slate-100 text-slate-900 font-black transition-colors"
                                                            >-</button>
                                                            <input
                                                                className="w-14 text-center border-none text-[11px] font-black p-0 focus:ring-0 outline-none text-slate-900"
                                                                type="number"
                                                                value={item.quantity}
                                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                                                            />
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-3 py-1.5 hover:bg-slate-100 text-slate-900 font-black transition-colors"
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5 text-sm font-black text-slate-900 text-right tracking-tighter italic">
                                                    ${(item.casePrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="p-5 text-center">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-slate-300 hover:text-red-600 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                                <tfoot className="bg-slate-900 text-white">
                                    <tr>
                                        <td className="p-6" colSpan={6}></td>
                                        <td className="p-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Items Subtotal</td>
                                        <td className="p-6 text-xl font-black text-teal-accent text-right italic tracking-tighter">
                                            ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="mt-8 flex justify-between items-center bg-white p-6 border border-slate-200 rounded-sm shadow-sm">
                            <Link href="/catalog" className="flex items-center gap-3 text-[11px] font-black text-slate-500 hover:text-teal-accent uppercase tracking-[0.2em] transition-all group">
                                <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span> Return to Catalog
                            </Link>
                            <div className="flex gap-6">
                                <button
                                    onClick={clearCart}
                                    className="text-[11px] font-black text-red-600 uppercase tracking-[0.2em] hover:bg-red-50 px-4 py-2 transition-all"
                                >
                                    Clear Warehouse Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="w-full lg:w-[380px] shrink-0 space-y-6">
                        <div className="bg-white border-2 border-primary shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary opacity-[0.03] rotate-45 translate-x-12 -translate-y-12"></div>

                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                                    <span className="material-symbols-outlined text-lg">analytics</span> Order Financials
                                </h3>
                                <div className="px-2 py-0.5 bg-teal-accent text-white text-[9px] font-black uppercase tracking-widest italic animate-pulse">Live Quote</div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                        <span>Items Gross</span>
                                        <span className="text-slate-900">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    {bulkDiscount > 0 && (
                                        <div className="flex justify-between text-[11px] font-black text-teal-accent uppercase tracking-widest italic">
                                            <span>Volume Discount (5%)</span>
                                            <span>-${bulkDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5">LTL Freight Est. <span className="material-symbols-outlined text-sm text-slate-300 cursor-help">info</span></span>
                                        <span className="text-slate-900 font-mono">${estFreight.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-100"></div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1 leading-none">Total Weight</span>
                                        <span className="text-xs font-black text-slate-900 uppercase">{totalWeight.toLocaleString()} lbs</span>
                                    </div>
                                    <div className="p-3 bg-teal-50 border border-teal-100 rounded-sm">
                                        <span className="text-[9px] font-black text-teal-accent uppercase tracking-widest block mb-1 leading-none">Tax Status</span>
                                        <span className="text-[10px] font-black text-teal-700 uppercase flex items-center gap-1">EXEMPT <span className="material-symbols-outlined text-xs">verified</span></span>
                                    </div>
                                </div>

                                {/* Pallet Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">Pallet Load Optimization</span>
                                        <span className="text-primary">{Math.round(palletUtilization)}% UTILIZED</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                        <div
                                            className={`h-full transition-all duration-500 ${palletUtilization > 90 ? 'bg-amber-500' : 'bg-teal-accent'}`}
                                            style={{ width: `${palletUtilization}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <div className="flex justify-between items-end border-b-2 border-primary pb-2">
                                        <span className="text-[11px] font-black uppercase text-slate-900 tracking-widest italic">Total Amount Payable</span>
                                        <span className="text-3xl font-black text-primary tracking-tighter italic font-mono">
                                            ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-4">
                                <button className="w-full bg-teal-accent text-white py-5 font-black text-xs uppercase tracking-[0.3em] hover:bg-teal-700 transition-all shadow-xl shadow-teal-900/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                                    Logistics & Shipping <span className="material-symbols-outlined text-base">local_shipping</span>
                                </button>
                                <button className="w-full bg-white border-2 border-slate-200 text-slate-900 py-5 font-black text-xs uppercase tracking-[0.3em] hover:border-primary transition-all flex items-center justify-center gap-3">
                                    Save as Draft Quote <span className="material-symbols-outlined text-base">assignment</span>
                                </button>
                            </div>

                            <div className="p-4 bg-primary text-white text-center">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] italic">
                                    Prices active for 48 hours • LTL Rates dynamic
                                </p>
                            </div>
                        </div>

                        <div className="bg-teal- accent-gradient p-6 rounded-sm shadow-lg border border-teal-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 opacity-10 translate-x-4 -translate-y-4 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-7xl text-teal-accent">workspace_premium</span>
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-[11px] font-black text-teal-900 uppercase tracking-widest flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-lg text-teal-accent">stars</span> Specialized Pricing
                                </h4>
                                <p className="text-[10px] font-bold text-teal-800 leading-relaxed uppercase italic">
                                    Platinum Tier Opportunity
                                </p>
                                <div className="mt-3 w-full bg-teal-200/50 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-teal-accent h-full w-[72%]"></div>
                                </div>
                                <p className="text-[9px] font-medium text-teal-700 mt-3 normal-case">
                                    Adding <span className="font-black">14 more cases</span> of Bath Tissue triggers the 10% Platinum Volume Discount on this entire order.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto mt-20 border-t border-slate-200 pt-16 mb-20">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <span className="material-symbols-outlined text-4xl text-teal-accent self-center md:self-start">local_shipping</span>
                        <div>
                            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2">Nationwide LTL</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Real-time freight orchestration for full and partial pallets with nationwide dock-to-dock coverage.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <span className="material-symbols-outlined text-4xl text-teal-accent self-center md:self-start">inventory_2</span>
                        <div>
                            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2">Enterprise Stocking</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Reliable multi-hub supply chains designed for high-volume retail and industrial procurement cycles.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <span className="material-symbols-outlined text-4xl text-teal-accent self-center md:self-start">receipt_long</span>
                        <div>
                            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2">B2B Fiscal Control</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Net-30 payment facilitation and integrated tax-exempt processing for verified business entities.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <span className="material-symbols-outlined text-4xl text-teal-accent self-center md:self-start">support_agent</span>
                        <div>
                            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2">Strategic Support</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Direct access to dedicated logistics managers for custom quoting and long-term contract pricing.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
