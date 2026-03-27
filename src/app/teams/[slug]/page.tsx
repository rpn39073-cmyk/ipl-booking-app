import React from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, MapPin, Trophy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TeamDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const teamName = resolvedParams.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const initials = teamName.split(' ').map(w => w[0]).join('');

  // Default theme
  let theme = { bg: 'bg-gray-900', color: 'text-white', accent: 'bg-[#F84464]' };
  if (resolvedParams.slug.includes('kolkata')) theme = { bg: 'bg-purple-900', color: 'text-yellow-400', accent: 'bg-purple-600' };
  if (resolvedParams.slug.includes('mumbai')) theme = { bg: 'bg-blue-800', color: 'text-yellow-400', accent: 'bg-blue-600' };
  if (resolvedParams.slug.includes('chennai')) theme = { bg: 'bg-yellow-500', color: 'text-blue-900', accent: 'bg-yellow-600' };
  if (resolvedParams.slug.includes('gujarat')) theme = { bg: 'bg-blue-900', color: 'text-white', accent: 'bg-blue-700' };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  const supabase = createClient(supabaseUrl, supabaseKey);

  let upcomingMatches: any[] = [];
  const { data: allMatches } = await supabase.from('matches').select('*').order('date_time', { ascending: true });
  const { data: allStands } = await supabase.from('stands').select('match_id, price');

  if (allMatches) {
     const aliases: Record<string, string[]> = {
       'chennai-super-kings': ['CSK', 'Chennai', 'Kings'],
       'mumbai-indians': ['MI', 'Mumbai', 'Indians'],
       'kolkata-knight-riders': ['KKR', 'Kolkata', 'Knight'],
       'royal-challengers-bengaluru': ['RCB', 'Bangalore', 'Bengaluru', 'Challengers'],
       'gujarat-titans': ['GT', 'Gujarat', 'Titans'],
       'lucknow-super-giants': ['LSG', 'Lucknow', 'Giants'],
       'delhi-capitals': ['DC', 'Delhi', 'Capitals'],
       'rajasthan-royals': ['RR', 'Rajasthan', 'Royals'],
       'punjab-kings': ['PBKS', 'Punjab', 'Kings'],
       'sunrisers-hyderabad': ['SRH', 'Hyderabad', 'Sunrisers']
     };
     const currentAliases = aliases[resolvedParams.slug] || [];
     
     upcomingMatches = allMatches.filter((m: any) => {
       const home = m.team_home.toLowerCase();
       const away = m.team_away.toLowerCase();
       const target = teamName.toLowerCase();
       
       const nameMatch = home.includes(target) || away.includes(target);
       const aliasMatch = currentAliases.some(a => home.includes(a.toLowerCase()) || away.includes(a.toLowerCase()));
       
       return nameMatch || aliasMatch;
     });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className={`w-full h-64 md:h-80 relative ${theme.bg} overflow-hidden shadow-md`}>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
         
         <div className="absolute bottom-0 w-full p-6 max-w-7xl mx-auto left-0 right-0 flex items-end space-x-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-2 shadow-2xl z-10 hidden sm:flex items-center justify-center border-4 border-white/20">
               <span className={`text-4xl md:text-5xl font-black ${theme.color} drop-shadow-sm`}>{initials}</span>
            </div>
            <div className="flex-1 pb-2">
               <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">{teamName}</h1>
               <div className="flex items-center space-x-4 mt-3">
                  <span className="text-gray-200 text-sm font-medium flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-400" /> TATA IPL Franchise
                  </span>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-8">
        <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
           <Link href="/" className="hover:text-[#F84464] transition">Home</Link>
           <ChevronRight className="w-4 h-4" />
           <Link href="/teams" className="hover:text-[#F84464] transition">Teams</Link>
           <ChevronRight className="w-4 h-4" />
           <span className="font-semibold text-gray-900">{teamName}</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Matches ({upcomingMatches.length})</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.length > 0 ? upcomingMatches.map((match: any) => {
            const isHome = match.team_home.toLowerCase().includes(teamName.toLowerCase());
            const opponentName = isHome ? match.team_away : match.team_home;
            const oppInitials = opponentName.split(' ').map((w: string) => w[0]).join('');
            
            const matchStands = allStands?.filter(s => s.match_id === match.id) || [];
            const lowestPrice = matchStands.length > 0 ? Math.min(...matchStands.map(s => s.price)) : 500;
            
            return (
            <div key={match.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
               <div className="h-32 bg-gray-900 relative flex items-center justify-center p-4">
                  <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                     {isHome ? 'Home' : 'Away'}
                  </div>
                  <div className="flex items-center justify-between w-full relative z-10 px-4">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-gray-200">
                      <span className={`font-black text-xl ${isHome ? theme.color : 'text-gray-900'}`}>{isHome ? initials : oppInitials}</span>
                    </div>
                    <span className="font-black italic text-gray-400 text-lg px-2">VS</span>
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-gray-200">
                      <span className={`font-black text-xl ${!isHome ? theme.color : 'text-gray-900'}`}>{!isHome ? initials : oppInitials}</span>
                    </div>
                  </div>
               </div>
               
               <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 line-clamp-2">{match.team_home} vs {match.team_away}</h3>
                    <div className="space-y-2">
                       <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{new Date(match.date_time).toLocaleDateString()} | {new Date(match.date_time).toLocaleTimeString()}</span>
                       </div>
                       <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{match.stadium}</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                     <span className="font-bold text-gray-900">₹{lowestPrice} <span className="text-xs font-normal text-gray-500">onwards</span></span>
                     <Link href={`/event/${match.id}`}>
                        <button className="bg-[#F84464] hover:bg-rose-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition shadow-md flex items-center space-x-1">
                           <span>Book Tickets</span>
                        </button>
                     </Link>
                  </div>
               </div>
            </div>
          )}) : (
             <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No upcoming matches scheduled for {teamName} yet.</p>
                <p className="text-xs text-gray-400 mt-2 italic">Try adding a new match from the Admin Panel!</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}