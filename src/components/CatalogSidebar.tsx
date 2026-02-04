'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

const CatalogSidebar = () => {
    const {
        availabilityFilter,
        setAvailabilityFilter,
        brandFilters,
        setBrandFilters,
        packagingFilter,
        setPackagingFilter,
        priceRange,
        setPriceRange
    } = useCart();

    const handleAvailabilityChange = (type: 'inStock' | 'backorder') => {
        setAvailabilityFilter({
            ...availabilityFilter,
            [type]: !availabilityFilter[type]
        });
    };

    const handleBrandChange = (brand: string) => {
        if (brandFilters.includes(brand)) {
            setBrandFilters(brandFilters.filter(b => b !== brand));
        } else {
            setBrandFilters([...brandFilters, brand]);
        }
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-200 p-6 shrink-0 hidden lg:block">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-base">filter_list</span> Catalog Filters
            </h3>
            <div className="space-y-8">
                <div>
                    <h4 className="text-[10px] font-bold uppercase text-[#4B5563] mb-3 tracking-tighter">Availability</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-[#001A2C] hover:text-industrial-teal transition-colors">
                            <input
                                checked={availabilityFilter.inStock}
                                onChange={() => handleAvailabilityChange('inStock')}
                                className="rounded-sm border-slate-300 text-teal-accent focus:ring-teal-accent h-3.5 w-3.5"
                                type="checkbox"
                            />
                            In Stock
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-[#001A2C] hover:text-industrial-teal transition-colors">
                            <input
                                checked={availabilityFilter.backorder}
                                onChange={() => handleAvailabilityChange('backorder')}
                                className="rounded-sm border-slate-300 text-teal-accent focus:ring-teal-accent h-3.5 w-3.5"
                                type="checkbox"
                            />
                            Backorder
                        </label>
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold uppercase text-[#4B5563] mb-3 tracking-tighter">Packaging Type</h4>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-[#001A2C] hover:text-industrial-teal transition-colors">
                            <input
                                checked={packagingFilter === 'All'}
                                onChange={() => setPackagingFilter('All')}
                                className="border-slate-300 text-teal-accent focus:ring-teal-accent h-3.5 w-3.5"
                                name="pkg"
                                type="radio"
                            />
                            All Types
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-[#001A2C] hover:text-industrial-teal transition-colors">
                            <input
                                checked={packagingFilter === 'Pallet'}
                                onChange={() => setPackagingFilter('Pallet')}
                                className="border-slate-300 text-teal-accent focus:ring-teal-accent h-3.5 w-3.5"
                                name="pkg"
                                type="radio"
                            />
                            Full Pallet (LTL)
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-[#001A2C] hover:text-industrial-teal transition-colors">
                            <input
                                checked={packagingFilter === 'Case'}
                                onChange={() => setPackagingFilter('Case')}
                                className="border-slate-300 text-teal-accent focus:ring-teal-accent h-3.5 w-3.5"
                                name="pkg"
                                type="radio"
                            />
                            Case Pack
                        </label>
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold uppercase text-[#4B5563] mb-3 tracking-tighter">Price Per Unit: ${priceRange[0]} - ${priceRange[1]}</h4>
                    <div className="space-y-3">
                        <input
                            min="0"
                            max="50"
                            step="0.1"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-accent"
                            type="range"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-[#4B5563]">
                            <span>$0.10</span>
                            <span>$50.00+</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold uppercase text-[#4B5563] mb-3 tracking-tighter">Top Brands</h4>
                    <div className="space-y-2">
                        {['DevBusinc Essential', 'Pro-Sanitize', 'BulkHouse'].map(brand => (
                            <label key={brand} className="flex items-center gap-2 text-xs font-bold cursor-pointer text-[#001A2C] hover:text-industrial-teal transition-colors">
                                <input
                                    checked={brandFilters.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                    className="rounded-sm border-slate-300 text-teal-accent focus:ring-teal-accent h-3.5 w-3.5"
                                    type="checkbox"
                                />
                                {brand}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CatalogSidebar;
