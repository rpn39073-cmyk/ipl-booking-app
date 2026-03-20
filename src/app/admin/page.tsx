"use client";

import React, { useState } from 'react';
import { Plus, Users, IndianRupee, Activity, Trophy as Stadium } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Use admin / admin123");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
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
                    <p className="text-2xl font-bold text-gray-900">1,245</p>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg"><IndianRupee className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Revenue (Today)</p>
                    <p className="text-2xl font-bold text-gray-900">₹85,000</p>
                  </div>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Users className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Stadium Fill (KKR vs MI)</p>
                    <p className="text-2xl font-bold text-gray-900">76%</p>
                  </div>
               </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-3">Booking ID</th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Match</th>
                        <th className="px-6 py-3">Seats</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-b border-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">#BK-8374</td>
                        <td className="px-6 py-4">user@example.com</td>
                        <td className="px-6 py-4">KKR vs MI</td>
                        <td className="px-6 py-4">Corporate Box C1-1</td>
                        <td className="px-6 py-4">₹80</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Confirmed</span></td>
                     </tr>
                     <tr>
                        <td className="px-6 py-4 font-medium text-gray-900">#BK-9321</td>
                        <td className="px-6 py-4">test@gmail.com</td>
                        <td className="px-6 py-4">GT vs LSG</td>
                        <td className="px-6 py-4">Premium Stand R-12</td>
                        <td className="px-6 py-4">₹150</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Confirmed</span></td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Matches</h1>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium hover:bg-gray-800 transition">
                <Plus className="w-4 h-4" /> <span>Add Match</span>
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 max-w-2xl">
               <h3 className="text-md font-bold text-gray-800 mb-4">Add New Match</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Home Team</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" placeholder="E.g. KKR" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Away Team</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" placeholder="E.g. MI" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                    <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                    <input type="time" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Stadium</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-900" placeholder="E.g. Eden Gardens, Kolkata" />
                  </div>
                  <div className="col-span-2 mt-2">
                    <button className="bg-[#F84464] text-white px-6 py-2 rounded-lg text-sm font-bold shadow hover:bg-rose-600 transition">Save Match</button>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Stand Pricing Configuration</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
               <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-3">Stand Name</th>
                        <th className="px-6 py-3">Price (₹)</th>
                        <th className="px-6 py-3">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {['North General', 'Corporate Box', 'VIP Pavilion', 'Premium Stand'].map((stand, i) => (
                       <tr key={stand} className="border-b border-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{stand}</td>
                          <td className="px-6 py-4">
                             <input type="number" defaultValue={(i+1)*500} className="w-24 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#F84464]" />
                          </td>
                          <td className="px-6 py-4">
                             <button className="text-[#F84464] font-bold text-xs hover:underline">Update</button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
