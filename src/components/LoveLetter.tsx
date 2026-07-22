import React, { useState, useEffect, useRef } from 'react';
import { Mail, Heart } from 'lucide-react';
import { LOVE_LETTER_TEXT } from '../data/mockData';

export const LoveLetter: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    const fullText = LOVE_LETTER_TEXT;
    const timer = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 28); // Typing speed

    return () => clearInterval(timer);
  }, [isTyping]);

  return (
    <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto" id="letter">
      <div
        ref={cardRef}
        className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg border border-[#f8bbd0] dark:border-pink-900/40 rounded-[40px] p-8 sm:p-12 md:p-16 shadow-xl flex flex-col justify-between relative overflow-hidden"
      >
        {/* Background Decorative Blossom */}
        <div className="absolute -top-10 -right-10 text-9xl opacity-10 pointer-events-none select-none">
          🌸
        </div>
        <div className="absolute bottom-10 left-10 text-8xl opacity-10 pointer-events-none select-none">
          💌
        </div>

        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 rounded-full bg-[#f8bbd0] dark:bg-pink-950 flex items-center justify-center text-[#880e4f] dark:text-pink-300 shadow-sm animate-bounce">
              <Mail className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#880e4f] dark:text-pink-400 opacity-70">
              Personal Love Note
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-elegant font-black tracking-tight text-[#880e4f] dark:text-pink-300 mb-6 flex items-center gap-3">
            <span>💌 Surat Untukmu...</span>
            <span className="text-2xl text-[#d81b60] animate-pulse">❤️</span>
          </h2>

          <div className="w-full bg-pink-100/60 dark:bg-zinc-800/60 rounded-[28px] p-6 sm:p-10 border border-[#fce4ec] dark:border-zinc-700/60 min-h-[340px]">
            <p className="text-[#5d4037] dark:text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg font-mono whitespace-pre-line">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2.5 h-5 bg-[#d81b60] ml-1 animate-pulse align-middle"></span>
              )}
            </p>
          </div>
        </div>

        {/* Card Footer Signature matching Bold Typography */}
        <div className="mt-8 pt-6 border-t border-[#fce4ec] dark:border-zinc-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#880e4f] to-[#d81b60] text-white flex items-center justify-center font-serif-elegant font-bold text-xl shadow-md">
              G
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-[#880e4f] dark:text-pink-300 font-serif-elegant">
                Gustin Aldiansyah
              </p>
              <p className="text-xs text-[#ad1457] dark:text-pink-400/80 font-medium">
                Your Partner in Everything ❤️
              </p>
            </div>
          </div>

          {!isTyping && hasStarted && (
            <button
              onClick={() => {
                setDisplayedText('');
                setIsTyping(true);
              }}
              className="text-xs font-semibold text-[#d81b60] hover:underline flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-50 dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 transition-all"
            >
              <span>🔄 Ulang Animasi Ketik</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
