'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const CatalogProductCard: React.FC<Product> = (product) => {
    const { addToCart } = useCart();
    const router = useRouter();
    const [quantity, setQuantity] = React.useState(product.minOrderQty);

    const handleContactSales = () => {
        router.push('/wholesale-application');
    };

    return (
        <motion.div
            whileHover={{
                y: -5,
                borderColor: '#2563EB',
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            }}
            className="bg-white border border-slate-200 group transition-all flex flex-col shadow-sm h-full rounded-[8px]"
        >
            <div className="relative aspect-square bg-slate-50 p-2.5 md:p-4 border-b border-slate-100 flex items-center justify-center">
                <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                ></div>
                <div className="absolute top-2 left-2 bg-primary text-white text-[8px] md:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm tracking-widest uppercase">
                    SKU: {product.sku}
                </div>
            </div>
            <div className="p-2.5 md:p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-1 md:mb-1.5">
                    <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-cobalt"></span>
                    <span className="text-[8px] md:text-[9px] text-[#0f172a] font-black uppercase tracking-widest truncate">
                        {product.category}
                    </span>
                </div>
                <h3 className="text-[10px] md:text-xs font-bold text-[#0f172a] line-clamp-2 min-h-[28px] md:min-h-[32px] mb-2 md:mb-3 leading-tight uppercase tracking-tight">
                    {product.name}
                </h3>
                <div className="mt-auto space-y-2 md:space-y-3">
                    <div className="flex items-baseline justify-between">
                        <div>
                            <div className="text-sm md:text-lg font-black text-cobalt leading-none">
                                ${product.casePrice.toFixed(2)}
                            </div>
                            <div className="text-[8px] md:text-[10px] text-[#0f172a] font-bold mt-1 uppercase">({product.unitPrice.toFixed(2)} / unit)</div>
                        </div>
                    </div>
                    <div className="text-[8px] md:text-[10px] font-black text-cobalt uppercase bg-blue-50 px-1.5 py-0.5 inline-block border border-blue-100">
                        MIN: {product.minOrderQty}
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1 md:pt-2">
                        <div className="flex items-center justify-between border border-slate-300 rounded-[8px] overflow-hidden bg-slate-50 shadow-inner focus-within:border-cobalt transition-all h-11">
                            <button
                                onClick={() => setQuantity(Math.max(product.minOrderQty, quantity - 1))}
                                className="w-12 h-full flex items-center justify-center hover:bg-slate-200 text-[#0f172a] font-semibold transition-colors border-r border-slate-200 cursor-pointer active:brightness-90 touch-manipulation p-3"
                            >
                                <span className="material-symbols-outlined text-base">remove</span>
                            </button>
                            <input
                                className="flex-1 w-8 md:w-12 text-center bg-transparent border-none text-[10px] md:text-[11px] font-semibold p-0 focus:ring-0 outline-none text-[#0f172a] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(product.minOrderQty, parseInt(e.target.value) || product.minOrderQty))}
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-12 h-full flex items-center justify-center hover:bg-slate-200 text-[#0f172a] font-semibold transition-colors border-l border-slate-200 cursor-pointer active:brightness-90 touch-manipulation p-3"
                            >
                                <span className="material-symbols-outlined text-base">add</span>
                            </button>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleContactSales}
                            className={`w-full bg-cobalt text-white text-[8px] md:text-[10px] font-black py-2.5 md:py-3 uppercase tracking-wider hover:bg-royal active:brightness-90 transition-all shadow-md flex items-center justify-center gap-1.5 rounded-[8px] px-2`}
                        >
                            <span className="material-symbols-outlined text-sm flex-shrink-0">support_agent</span>
                            <span className="whitespace-nowrap">INQUIRE FOR BULK PRICE</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CatalogProductCard;
