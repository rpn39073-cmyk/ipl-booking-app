"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, QrCode } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function PaymentPage() {
  const router = useRouter();
  const { selectedSeats } = useStore();
  
  const totalAmount = selectedSeats.length > 0 ? selectedSeats.length * 80 : 80;

  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
  }, []);

  const handleUpiClick = (app: string) => {
    if (app === 'Google Pay' || app === 'Other') {
      setPaymentStatus(`Server Down: ${app} is currently unavailable. Please try another method.`);
      setTimeout(() => setPaymentStatus(null), 3000);
    } else {
      setPaymentStatus(`Processing payment via ${app}...`);
      setTimeout(() => {
        router.push('/confirmation');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-md mx-auto flex items-center">
          <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded-full transition mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Payment Options</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full p-4 flex flex-col gap-6 mt-4">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
           <p className="text-sm text-gray-500 font-medium mb-1">Amount Payable</p>
           <p className="text-4xl font-black text-gray-900">₹{totalAmount}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#F84464] to-yellow-400"></div>
           <h2 className="text-lg font-bold text-gray-900 mb-2">Scan QR to Pay</h2>
           <p className="text-xs text-gray-500 mb-6">Scan with any UPI App</p>
           
           <div className="w-48 h-48 bg-white border-2 border-gray-100 p-2 rounded-xl shadow-inner mb-4 flex items-center justify-center">
               <QrCode className="w-full h-full text-gray-800" strokeWidth={1} />
           </div>
           
           <div className="flex space-x-2 items-center justify-center pt-4 border-t border-gray-100 w-full">
               <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Secure Payment</span>
           </div>
        </div>

        {paymentStatus && (
           <div className={`p-4 rounded-lg text-sm font-semibold transition-all ${paymentStatus.includes('Server Down') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
              {paymentStatus}
           </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">UPI Options</h2>
           </div>
           
           <div className="flex flex-col">
              <button onClick={() => handleUpiClick('Paytm')} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition active:bg-gray-100 text-left">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#002970] rounded-lg flex items-center justify-center shadow-sm">
                       <span className="text-white font-bold text-xs">Paytm</span>
                    </div>
                    <div>
                       <p className="font-bold text-gray-900">Paytm <span className="text-xs font-normal text-[#F84464] bg-red-50 px-2 py-0.5 rounded ml-2">Active</span></p>
                       <p className="text-xs text-gray-500">Pay instantly</p>
                    </div>
                 </div>
                 <ChevronLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>

              <button onClick={() => handleUpiClick('PhonePe')} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition active:bg-gray-100 text-left">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#5f259f] rounded-lg flex items-center justify-center shadow-sm">
                       <span className="text-white font-bold text-xs" style={{transform: "scale(0.8)"}}>PhonePe</span>
                    </div>
                    <div>
                       <p className="font-bold text-gray-900">PhonePe</p>
                       <p className="text-xs text-gray-500">Fast & secure</p>
                    </div>
                 </div>
                 <ChevronLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>

              <button onClick={() => handleUpiClick('Google Pay')} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition active:bg-gray-100 text-left">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                       <span className="text-gray-900 font-bold text-lg">G</span>
                    </div>
                    <div>
                       <p className="font-bold text-gray-900">Google Pay</p>
                       <p className="text-xs text-gray-500">Via UPI</p>
                    </div>
                 </div>
                 <ChevronLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>

              <button onClick={() => handleUpiClick('Other')} className="flex items-center justify-between p-4 hover:bg-gray-50 transition active:bg-gray-100 text-left">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                       <span className="text-gray-500 font-bold text-lg">+</span>
                    </div>
                    <div>
                       <p className="font-bold text-gray-900">Other UPI Apps</p>
                       <p className="text-xs text-gray-500">BHIM, Amazon Pay, etc.</p>
                    </div>
                 </div>
                 <ChevronLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
