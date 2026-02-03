'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products } from '@/data/products';
import { motion } from 'framer-motion';

const ProductGrid = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    return (
        <section className="bg-slate-50 py-10 md:py-16 px-4 md:px-10">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10 gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tighter italic leading-none">Bulk Essentials Inventory</h2>
                        <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Tier-1 Managed Logistics Protocol</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-slate-200 aspect-[3/4] rounded-sm relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                                    <div className="h-4 bg-slate-300 w-3/4 rounded-sm" />
                                    <div className="h-3 bg-slate-300 w-1/2 rounded-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={containerVariants}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-6"
                    >
                        {products.slice(0, 12).map((product) => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;
