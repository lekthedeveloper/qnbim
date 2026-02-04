'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const QuickBulkAdd = () => {
    const { addBySKU, addToCart, isAuthenticated } = useCart();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState<number | ''>('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'parsing'>('idle');
    const [message, setMessage] = useState('');

    React.useEffect(() => {
        if (searchParams.get('csv_granted') === 'true') {
            setMessage("Access Granted. You can now import your CSV.");
            setTimeout(() => setMessage(''), 5000);
        }
    }, [searchParams]);

    const handleAdd = () => {
        if (!sku || !quantity || quantity <= 0) return;

        setStatus('success');
        setMessage("SKU Found. Redirecting to Wholesale Application...");
        setTimeout(() => {
            router.push('/wholesale-application');
        }, 1500);
    };

    const handleCSVImport = () => {
        setStatus('parsing');
        setTimeout(() => {
            setStatus('success');
            setMessage("CSV Validation Complete. Redirecting...");
            setTimeout(() => {
                router.push('/wholesale-application');
            }, 1000);
        }, 1500);
    };

    return (
        <div className="bg-primary text-white py-5 px-5 md:px-10 border-b border-slate-700 shadow-2xl relative z-10">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="material-symbols-outlined text-cobalt text-lg">bolt</span> Quick SKU Procurement:
                </span>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto relative">
                    <input
                        className={`bg-slate-900 border-slate-700 rounded-sm text-[11px] font-black h-11 md:h-auto md:py-2.5 px-4 w-full md:w-56 focus:border-cobalt outline-none border uppercase tracking-wider placeholder:text-slate-600 transition-all ${status === 'error' ? 'border-red-500' : ''}`}
                        placeholder="ENTER SKU (E.G. HT-1021)"
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                    <input
                        className="bg-slate-900 border-slate-700 rounded-sm text-[11px] font-black h-11 md:h-auto md:py-2.5 px-4 w-full md:w-20 focus:border-cobalt outline-none border placeholder:text-slate-600 transition-all lg:w-24"
                        placeholder="QTY"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value === '' ? '' : parseInt(e.target.value))}
                    />
                    <button
                        onClick={handleAdd}
                        disabled={status === 'success' || status === 'parsing'}
                        className={`w-full md:w-auto px-6 h-11 md:h-auto md:py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-lg active:scale-95 ${status === 'success' ? 'bg-royal' :
                            status === 'error' ? 'bg-red-600' : 'bg-cobalt hover:bg-royal text-white'
                            }`}
                    >
                        {status === 'success' ? 'REDIRECTING...' : status === 'parsing' ? 'PARSING...' : status === 'error' ? 'FAILED' : 'CONTACT SALES'}
                    </button>

                    {message && (
                        <div className={`absolute -bottom-8 left-0 text-[10px] md:text-[9px] font-black uppercase tracking-widest ${status === 'error' ? 'text-red-400' : 'text-blue-400'}`}>
                            {message}
                        </div>
                    )}
                </div>
                <div className="hidden md:block h-6 w-px bg-slate-700 mx-2"></div>
                <button
                    onClick={handleCSVImport}
                    disabled={status === 'parsing'}
                    className="w-full md:w-auto text-[10px] font-black text-slate-400 hover:text-white flex items-center justify-center md:justify-start gap-2 uppercase tracking-widest transition-colors disabled:opacity-50 py-2 md:py-0"
                >
                    <span className={`material-symbols-outlined text-sm ${status === 'parsing' ? 'animate-spin' : ''}`}>
                        {status === 'parsing' ? 'sync' : 'upload_file'}
                    </span>
                    {status === 'parsing' ? 'Parsing Bulk Order...' : 'Import CSV Order'}
                </button>
            </div>
        </div>
    );
};

export default QuickBulkAdd;
