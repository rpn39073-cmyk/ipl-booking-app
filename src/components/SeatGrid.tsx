"use client";

import React from 'react';
import { useStore } from '@/store/useStore';

interface Seat {
  id: string;
  row_label: string;
  seat_number: number;
  status: 'Available' | 'Selected' | 'Booked';
}

export default function SeatGrid({ standName }: { standName: string }) {
  const { selectedSeats, addSeat, removeSeat, ticketLimit } = useStore();

  const rows = ['C1', 'C2', 'C3', 'C4', 'C5'];
  
  const seats: Seat[] = rows.flatMap((row) => 
    Array.from({ length: 10 }).map((_, i) => {
      const isBooked = Math.random() < 0.2; // roughly 20% booked initially
      return {
        id: `${standName}-${row}-${i+1}`,
        row_label: row,
        seat_number: i + 1,
        status: isBooked ? 'Booked' : 'Available'
      };
    })
  );

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'Booked') return;
    
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) {
      removeSeat(seat.id);
    } else {
      if (selectedSeats.length < ticketLimit) {
        addSeat({ ...seat, stand_id: standName, status: 'Selected' });
      } else {
        alert(`You can only select up to ${ticketLimit} seat(s).`);
      }
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <div className="min-w-[500px]">
         <div className="w-2/3 mx-auto h-2 bg-gray-300 rounded-t-full mb-10 relative flex justify-center">
            <span className="absolute -top-6 text-xs text-gray-500 tracking-widest uppercase">Cricket Field</span>
         </div>
      
         <div className="space-y-4">
           {rows.map(row => (
             <div key={row} className="flex items-center justify-center space-x-6">
               <span className="w-8 text-xs font-bold text-gray-400">{row}</span>
               <div className="flex space-x-2">
                 {seats.filter(s => s.row_label === row).map(seat => {
                    const isSelected = selectedSeats.find(s => s.id === seat.id);
                    const status = isSelected ? 'Selected' : seat.status;
                    
                    let bg = "bg-white border-2 border-green-500 hover:bg-green-100";
                    let text = "text-green-700";
                    
                    if (status === 'Booked') {
                      bg = "bg-gray-200 border-2 border-gray-300 cursor-not-allowed";
                      text = "text-gray-400";
                    } else if (status === 'Selected') {
                      bg = "bg-green-700 border-2 border-green-700 shadow-md";
                      text = "text-white";
                    }

                    return (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        className={`w-8 h-8 rounded-t-md rounded-b-sm text-xs font-bold transition-all flex items-center justify-center ${bg} ${text}`}
                        disabled={status === 'Booked'}
                      >
                        {seat.seat_number}
                      </button>
                    )
                 })}
               </div>
               <span className="w-8 text-xs font-bold text-gray-400 text-right">{row}</span>
             </div>
           ))}
         </div>

         <div className="flex justify-center items-center space-x-6 mt-10 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-2">
               <div className="w-4 h-4 border-2 border-green-500 bg-white rounded-t-sm"></div>
               <span className="text-xs text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-4 h-4 bg-green-700 rounded-t-sm"></div>
               <span className="text-xs text-gray-600">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-t-sm"></div>
               <span className="text-xs text-gray-600">Booked</span>
            </div>
         </div>
      </div>
    </div>
  );
}
