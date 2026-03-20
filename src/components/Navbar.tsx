"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User, Ticket, Settings, Info } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-[#F84464] font-bold text-2xl tracking-tighter">bookmyshow</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm w-[400px] focus:outline-none focus:ring-1 focus:ring-[#F84464]"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm font-medium relative">
            <span className="text-gray-700 cursor-pointer">Mumbai</span>
            <Link href="/admin" className="bg-[#F84464] text-white px-4 py-1.5 rounded text-xs font-semibold">Sign in</Link>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none flex items-center">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 cursor-pointer" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-10 right-0 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-5 py-4 border-b border-gray-100 mb-2">
                  <p className="font-bold text-gray-900 text-base mb-1">Hey!</p>
                  <p className="text-xs text-gray-500 font-medium">Log in to view your bookings and profile</p>
                </div>
                <div className="flex flex-col py-1">
                  <Link href="/admin" className="px-5 py-3 hover:bg-gray-50 flex items-center space-x-4 text-gray-700 transition" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">Login / Register</span>
                  </Link>
                  <Link href="#" className="px-5 py-3 hover:bg-gray-50 flex items-center space-x-4 text-gray-700 transition" onClick={() => setIsMenuOpen(false)}>
                    <Ticket className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">Your Orders</span>
                  </Link>
                  <Link href="#" className="px-5 py-3 hover:bg-gray-50 flex items-center space-x-4 text-gray-700 transition" onClick={() => setIsMenuOpen(false)}>
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">Account Settings</span>
                  </Link>
                  <Link href="#" className="px-5 py-3 hover:bg-gray-50 flex items-center space-x-4 text-gray-700 transition" onClick={() => setIsMenuOpen(false)}>
                    <Info className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold">Help & Support</span>
                  </Link>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
      <div className="bg-gray-100 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between text-gray-600">
          <div className="flex space-x-4">
            <Link href="/movies" className="cursor-pointer hover:text-gray-900">Movies</Link>
            <Link href="/stream" className="cursor-pointer hover:text-gray-900">Stream</Link>
            <Link href="/events" className="cursor-pointer hover:text-gray-900">Events</Link>
            <Link href="/plays" className="cursor-pointer hover:text-gray-900">Plays</Link>
            <Link href="/" className="cursor-pointer font-bold text-[#F84464]">Sports</Link>
            <Link href="/activities" className="cursor-pointer hover:text-gray-900">Activities</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
