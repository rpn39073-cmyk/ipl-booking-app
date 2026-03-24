"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import SeatGrid from '@/components/SeatGrid';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';

function AdvancedStadium({ selectedStandId, onSelectStand }: { selectedStandId: string | null, onSelectStand: any }) {
  const stands = [
    { id: 'north', name: 'North (General Stand)', color: '#ec4899', price: 50, dash: '30 70' },
    { id: 'ne', name: 'North East (Premium)', color: '#3b82f6', price: 150, dash: '15 85' },
    { id: 'se', name: 'South East (Pavilion)', color: '#22c55e', price: 200, dash: '15 85' },
    { id: 'south', name: 'South (VIP Stand)', color: '#a855f7', price: 500, dash: '30 70' },
    { id: 'sw', name: 'Corporate Box', color: '#f59e0b', price: 80, dash: '15 85' },
    { id: 'nw', name: 'North West (Hospitality)', color: '#fb923c', price: 300, dash: '15 85' },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square flex items-center justify-center p-4">
       <div className="absolute inset-0 rounded-full border-[40px] border-gray-100 flex items-center justify-center">
          <div className="w-32 h-40 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
             <div className="w-10 h-24 bg-green-200/50 rounded-full"></div>
          </div>
       </div>
       
       <div className="absolute inset-0 origin-center text-xs font-bold text-center">
          {stands.map((stand, i) => (
             <div 
               key={stand.id}
               onClick={() => onSelectStand(stand)}
               className={`absolute w-32 h-16 cursor-pointer flex items-center justify-center rounded transition-all shadow-md
                 ${selectedStandId === stand.id ? 'ring-4 ring-black scale-110 z-10' : 'opacity-90 hover:opacity-100'}
               `}
               style={{
                 backgroundColor: stand.color,
                 color: 'white',
                 top: i === 0 ? '10%' : i === 1 ? '25%' : i === 2 ? '75%' : i === 3 ? '90%' : i === 4 ? '75%' : '25%',
                 left: i === 0 ? '50%' : i === 1 ? '85%' : i === 2 ? '85%' : i === 3 ? '50%' : i === 4 ? '15%' : '15%',
                 transform: 'translate(-50%, -50%)',
                 boxShadow: selectedStandId === stand.id ? `0 0 20px ${stand.color}` : 'none',
               }}
             >
               {stand.name}
             </div>
          ))}
       </div>
    </div>
  );
}

export default function SeatSelectionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const stands = [
    { id: 'north', name: 'North (General Stand)', color: '#ec4899', price: 50 },
    { id: 'ne', name: 'North East (Premium)', color: '#3b82f6', price: 150 },
    { id: 'se', name: 'South East (Pavilion)', color: '#22c55e', price: 200 },
    { id: 'south', name: 'South (VIP Stand)', color: '#a855f7', price: 500 },
    { id: 'sw', name: 'Corporate Box', color: '#f59e0b', price: 80 }, // Using 80 to match screenshots
    { id: 'nw', name: 'North West (Hospitality)', color: '#fb923c', price: 300 },
  ];

  const [selectedStand, setSelectedStand] = useState(stands.find(s => s.id === 'sw')!);
  const { selectedSeats, setSelectedMatch, selectedMatch } = useStore();
  
  const idStr = resolvedParams.id;
  let title = "Kolkata Knight Riders vs Mumbai Indians";
  if (idStr.includes('-vs-')) {
    const formatTeam = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    title = `${formatTeam(idStr.split('-vs-')[0])} vs ${formatTeam(idStr.split('-vs-')[1])}`;
  }

  useEffect(() => {
    if (idStr.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      supabase.from('matches').select('*').eq('id', idStr).single().then(({data}) => {
         if (data) {
            setSelectedMatch({
               id: data.id,
               team_home: data.team_home,
               team_away: data.team_away,
               date_time: new Date(data.date_time).toLocaleDateString('en-US', {weekday:'short', day:'numeric', month:'short', year:'numeric'}),
               stadium: data.stadium
            });
         }
      });
    } else {
      setSelectedMatch({
         id: idStr,
         team_home: title.split(' vs ')[0] || 'Kolkata Knight Riders',
         team_away: title.split(' vs ')[1] || 'Mumbai Indians',
         date_time: "Sun 29 Mar 2026",
         stadium: "EDEN GARDENS"
      });
    }
  }, [idStr, title, setSelectedMatch]);

  useEffect(() => {
    const channel = supabase.channel('seats-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'seats' }, (payload) => {
         console.log('Seat updated realtime event', payload);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const totalAmount = selectedSeats.length * selectedStand.price;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href={`/event/${resolvedParams.id}`} className="p-1 hover:bg-gray-100 rounded-full transition">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                 {selectedMatch ? `${selectedMatch.team_home} vs ${selectedMatch.team_away}` : title}
              </h1>
              <p className="text-xs text-gray-500">{selectedMatch?.stadium || "EDEN GARDENS"} | {selectedMatch?.date_time || "29 Mar"}</p>
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            <span className="text-gray-500 font-normal mr-2">Tickets:</span>
            {selectedSeats.length > 0 ? selectedSeats.length : 1}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
           <h2 className="text-xl font-bold text-gray-900 mb-8 self-start">Select Stand</h2>
           <AdvancedStadium selectedStandId={selectedStand.id} onSelectStand={setSelectedStand} />
           
           <div className="mt-12 w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-1">{selectedStand.name}</h3>
              <p className="text-2xl font-black text-gray-900">₹{selectedStand.price}</p>
              <p className="text-xs text-green-600 font-medium mt-1">Available Filling Fast</p>
           </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
           <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Select Seats</h2>
              <span className="text-sm font-medium text-gray-500">Row C1 - C5</span>
           </div>
           <SeatGrid standName={selectedStand.name} />
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.1)] z-50 p-4 animate-in slide-in-from-bottom-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
               <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Amount</p>
                  <p className="text-2xl font-black text-gray-900">₹{totalAmount}</p>
               </div>
               <div className="h-10 w-px bg-gray-200"></div>
               <div>
                  <p className="text-sm font-bold text-gray-900">{selectedStand.name}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{selectedSeats.map(s => `${s.row_label}-${s.seat_number}`).join(', ')}</p>
               </div>
            </div>
            <Link 
              href="/payment"
              className="bg-[#F84464] hover:bg-rose-600 text-white font-bold py-3 px-10 rounded shadow-lg text-sm transition transform active:scale-95 flex items-center space-x-2"
            >
              <span>SELECT SEAT</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-2">{selectedSeats.length}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
