"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle2, Download, Trophy } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ConfirmationPage() {
  const { selectedSeats, selectedMatch, ticketPrice } = useStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Constants to match the physical ticket image
  const srNo = "35401";
  const gateNo = "10";
  const priceBasic = selectedSeats.length > 0 ? (selectedSeats.length * ticketPrice * 0.75).toFixed(2) : (ticketPrice * 0.75).toFixed(2);
  const tax = selectedSeats.length > 0 ? (selectedSeats.length * ticketPrice * 0.25).toFixed(2) : (ticketPrice * 0.25).toFixed(2);
  const totalAmount = selectedSeats.length > 0 ? (selectedSeats.length * ticketPrice).toFixed(2) : ticketPrice.toFixed(2);

  const downloadPDF = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Standard high-quality, reduced from 3 to prevent mobile memory crashes
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdfWidth = ticketRef.current.offsetWidth;
      const pdfHeight = ticketRef.current.offsetHeight;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`IPL-Ticket-${selectedMatch?.id || '2026'}.pdf`);
      
    } catch (err) {
      console.error("Failed to download ticket", err);
      alert("Failed to save PDF. Please try taking a screenshot manually.");
    } finally {
      setIsDownloading(false);
    }
  };

  const matchTitle = isMounted && selectedMatch ? `${selectedMatch.team_home} VS ${selectedMatch.team_away}`.toUpperCase() : 'KOLKATA KNIGHT RIDERS VS SUNRISERS HYDERABAD';
  const matchDate = isMounted && selectedMatch?.date_time 
    ? new Date(selectedMatch.date_time).toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone: 'Asia/Kolkata'}).toUpperCase() + ', ' + new Date(selectedMatch.date_time).toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit', hour12:true, timeZone: 'Asia/Kolkata'}).toUpperCase().replace('AM','PM') 
    : 'SATURDAY, 23RD MARCH 2024, 07:30 PM';
  const matchStadium = isMounted && selectedMatch?.stadium?.toUpperCase() ? selectedMatch.stadium.toUpperCase() : 'EDEN GARDENS, KOLKATA';
  const matchStand = isMounted && selectedSeats[0]?.stand_id?.toUpperCase() ? selectedSeats[0].stand_id.toUpperCase() : 'F1 Block - JIO PAVILION';
  const matchSeats = isMounted && selectedSeats.length > 0 ? selectedSeats.map(s => s.seat_number).join(',') : '1200';
  const homeInitials = isMounted && selectedMatch?.team_home ? selectedMatch.team_home.substring(0,3).toUpperCase() : 'KKR';
  const awayInitials = isMounted && selectedMatch?.team_away ? selectedMatch.team_away.substring(0,3).toUpperCase() : 'SRH';

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans pb-20">
      <div className="max-w-md mx-auto w-full p-4 mt-8 flex flex-col gap-6">
         
         <div className="bg-emerald-600 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 text-white mb-2" />
            <h1 className="text-2xl font-black text-white mb-1 tracking-tight uppercase">Booking Confirmed</h1>
            <p className="text-emerald-100 text-sm font-medium">Your ticket is ready to download.</p>
         </div>

         {/* Ticket Container to be captured */}
         <div className="w-full flex justify-center drop-shadow-2xl">
           <div 
             ref={ticketRef} 
             className="w-full bg-white flex flex-col items-center overflow-hidden border border-gray-200"
             style={{ width: '380px' }} // Fixed width for consistent image scaling
           >
             {/* Barcode area */}
             <div className="w-full bg-white flex justify-center py-5">
                <div className="w-[85%] h-14 flex items-center justify-between opacity-80">
                   {[...Array(60)].map((_, i) => (
                      <div key={i} className="bg-black h-full" style={{ width: `${Math.floor(Math.random() * 4) + 1}px`, margin: '0 1px' }}></div>
                   ))}
                </div>
             </div>
             
             {/* Header stripes */}
             <div className="w-full h-2 bg-blue-500"></div>
             <div className="w-full h-8 bg-blue-100"></div>
             
             {/* Stub info */}
             <div className="w-full px-6 py-4 flex justify-between text-[8px] font-bold text-gray-600 uppercase">
                <div className="space-y-0.5">
                   <p className="text-[10px] text-black">Ticket Price: ₹{totalAmount}</p>
                   <p>Base Price: ₹{priceBasic}</p>
                   <p>CGST: ₹{(parseFloat(tax)/2).toFixed(2)}</p>
                   <p>SGST: ₹{(parseFloat(tax)/2).toFixed(2)}</p>
                </div>
                <div className="text-right space-y-0.5">
                   <p>SR. NO. {srNo}</p>
                   <p className="text-[10px] text-black pt-1 block">ADMIT ONE</p>
                </div>
             </div>

             {/* Match Details Area */}
             <div className="w-full flex flex-col items-center text-center px-6 pt-2 pb-6 relative z-10">
                {/* Background watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 -z-10">
                    <Trophy className="w-48 h-48" />
                </div>
                
                <div className="flex items-center space-x-6 mb-6">
                   <div className="flex flex-col items-center justify-center border-r-2 border-dashed border-gray-300 pr-6">
                      <Trophy className="w-10 h-10 text-indigo-900" />
                      <span className="text-[10px] font-black text-indigo-900 tracking-tighter mt-1">TATA IPL</span>
                   </div>
                   
                   <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-900 flex flex-col items-center justify-center shadow-md border-2 border-white">
                         <span className="font-black text-white text-sm">
                            {homeInitials}
                         </span>
                      </div>
                      <span className="font-black text-gray-400 text-xs">VS</span>
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-600 flex flex-col items-center justify-center shadow-md border-2 border-white">
                         <span className="font-black text-white text-sm">
                            {awayInitials}
                         </span>
                      </div>
                   </div>
                </div>
                
                <h2 className="text-sm font-black text-gray-900 leading-snug mb-3 tracking-wide w-[90%]">
                   {matchTitle}
                </h2>
                
                <p className="text-[10px] font-bold text-gray-600 mb-1">
                   {matchDate}
                </p>
                
                <p className="text-[10px] font-bold text-gray-600 uppercase mb-6">
                   {matchStadium}
                </p>
                
                <div className="mt-2 text-center w-full">
                   <p className="text-[11px] font-black text-gray-800 uppercase tracking-widest border-t border-b border-gray-200 py-3">
                      {matchStand}
                   </p>
                </div>
             </div>

             {/* Bottom colored strip */}
             <div className="w-full bg-[#461b7e] mt-auto flex justify-between items-stretch text-white">
                <div className="flex flex-col justify-center px-6 py-6 border-r border-[#6930c3] flex-1">
                   <p className="text-[7px] text-gray-300 uppercase tracking-widest mb-1 opacity-80">Entry From</p>
                   <p className="text-xs font-black uppercase leading-tight max-w-[140px]">
                      Shahid Khudiram Bose Road
                   </p>
                </div>
                
                <div className="flex flex-shrink-0 items-stretch min-w-[140px]">
                   <div className="bg-[#00d4ff] text-indigo-950 flex flex-col items-center justify-center px-5 relative border-r border-[#461b7e]">
                      <span className="text-[7px] font-bold uppercase tracking-widest mb-1 opacity-80">Gate No.</span>
                      <span className="text-3xl font-black">{gateNo}</span>
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00b4d8]"></div>
                   </div>
                   
                   <div className="bg-white text-[#461b7e] flex flex-col items-center justify-center px-5">
                      <span className="text-[7px] font-bold uppercase tracking-widest mb-1 opacity-70">Seat No.</span>
                      {matchSeats.length > 8 ? (
                         <span className="text-sm font-black leading-tight p-1 break-all text-center max-w-[60px]">{matchSeats}</span>
                      ) : (
                         <span className="text-3xl font-black">{matchSeats}</span>
                      )}
                   </div>
                </div>
             </div>
             
             {/* Bottom thin brand line */}
             <div className="w-full h-1 bg-[#00d4ff]"></div>
           </div>
         </div>

         {/* Download Action */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center text-center">
               <Download className="w-5 h-5 mr-2 text-indigo-600" /> Save Offline
            </h3>
            <button 
               onClick={downloadPDF}
               disabled={isDownloading || !isMounted}
               className={`w-full text-white font-bold py-4 rounded-xl shadow-md transition transform active:scale-95 flex justify-center items-center space-x-2 ${isDownloading || !isMounted ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'}`}
            >
               <span>{isDownloading ? 'Downloading PDF...' : 'Download as PDF'}</span>
            </button>
            <p className="text-xs text-center text-gray-500 mt-4 px-2">
               Save this digital ticket on your phone and scan the barcode at the gate. No printed copy is required.
            </p>
         </div>

         <div className="flex justify-center mt-2">
            <Link href="/" className="text-gray-500 font-bold text-sm hover:text-indigo-900 transition mb-6">
               ← Back to Home
            </Link>
         </div>
      </div>
    </div>
  );
}
