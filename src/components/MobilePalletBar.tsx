'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

const MobilePalletBar = () => {
    const { palletUtilization, subtotal, cart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    if (cart.length === 0) return null;

    return (
        <div className="md:hidden">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a] border-t border-slate-800 p-4 pb-[env(safe-area-inset-bottom,16px)] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-1.5">
                            <span className="text-[9px] font-black text-cobalt uppercase tracking-widest italic">LTL Load Optimization</span>
                            <span className="text-[14px] font-black text-white">{palletUtilization.toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(palletUtilization, 100)}%` }}
                                className={`h-full ${palletUtilization > 100 ? 'bg-amber-500' : 'bg-cobalt'} shadow-[0_0_10px_rgba(13,148,136,0.5)]`}
                            />
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 bg-cobalt text-white px-4 py-3 rounded-[8px] font-black text-[11px] uppercase tracking-widest shadow-lg shadow-royal/40"
                    >
                        <span className="material-symbols-outlined text-lg">shopping_cart</span>
                        <div className="flex flex-col items-start leading-none">
                            <span>View Cart</span>
                            <span className="text-[9px] opacity-80">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </motion.button>
                </div>
            </motion.div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default MobilePalletBar;
