'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const QuickSkuEntry = () => {
    const { addBySKU, isAuthenticated } = useCart();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sku, setSku] = useState('');
    const [qty, setQty] = useState('1');
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'parsing'>('idle');
    const [message, setMessage] = useState('');

    React.useEffect(() => {
        if (searchParams.get('csv_granted') === 'true') {
            setMessage("Access Granted. You can now import your CSV.");
            setTimeout(() => setMessage(''), 5000);
        }
    }, [searchParams]);

    const handleQuickAdd = () => {
        if (!sku) return;
        router.push(`/wholesale-application?sku=${sku.toUpperCase()}&qty=${qty}`);
    };

    const handleCSVUpload = () => {
        router.push('/wholesale-application?mode=bulk_import');
    };

    return (
        <>
            <div className="bg-slate-50 border border-slate-200 p-5 md:p-6 rounded-sm mb-4 md:mb-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none">
                    <span className="material-symbols-outlined text-9xl">barcode_scanner</span>
                </div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-teal-accent text-sm md:text-base">bolt</span> Quick SKU Procurement
                </h3>
                <div className="flex flex-col gap-3">
                    <div className="w-full">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1 px-1">Product SKU</label>
                        <input
                            className={`w-full bg-[#00263E] md:bg-white border rounded-[4px] px-4 h-11 md:h-auto md:py-2.5 text-sm font-semibold uppercase tracking-widest focus:ring-1 focus:ring-teal-accent outline-none transition-all text-white md:text-slate-900 placeholder:text-slate-400 md:placeholder:text-slate-400 ${status === 'error' ? 'border-red-500' : 'border-slate-600 md:border-slate-300'}`}
                            placeholder="ENTER SKU (E.G. HT-1021)"
                            type="text"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1 px-1">Quantity</label>
                        <input
                            className="w-full bg-[#00263E] md:bg-white border border-slate-600 md:border-slate-300 rounded-[4px] px-4 h-11 md:h-auto md:py-2.5 text-sm font-semibold focus:ring-1 focus:ring-teal-accent outline-none transition-all text-white md:text-slate-900 placeholder:text-slate-400 md:placeholder:text-slate-400"
                            placeholder="QTY"
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleQuickAdd}
                        className="w-full px-8 h-11 md:h-auto md:py-2.5 rounded-[4px] text-[11px] font-semibold uppercase tracking-widest transition-all shadow-md active:brightness-90 bg-teal-accent text-white"
                    >
                        INQUIRE FOR BULK PRICE
                    </button>
                    <div className="w-full mt-2 pt-3 border-t border-slate-200/50">
                        <button
                            onClick={handleCSVUpload}
                            disabled={status === 'parsing'}
                            className="w-full text-[9px] font-bold text-slate-400 hover:text-primary transition-colors flex items-center justify-center gap-2 uppercase tracking-widest py-2 bg-slate-100 rounded-[4px]"
                        >
                            <span className={`material-symbols-outlined text-sm ${status === 'parsing' ? 'animate-spin' : ''}`}>
                                {status === 'parsing' ? 'sync' : 'upload_file'}
                            </span>
                            {status === 'parsing' ? 'Parsing CSV...' : 'Bulk CSV Upload'}
                        </button>
                        {message && (
                            <div className={`mt-2 text-[8px] font-black uppercase tracking-widest text-center ${status === 'error' ? 'text-red-500' : 'text-teal-600'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="h-4 md:hidden"></div>
        </>
    );
};

export default QuickSkuEntry;
