import React from 'react';

const quotes = [
    { id: "#QT-2026-8891", date: "Jan 12, 2026", totalItems: "12 Cases (4 SKUs)", status: "Approved", totalAmount: "$2,840.00", statusColor: "teal" },
    { id: "#QT-2026-8885", date: "Jan 08, 2026", totalItems: "40 Cases (2 SKUs)", status: "Pending", totalAmount: "$12,450.00", statusColor: "amber" },
    { id: "#QT-2026-8742", date: "Dec 15, 2025", totalItems: "5 Pallets (15 SKUs)", status: "Expired", totalAmount: "$34,200.00", statusColor: "slate" },
    { id: "#QT-2026-8660", date: "Dec 08, 2025", totalItems: "22 Cases (1 SKU)", status: "Approved", totalAmount: "$4,520.00", statusColor: "teal" },
    { id: "#QT-2026-8551", date: "Nov 28, 2025", totalItems: "8 Cases (3 SKUs)", status: "Approved", totalAmount: "$1,250.80", statusColor: "teal" },
];

const QuotesTable = () => {
    return (
        <div className="border border-slate-200 shadow-sm overflow-hidden rounded-sm">
            <div className="overflow-hidden">
                {/* Desktop Table View */}
                <table className="hidden md:table w-full border-collapse">
                    <thead>
                        <tr className="bg-primary">
                            <th className="text-white text-[11px] font-bold uppercase tracking-wider py-4 px-6 text-left border-r border-slate-700 last:border-r-0">Quote ID</th>
                            <th className="text-white text-[11px] font-bold uppercase tracking-wider py-4 px-6 text-left border-r border-slate-700 last:border-r-0">Date Requested</th>
                            <th className="text-white text-[11px] font-bold uppercase tracking-wider py-4 px-6 text-left border-r border-slate-700 last:border-r-0">Total Items</th>
                            <th className="text-white text-[11px] font-bold uppercase tracking-wider py-4 px-6 text-left border-r border-slate-700 last:border-r-0">Status</th>
                            <th className="text-white text-[11px] font-bold uppercase tracking-wider py-4 px-6 text-left border-r border-slate-700 last:border-r-0">Total Amount</th>
                            <th className="text-white text-[11px] font-bold uppercase tracking-wider py-4 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.map((quote, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="py-4 px-6 text-sm text-primary font-bold border-b border-slate-200 bg-white">{quote.id}</td>
                                <td className="py-4 px-6 text-sm text-slate-700 border-b border-slate-200 bg-white">{quote.date}</td>
                                <td className="py-4 px-6 text-sm text-slate-700 border-b border-slate-200 bg-white">{quote.totalItems}</td>
                                <td className="py-4 px-6 text-sm text-slate-700 border-b border-slate-200 bg-white">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-black uppercase
                    ${quote.statusColor === 'teal' ? 'bg-teal-100 text-teal-800' :
                                            quote.statusColor === 'amber' ? 'bg-amber-100 text-amber-800' :
                                                'bg-slate-100 text-slate-600'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full 
                       ${quote.statusColor === 'teal' ? 'bg-teal-600' :
                                                quote.statusColor === 'amber' ? 'bg-amber-600 animate-pulse' :
                                                    'bg-slate-400'}`}></span>
                                        {quote.status}
                                    </span>
                                </td>
                                <td className={`py-4 px-6 text-sm font-bold border-b border-slate-200 bg-white ${quote.status === 'Expired' ? 'text-slate-400' : 'text-slate-900'}`}>{quote.totalAmount}</td>
                                <td className="py-2 px-6 border-b border-slate-200 bg-white text-center">
                                    <div className="flex justify-center gap-2">
                                        {quote.status === 'Approved' && (
                                            <button className="bg-teal-accent text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-teal-700 transition-colors">Convert to Order</button>
                                        )}
                                        {quote.status === 'Pending' && (
                                            <button className="bg-slate-200 text-slate-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider cursor-not-allowed" disabled>Convert to Order</button>
                                        )}
                                        {quote.status === 'Expired' && (
                                            <button className="bg-primary text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider hover:bg-slate-800 transition-colors">Re-Quote</button>
                                        )}
                                        <button className="border border-slate-300 px-2 py-1.5 text-slate-600 hover:bg-slate-100 flex items-center justify-center rounded-sm">
                                            <span className="material-symbols-outlined text-sm leading-none">visibility</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-slate-100">
                    {quotes.map((quote, idx) => (
                        <div key={idx} className="p-4 bg-white space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] font-black text-primary italic uppercase tracking-tight">{quote.id}</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[8px] font-black uppercase
                                    ${quote.statusColor === 'teal' ? 'bg-teal-100 text-teal-800' :
                                        quote.statusColor === 'amber' ? 'bg-amber-100 text-amber-800' :
                                            'bg-slate-100 text-slate-600'}`}>
                                    {quote.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 border border-slate-100 rounded-[8px]">
                                <div>
                                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">DATE</p>
                                    <p className="text-[11px] font-bold text-slate-700">{quote.date}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">ITEMS</p>
                                    <p className="text-[11px] font-bold text-slate-700 truncate">{quote.totalItems}</p>
                                </div>
                                <div className="col-span-2 pt-1 border-t border-slate-200/50 mt-1">
                                    <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">QUOTE TOTAL</p>
                                    <p className={`text-lg font-black italic ${quote.status === 'Expired' ? 'text-slate-400' : 'text-slate-900'}`}>{quote.totalAmount}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {quote.status === 'Approved' && (
                                    <button className="flex-1 bg-teal-accent text-white h-11 text-[9px] font-black uppercase tracking-[0.2em] shadow-sm rounded-[8px] active:scale-[0.98] transition-transform">Convert to Order</button>
                                )}
                                {quote.status === 'Pending' && (
                                    <button className="flex-1 bg-slate-100 text-slate-400 h-11 text-[9px] font-black uppercase tracking-[0.2em] rounded-[8px] cursor-not-allowed" disabled>Awaiting Audit</button>
                                )}
                                {quote.status === 'Expired' && (
                                    <button className="flex-1 bg-primary text-white h-11 text-[9px] font-black uppercase tracking-[0.2em] rounded-[8px]">Re-Quote</button>
                                )}
                                <button className="w-12 h-11 border border-slate-200 text-slate-400 flex items-center justify-center rounded-[8px] active:bg-slate-50">
                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Showing 5 of 24 active quotes</span>
                <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-400 hover:bg-slate-50 rounded-sm">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-xs font-bold hover:bg-slate-50 rounded-sm">2</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-xs font-bold hover:bg-slate-50 rounded-sm">3</button>
                    <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-400 hover:bg-slate-50 rounded-sm">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuotesTable;
