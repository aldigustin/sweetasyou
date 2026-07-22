import React, { useState } from 'react';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

interface Props {
  onEnter: () => void;
  title: string;
}

export const LoadingEntrance: React.FC<Props> = ({ onEnter, title }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    triggerConfetti();
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-rose-950/40 p-6 text-center transition-all duration-1000 ${opening ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* Background glowing particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-300/30 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-300/30 dark:bg-rose-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-lg w-full glass-card p-8 md:p-12 rounded-3xl box-glow-pink border border-white/80 dark:border-white/10 flex flex-col items-center shadow-2xl">
        
        {/* Animated Heart Badge */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-lg opacity-40 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-tr from-pink-500 to-rose-400 text-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <Gift className="w-12 h-12" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Title */}
        <span className="text-sm font-semibold tracking-widest text-pink-600 dark:text-pink-400 uppercase mb-2 animate-pulse">
          Special Romantic Gift
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-serif-elegant text-gray-800 dark:text-gray-100 mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-8 max-w-md font-light">
          Ada kejutan kecil yang disiapkan khusus untukmu hari ini. Klik tombol di bawah untuk membuka kenangan kita.
        </p>

        {/* Interactive Enter Button with Ripple */}
        <button
          onClick={handleOpen}
          disabled={opening}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-medium text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          <Heart className="w-6 h-6 fill-white animate-pulse" />
          <span>{opening ? "Membuka Hadiah..." : "🎁 Buka Hadiah Sekarang"}</span>
        </button>

        <span className="mt-6 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <span>Turn on sound / Gunakan headset untuk pengalaman terbaik</span>
          <span>🎧</span>
        </span>
      </div>
    </div>
  );
};
