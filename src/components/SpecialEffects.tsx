import React, { useState, useEffect } from 'react';
import { ArrowUp, Sun, Moon, Heart, Sparkles } from 'lucide-react';

export const SpecialEffects: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Sakura falling particles state
  const [particles] = useState(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      emoji: ['🌸', '✨', '💕', '🌹'][i % 4],
      left: Math.random() * 100,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 6,
      size: Math.random() * 14 + 14,
    }));
  });

  useEffect(() => {
    // Check initial system preference or class
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setShowBackToTop(currentScroll > 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Scroll Progress Bar (Top Fixed) */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#f48fb1] via-[#d81b60] to-[#880e4f] transition-all duration-150 rounded-r-full shadow-md"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 2. Mouse Glow Effect (Hidden on mobile) */}
      <div
        className="hidden lg:block pointer-events-none fixed z-30 w-72 h-72 rounded-full blur-3xl transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x - 144}px`,
          top: `${mousePos.y - 144}px`,
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(216, 27, 96, 0.15) 0%, rgba(0,0,0,0) 70%)'
            : 'radial-gradient(circle, rgba(248, 187, 208, 0.4) 0%, rgba(255,255,255,0) 70%)',
        }}
      ></div>

      {/* 3. Floating Sakura & Hearts Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute -top-10 animate-float opacity-30 dark:opacity-20"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              animationIterationCount: 'infinite',
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* 4. Navigation Pill Bar (Top Right Fixed) */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-2">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full glass-pill text-[#880e4f] dark:text-pink-300 shadow-md hover:scale-110 active:scale-95 transition-all box-glow-pink"
          title={isDarkMode ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[#880e4f]" />}
        </button>
      </div>

      {/* 5. Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 p-3.5 rounded-full bg-[#880e4f] hover:bg-[#d81b60] text-white shadow-xl hover:-translate-y-1 transition-all group animate-fade-in border border-pink-300/40"
          title="Kembali ke Atas"
        >
          <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        </button>
      )}

      {/* 6. Subtle Glowing Blurred Center Circle (Bold Typography Theme Pattern) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#f8bbd0]/25 dark:from-pink-900/15 to-transparent rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
    </>
  );
};
