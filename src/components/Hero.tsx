'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.95, filter: 'blur(10px)', opacity: 0 },
        visible: {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 0.4,
            transition: { duration: 0.8 }
        }
    };

    return (
        <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQbWvMRxcNsxVQytNqcroj3BoYWPZGkAPqNPd2-v5P5ziv8_fbN7T6-1pk58zMkCWZE_ZATx_8xFWjiN_oBiv9c4cZnacjzd9bwhuZbjoVpUoY8HnE-F_roUj4yfz8t8kQ8661qDwW-lNEw5ExPGmfxXnEMgN-oPrUvm7f_SW8aesTLkQ8eXSHc8aulHrhXq57nRYujqBIAifeb4RFXWr6KOwsroTI2QKFdTvcD1wu_jG-EEXMvhOILwq4_gNSfbpthcuaEE_EXBs')" }}
            ></motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
            <div className="relative h-full flex items-center px-5 md:px-20 lg:px-40">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-2xl w-full"
                >
                    <motion.span variants={itemVariants} className="inline-block bg-teal-accent text-white text-[10px] font-black px-2 py-0.5 mb-4 uppercase">Direct-to-Business Logistics</motion.span>
                    <motion.h1 variants={itemVariants} className="text-white text-2xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-left md:text-left !text-white">
                        High-Volume Wholesale <br className="hidden md:block" />Household Essentials
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-white/80 text-sm md:text-lg mb-8 max-w-lg text-left md:text-left">
                        Dedicated supply chain partner for retail, property management, and hospitality. Tiered pallet pricing and nationwide LTL delivery.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-2.5 w-full md:w-auto">
                        <Link
                            href="/wholesale-application"
                            className="w-full md:w-auto bg-teal-accent text-white px-8 py-2.5 min-h-[44px] flex items-center justify-center font-semibold text-[13px] uppercase tracking-widest hover:bg-teal-600 active:brightness-90 transition-all text-center rounded-[8px] leading-none"
                        >
                            Open a Wholesale Account
                        </Link>
                        <button className="w-full md:w-auto bg-transparent border-2 border-white text-white px-8 py-2.5 min-h-[44px] flex items-center justify-center font-semibold text-[13px] uppercase tracking-widest hover:bg-white/10 active:brightness-90 transition-all gap-2 rounded-[8px] leading-none">
                            <span className="material-symbols-outlined text-base">grid_view</span> Order by SKU
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
