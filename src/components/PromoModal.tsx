"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Tag, Sparkles } from 'lucide-react';

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the modal in this session to prevent annoyance
    const hasSeenPromo = sessionStorage.getItem('hasSeenPromo');
    
    if (!hasSeenPromo) {
      // Delay opening the modal by a short duration for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPromo', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
       {/* Backdrop */}
       <div 
         className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
         onClick={handleClose}
       ></div>
       
       {/* Modal Content */}
       <div className="relative bg-gradient-to-br from-indigo-900 to-[#1e112a] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          
          <button 
             onClick={handleClose}
             className="absolute top-3 right-3 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition pointer-events-auto"
          >
             <X className="w-5 h-5" />
          </button>

          <div className="relative h-40 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">
             <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent"></div>
             <div className="absolute bottom-4 left-6 flex items-center space-x-2">
                <div className="bg-[#F84464] text-white px-2 py-1 rounded text-xs font-black tracking-wider shadow-lg flex items-center">
                   <Sparkles className="w-3 h-3 mr-1" /> EXCLUSIVE OFFER
                </div>
             </div>
          </div>

          <div className="p-8 pt-4 text-center">
             <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                Early Bird <span className="text-yellow-400">Discount!</span>
             </h2>
             <p className="text-indigo-200 text-sm mb-6">
                Book your TATA IPL 2026 tickets today and get <strong className="text-white">20% Cashback</strong> in your wallet on your first booking! Offer valid for a limited time only.
             </p>
             
             <div className="flex items-center justify-center space-x-3 mb-6 bg-yellow-400/10 border border-yellow-400/20 py-3 rounded-xl border-dashed">
                <Tag className="text-yellow-400 w-5 h-5" />
                <span className="font-mono text-xl font-bold text-yellow-400 tracking-widest">IPL2026WIN</span>
             </div>

             <button 
                onClick={handleClose}
                className="w-full bg-[#F84464] hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-rose-500/30 transition transform active:scale-95 text-lg"
             >
                Claim Offer Now
             </button>
             
             <button onClick={handleClose} className="mt-4 text-xs text-gray-400 hover:text-white transition underline">
                No thanks, I'll pay full price.
             </button>
          </div>
       </div>
    </div>
  );
}
