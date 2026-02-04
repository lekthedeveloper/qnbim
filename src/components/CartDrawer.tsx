'use client';

import React from 'react';
import Link from 'next/link';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        subtotal,
        palletUtilization,
        totalWeight,
        bulkDiscount
    } = useCart();

    // Calc dynamic freight: $145 per pallet (min 1 if items present)
    const palletCount = Math.ceil(palletUtilization / 100);
    const estFreight = cart.length > 0 ? (palletCount || 1) * 145.00 : 0;
    const finalTotal = subtotal + estFreight;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative w-full md:max-w-[440px] bg-slate-900 shadow-2xl flex flex-col h-full border-l border-slate-700 overflow-hidden"
                    >
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-cobalt text-2xl">shopping_cart_checkout</span>
                                    <div className="flex flex-col">
                                        <h2 className="text-white font-black uppercase tracking-widest text-sm leading-none">Wholesale Cart</h2>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-tighter">{cart.length} ITEMS DETECTED</span>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Pallet Utilization */}
                            <div className="bg-slate-800/40 p-5 border border-slate-700 rounded-sm shadow-inner">
                                <div className="flex justify-between items-end mb-3">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-cobalt uppercase tracking-widest mb-1 italic">Logistics Metric</span>
                                        <span className="text-xs text-white font-black uppercase tracking-tight">48x40 LTL Pallet Volume</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-white leading-none">{palletUtilization.toFixed(0)}<span className="text-cobalt text-sm">%</span></span>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                                    <div
                                        className="h-full bg-cobalt shadow-[0_0_15px_rgba(13,148,136,0.6)] transition-all duration-1000"
                                        style={{ width: `${palletUtilization}%` }}
                                    ></div>
                                </div>
                                <div className="mt-3 flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">
                                    <span>{palletUtilization >= 100 ? 'Pallet Maxed' : 'LTL Optimized'}</span>
                                    <span className="text-cobalt/80">{Math.max(0, 100 - palletUtilization).toFixed(0)}% Open Capacity</span>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-900/30">
                            <div className="divide-y divide-slate-800/50">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-6 flex gap-6 hover:bg-slate-800/20 transition-all group">
                                        <div className="h-20 w-20 bg-slate-800 shrink-0 border border-slate-700 p-1 rounded-sm shadow-md group-hover:border-cobalt/30 transition-colors">
                                            <div
                                                className="w-full h-full bg-cover bg-center rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500"
                                                style={{ backgroundImage: `url('${item.image}')` }}
                                            ></div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-[13px] font-black text-white truncate pr-4 leading-tight group-hover:text-cobalt transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-slate-600 hover:text-red-500 transition-colors active:scale-90"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.1em] italic">SKU: {item.sku}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-slate-700 rounded-sm overflow-hidden bg-slate-800/50 shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 hover:bg-slate-700 text-white text-[11px] font-black transition-colors"
                                                    >-</button>
                                                    <input
                                                        className="w-12 bg-transparent border-none text-center text-white text-[11px] font-black p-0 focus:ring-0 outline-none"
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 hover:bg-slate-700 text-white text-[11px] font-black transition-colors"
                                                    >+</button>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[13px] font-black text-white">${(item.casePrice * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5 italic">{item.quantity} Cases</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer / Summary */}
                        <div className="p-6 border-t border-slate-800 bg-slate-900 shadow-[0_-15px_30px_rgba(0,0,0,0.5)] z-10">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <span>Total Net Weight</span>
                                    <span className="text-slate-300">{totalWeight.toLocaleString()} LBS</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <span className="flex items-center gap-1">Est. LTL Freight <span className="material-symbols-outlined text-[14px]">info</span></span>
                                    <span className="text-white">${estFreight.toFixed(2)}</span>
                                </div>
                                {bulkDiscount > 0 && (
                                    <div className="flex justify-between text-cobalt text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                                        <span>Bulk Savings (5%)</span>
                                        <span>-${bulkDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                )}
                                <div className="h-px bg-slate-800 my-2"></div>
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 text-[11px] font-black uppercase tracking-[0.1em] italic">Gross Order Total</span>
                                        <span className="text-[10px] text-cobalt font-bold uppercase tracking-tighter mt-1">Institutional Tax Exempt Rate</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-cobalt leading-none tracking-tighter">${(finalTotal - bulkDiscount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                        <div className="text-[9px] text-slate-600 font-bold uppercase mt-1 text-right">Prices Locked for 15min</div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Link
                                    href="/cart"
                                    className="w-full py-4 border border-slate-700 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-800 transition-all text-center flex items-center justify-center group"
                                    onClick={onClose}
                                >
                                    View Full Cart Analysis
                                    <span className="material-symbols-outlined text-sm ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-5 bg-cobalt text-white text-xs font-black uppercase tracking-[0.4em] hover:bg-royal transition-all flex items-center justify-center gap-3 shadow-xl shadow-royal/30"
                                >
                                    <span className="material-symbols-outlined text-base">lock</span>
                                    Secure Checkout
                                </motion.button>
                            </div>
                            <div className="flex items-center justify-center gap-3 mt-6">
                                <div className="flex -space-x-1">
                                    <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-900 p-0.5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[10px] text-cobalt">verified_user</span>
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-900 p-0.5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[10px] text-cobalt">local_shipping</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-700 uppercase font-black tracking-widest italic">
                                    Verified Logistics Protocol Active
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
