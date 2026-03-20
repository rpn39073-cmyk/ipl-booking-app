import Link from 'next/link';
import { ChevronRight, PlayCircle } from 'lucide-react';

export default function StreamPage() {
  const titles = [
    { title: 'Oppenheimer', genre: 'Biography/Drama', language: 'English', duration: '3h', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Poor Things', genre: 'Comedy/Drama', language: 'English', duration: '2h 21m', img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'The Creator', genre: 'Action/Sci-Fi', language: 'English, Hindi', duration: '2h 13m', img: 'https://images.unsplash.com/photo-1618410292437-1c6fcbddc198?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Mission: Impossible', genre: 'Action/Thriller', language: 'English, Hindi', duration: '2h 43m', img: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&w=400&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 pb-20">
      <div className="bg-black text-white py-12 px-4 shadow-inner relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-gray-900 to-black opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight flex items-center"><PlayCircle className="w-10 h-10 mr-4 text-blue-500" /> bookmyshow <span className="text-blue-500 ml-2">STREAM</span></h1>
            <p className="text-gray-400">Watch the best of global cinema right now.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-10">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-white">Premiere Exclusives</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {titles.map((movie) => (
            <div key={movie.title} className="group cursor-pointer">
               <div className="relative rounded-xl overflow-hidden aspect-[2/3] shadow-lg mb-3 bg-gray-800 border border-gray-700">
                  <img src={movie.img} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-2 left-2 bg-blue-600 px-2 py-1 rounded text-[10px] font-bold text-white tracking-widest uppercase">
                     Premiere
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-white" />
                     </div>
                  </div>
               </div>
               <h3 className="font-bold text-white leading-tight">{movie.title}</h3>
               <p className="text-xs text-gray-400 mt-1">{movie.genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
