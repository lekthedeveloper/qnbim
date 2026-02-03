import React, { Suspense } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import CatalogHero from '@/components/CatalogHero';
import QuickSkuEntry from '@/components/QuickSkuEntry';
import CatalogSidebar from '@/components/CatalogSidebar';
import CatalogProductGrid from '@/components/CatalogProductGrid';
import CatalogFeatures from '@/components/CatalogFeatures';
import Footer from '@/components/Footer';

export default function CatalogPage() {
    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
            <TopBar padding="px-6" />
            <Navbar padding="px-6" />
            <main className="flex-1 flex flex-col">
                <CatalogHero />
                <Suspense fallback={<div className="h-20 bg-slate-50 animate-pulse m-6 rounded-sm" />}>
                    <QuickSkuEntry />
                </Suspense>
                <div className="flex flex-1">
                    <CatalogSidebar />
                    <CatalogProductGrid />
                </div>
            </main>
            <CatalogFeatures />
            <Footer padding="px-6" />
        </div>
    );
}
