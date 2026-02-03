import React from 'react';

const requirements = [
    {
        title: "Valid Resale Certificate",
        desc: "Must provide a valid state-issued resale certificate for tax exemption.",
        icon: "check_circle"
    },
    {
        title: "Business Verification",
        desc: "Active EIN/Tax ID required for commercial trade status.",
        icon: "check_circle"
    },
    {
        title: "Order Minimums",
        desc: "Wholesale accounts require a $500 minimum opening order.",
        icon: "check_circle"
    }
];

const RequirementsList = () => {
    return (
        <div className="bg-slate-50 p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-6">Requirements</h3>
            <ul className="space-y-6">
                {requirements.map((req, idx) => (
                    <li key={idx} className="flex gap-3">
                        <span className="material-symbols-outlined text-teal-accent">{req.icon}</span>
                        <div>
                            <p className="text-xs font-bold text-slate-800 uppercase">{req.title}</p>
                            <p className="text-[11px] text-slate-500 mt-1">{req.desc}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-12 p-4 bg-teal-50 border border-teal-100 rounded">
                <p className="text-[11px] text-teal-800 font-medium leading-relaxed italic">
                    "Approval usually takes 1-2 business days. Once verified, you will receive an invitation to set up your wholesale portal password."
                </p>
            </div>
        </div>
    );
};

export default RequirementsList;
