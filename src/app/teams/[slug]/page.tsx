import React from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, MapPin, Trophy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Isse page hamesha fresh data dikhayega
export const dynamic = 'force-dynamic';

export default async function TeamDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Team ka naam (e.g., mumbai-indians -> Mumbai Indians)
  const teamName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const initials = teamName.split(' ').map(w => w[0]).join('');

  // 1. Supabase Client Setup (Direct Environment Variables se)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2. Data Fetching (Matches aur Stands)
  const { data: allMatches, error: matchError } = await supabase.from('matches').select('*');
  const { data: allStands, error: standError } = await supabase.from('stands').select('match_id, price');

  if (matchError) {
    return <div className="p-10 text-red-500">Database Connection Error! Please check Supabase Keys.</div>;
  }

  // 3. Team ke hisab se Matches Filter karein
  const upcomingMatches = allMatches?.filter((m: any) => 
    m.team_home?.toLowerCase().includes(teamName.toLowerCase()) || 
    m.team_away?.toLowerCase().includes(teamName.toLowerCase())
  ) || [];

  // Theme Logic
  let theme = { bg: 'bg-gray-900', color: 'text-white' };
  if (slug.includes('kolkata')) theme = { bg: 'bg-purple-900', color: 'text-yellow-400' };
  if (slug.includes('mumbai')) theme = { bg: 'bg-blue-800', color: 'text-yellow-400' };
  if (slug.includes('chennai')) theme = { bg: 'bg-yellow-500', color: 'text-blue-900' };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Team Header Section */}
      <div className={`w-full h-64 md:h-80 relative ${theme.bg} overflow-hidden shadow-md flex items-end`}>
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="absolute bottom-0 w-full p-8 max-w-7xl mx-auto flex items-center space-x-6 z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
               <span className={`text-4xl md:text-5xl font-black ${theme.color}`}>{initials}</span>
            </div>
            <div>
               <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">{teamName}</h1>
               <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium backdrop-blur-md">
                 🏆 TATA IPL 2026 Franchise
               </div>
            </div>
         </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 w-full mt-6 flex items-center text-sm text-gray-500">
         <Link href="/" className="hover:text-rose-500">Home</Link>
         <ChevronRight className="w-4 h-4 mx-2" />
         <Link href="/teams" className="hover:text-rose-500">Teams</Link>
         <ChevronRight className="w-4 h-4 mx-2" />
         <span className="font-bold text-gray-900">{teamName}</span>
      </div>

      {/* Matches Grid */}
      <div className="max-w-7xl mx-auto px-4 w-full mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Matches ({upcomingMatches.length})</h2>
        
        {upcomingMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match: any) => {
              // Lowest price nikalne ke liye
              const matchStands = allStands?.filter(s => s.match_id === match.id) || [];
              const price = matchStands.length > 0 ? Math.min(...matchStands.map(s => s.price)) : 500;

              return (
                <div key={match.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="bg-gray-900 h-24 flex items-center justify-center p-4">
                     <div className="flex items-center space-x-4 text-white font-black text-lg">
                        <span>{match.team_home}</span>
                        <span className="text-gray-500 italic">VS</span>
                        <span>{match.team_away}</span>
                     </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-rose-500" />
                        <span className="text-sm font-medium">{new Date(match.date_time).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                        <span className="text-sm font-medium">{match.stadium}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400">Starting from</p>
                        <p className="text-xl font-bold text-gray-900">₹{price}</p>
                      </div>
                      <Link href={`/event/${match.id}`}>
                        <button className="bg-[#F84464] hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border-2 border-dashed text-center">
            <p className="text-gray-500 font-medium">Koi upcoming match nahi mila is team ke liye.</p>
            <Link href="/teams" className="text-rose-500 mt-4 inline-block font-bold">Wapas Teams par jayein</Link>
          </div>
        )}
      </div>
    </div>
  );
}