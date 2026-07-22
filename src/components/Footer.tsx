import React from 'react';
import { Heart } from 'lucide-react';
import { FOOTER_DATA } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 pt-12 pb-16 border-t border-[#fce4ec] dark:border-zinc-800/80 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-center md:text-left">
      
      {/* Dedication */}
      <div>
        <div className="text-lg sm:text-xl font-serif-elegant font-bold italic text-[#d81b60] dark:text-pink-400 mb-1">
          {FOOTER_DATA.dedication}
        </div>
        <div className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#880e4f] dark:text-pink-300 opacity-60">
          25 July 2026 • 18th Birthday Gift Edition
        </div>
      </div>

      {/* Center Romantic Icons */}
      <div className="flex items-center gap-4 bg-pink-50 dark:bg-zinc-900 px-6 py-3 rounded-full border border-pink-200 dark:border-zinc-800 shadow-sm animate-pulse-slow">
        <span className="text-xl">🌹</span>
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-ping" />
        <span className="text-xl">🎂</span>
        <span className="text-xl">✨</span>
      </div>

      {/* Made with Love Credit */}
      <div className="text-xs sm:text-sm text-[#5d4037] dark:text-gray-400 font-medium flex items-center justify-center gap-1.5">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-[#d81b60] fill-[#d81b60] inline animate-bounce" />
        <span>by <strong className="text-[#880e4f] dark:text-pink-300 font-serif-elegant">Gustin Aldiansyah</strong></span>
      </div>

    </footer>
  );
};
