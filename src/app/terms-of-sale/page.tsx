import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsOfSalePage() {
    const sidebarLinks = [
        { name: 'Order Fulfillment', href: '#orders' },
        { name: 'Payment Terms', href: '#payment' },
        { name: 'Shipping & Delivery', href: '#shipping' },
        { name: 'Returns & Shortages', href: '#returns' },
        { name: 'Limitation of Liability', href: '#liability' },
        { name: 'Governing Law', href: '#governance' },
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc]">
            <TopBar />
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full py-12 px-6 md:px-10 lg:px-20">
                <div className="mb-12 border-b border-slate-200 pb-10">
                    <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Terms of Sale</h1>
                    <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        <span>Last Updated: January 15, 2026</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>Version 4.2.0</span>
                    </div>
                </div>

                <div className="flex flex-col lg:row gap-12 lg:flex-row">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-28 space-y-8">
                            <nav className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Navigation</p>
                                {sidebarLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        className="block py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-teal-accent transition-colors border-l-2 border-transparent hover:border-teal-accent pl-4"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </nav>
                            <div className="bg-slate-50 p-6 border border-slate-200 rounded-sm">
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3 italic">Questions?</h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-4 font-medium">For clarification on these terms, contact your account manager.</p>
                                <a className="text-[11px] font-bold text-teal-accent hover:underline uppercase tracking-wider" href="mailto:legal@heidistore.com">
                                    legal@heidistore.com
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Policy Content */}
                    <div className="flex-1 max-w-3xl">
                        <div className="space-y-16">
                            <section id="orders" className="scroll-mt-32">
                                <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-6 border-b border-slate-100 pb-2">1. Order Acceptance & Fulfillment</h2>
                                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                                    All orders placed through the Heidi Store Wholesale portal are subject to acceptance by Heidi Store ("the Seller"). We reserve the right to refuse service or cancel orders at our sole discretion, including but not limited to cases of inventory shortages or pricing errors.
                                </p>

                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mt-8 mb-4">1.1 Minimum Order Quantity (MOQ)</h3>
                                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                                    Wholesale accounts require a minimum opening order of $500.00. Subsequent reorders must meet a minimum value of $250.00 to qualify for wholesale tier pricing.
                                </p>

                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mt-8 mb-4">1.2 Cancellations</h3>
                                <p className="text-sm leading-relaxed text-slate-600 mb-4">
                                    Orders may be cancelled within 4 hours of submission. Once an order has reached the "Processing" or "Picking" status in our warehouse, it cannot be modified or cancelled.
                                </p>
                            </section>

                            <section id="payment" className="scroll-mt-32">
                                <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-6 border-b border-slate-100 pb-2">2. Payment Terms</h2>
                                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                                    Standard terms for approved wholesale accounts are Net 30 from the date of invoice. New accounts may be required to pay via Credit Card or Wire Transfer for their first three (3) transactions.
                                </p>
                                <ul className="list-disc list-inside text-sm text-slate-600 space-y-3 mb-6 ml-2 font-medium">
                                    <li>Late payments are subject to a 1.5% monthly service charge.</li>
                                    <li>Payments made via Credit Card over $5,000 may incur a 3% processing fee.</li>
                                    <li>We accept ACH, Wire Transfer, and major Credit Cards.</li>
                                </ul>
                            </section>

                            <section id="shipping" className="scroll-mt-32">
                                <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-6 border-b border-slate-100 pb-2">3. Shipping & Delivery</h2>
                                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                                    All wholesale shipments are FOB Origin unless otherwise specified in writing. Title and risk of loss pass to the Buyer upon delivery to the carrier.
                                </p>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mt-8 mb-4">3.1 LTL & Palletized Freight</h3>
                                <p className="text-sm leading-relaxed text-slate-600 mb-4">
                                    Standard shipping for volume orders is via LTL (Less Than Truckload) carriers. It is the responsibility of the Buyer to ensure the delivery location can accommodate a 53ft trailer and has a loading dock or forklift. Liftgate services must be requested at the time of order and may incur additional fees.
                                </p>
                            </section>

                            <section id="returns" className="scroll-mt-32">
                                <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-6 border-b border-slate-100 pb-2">4. Returns & Shortages</h2>
                                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                                    Heidi Store Wholesale does not accept returns for unsold inventory or "buyer's remorse." All sales are final unless products arrive damaged or there is a verifiable fulfillment error.
                                </p>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mt-8 mb-4">4.1 Damage Claims</h3>
                                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                                    Visible damage to packaging must be noted on the Bill of Lading (BOL) at the time of delivery. Claims for concealed damage or shortages must be reported to our Logistics team within 48 hours of receipt.
                                </p>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mt-8 mb-4">4.2 Restocking Fees</h3>
                                <p className="text-sm leading-relaxed text-slate-600 mb-4">
                                    Authorized returns for reasons other than Seller error are subject to a 20% restocking fee. The Buyer is responsible for return freight costs.
                                </p>
                            </section>

                            <section id="liability" className="scroll-mt-32">
                                <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-6 border-b border-slate-100 pb-2">5. Limitation of Liability</h2>
                                <p className="text-sm leading-relaxed text-slate-600 mb-6 font-medium">
                                    IN NO EVENT SHALL HEIDI STORE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, OR DATA, INCURRED BY THE BUYER OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                                </p>
                                <p className="text-sm leading-relaxed text-slate-600 mb-4">
                                    The Seller's total liability for any claim arising out of or relating to these Terms of Sale shall not exceed the total amount paid by the Buyer for the specific goods giving rise to the claim.
                                </p>
                            </section>

                            <section id="governance" className="scroll-mt-32 pb-24">
                                <h2 className="text-xl font-black uppercase tracking-tight text-primary mb-6 border-b border-slate-100 pb-2">6. Governing Law</h2>
                                <p className="text-sm leading-relaxed text-slate-600 mb-4 font-medium italic">
                                    These terms and conditions shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. Any legal action or proceeding relating to your access to, or use of, the site or purchase of goods shall be instituted in a state or federal court in Delaware.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
