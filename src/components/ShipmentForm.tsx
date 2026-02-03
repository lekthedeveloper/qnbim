import React from 'react';

const ShipmentForm = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xs font-black uppercase text-slate-500 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">location_on</span> Shipment Details
                </h3>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Origin Zip</label>
                            <input
                                className="w-full border-slate-200 text-sm font-bold focus:ring-teal-accent focus:border-teal-accent outline-none border p-2"
                                placeholder="00000"
                                type="text"
                                defaultValue="30303"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Destination Zip</label>
                            <input
                                className="w-full border-slate-200 text-sm font-bold focus:ring-teal-accent focus:border-teal-accent outline-none border p-2"
                                placeholder="Zip Code"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Pallet Count</label>
                            <input
                                className="w-full border-slate-200 text-sm font-bold focus:ring-teal-accent focus:border-teal-accent outline-none border p-2"
                                min="1"
                                type="number"
                                defaultValue="2"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Total Weight (LBS)</label>
                            <input
                                className="w-full border-slate-200 text-sm font-bold focus:ring-teal-accent focus:border-teal-accent outline-none border p-2"
                                step="50"
                                type="number"
                                defaultValue="2400"
                            />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-100">
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-3">Accessorial Services</label>
                        <div className="space-y-3">
                            {[
                                { label: "Liftgate Required at Delivery", checked: true },
                                { label: "Residential Delivery", checked: false },
                                { label: "Inside Delivery Service", checked: false },
                            ].map((service, idx) => (
                                <label key={idx} className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-xs font-bold text-slate-700">{service.label}</span>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input defaultChecked={service.checked} className="sr-only peer" type="checkbox" />
                                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-accent"></div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 font-black text-xs uppercase tracking-widest hover:bg-teal-accent transition-all flex items-center justify-center gap-2" type="button">
                        Get Freight Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </form>
            </div>
            <div className="bg-teal-50 border border-teal-100 p-4">
                <div className="flex gap-3">
                    <span className="material-symbols-outlined text-teal-accent text-xl">info</span>
                    <div>
                        <p className="text-xs font-black text-teal-900 uppercase">Volume Discount Alert</p>
                        <p className="text-[11px] text-teal-700 mt-1">
                            Shipments over 6 pallets qualify for custom truckload (FTL) pricing. Contact your account manager.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentForm;
