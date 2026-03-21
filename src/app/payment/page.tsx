"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, QrCode, ShieldCheck } from 'lucide-react';
import Script from 'next/script';
import { useStore } from '@/store/useStore';

export default function PaymentPage() {
  const router = useRouter();
  const { selectedSeats } = useStore();
  
  const totalAmount = selectedSeats.length > 0 ? selectedSeats.length * 80 : 80;

  const [paymentStatus, setPaymentStatus] = useState<{type: 'info'|'success'|'error', message: string} | null>(null);

  const handleRazorpayPayment = () => {
    if (typeof window === 'undefined' || !(window as any).Razorpay) {
      setPaymentStatus({type: 'error', message: "Payment Gateway loading... please wait 2 seconds."});
      return;
    }

    setPaymentStatus({type: 'info', message: "Initializing Razorpay Secure Checkout..."});

    const options = {
      key: "rzp_test_STqoArgKX3VptF", // User's Live Test Key
      amount: totalAmount * 100, // Razorpay uses paise
      currency: "INR",
      name: "TATA IPL Tickets",
      description: "BookMyShow Clone Payment",
      image: "https://bookmyshow.com/favicon.ico",
      handler: function (response: any) {
        setPaymentStatus({type: 'success', message: `✅ SECURE PAYMENT SUCCESS! ID: ${response.razorpay_payment_id}`});
        setTimeout(() => {
          router.push('/confirmation');
        }, 1500);
      },
      prefill: {
        name: "Cricket Fan",
        email: "fan@example.com",
        contact: "9999999999"
      },
      theme: { color: "#F84464" }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      setPaymentStatus({type: 'error', message: `❌ Payment Failed: ${response.error.description}`});
    });
    rzp.open();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
           <div className={`p-4 rounded-lg text-sm font-bold shadow-sm transition-all ${
             paymentStatus.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' :
             paymentStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
             'bg-blue-50 text-blue-600 border border-blue-200'
           }`}>
              {paymentStatus.message}
           </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Payment Options</h2>
           </div>
           <div className="p-6 flex flex-col space-y-4">
               <button 
                  onClick={handleRazorpayPayment} 
                  className="w-full relative overflow-hidden bg-gray-900 group text-white py-4 rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center space-x-3 hover:bg-gray-800"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="font-bold text-lg tracking-wide">Pay ₹{totalAmount}</span>
               </button>
               <div className="flex items-center justify-center mt-2 space-x-2 text-xs text-gray-500 font-medium pb-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span>Guaranteed Safe & Secure Checkout via Razorpay</span>
               </div>
               
               <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 mt-2">
                  <div className="bg-gray-50 border border-gray-100 h-10 rounded flex items-center justify-center"><span className="text-[10px] font-bold text-gray-400">UPI</span></div>
                  <div className="bg-gray-50 border border-gray-100 h-10 rounded flex items-center justify-center"><span className="text-[10px] font-bold text-gray-400">Cards</span></div>
                  <div className="bg-gray-50 border border-gray-100 h-10 rounded flex items-center justify-center"><span className="text-[10px] font-bold text-gray-400">NetBanking</span></div>
                  <div className="bg-gray-50 border border-gray-100 h-10 rounded flex items-center justify-center"><span className="text-[10px] font-bold text-gray-400">Wallets</span></div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}
