"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Ticket, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ConfirmationPage() {
  const { selectedSeats, selectedMatch } = useStore();
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [email, setEmail] = useState('cheifhu@outlook.com');

  const totalAmount = selectedSeats.length > 0 ? selectedSeats.length * 80 : 80;
  const standText = selectedSeats.length > 0 
    ? `${selectedSeats[0].stand_id} (${selectedSeats.map(s => `${s.row_label}-${s.seat_number}`).join(', ')})`
    : "Corporate Box (C1-1)";

  const handleSendTicket = () => {
    setEmailStatus('sending');
    setTimeout(() => {
       setEmailStatus('sent');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto w-full p-4 mt-8 flex flex-col gap-6">
         
         <div className="bg-green-500 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-20 h-20 text-white mb-4 shadow-sm rounded-full bg-green-600" />
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Payment Successful</h1>
            <p className="text-green-100 font-medium">Your tickets have been confirmed!</p>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
            <div className="bg-gray-900 p-4 flex justify-between items-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-10 -translate-y-10"></div>
               <div>
                  <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Match Details</p>
                  <h2 className="text-lg font-bold leading-tight">
                    {selectedMatch ? selectedMatch.team_home : 'Kolkata Knight Riders'}
                    <br/>vs<br/>
                    {selectedMatch ? selectedMatch.team_away : 'Mumbai Indians'}
                  </h2>
               </div>
               <Ticket className="w-12 h-12 text-yellow-400 opacity-80" strokeWidth={1.5} />
            </div>
            
            <div className="p-6 flex flex-col gap-4">
               <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                  <p className="text-sm font-bold text-gray-900 text-right">Sun 29 Mar 2026<br/>07:30 PM</p>
               </div>
               <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <p className="text-sm text-gray-500 font-medium">Stand / Seat</p>
                  <p className="text-sm font-bold text-gray-900">{standText}</p>
               </div>
               <div className="flex justify-between items-center pb-2">
                  <p className="text-sm text-gray-500 font-medium">Total Paid</p>
                  <p className="text-xl font-black text-green-600">₹{totalAmount}</p>
               </div>
            </div>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center mt-2">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Get E-Ticket via Email</h3>
            <p className="text-xs text-gray-500 mb-5 text-center">We will send your M-Ticket to this email address.</p>
            
            <div className="w-full flex flex-col space-y-3">
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#F84464] focus:border-transparent outline-none transition"
                 placeholder="Enter your email"
               />
               
               {emailStatus !== 'sent' ? (
                 <button 
                    onClick={handleSendTicket}
                    disabled={emailStatus === 'sending'}
                    className="w-full bg-[#F84464] hover:bg-rose-600 text-white font-bold py-3 rounded-lg shadow-md text-sm transition focus:outline-none flex justify-center items-center"
                 >
                    {emailStatus === 'sending' ? 'Sending...' : 'Send Ticket'}
                 </button>
               ) : (
                 <div className="w-full bg-green-50 border border-green-200 text-green-700 font-bold py-3 rounded-lg flex items-center justify-center space-x-2 shadow-inner">
                    <Check className="w-5 h-5" />
                    <span>Ticket Sent Successfully</span>
                 </div>
               )}
            </div>
         </div>

         <div className="flex justify-center mt-4">
            <Link 
              href="/"
              className="text-[#F84464] font-bold text-sm hover:underline"
            >
               Back to Home
            </Link>
         </div>
      </div>
    </div>
  );
}
