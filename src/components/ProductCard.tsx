'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const ProductCard: React.FC<Product> = (product) => {
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
                borderColor: '#14b8a6',
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            }}
            className="bg-white border border-slate-200 group transition-colors flex flex-col h-full shadow-sm"
        >
            <div className="relative aspect-square bg-slate-50 p-2 overflow-hidden">
                <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                ></div>
                <div className="absolute top-2 left-2 bg-slate-900 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 tracking-tighter uppercase">
                    SKU: {product.sku}
                </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-accent flex-shrink-0"></span>
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest truncate">{product.category}</span>
                </div>
                <h3 className="text-[11px] font-black text-slate-800 line-clamp-2 min-h-[30px] mb-2 leading-tight uppercase tracking-tight">
                    {product.name}
                </h3>
                <div className="mt-auto">
                    <div className="text-[18px] font-black text-slate-900 leading-none">
                        ${product.casePrice.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold mb-1 mt-1 uppercase">({product.unitPrice.toFixed(2)} / unit)</div>
                    <div className="text-[10px] font-black text-teal-accent mb-3 uppercase tracking-tighter bg-teal-50 px-1.5 py-0.5 inline-block border border-teal-100">
                        Min: {product.minOrderQty} Cases
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between border border-slate-300 rounded-sm overflow-hidden bg-slate-50 focus-within:border-teal-accent transition-all">
                            <button
                                onClick={() => setQuantity(Math.max(product.minOrderQty, quantity - 1))}
                                className="px-3 py-1.5 hover:bg-slate-200 text-slate-900 font-black transition-colors border-r border-slate-200 cursor-pointer active:bg-slate-300"
                            >-</button>
                            <input
                                className="w-12 text-center border-none text-[11px] font-black p-0 outline-none bg-transparent text-slate-900 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(product.minOrderQty, parseInt(e.target.value) || product.minOrderQty))}
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-1.5 hover:bg-slate-200 text-slate-900 font-black transition-colors border-l border-slate-200 cursor-pointer active:bg-slate-300"
                            >+</button>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleContactSales}
                            className={`w-full bg-slate-900 text-white text-[10px] font-black py-2.5 uppercase tracking-widest hover:bg-teal-accent transition-all shadow-md flex items-center justify-center gap-1.5`}
                        >
                            <span className="material-symbols-outlined text-sm">support_agent</span>
                            CONTACT SALES
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
