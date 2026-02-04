import { motion } from 'framer-motion';

const rates = [
    { carrier: "FedEx Freight", type: "Economy LTL", transit: "3 Days", delivery: "Jan 19, 2026", cost: 342.15, bestValue: false },
    { carrier: "Old Dominion", type: "Standard", transit: "2 Days", delivery: "Jan 18, 2026", cost: 388.50, bestValue: false },
    { carrier: "XPO Logistics", type: "Standard", transit: "2 Days", delivery: "Jan 18, 2026", cost: 315.00, bestValue: true },
    { carrier: "Estes Express", type: "Standard LTL", transit: "4 Days", delivery: "Jan 20, 2026", cost: 295.40, bestValue: false },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

const CarrierRatesTable = () => {
    return (
        <div className="col-span-12 lg:col-span-8">
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-slate-500 flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">list_alt</span> Available Carrier Rates
                    </h3>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 uppercase">Updated 4 mins ago</span>
                </div>
                <div className="overflow-hidden">
                    {/* Desktop Table */}
                    <table className="hidden md:table w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                <th className="px-6 py-3 border-b text-center">Carrier</th>
                                <th className="px-6 py-3 border-b">Est. Transit</th>
                                <th className="px-6 py-3 border-b">Est. Delivery</th>
                                <th className="px-6 py-3 border-b text-right">Freight Cost</th>
                                <th className="px-6 py-3 border-b"></th>
                            </tr>
                        </thead>
                        <motion.tbody
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="divide-y divide-slate-100"
                        >
                            {rates.map((rate, idx) => (
                                <motion.tr
                                    key={idx}
                                    variants={itemVariants}
                                    className={`hover:bg-slate-50 transition-colors ${rate.bestValue ? 'bg-blue-50/30' : ''}`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${rate.bestValue ? 'bg-blue-100' : 'bg-slate-100'} rounded flex items-center justify-center`}>
                                                <span className={`material-symbols-outlined ${rate.bestValue ? 'text-royal' : 'text-slate-400'}`}>
                                                    {rate.bestValue ? 'bolt' : 'local_shipping'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 leading-tight">{rate.carrier}</p>
                                                <p className={`text-[10px] uppercase font-bold ${rate.bestValue ? 'text-royal italic' : 'text-slate-400'}`}>
                                                    {rate.bestValue ? 'Best Value' : rate.type}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-700">{rate.transit}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-700">{rate.delivery}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-base font-black text-slate-900">${rate.cost.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className={`${rate.carrier === 'Old Dominion' || rate.carrier === 'Estes Express' ? 'bg-slate-900' : 'bg-cobalt'} text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-wider hover:opacity-80 transition-opacity`}
                                        >
                                            Select
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>

                    {/* Mobile Stacked Cards */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {rates.map((rate, idx) => (
                            <div key={idx} className={`p-5 space-y-4 ${rate.bestValue ? 'bg-blue-50/20' : ''}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 ${rate.bestValue ? 'bg-blue-100' : 'bg-slate-100'} rounded-[8px] flex items-center justify-center`}>
                                            <span className={`material-symbols-outlined ${rate.bestValue ? 'text-royal' : 'text-slate-400'}`}>
                                                {rate.bestValue ? 'bolt' : 'local_shipping'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{rate.carrier}</p>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase">{rate.type}</p>
                                        </div>
                                    </div>
                                    {rate.bestValue && (
                                        <span className="bg-blue-100 text-royal text-[9px] font-black uppercase px-2 py-0.5 rounded-sm italic tracking-widest animate-pulse">
                                            BEST VAL
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 border border-slate-100 rounded-[8px]">
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">EST. TRANSIT</p>
                                        <p className="text-[11px] font-black text-slate-700">{rate.transit}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-0.5">EST. DELIVERY</p>
                                        <p className="text-[11px] font-black text-slate-700">{rate.delivery}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em]">FREIGHT COST</span>
                                        <span className="text-xl font-black text-slate-900 italic">${rate.cost.toFixed(2)}</span>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-8 py-3 h-11 ${rate.carrier === 'Old Dominion' || rate.carrier === 'Estes Express' ? 'bg-slate-900' : 'bg-cobalt'} text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[8px]`}
                                    >
                                        SELECT
                                    </motion.button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Estimated Costs Include:</h4>
                    <ul className="text-[11px] text-slate-600 space-y-1">
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px] text-cobalt">check_circle</span>
                            Fuel Surcharges (FSC)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px] text-cobalt">check_circle</span>
                            Selected Accessorial Fees
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px] text-cobalt">check_circle</span>
                            Terminal Handling Fees
                        </li>
                    </ul>
                </div>
                <div className="bg-white border border-slate-200 p-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Quote Disclaimer:</h4>
                    <p className="text-[11px] text-slate-500 leading-tight italic">
                        Rates are estimates based on provided data. Final charges are subject to carrier weight verification and actual delivery conditions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CarrierRatesTable;
