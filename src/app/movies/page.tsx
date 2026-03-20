import Link from 'next/link';
import { ChevronRight, Filter, Star } from 'lucide-react';

export default function MoviesPage() {
  const movies = [
    { title: 'Dune: Part Two', genre: 'Action/Adventure/Sci-Fi', language: 'English, Hindi, Tamil', rating: '8.9', format: '2D, 3D, IMAX', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Kung Fu Panda 4', genre: 'Animation/Action/Comedy', language: 'English, Hindi', rating: '8.2', format: '2D, 3D', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Godzilla x Kong', genre: 'Action/Sci-Fi/Thriller', language: 'English, Hindi, Telugu', rating: '8.5', format: '2D, 3D, 4DX', img: 'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Yodha', genre: 'Action/Thriller', language: 'Hindi', rating: '7.8', format: '2D', img: 'https://images.unsplash.com/photo-1535497463517-dbddee8f9d0c?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Shaitaan', genre: 'Horror/Thriller', language: 'Hindi', rating: '8.1', format: '2D', img: 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Crew', genre: 'Comedy/Drama', language: 'Hindi', rating: '7.5', format: '2D', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=400&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-gray-900 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight">Movies in Your City</h1>
          <p className="text-gray-300">Book tickets for the latest releases in theatres near you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-8 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <h2 className="font-bold text-gray-900 mb-4 text-xl">Filters</h2>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center justify-between cursor-pointer">
              Languages <ChevronRight className="w-4 h-4 transform rotate-90" />
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
               <span className="px-3 py-1 border border-[#F84464] text-[#F84464] rounded text-xs bg-red-50 cursor-pointer">Hindi</span>
               <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:border-gray-400 cursor-pointer">English</span>
               <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:border-gray-400 cursor-pointer">Tamil</span>
               <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:border-gray-400 cursor-pointer">Telugu</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center justify-between cursor-pointer">
              Genres <ChevronRight className="w-4 h-4 transform rotate-90" />
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
               <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:border-gray-400 cursor-pointer">Action</span>
               <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:border-gray-400 cursor-pointer">Comedy</span>
               <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:border-gray-400 cursor-pointer">Drama</span>
               <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:border-gray-400 cursor-pointer">Thriller</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold text-gray-900">Movies Now Showing</h2>
             <span className="text-sm text-gray-500">Showing {movies.length} movies</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div key={movie.title} className="group cursor-pointer">
                 <div className="relative rounded-xl overflow-hidden aspect-[2/3] shadow-md mb-3 bg-gray-200">
                    <img src={movie.img} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center space-x-1">
                       <Star className="w-3 h-3 text-[#F84464] fill-current" />
                       <span className="text-white text-xs font-bold">{movie.rating}</span>
                    </div>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 pb-2 pt-6 to-transparent px-3 text-white text-[10px] font-semibold text-center uppercase tracking-wider">
                       {movie.format}
                    </div>
                 </div>
                 <h3 className="font-bold text-gray-900 group-hover:text-[#F84464] transition leading-tight">{movie.title}</h3>
                 <p className="text-xs text-gray-500 mt-1">{movie.genre}</p>
                 <p className="text-xs font-medium text-gray-600 mt-1">{movie.language}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
