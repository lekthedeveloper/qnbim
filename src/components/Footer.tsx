import React from 'react';
import Link from 'next/link';

interface FooterProps {
    padding?: string;
    isLogistics?: boolean;
}

const Footer: React.FC<FooterProps> = ({ padding = 'px-10', isLogistics = false }) => {
    return (
        <footer className={`bg-primary text-white/70 py-12 ${padding} border-t border-white/10`}>
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 text-white mb-4">
                        <span className="material-symbols-outlined text-2xl text-teal-accent">
                            {isLogistics ? 'warehouse' : 'warehouse'}
                        </span>
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            qnbim WHOLESALE
                        </h2>
                    </div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-4 space-y-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        <p>5 Fedornak Fwy</p>
                        <p>Berkeley Township, NJ 08757</p>
                    </div>
                    <p className="text-xs leading-relaxed mb-6 max-w-sm">
                        {isLogistics
                            ? 'Supply chain logistics and workflow studio distribution. Proprietary freight management system for high-volume B2B accounts.'
                            : 'Supply chain logistics and wholesale distribution of daily household essentials. Servicing commercial accounts since 2012.'}
                    </p>
                    <div className="flex gap-4">
                        <a className="text-slate-300 hover:text-white" href="#">
                            <span className="material-symbols-outlined">{isLogistics ? 'analytics' : 'social_leaderboard'}</span>
                        </a>
                        <a className="text-slate-300 hover:text-white" href="#">
                            <span className="material-symbols-outlined">mail</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="text-white text-xs font-black uppercase mb-4 tracking-widest">
                        {isLogistics ? 'Logistics' : 'Company'}
                    </h4>
                    <ul className="text-xs space-y-3">
                        {isLogistics ? (
                            <>
                                <li><a className="hover:text-teal-accent" href="#">LTL Rate Calculator</a></li>
                                <li><a className="hover:text-teal-accent" href="#">Track Shipment</a></li>
                                <li><a className="hover:text-teal-accent" href="#">Warehouse Status</a></li>
                                <li><a className="hover:text-teal-accent" href="#">Freight Claims</a></li>
                            </>
                        ) : (
                            <>
                                <li><Link className="hover:text-teal-accent" href="/about-logistics">About Our Logistics</Link></li>
                                <li><Link className="hover:text-teal-accent" href="/warehouse-locations">Warehouse Locations</Link></li>
                                <li><Link className="hover:text-teal-accent" href="/careers">Careers</Link></li>
                                <li><Link className="hover:text-teal-accent" href="/terms-of-sale">Terms of Sale</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                <div>
                    <h4 className="text-white text-xs font-black uppercase mb-4 tracking-widest">Resources</h4>
                    <ul className="text-xs space-y-3">
                        {isLogistics ? (
                            <>
                                <li><Link className="hover:text-teal-accent" href="/wholesale-application">Wholesale Application</Link></li>
                                <li><a className="hover:text-teal-accent" href="#">Terms of Carriage</a></li>
                                <li><Link className="hover:text-teal-accent" href="/tax-exemption">Tax Exemption Help</Link></li>
                                <li><a className="hover:text-teal-accent" href="#">Packaging Guide</a></li>
                            </>
                        ) : (
                            <>
                                <li><Link className="hover:text-teal-accent" href="/wholesale-application">Wholesale Application</Link></li>
                                <li><Link className="hover:text-teal-accent" href="/ltl-rates">LTL Rate Calculator</Link></li>
                                <li><Link className="hover:text-teal-accent" href="/tax-exemption">Tax Exemption Help</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                <div>
                    <h4 className="text-white text-xs font-black uppercase mb-4 tracking-widest">Support</h4>
                    <p className="text-[10px] mb-4">
                        {isLogistics ? 'Logistics Desk Support:' : 'Dedicated Account Manager Support:'}
                    </p>
                    <p className="text-white font-bold text-xs mb-1">
                        {isLogistics ? '1-800-QNBM-LOGS' : '1-800-QNBM-B2B'}
                    </p>
                    <p className="text-[10px]">Mon-Fri {isLogistics ? '7am-7pm' : '8am-6pm'} EST</p>
                    {isLogistics && <p className="text-[10px] mt-2">orders@qnbim.biz</p>}
                </div>
            </div>
            <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-white/10 text-center text-[10px] uppercase tracking-widest text-white/50">
                © {new Date().getFullYear()} qnbim Wholesale. {isLogistics ? 'Logistics Dashboard v2.4.1' : 'A Professional Supply Chain Solution.'}
            </div>
        </footer>
    );
};

export default Footer;
