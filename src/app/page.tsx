import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import PromoModal from '@/components/PromoModal';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: dbMatches } = await supabase.from('matches').select('*').order('date_time', { ascending: true });
  const { data: allStands } = await supabase.from('stands').select('match_id, price');

  return (
    <div className="flex flex-col w-full">
      <PromoModal />
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] bg-gradient-to-r from-indigo-900 via-purple-900 to-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-block px-4 py-1 bg-yellow-400 bg-opacity-20 backdrop-blur-md rounded-full mb-4 border border-yellow-400/50">
            <span className="text-yellow-400 font-bold tracking-widest text-sm">TATA IPL 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight drop-shadow-2xl">
            Experience the Roar
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 font-medium">Book your tickets for the ultimate cricket showdown</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 w-full py-12">
        {/* Teams Section */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
            <Link href="/teams" className="text-[#F84464] text-sm hover:underline font-medium">Explore All Teams →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Gujarat Titans', slug: 'gujarat-titans', bg: 'bg-gradient-to-br from-blue-800 to-blue-900', color: 'text-white' },
              { name: 'Kolkata Knight Riders', slug: 'kolkata-knight-riders', bg: 'bg-gradient-to-br from-purple-800 to-purple-900', color: 'text-gold-400 text-yellow-400' },
              { name: 'Lucknow Super Giants', slug: 'lucknow-super-giants', bg: 'bg-gradient-to-br from-blue-700 to-blue-800', color: 'text-orange-400' },
              { name: 'Mumbai Indians', slug: 'mumbai-indians', bg: 'bg-gradient-to-br from-blue-600 to-blue-800', color: 'text-yellow-400' },
            ].map((team) => (
              <Link href={`/teams/${team.slug}`} key={team.name} className={`${team.bg} rounded-xl shadow-lg p-6 flex flex-col items-center justify-center aspect-square cursor-pointer transform transition hover:scale-105 hover:shadow-2xl group`}>
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <span className={`font-bold text-2xl ${team.color}`}>{team.name.split(' ').map(w => w[0]).join('')}</span>
                </div>
                <h3 className="text-white font-bold text-center text-sm">{team.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section>
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">1 Events</h2>
              <p className="text-gray-500 text-sm mt-1">Upcoming matches in your city</p>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-[#F84464] text-white text-xs rounded-full font-medium">Cricket</span>
              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full cursor-pointer hover:bg-gray-300">T20</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbMatches && dbMatches.length > 0 ? dbMatches.map((match: any) => {
              const matchStands = allStands?.filter(s => s.match_id === match.id) || [];
              const lowestPrice = matchStands.length > 0 ? Math.min(...matchStands.map(s => s.price)) : 500;
              
              return (
              <div key={match.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col relative">
                <div className="h-48 relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col justify-end">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md">
                    <span className="text-white text-xs font-medium">T20</span>
                  </div>
                  <div className="flex justify-between items-center text-white relative z-10">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center border-2 border-yellow-400 shadow-lg mx-auto mb-2">
                         <span className="font-bold text-yellow-400 text-sm">{match.team_home.substring(0,3).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="px-4 py-1 bg-white/10 rounded-full backdrop-blur-md">
                      <span className="text-white font-black italic text-sm">VS</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center border-2 border-yellow-400 shadow-lg mx-auto mb-2">
                         <span className="font-bold text-yellow-400 text-sm">{match.team_away.substring(0,3).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{match.team_home} vs {match.team_away}</h3>
                    <div className="text-gray-500 text-sm mt-3 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span>{new Date(match.date_time).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}, {new Date(match.date_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                    <div className="text-gray-500 text-sm mt-1 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span>{match.stadium}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-900">₹{lowestPrice} <span className="text-xs text-gray-500 font-normal">onwards</span></span>
                    <Link 
                      href={`/event/${match.id}`}
                      className="bg-[#F84464] hover:bg-rose-600 text-white px-5 py-2 rounded-md transition font-semibold text-sm shadow-md flex items-center space-x-1 group"
                    >
                      <span>Book Tickets</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}) : <p className="text-gray-500">No upcoming matches available.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
