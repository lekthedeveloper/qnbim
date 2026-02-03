import React from 'react';

const CatalogFeatures = () => {
    return (
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <div className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-3xl text-teal-accent">local_shipping</span>
                    <div>
                        <h4 className="font-black text-white text-[10px] uppercase mb-1">Nationwide LTL</h4>
                        <p className="text-[10px] text-slate-400 leading-snug">
                            Real-time freight quotes for full & partial pallets with dock-to-dock delivery.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-3xl text-teal-accent">inventory_2</span>
                    <div>
                        <h4 className="font-black text-white text-[10px] uppercase mb-1">Volume Stocking</h4>
                        <p className="text-[10px] text-slate-400 leading-snug">
                            Reliable supply chains for high-volume enterprise and retail procurement.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-3xl text-teal-accent">receipt_long</span>
                    <div>
                        <h4 className="font-black text-white text-[10px] uppercase mb-1">B2B Invoicing</h4>
                        <p className="text-[10px] text-slate-400 leading-snug">
                            Net-30 payment terms and tax-exempt processing for qualified accounts.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-3xl text-teal-accent">support_agent</span>
                    <div>
                        <h4 className="font-black text-white text-[10px] uppercase mb-1">Account Support</h4>
                        <p className="text-[10px] text-slate-400 leading-snug">
                            Dedicated account managers for custom quotes and contract pricing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogFeatures;
