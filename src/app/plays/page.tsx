import Link from 'next/link';

export default function PlaysPage() {
  const plays = [
    { title: 'The Play That Goes Wrong', genre: 'Comedy', duration: '2hrs', date: 'Sat 20 Apr', price: '₹1200', img: 'https://images.unsplash.com/photo-1507676184212-d0330a1523fe?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Macbeth - A Tragedy', genre: 'Drama/Classic', duration: '2hrs 30mins', date: 'Fri 26 Apr', price: '₹800', img: 'https://images.unsplash.com/photo-1516280030429-27679b3dc9ce?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Mughal-e-Azam: The Musical', genre: 'Musical/History', duration: '3hrs', date: 'Sun 28 Apr', price: '₹2500', img: 'https://images.unsplash.com/photo-1514337286378-436f54adfbda?ixlib=rb-4.0.3&w=400&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-amber-900 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507676184212-d0330a1523fe?ixlib=rb-4.0.3&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl font-black mb-2 tracking-tight">The Best Plays in Town</h1>
          <p className="text-amber-100 max-w-xl">Experience the magic of live theatre. Book your seats for ongoing and upcoming plays.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plays.map((play) => (
            <div key={play.title} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-amber-100 flex flex-col">
               <div className="relative aspect-[16/9] bg-gray-200">
                  <img src={play.img} alt={play.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-amber-400">
                     {play.genre}
                  </div>
               </div>
               <div className="p-5 flex flex-col flex-grow text-center items-center">
                 <h3 className="font-bold text-xl text-gray-900 leading-tight mb-2">{play.title}</h3>
                 <p className="text-sm font-medium text-gray-500 mb-1">{play.date} | {play.duration}</p>
                 <div className="mt-4 pt-4 border-t border-gray-100 w-full font-bold text-amber-700 text-lg">
                    {play.price} <span className="font-normal text-xs text-gray-500">onwards</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
