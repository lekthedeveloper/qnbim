import React from 'react';

const CatalogHero = () => {
    return (
        <div className="relative h-[220px] w-full bg-slate-900 overflow-hidden shrink-0">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQbWvMRxcNsxVQytNqcroj3BoYWPZGkAPqNPd2-v5P5ziv8_fbN7T6-1pk58zMkCWZE_ZATx_8xFWjiN_oBiv9c4cZnacjzd9bwhuZbjoVpUoY8HnE-F_roUj4yfz8t8kQ8661qDwW-lNEw5ExPGmfxXnEMgN-oPrUvm7f_SW8aesTLkQ8eXSHc8aulHrhXq57nRYujqBIAifeb4RFXWr6KOwsroTI2QKFdTvcD1wu_jG-EEXMvhOILwq4_gNSfbpthcuaEE_EXBs')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
                <div className="max-w-2xl">
                    <h1 className="text-white text-3xl font-black leading-none tracking-tight mb-2 uppercase" style={{ color: '#FFFFFF' }}>
                        Industrial Wholesale Solutions
                    </h1>
                    <p className="text-slate-300 text-sm mb-6 max-w-lg">
                        B2B pallet-tier pricing for retailers and hospitality chains. Managed logistics & LTL nationwide.
                    </p>
                    <div className="flex gap-3">
                        <button className="bg-teal-accent text-white px-6 py-2.5 font-black text-[11px] uppercase tracking-widest hover:bg-teal-600 transition-colors rounded-[4px]">
                            OPEN ACCOUNT
                        </button>
                        <button className="bg-white/10 text-white border border-white/20 px-6 py-2.5 font-black text-[11px] uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2 rounded-[4px]">
                            <span className="material-symbols-outlined text-base">grid_view</span> ORDER BY SKU
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogHero;
