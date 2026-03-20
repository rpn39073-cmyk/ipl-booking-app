import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#333338] text-gray-300 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-white font-bold text-3xl tracking-tighter mb-6">
            <span className="text-white">bookmy</span><span className="text-white">show</span>
          </div>
          <div className="flex space-x-6 mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition">
              <Youtube className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Copyright 2026 © Bigtree Entertainment Pvt. Ltd. All Rights Reserved.<br/>
            The content and images used on this site are copyright protected and copyrights vests with the respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
