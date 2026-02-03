import React from 'react';

const Features = () => {
    return (
        <div className="bg-slate-100 border-t border-slate-200 px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                <div className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-4xl text-teal-accent">local_shipping</span>
                    <div>
                        <h4 className="font-black text-xs uppercase mb-2">Pallet Shipping</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Consolidated pallet rates for major freight carriers. Lift-gate service available for residential or non-dock deliveries.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-4xl text-teal-accent">receipt_long</span>
                    <div>
                        <h4 className="font-black text-xs uppercase mb-2">B2B Invoicing</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Net-30 terms available for qualified accounts. Detailed invoices with SKU breakdown and tax-exempt processing.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-4xl text-teal-accent">precision_manufacturing</span>
                    <div>
                        <h4 className="font-black text-xs uppercase mb-2">Direct Sourcing</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            We bypass middle-men to offer factory-direct pricing on bulk essentials. Massive savings on full container loads.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
