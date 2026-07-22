import React from 'react';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { HERO_DATA } from '../data/mockData';

export const HeaderHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden text-center">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-300/30 via-rose-200/20 to-amber-100/30 dark:from-pink-900/20 dark:via-rose-900/10 dark:to-amber-900/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Floating Flowers & Hearts Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-[10%] animate-float text-pink-300/60 dark:text-pink-600/30">
          <Flower2 className="w-10 h-10 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute top-40 right-[15%] animate-float text-rose-300/60 dark:text-rose-600/30" style={{ animationDelay: '1.5s' }}>
          <Heart className="w-8 h-8 fill-rose-300/40" />
        </div>
        <div className="absolute bottom-32 left-[20%] animate-float text-amber-300/60 dark:text-amber-600/30" style={{ animationDelay: '2.5s' }}>
          <Sparkles className="w-12 h-12" />
        </div>
        <div className="absolute bottom-20 right-[10%] animate-float text-pink-400/50 dark:text-pink-500/20" style={{ animationDelay: '3.5s' }}>
          <Flower2 className="w-14 h-14" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Romantic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs md:text-sm font-medium text-pink-700 dark:text-pink-300 shadow-sm mb-8 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>25 July 2026 • Special Birthday Celebration</span>
        </div>

        {/* Large Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif-elegant text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-6 text-glow-pink">
          {HERO_DATA.title}
        </h1>

        {/* Animated Heart Between Us */}
        <div className="my-6 py-3 px-6 glass-card rounded-full inline-flex items-center gap-3 shadow-md border border-pink-200 dark:border-pink-900/50 hover:scale-105 transition-transform duration-300">
          <span className="font-modern font-semibold text-gray-800 dark:text-gray-200 text-base md:text-lg">Aldi</span>
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 bg-pink-400 rounded-full animate-ping opacity-40"></span>
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500 relative z-10 animate-pulse" />
          </div>
          <span className="font-modern font-semibold text-gray-800 dark:text-gray-200 text-base md:text-lg">Azza</span>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl font-light leading-relaxed mt-4 px-2">
          {HERO_DATA.subtitle}
        </p>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500">Gulir ke bawah</span>
          <div className="w-6 h-10 rounded-full border-2 border-pink-400 dark:border-pink-600 flex justify-center p-1">
            <div className="w-1.5 h-3 bg-pink-500 dark:bg-pink-400 rounded-full animate-bounce"></div>
          </div>
        </div>

      </div>
    </section>
  );
};
