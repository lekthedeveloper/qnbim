'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 400
                        }}
                        className="relative bg-white w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 rounded-sm"
                    >
                        {/* Status Bar */}
                        <div className="h-1.5 bg-teal-accent w-full" />

                        <div className="p-8 text-center">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-accent">
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 15 }}
                                    className="material-symbols-outlined text-4xl"
                                >
                                    check_circle
                                </motion.span>
                            </div>

                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                                {title}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                                {message}
                            </p>

                            <div className="space-y-3">
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="w-full bg-slate-900 text-white py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                                >
                                    Continue Procurement
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-white border border-slate-200 text-slate-900 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all"
                                >
                                    Download Confirmation
                                </motion.button>
                            </div>
                        </div>

                        {/* Footer Graphic */}
                        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-3">
                            <span className="material-symbols-outlined text-teal-accent text-sm">verified</span>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">
                                Institutional Protocol Verified
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
