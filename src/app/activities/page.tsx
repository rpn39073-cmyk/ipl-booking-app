import Link from 'next/link';
import { Camera, Map, Star } from 'lucide-react';

export default function ActivitiesPage() {
  const activities = [
    { title: 'Imagicaa Water Park', type: 'Amusement Parks', location: 'Khopoli', price: '₹1400', img: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Sanjay Gandhi National Park', type: 'Wildlife Safari', location: 'Borivali', price: '₹150', img: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?ixlib=rb-4.0.3&w=400&q=80' },
    { title: 'Trek to Rajmachi', type: 'Trekking', location: 'Lonavala', price: '₹1000', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&w=400&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-teal-900 text-white py-12 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-green-900 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
             <Map className="w-8 h-8 text-teal-300" />
          </div>
          <div>
            <h1 className="text-4xl font-black mb-1 tracking-tight">Activities & Experiences</h1>
            <p className="text-teal-100">Make your weekends exciting. Find amazing activities near you.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.title} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
               <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <img src={activity.img} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded shadow-sm text-xs font-bold text-teal-800 flex items-center space-x-1">
                     <Camera className="w-3 h-3 text-teal-600" />
                     <span>Must Try</span>
                  </div>
               </div>
               <div className="p-5 flex flex-col">
                 <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-teal-700 transition-colors">{activity.title}</h3>
                 <p className="text-sm font-medium text-gray-500 mb-1">{activity.type}</p>
                 <p className="text-xs text-gray-400 font-medium mb-4 flex items-center"><Map className="w-3 h-3 mr-1" /> {activity.location}</p>
                 <div className="mt-auto flex items-center justify-between">
                    <div className="font-black text-teal-700 text-lg">
                       {activity.price} <span className="font-normal text-xs text-gray-500">onwards</span>
                    </div>
                    <button className="bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition">Book Now</button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
