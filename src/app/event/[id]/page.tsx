import Link from 'next/link';
import { Calendar, Clock, MapPin, Languages, Info, AlertTriangle } from 'lucide-react';

import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const idStr = resolvedParams.id;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  const supabase = createClient(supabaseUrl, supabaseKey);

  let matchData = null;
  // If it's a UUID, fetch from DB
  if (idStr.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
     const { data } = await supabase.from('matches').select('*').eq('id', idStr).single();
     matchData = data;
  }

  // Fetch lowest price for this match
  const { data: matchStands } = await supabase.from('stands')
    .select('price')
    .eq('match_id', idStr);
  
  const minPrice = matchStands && matchStands.length > 0 
    ? Math.min(...matchStands.map(s => s.price)) 
    : 500;
  
  let title = "Kolkata Knight Riders vs Mumbai Indians";
  if (matchData) {
     title = `${matchData.team_home} vs ${matchData.team_away}`;
  } else if (idStr.includes('-vs-')) {
    const formatTeam = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    title = `${formatTeam(idStr.split('-vs-')[0])} vs ${formatTeam(idStr.split('-vs-')[1])}`;
  }

  // Define the event based on DB record or mock fallback
  const event = {
    title: title,
    date: matchData ? new Date(matchData.date_time).toLocaleDateString('en-IN', {weekday:'short', day:'numeric', month:'short', year:'numeric', timeZone: 'Asia/Kolkata'}) : "Sun 29 Mar 2026",
    time: matchData ? new Date(matchData.date_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).toUpperCase().replace('AM', 'PM') : "07:30 PM",
    duration: "5 Hours",
    language: "Multi",
    location: matchData ? matchData.stadium : "EDEN GARDENS",
    minPrice: minPrice,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Banner */}
      <div className="w-full h-[300px] md:h-[400px] relative bg-blue-900 border-b-4 border-yellow-400">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 w-full p-6 max-w-7xl mx-auto left-0 right-0">
          <div className="inline-block px-3 py-1 bg-gray-900 bg-opacity-70 backdrop-blur-md rounded border border-gray-700 mb-3">
             <span className="text-gray-200 text-xs font-semibold tracking-wider">TATA IPL 2026</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">{event.title}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-white text-xs font-bold uppercase backdrop-blur-sm">T20 Match</span>
            <span className="text-gray-300 text-sm font-medium border-l border-gray-500 pl-2">Cricket</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 mt-8 flex-grow">
        {/* Info Grid */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 flex flex-wrap gap-6 mb-8 justify-between">
           <div className="flex items-center space-x-3">
             <div className="bg-white p-2 text-gray-700 rounded-full shadow-sm">
                <Calendar className="w-5 h-5" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-medium">Date</p>
               <p className="text-sm font-bold text-gray-900">{event.date}</p>
             </div>
           </div>
           
           <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
             <div className="bg-white p-2 text-gray-700 rounded-full shadow-sm">
                <Clock className="w-5 h-5" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-medium">Time</p>
               <p className="text-sm font-bold text-gray-900">{event.time} | {event.duration}</p>
             </div>
           </div>

           <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
             <div className="bg-white p-2 text-gray-700 rounded-full shadow-sm">
                <Languages className="w-5 h-5" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-medium">Language</p>
               <p className="text-sm font-bold text-gray-900">{event.language}</p>
             </div>
           </div>
           
           <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
             <div className="bg-white p-2 text-gray-700 rounded-full shadow-sm">
                <MapPin className="w-5 h-5" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-medium">Location</p>
               <p className="text-sm font-bold text-gray-900">{event.location}</p>
             </div>
           </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
             <AlertTriangle className="text-yellow-600 w-5 h-5 mt-0.5 flex-shrink-0" />
             <div>
               <p className="text-yellow-800 font-medium text-sm">Ticket limit for this booking is 1.</p>
             </div>
          </div>
          
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 flex items-start space-x-3">
             <Info className="text-pink-600 w-5 h-5 mt-0.5 flex-shrink-0" />
             <div>
               <p className="text-pink-800 font-medium text-sm">
                 <strong>You should know:</strong> After booking is confirmed, your M-Ticket will activate 48 hours before the match. 
                 <a href="#" className="text-pink-600 underline ml-2 font-semibold">Know More</a>
               </p>
             </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About The Event</h2>
          <div className="text-gray-600 space-y-4 leading-relaxed text-sm">
             <p>Witness the clash of titans as the Kolkata Knight Riders take on the Mumbai Indians at the iconic Eden Gardens. This highly anticipated matchup promises a night of explosive batting, lethal bowling, and unforgettable moments.</p>
             <p>Gates open 2 hours prior to the match start time. Please ensure you have your M-Ticket ready for scanning upon arrival. Outside food and beverages are strictly prohibited.</p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div>
              <p className="text-xs text-gray-500 font-medium">Price</p>
              <p className="text-xl font-bold text-gray-900">₹{event.minPrice} <span className="text-sm font-normal text-gray-500">onwards</span></p>
           </div>
           <Link 
             href={`/event/${resolvedParams.id}/seat-selection`}
             className="bg-[#F84464] hover:bg-rose-600 text-white font-bold py-3 px-12 rounded shadow-lg text-sm transition transform active:scale-95 block text-center"
           >
             SELECT POSITION
           </Link>
        </div>
      </div>
    </div>
  );
}
