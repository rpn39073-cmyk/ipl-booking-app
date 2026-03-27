import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EventsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: dbMatches } = await supabase.from('matches').select('*').order('date_time', { ascending: true });
  const { data: allStands } = await supabase.from('stands').select('match_id, price');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-gray-900 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight">TATA IPL Matches</h1>
          <p className="text-gray-300">Discover and book tickets to live cricket action.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Matches</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dbMatches && dbMatches.length > 0 ? dbMatches.map((match: any) => {
             const matchStands = allStands?.filter(s => s.match_id === match.id) || [];
             const lowestPrice = matchStands.length > 0 ? Math.min(...matchStands.map(s => s.price)) : 500;
             
             return (
             <Link href={`/event/${match.id}`} key={match.id} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
               <div className="relative aspect-[4/3] bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                  <div className="text-white text-3xl font-black italic opacity-20 absolute inset-0 flex items-center justify-center">IPL 26</div>
                  <div className="relative z-10 flex items-center space-x-3">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg font-bold text-indigo-900">{match.team_home.substring(0,3).toUpperCase()}</div>
                     <span className="text-white font-black italic">VS</span>
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg font-bold text-purple-900">{match.team_away.substring(0,3).toUpperCase()}</div>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 tracking-wider">
                     {new Date(match.date_time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' })}
                  </div>
               </div>
               <div className="p-4 flex flex-col flex-grow">
                 <h3 className="font-bold text-gray-900 leading-tight mb-1">{match.team_home} vs {match.team_away}</h3>
                 <p className="text-xs text-gray-500 mb-2 truncate">{match.stadium}</p>
                 <div className="mt-auto pt-3 border-t border-gray-100 font-bold text-gray-900 flex items-center justify-between">
                    <span>₹{lowestPrice} <span className="font-normal text-[10px] text-gray-500">onwards</span></span>
                    <span className="text-xs text-[#F84464] font-bold group-hover:underline">BOOK</span>
                 </div>
               </div>
             </Link>
          )}) : <p className="text-gray-500 col-span-4 py-8">No upcoming matches available.</p>}
        </div>
      </div>
    </div>
  );
}
