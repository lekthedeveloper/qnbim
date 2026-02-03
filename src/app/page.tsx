import React, { Suspense } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickBulkAdd from '@/components/QuickBulkAdd';
import ProductGrid from '@/components/ProductGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<div className="h-20 bg-slate-50 animate-pulse m-10 rounded-sm" />}>
          <QuickBulkAdd />
        </Suspense>
        <ProductGrid />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
