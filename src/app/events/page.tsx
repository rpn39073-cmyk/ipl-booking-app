import Link from 'next/link';

export default function EventsPage() {
  const events = [
    { title: 'Ed Sheeran - Mathematics Tour', category: 'Music Shows', date: 'Sat 16 Mar', price: '₹3000', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Zakir Khan Live', category: 'Comedy Shows', date: 'Fri 22 Mar', price: '₹999', img: 'https://images.unsplash.com/photo-1527224857830-43a7ace85263?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Sunburn Arena ft. Alan Walker', category: 'Music Shows', date: 'Sun 14 Apr', price: '₹1500', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Food & Wine Festival', category: 'Food & Drinks', date: 'Multiple Dates', price: '₹499', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&w=400&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-gray-900 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight">Events happening near you</h1>
          <p className="text-gray-300">Discover and book tickets to top events, concerts, comedy shows and more.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.title} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
               <div className="relative aspect-[4/3] bg-gray-200">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900">
                     {event.date}
                  </div>
               </div>
               <div className="p-4 flex flex-col flex-grow">
                 <h3 className="font-bold text-gray-900 leading-tight mb-1">{event.title}</h3>
                 <p className="text-xs text-gray-500 mb-3">{event.category}</p>
                 <div className="mt-auto pt-4 border-t border-gray-100 font-bold text-gray-900">
                    {event.price} <span className="font-normal text-xs text-gray-500">onwards</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
