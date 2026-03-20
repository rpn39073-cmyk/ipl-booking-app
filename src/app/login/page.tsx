"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ChevronLeft, Github, Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth network request securely without exposing logic
    setTimeout(() => {
       setIsLoading(false);
       if (email && password) {
          router.push('/');
       }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-rose-100 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900 transition absolute -top-12 left-0 sm:left-auto">
           <ChevronLeft className="w-4 h-4 mr-1" />
           <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#F84464] tracking-tight">
          bookmyshow
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Log in to your account' : 'Create a new account'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border focus:ring-[#F84464] focus:border-[#F84464] outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border focus:ring-[#F84464] focus:border-[#F84464] outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
               <div className="flex items-center justify-between">
                 <div className="flex items-center">
                   <input
                     id="remember-me"
                     name="remember-me"
                     type="checkbox"
                     className="h-4 w-4 text-[#F84464] focus:ring-[#F84464] border-gray-300 rounded cursor-pointer"
                   />
                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                     Remember me
                   </label>
                 </div>
 
                 <div className="text-sm">
                   <a href="#" className="font-medium text-[#F84464] hover:text-rose-500 transition">
                     Forgot password?
                   </a>
                 </div>
               </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#F84464] hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F84464] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  isLogin ? 'Sign in' : 'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
             <div className="relative">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-gray-200" />
               </div>
               <div className="relative flex justify-center text-sm">
                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
               </div>
             </div>

             <div className="mt-6 grid grid-cols-2 gap-3">
               <div>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
                     <Chrome className="w-5 h-5 text-gray-500 mr-2" />
                     Google
                  </button>
               </div>
               <div>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
                     <Github className="w-5 h-5 text-gray-500 mr-2" />
                     GitHub
                  </button>
               </div>
             </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
             {isLogin ? "Don't have an account? " : "Already have an account? "}
             <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="font-medium text-[#F84464] hover:text-rose-500 transition focus:outline-none"
             >
                {isLogin ? 'Sign up' : 'Log in instead'}
             </button>
          </p>
        </div>
      </div>
    </div>
  );
}
