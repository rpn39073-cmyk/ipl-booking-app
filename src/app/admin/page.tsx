"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Users, IndianRupee, Activity, Trophy as Stadium, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metrics, setMetrics] = useState({ totalBookings: 0, revenue: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [dbMatches, setDbMatches] = useState<any[]>([]);

  // Match addition states
  const [newMatch, setNewMatch] = useState({ home: '', away: '', date: '', time: '', stadium: '' });
  const [isAddingMatch, setIsAddingMatch] = useState(false);

  // Pricing states
  const [selectedPricingMatch, setSelectedPricingMatch] = useState<string>('');
  const [pricingStands, setPricingStands] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
     const fetchAdminData = async () => {
        const { data: bookings } = await supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(10);
        if (bookings) {
           setRecentBookings(bookings);
           setMetrics({
              totalBookings: bookings.length,
              revenue: bookings.reduce((sum, b) => sum + Number(b.amount || 0), 0)
           });
        }
        const { data: matches } = await supabase.from('matches').select('*').order('created_at', { ascending: false });
        if (matches) setDbMatches(matches);
     };
    fetchAdminData();
  }, [isAuthenticated]);

  useEffect(() => {
     if (selectedPricingMatch) {
         supabase.from('stands').select('*').eq('match_id', selectedPricingMatch).order('price', { ascending: true }).then(({data}) => {
             if (data) setPricingStands(data);
         });
     } else {
         setPricingStands([]);
     }
  }, [selectedPricingMatch]);

  const handleUpdatePrice = async (standId: string, newPrice: number) => {
     try {
        const { error } = await supabase.from('stands').update({ price: newPrice }).eq('id', standId);
        if (error) throw error;
        setPricingStands(prev => prev.map(s => s.id === standId ? { ...s, price: newPrice } : s));
        alert('Stand Price successfully updated in database!');
     } catch (e: any) { alert("Error updating price: " + e.message); }
  };

  const handleDeleteMatch = async (id: string) => {
     if (!confirm("Are you sure you want to permanently delete this match and all its seats?")) return;
     try {
        const { error } = await supabase.from('matches').delete().eq('id', id);
        if (error) throw error;
        setDbMatches(dbMatches.filter(m => m.id !== id));
        alert("Match deleted successfully.");
     } catch (e: any) { alert("Error deleting match: " + e.message); }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert("Access Denied: Invalid credentials.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">System Administration</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username} onChange={e => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#F84464] outline-none" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#F84464] outline-none" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-[#F84464] text-white py-2 rounded-md font-bold shadow-md hover:bg-rose-600 transition">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="w-64 bg-gray-900 text-white flex flex-col pt-8">
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-400">IPL Admin Panel</h2>
        </div>
        <nav className="flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition ${activeTab === 'dashboard' ? 'bg-gray-800 border-r-4 border-[#F84464]' : 'hover:bg-gray-800'}`}
          >
            <Activity className="w-5 h-5 text-gray-400" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('matches')} 
            className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition ${activeTab === 'matches' ? 'bg-gray-800 border-r-4 border-[#F84464]' : 'hover:bg-gray-800'}`}
          >
            <Stadium className="w-5 h-5 text-gray-400" />
            <span>Matches</span>
          </button>
          <button 
            onClick={() => setActiveTab('pricing')} 
            className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition ${activeTab === 'pricing' ? 'bg-gray-800 border-r-4 border-[#F84464]' : 'hover:bg-gray-800'}`}
          >
            <IndianRupee className="w-5 h-5 text-gray-400" />
            <span>Stand Pricing</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Activity className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.totalBookings}</p>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg"><IndianRupee className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Revenue (Total)</p>
                    <p className="text-2xl font-bold text-gray-900">₹{metrics.revenue}</p>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Users className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Live Users</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
               </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-3">Booking ID</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Date</th>
                     </tr>
                  </thead>
                  <tbody>
                     {recentBookings.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-6 py-8 text-center text-gray-400">No real bookings found yet.</td>
                        </tr>
                     ) : (
                        recentBookings.map((bk) => (
                           <tr key={bk.id} className="border-b border-gray-50">
                              <td className="px-6 py-4 font-medium text-gray-900">#{bk.id.split('-')[0]}</td>
                              <td className="px-6 py-4">₹{bk.amount}</td>
                              <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{bk.status}</span></td>
                              <td className="px-6 py-4">{new Date(bk.created_at).toLocaleDateString()}</td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Matches</h1>
              <button onClick={() => setNewMatch({ home: '', away: '', date: '', time: '', stadium: '' })} className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium hover:bg-gray-800 transition">
                <Plus className="w-4 h-4" /> <span>Add Match</span>
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 max-w-2xl">
               <h3 className="text-md font-bold text-gray-800 mb-4">Add New Match</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Home Team</label>
                    <input type="text" value={newMatch.home} onChange={e => setNewMatch({...newMatch, home: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" placeholder="E.g. Gujarat Titans" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Away Team</label>
                    <input type="text" value={newMatch.away} onChange={e => setNewMatch({...newMatch, away: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" placeholder="E.g. Mumbai Indians" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                    <input type="date" value={newMatch.date} onChange={e => setNewMatch({...newMatch, date: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                    <input type="time" value={newMatch.time} onChange={e => setNewMatch({...newMatch, time: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Stadium</label>
                    <input type="text" value={newMatch.stadium} onChange={e => setNewMatch({...newMatch, stadium: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" placeholder="E.g. Narendra Modi Stadium, Ahmedabad" />
                  </div>
                  <div className="col-span-2 mt-2">
                    <button 
                       onClick={async () => {
                          if (!newMatch.home || !newMatch.away || !newMatch.date || !newMatch.time || !newMatch.stadium) {
                             alert("Please fill all fields"); return;
                          }
                          setIsAddingMatch(true);
                          try {
                             const dateTimeStr = new Date(`${newMatch.date}T${newMatch.time}`).toISOString();
                             const { data: matchData, error: matchError } = await supabase.from('matches').insert([{ team_home: newMatch.home, team_away: newMatch.away, date_time: dateTimeStr, stadium: newMatch.stadium }]).select().single();
                             if (matchError) throw matchError;
                             // Automatically seed the stadium with empty stands and seats so it can be booked
                             const standsParam = [ 
                                { match_id: matchData.id, name: 'North (General Stand)', color: '#ec4899', price: 500 }, 
                                { match_id: matchData.id, name: 'North East (Premium)', color: '#3b82f6', price: 1500 }, 
                                { match_id: matchData.id, name: 'South East (Pavilion)', color: '#22c55e', price: 2000 }, 
                                { match_id: matchData.id, name: 'South (VIP Stand)', color: '#a855f7', price: 5000 }, 
                                { match_id: matchData.id, name: 'Corporate Box', color: '#f59e0b', price: 8000 }, 
                                { match_id: matchData.id, name: 'North West (Hospitality)', color: '#fb923c', price: 3000 } 
                             ];
                             const { data: standsData, error: standsError } = await supabase.from('stands').insert(standsParam).select();
                             if (standsError) throw standsError;
                             const seatsToInsert: any[] = [];
                             standsData.forEach((stand: any) => {
                                for(let i=1; i<=10; i++) seatsToInsert.push({ stand_id: stand.id, row_label: 'A', seat_number: i, status: 'Available' });
                             });
                             const { error: seatsError } = await supabase.from('seats').insert(seatsToInsert);
                             if (seatsError) throw seatsError;

                             alert("Match Successfully Placed with fully operational Seating Data!");
                             setNewMatch({ home: '', away: '', date: '', time: '', stadium: '' });
                          } catch (e: any) { alert("Error Adding match: " + e.message); } 
                          finally { setIsAddingMatch(false); }
                       }}
                       disabled={isAddingMatch}
                       className="bg-[#F84464] text-white px-6 py-2 rounded-lg text-sm font-bold shadow hover:bg-rose-600 transition disabled:bg-gray-400"
                    >
                       {isAddingMatch ? 'Saving Database...' : 'Save Match'}
                    </button>
                  </div>
               </div>
            </div>

            <div className="mt-8">
               <h2 className="text-xl font-bold text-gray-900 mb-4">All Matches List</h2>
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                        <tr>
                           <th className="px-6 py-3">Match ID</th>
                           <th className="px-6 py-3">Fixture</th>
                           <th className="px-6 py-3">Date & Time</th>
                           <th className="px-6 py-3">Stadium</th>
                           <th className="px-6 py-3">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {dbMatches.length === 0 ? (
                           <tr>
                              <td colSpan={4} className="px-6 py-8 text-center text-gray-400">No matches found in database.</td>
                           </tr>
                        ) : (
                           dbMatches.map((m) => (
                              <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                                 <td className="px-6 py-4 text-xs font-mono text-gray-400">{m.id.split('-')[0]}</td>
                                 <td className="px-6 py-4 font-bold text-gray-900">{m.team_home} vs {m.team_away}</td>
                                 <td className="px-6 py-4">{new Date(m.date_time).toLocaleString()}</td>
                                 <td className="px-6 py-4">{m.stadium}</td>
                                 <td className="px-6 py-4">
                                    <button onClick={() => handleDeleteMatch(m.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition" title="Delete Match"><Trash2 className="w-4 h-4" /></button>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Live Stand Pricing Configuration</h1>
            <div className="mb-6 max-w-sm">
               <label className="block text-sm font-medium text-gray-700 mb-2">Select Match</label>
               <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F84464]" 
                  value={selectedPricingMatch} 
                  onChange={e => setSelectedPricingMatch(e.target.value)}
               >
                  <option value="">-- Choose a Match --</option>
                  {dbMatches.map(m => (
                     <option key={m.id} value={m.id}>{m.team_home} vs {m.team_away} ({new Date(m.date_time).toLocaleDateString()})</option>
                  ))}
               </select>
            </div>

            {selectedPricingMatch && pricingStands.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
               <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-3">Stand Name</th>
                        <th className="px-6 py-3">Current Price</th>
                        <th className="px-6 py-3">New Price (₹)</th>
                        <th className="px-6 py-3">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {pricingStands.map((stand) => (
                       <tr key={stand.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{stand.name}</td>
                          <td className="px-6 py-4 text-emerald-600 font-bold">₹{stand.price}</td>
                          <td className="px-6 py-4 flex items-center space-x-2">
                             <input type="number" id={`price-${stand.id}`} defaultValue={stand.price} className="w-24 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#F84464] text-gray-900 font-bold" />
                          </td>
                          <td className="px-6 py-4">
                             <button onClick={() => {
                                const val = (document.getElementById(`price-${stand.id}`) as HTMLInputElement).value;
                                handleUpdatePrice(stand.id, Number(val));
                             }} className="bg-[#F84464] text-white px-3 py-1 font-bold rounded shadow hover:bg-rose-600 transition text-xs">Update</button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            ) : selectedPricingMatch ? (
               <p className="text-gray-500 text-sm">No stands generated for this match.</p>
            ) : (
               <p className="text-gray-500 text-sm italic">Please select a match from the dropdown above to view and edit live stand prices.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
