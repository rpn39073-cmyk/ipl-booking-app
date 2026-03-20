import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const allTeams = [
  { name: 'Chennai Super Kings', slug: 'chennai-super-kings', bg: 'bg-gradient-to-br from-yellow-500 to-yellow-600', color: 'text-blue-900', wins: 5 },
  { name: 'Delhi Capitals', slug: 'delhi-capitals', bg: 'bg-gradient-to-br from-blue-700 to-blue-900', color: 'text-red-500', wins: 0 },
  { name: 'Gujarat Titans', slug: 'gujarat-titans', bg: 'bg-gradient-to-br from-blue-800 to-blue-900', color: 'text-white', wins: 1 },
  { name: 'Kolkata Knight Riders', slug: 'kolkata-knight-riders', bg: 'bg-gradient-to-br from-purple-800 to-purple-900', color: 'text-gold-400 text-yellow-400', wins: 3 },
  { name: 'Lucknow Super Giants', slug: 'lucknow-super-giants', bg: 'bg-gradient-to-br from-blue-700 to-cyan-800', color: 'text-orange-400', wins: 0 },
  { name: 'Mumbai Indians', slug: 'mumbai-indians', bg: 'bg-gradient-to-br from-blue-600 to-blue-800', color: 'text-yellow-400', wins: 5 },
  { name: 'Punjab Kings', slug: 'punjab-kings', bg: 'bg-gradient-to-br from-red-600 to-red-800', color: 'text-gray-200', wins: 0 },
  { name: 'Rajasthan Royals', slug: 'rajasthan-royals', bg: 'bg-gradient-to-br from-pink-500 to-pink-700', color: 'text-blue-900', wins: 1 },
  { name: 'Royal Challengers Bangalore', slug: 'royal-challengers-bangalore', bg: 'bg-gradient-to-br from-red-700 to-black', color: 'text-gold-500 text-yellow-500', wins: 0 },
  { name: 'Sunrisers Hyderabad', slug: 'sunrisers-hyderabad', bg: 'bg-gradient-to-br from-orange-500 to-orange-700', color: 'text-black', wins: 1 },
];

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-gray-900 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">TATA IPL Teams</h1>
          <p className="text-gray-300 max-w-2xl text-lg">Explore all franchises, view their upcoming matches, and book tickets to support your favorite team.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-10">
        <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
           <Link href="/" className="hover:text-[#F84464] transition">Home</Link>
           <ChevronRight className="w-4 h-4" />
           <span className="font-semibold text-gray-900">Teams</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {allTeams.map((team) => (
            <Link 
              href={`/teams/${team.slug}`} 
              key={team.name} 
              className={`${team.bg} rounded-2xl shadow-md p-6 flex flex-col items-center justify-between aspect-[4/5] cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="w-full flex justify-end">
                {team.wins > 0 && (
                  <div className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center space-x-1">
                     <span>🏆</span>
                     <span>{team.wins}x</span>
                  </div>
                )}
              </div>

              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-inner backdrop-blur-sm border border-white/10">
                <span className={`font-black text-3xl ${team.color} drop-shadow-md`}>{team.name.split(' ').map(w => w[0]).join('')}</span>
              </div>
              
              <h3 className="text-white font-bold text-center text-sm md:text-base leading-tight drop-shadow">{team.name}</h3>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold text-white">
                 View Matches
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
