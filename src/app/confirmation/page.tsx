"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Check, Download, Trophy } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ConfirmationPage() {
  const { selectedSeats, selectedMatch, userDetails } = useStore();
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [email, setEmail] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Constants to match the physical ticket image
  const srNo = "032743";
  const rollNo = "0131";
  const gateNo = "12";
  const priceBasic = selectedSeats.length > 0 ? (selectedSeats.length * 80 * 0.75).toFixed(2) : "60.00";
  const tax = selectedSeats.length > 0 ? (selectedSeats.length * 80 * 0.25).toFixed(2) : "20.00";
  const totalAmount = selectedSeats.length > 0 ? selectedSeats.length * 80 : 80;

  const handleSendTicket = () => {
    setEmailStatus('sending');
    setTimeout(() => {
       setEmailStatus('sent');
    }, 1500);
  };

  const downloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
        window.print();
        setIsDownloading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 print:bg-white font-sans">
      <div className="max-w-4xl mx-auto w-full p-4 mt-8 flex flex-col gap-8 print:m-0 print:p-0 print:block">
         
         <div className="bg-emerald-600 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 print:hidden">
            <CheckCircle2 className="w-16 h-16 text-white mb-4" />
            <h1 className="text-3xl font-black text-white mb-1 tracking-tight uppercase">Booking Confirmed!</h1>
            <p className="text-emerald-100 font-medium">Your entry pass is ready for download.</p>
         </div>

         {/* Physical Ticket Simulation */}
         <div id="physical-ticket" className="relative bg-[#fffdf0] border-2 border-gray-300 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[350px] print:shadow-none print:border-gray-200">
            
            {/* Left Stub */}
            <div className="w-full md:w-1/4 border-r-2 border-dashed border-gray-300 p-4 flex flex-col justify-between bg-white/50 relative">
               <div className="text-[10px] font-bold text-gray-500 space-y-0.5">
                  <p>Sr. No: {srNo}</p>
                  <p>Roll No: {rollNo}</p>
                  <p className="text-black uppercase mt-2">ADMIT ONE</p>
               </div>
               
               <div className="mt-4">
                  <h3 className="text-xs font-black text-gray-900 border-b border-gray-200 pb-1 mb-2">
                     {selectedMatch ? `${selectedMatch.team_home.split(' ').map(w => w[0]).join('')} vs ${selectedMatch.team_away.split(' ').map(w => w[0]).join('')}` : 'CSK vs RR'}
                  </h3>
                  <div className="flex items-center space-x-2 opacity-80">
                      <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-[10px] text-white font-bold">
                        {selectedMatch?.team_home.substring(0, 2).toUpperCase() || 'H'}
                      </div>
                      <span className="text-[8px] font-bold">VS</span>
                      <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-[10px] text-white font-bold">
                        {selectedMatch?.team_away.substring(0, 2).toUpperCase() || 'A'}
                      </div>
                  </div>
               </div>

               <div className="mt-auto pt-4 text-[9px] font-bold text-gray-600">
                   <p>BASIC: Rs. {priceBasic}</p>
                   <p>TAX: Rs. {tax}</p>
                   <p className="text-black text-[11px] mt-1">TOTAL: Rs. {totalAmount}</p>
               </div>
            </div>

            {/* Main Ticket Area */}
            <div className="flex-1 p-6 relative flex flex-col">
               {/* Branding Header */}
               <div className="flex justify-between items-start mb-6">
                  <div className="text-[10px] font-bold text-gray-500">
                     <p>Sr. No: {srNo}</p>
                     <p>Roll No: {rollNo}</p>
                     <p className="text-black uppercase">ADMIT ONE</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                     <div className="flex items-center space-x-2 mb-1">
                        <Trophy className="w-5 h-5 text-indigo-900" />
                        <span className="font-black italic text-xl tracking-tighter text-indigo-950">TATA IPL</span>
                     </div>
                     <div className="bg-yellow-400 text-[8px] font-black px-2 py-0.5 rounded tracking-widest text-indigo-950">OFFICIAL TICKET</div>
                  </div>
               </div>

               {/* Center Match Info */}
               <div className="flex flex-col items-center justify-center flex-grow text-center py-4">
                  <div className="flex items-center justify-center space-x-8 mb-4">
                     <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white shadow-md border-2 border-gray-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-black text-indigo-900">{selectedMatch?.team_home.split(' ').map(w => w[0]).join('') || 'CSK'}</span>
                        </div>
                        <p className="text-[10px] font-black mt-2 text-gray-800 max-w-[80px] leading-tight">
                            {selectedMatch?.team_home || 'Chennai Super Kings'}
                        </p>
                     </div>
                     
                     <span className="text-2xl font-black italic text-gray-300">VS</span>

                     <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white shadow-md border-2 border-gray-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-black text-blue-800">{selectedMatch?.team_away.split(' ').map(w => w[0]).join('') || 'RR'}</span>
                        </div>
                        <p className="text-[10px] font-black mt-2 text-gray-800 max-w-[80px] leading-tight">
                            {selectedMatch?.team_away || 'Rajasthan Royals'}
                        </p>
                     </div>
                  </div>

                  <h2 className="text-lg font-black text-indigo-950 uppercase tracking-tight mb-1">
                     {selectedMatch?.date_time || 'SUNDAY, 31ST MARCH 2026, 8 PM'}
                  </h2>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                     {selectedMatch?.stadium || 'M.A. CHIDAMBARAM STADIUM, CHENNAI'}
                  </p>
                  
                  <div className="mt-4 flex flex-col items-center">
                     <p className="text-sm font-black text-gray-900 tracking-wider">
                        {selectedSeats[0]?.stand_id || 'GULF OIL STAND'}
                     </p>
                     <p className="text-[10px] font-bold text-gray-500 uppercase">
                        {selectedSeats[0]?.stand_id.includes('Box') ? 'VIP TIER' : 'G UPPER TIER'}
                     </p>
                  </div>
               </div>

               {/* Footer Details */}
               <div className="grid grid-cols-3 gap-4 border-t-2 border-gray-200 pt-4 items-end">
                  <div className="text-center md:text-left">
                     <p className="text-[10px] font-bold text-gray-500 uppercase">Gate No</p>
                     <p className="text-xl font-black text-indigo-950 leading-none">{gateNo}</p>
                     <p className="text-[8px] font-bold text-gray-500 mt-1 uppercase">Wallajah Road</p>
                  </div>
                  <div className="col-span-2 flex justify-end space-x-12">
                     <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Row</p>
                        <p className="text-xl font-black text-indigo-950 leading-none">
                           {selectedSeats[0]?.row_label || 'H'}
                        </p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Seat</p>
                        <div className="text-xl font-black text-indigo-950 leading-none flex flex-col">
                           {selectedSeats.length > 0 ? selectedSeats.map(s => s.seat_number).join(', ') : '466'}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Barcode Area */}
            <div className="w-full md:w-[80px] bg-white border-l-2 border-gray-200 flex flex-col items-center justify-center p-2 hidden md:flex">
               <div className="flex-1 flex flex-col items-center justify-center space-y-1 mb-4 opacity-70">
                  {[...Array(30)].map((_, i) => (
                     <div 
                        key={i} 
                        className={`w-10 h-[2px] bg-black ${i % 3 === 0 ? 'opacity-100' : i % 5 === 0 ? 'opacity-40' : 'opacity-80'}`} 
                        style={{ height: `${Math.floor(Math.random() * 3) + 1}px` }}
                     ></div>
                  ))}
               </div>
               
               <div className="p-1 border border-gray-200 rounded mb-4">
                  <img src="/qr-code.png" alt="Ticket QR" className="w-12 h-12 grayscale brightness-110 contrast-125" />
               </div>

               <p className="text-[7px] font-mono text-gray-400 rotate-90 whitespace-nowrap mb-6 origin-center translate-y-4">
                  POS/2526512794/36/0326/22:13
               </p>
            </div>

            {/* Price tag for print layout specifically */}
            <div className="absolute top-2 right-2 hidden flex-col items-end text-[8px] font-bold text-right print:flex">
                <p>BASIC: Rs.{priceBasic}</p>
                <p>E TAX: Rs.{tax}</p>
                <p className="border-t border-gray-300 pt-0.5">TOTAL PRICE Rs.{totalAmount}.00</p>
            </div>
         </div>

         {/* Actions Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Download className="w-5 h-5 mr-2 text-indigo-600" /> Save Offline
               </h3>
               <button 
                  onClick={downloadPDF}
                  disabled={isDownloading}
                  className="w-full bg-indigo-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-md transition transform active:scale-95 flex justify-center items-center space-x-2"
               >
                  <span>{isDownloading ? 'Opening Printer...' : 'Download M-Ticket'}</span>
               </button>
               <p className="text-[10px] text-gray-400 mt-3 text-center">Save as PDF or print this ticket for entry.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2 text-emerald-600" /> Send to Email
               </h3>
               <div className="flex flex-col space-y-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-600 outline-none transition"
                    placeholder="Enter your email"
                  />
                  {emailStatus !== 'sent' ? (
                    <button 
                       onClick={handleSendTicket}
                       disabled={emailStatus === 'sending'}
                       className="w-full bg-[#F84464] hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition"
                    >
                       {emailStatus === 'sending' ? 'Sending...' : 'Send M-Ticket'}
                    </button>
                  ) : (
                    <div className="w-full bg-emerald-50 text-emerald-700 font-bold py-3 rounded-xl flex items-center justify-center space-x-2">
                       <Check className="w-5 h-5" />
                       <span>Sent Successfully</span>
                    </div>
                  )}
               </div>
            </div>
         </div>

         <div className="flex justify-center mt-4 print:hidden">
            <Link href="/" className="text-gray-500 font-bold text-sm hover:text-indigo-900 transition">
               ← Return to Home
            </Link>
         </div>
      </div>
      
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:m-0 { margin: 0 !important; }
          .print\\:p-0 { padding: 0 !important; }
          #physical-ticket { 
            box-shadow: none !important; 
            border: 1px solid #ddd !important;
            page-break-inside: avoid;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
