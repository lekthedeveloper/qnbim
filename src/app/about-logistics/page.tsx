import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutLogisticsPage() {
    const customNavLinks = [
        { name: 'Catalog', href: '/catalog' },
        { name: 'LTL Rates', href: '/ltl-rates' },
        { name: 'About Logistics', href: '/about-logistics' },
    ];

    const stats = [
        { label: 'Sq Ft Warehousing', value: '250k+' },
        { label: 'States Serviced', value: '48' },
        { label: 'Order Accuracy', value: '99.8%' },
        { label: 'Dispatch Speed', value: '24h' },
    ];

    const operationalFlow = [
        {
            step: '01. Global Sourcing',
            icon: 'public',
            desc: 'Direct partnerships with verified manufacturers worldwide ensuring strict quality control and tiered bulk pricing.'
        },
        {
            step: '02. Hub Warehousing',
            icon: 'inventory_2',
            desc: 'Strategically located fulfillment centers equipped with advanced inventory management systems for rapid turnarounds.'
        },
        {
            step: '03. Last-Mile Delivery',
            icon: 'local_shipping',
            desc: 'Managed fleet and LTL partner networks delivering palletized goods directly to your loading dock with precision tracking.'
        }
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar customLinks={customNavLinks} />

            <main className="flex-1">
                {/* Main Hero */}
                <section className="relative h-[450px] flex items-center bg-primary overflow-hidden">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            alt="Logistics Hub"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6SnuwliBosfVIWDgESAf_wxzYVYUlNgChFqa_MX_muvyHyK_vsBzGJ2RMdCS8pXOQSHIuHPu-jnfHui9w5VquR9ZAfJ5XlfNW3y743rlGlfrlOqRhc9rRL2uwQGWYl1UZ2mHJuh8svjOPcKz7NuU7bJKUU6AuwurJ_M9AuXRcqK_0aEKPQ7tgaVo_joMlcPYuV5rnbj2wAe_8TCFgvKB7BGB2wqdiPbYzzCpcBVy3CI0JzpgRbzwZskkRLEU-dwOzNew-OwS5XL8"
                        />
                    </div>
                    <div className="relative max-w-6xl mx-auto w-full px-6 text-white">
                        <div className="max-w-2xl">
                            <span className="text-cobalt font-black uppercase tracking-[0.2em] text-xs mb-4 block">Engineered for Scale</span>
                            <h1 className="text-5xl font-black uppercase tracking-tight mb-6 leading-[0.9]" style={{ color: '#FFFFFF' }}>Reliable Supply Chain Solutions</h1>
                            <p className="text-slate-300 text-lg font-medium leading-relaxed">
                                From global sourcing to domestic last-mile delivery, qnbim Wholesale manages every touchpoint to ensure your inventory is never at risk.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-white border-b border-slate-200 py-10">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center md:border-r border-slate-100 last:border-0">
                                <p className="text-3xl font-black text-primary">{stat.value}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Operational Flow */}
                <section className="py-20 max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-4">Our Operational Flow</h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-sm italic">A vertically integrated approach to B2B distribution.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-slate-200 z-0"></div>
                        {operationalFlow.map((flow, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm mb-6 group hover:border-cobalt transition-colors">
                                    <span className="material-symbols-outlined text-4xl text-cobalt">{flow.icon}</span>
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">{flow.step}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed px-4">{flow.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Facility Standards Section */}
                <section className="bg-slate-50 py-20 border-y border-slate-200">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <img
                                        alt="Organized Warehouse"
                                        className="w-full h-64 object-cover rounded shadow-md"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJjkFrStfrexDviGSlx24Le0kipCXRT8kyAi-JdPEVsctG5oCE8RDtfFbaz3WNvfVF6J2L6Zs1jCqMXzfvg39d3ZmnIfzLgHBCSXHnaG_wDT_Rg7ceEFg784c44VRzBLIiqnlLK-ELxFLEYja1jsORzrlpmFP1nbM2QQKYTx675yJlta9Gb1Fud-aPpL4WhkU0CcAYaXJGYKsaEumUNr1EIgXx1umnhlxiqGCnfzAFRy8syM20ogmq2GM6MoGzRLiLOptjotwW0Vs"
                                    />
                                    <img
                                        alt="Freight Truck"
                                        className="w-full h-48 object-cover rounded shadow-md"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxXWg2umqImpa7fmSqqKLGENSR6P9LT9oODocMYWeOw9flg-pudfWLWgefw4DIYdypY5B8rcZeeCUVan5QoQ5v3adaB_whFhzH-hN6xUg0qPDU8rVfpSd_sltpL8BOVxY5AqcKGKbc0GlrSTj4I8bp5vnIAoAxxixx24ZVIiO8cUsclD-uxgUCrXoUIFAye19iBxRJacER8YE2H6UOcb-3ee6fwT963NdPnW8sNJw4_jqioJiqTPn4MEhX2eoIgU4mP4_wz3QgFKg"
                                    />
                                </div>
                                <div className="pt-12">
                                    <img
                                        alt="Distribution Center"
                                        className="w-full h-96 object-cover rounded shadow-md"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiHmVWZ1MLVNfDQPF9J_S-puRWV-5GfRRDvCDeWg_lWYhhJ3i1vsD7qqcZzM9pDqYzkKkboxP27sLChomtLXiyO4lFtx3gwYCWwBqZmKtCd0drhBLtY9l5s4sbF0d9X-3o47sxpWm1HV-u0f83GubItQaWzzcpON_BSeIeO0StoTtsSVSw4uDCIC7FbSrJ97hnIhLLm5PIZBfJEiR0-tX9hm5374uESBKpUKXdb_PmF8glUNAd8AAg_liebXwFoZR7XFnF1eYsK9c"
                                    />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-cobalt text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Facility Standards</h4>
                                    <h2 className="text-4xl font-black text-primary uppercase tracking-tight leading-none mb-6">Tier-1 Storage & Handling</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        Our facilities are ISO-certified and climate-monitored. We utilize semi-automated picking systems that reduce human error to near zero, ensuring that every pallet shipped meets the high qnbim Wholesale standard.
                                    </p>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-cobalt mt-1">verified_user</span>
                                        <div>
                                            <p className="text-sm font-bold text-primary uppercase">Fully Insured Cargo</p>
                                            <p className="text-xs text-slate-500 mt-1">Comprehensive coverage from the moment goods leave our dock until they reach yours.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-cobalt mt-1">precision_manufacturing</span>
                                        <div>
                                            <p className="text-sm font-bold text-primary uppercase">EDI Compliance</p>
                                            <p className="text-xs text-slate-500 mt-1">Seamless electronic data interchange for large volume retail partners.</p>
                                        </div>
                                    </li>
                                </ul>
                                <a className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10" href="#">
                                    Download Logistics Specs <span className="material-symbols-outlined text-sm">download</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA section */}
                <section className="py-20 text-center max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-6">Ready to scale your inventory?</h2>
                    <p className="text-slate-500 mb-10">Join 1,200+ retailers who rely on our robust supply chain for their daily operations.</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link href="/wholesale-application" className="w-full md:w-auto bg-cobalt text-white px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-royal transition-all">
                            Apply for Wholesale
                        </Link>
                        <button className="w-full md:w-auto bg-white border-2 border-slate-200 text-slate-800 px-10 py-[14px] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                            Contact Sales
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
