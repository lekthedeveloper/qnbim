'use client';

import React, { useState, useEffect } from 'react';
import CatalogProductCard from './CatalogProductCard';
import { motion } from 'framer-motion';

import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const CatalogProductGrid = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const {
        searchQuery,
        availabilityFilter,
        brandFilters,
        packagingFilter,
        priceRange
    } = useCart();

    const filteredProducts = products.filter(product => {
        // Search Filter
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());

        // Availability Filter
        const matchesAvailability = (availabilityFilter.inStock && product.inStock) ||
            (availabilityFilter.backorder && !product.inStock);

        // Packaging Filter
        const matchesPackaging = packagingFilter === 'All' || product.packagingType === packagingFilter;

        // Brand Filter
        const matchesBrand = brandFilters.length === 0 || brandFilters.includes(product.brand);

        // Price Filter
        const matchesPrice = product.unitPrice >= priceRange[0] && product.unitPrice <= priceRange[1];

        return matchesSearch && matchesAvailability && matchesPackaging && matchesBrand && matchesPrice;
    });

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
        <div className="flex-1 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-slate-200 pb-3 gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                    <h2 className="text-base md:text-lg font-black text-slate-800 uppercase tracking-tighter italic">Wholesale Inventory</h2>
                    <span className="text-[9px] md:text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase tracking-widest whitespace-nowrap">
                        {filteredProducts.length} Results
                    </span>
                </div>
                <div className="flex gap-2 md:gap-3">
                    <select className="flex-1 md:flex-none text-[10px] md:text-[11px] font-black uppercase border-slate-300 rounded-[8px] py-1.5 px-3 focus:ring-teal-accent outline-none bg-white">
                        <option>Sort by Case Price</option>
                        <option>Popularity</option>
                        <option>SKU Alpha</option>
                    </select>
                    <div className="hidden sm:flex border border-slate-300 rounded-[8px] overflow-hidden bg-white">
                        <button className="px-3 py-1.5 bg-slate-100 text-slate-900 border-r border-slate-200"><span className="material-symbols-outlined text-sm block">grid_view</span></button>
                        <button className="px-3 py-1.5 hover:bg-slate-50 text-slate-400 group"><span className="material-symbols-outlined text-sm block group-hover:text-slate-900 transition-colors">format_list_bulleted</span></button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-slate-200 aspect-[3/4] rounded-sm relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute bottom-4 left-4 right-4 space-y-2">
                                <div className="h-4 bg-slate-100 w-3/4 rounded-sm" />
                                <div className="h-3 bg-slate-100 w-1/2 rounded-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredProducts.length > 0 ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-4"
                >
                    {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <CatalogProductCard {...product} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 rounded-lg">
                    <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 animate-pulse">inventory_2</span>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">No Matches Found in Protocol</h3>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase">Check SKU format or broaden search parameters</p>
                </div>
            )}
        </div>
    );
};

export default CatalogProductGrid;
