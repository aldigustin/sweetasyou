import React, { useEffect, useRef, useState } from 'react';
import { Heart, Quote } from 'lucide-react';
import { SWEET_MESSAGE_PARAGRAPHS } from '../data/mockData';

export const SweetMessage: React.FC = () => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const elements = sectionRef.current.querySelectorAll('.msg-para');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          setVisibleIndices(prev => prev.includes(index) ? prev : [...prev, index]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto" id="message">
      <div 
        ref={sectionRef}
        className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl border border-pink-200/60 dark:border-pink-900/30 overflow-hidden box-glow-pink"
      >
        {/* Background Watermark Quote */}
        <Quote className="absolute top-6 right-6 w-32 h-32 text-pink-300/10 dark:text-pink-600/10 transform rotate-12 pointer-events-none" />
        <Quote className="absolute bottom-6 left-6 w-32 h-32 text-rose-300/10 dark:text-rose-600/10 transform rotate-180 pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-lg mb-4 animate-bounce">
            <Heart className="w-6 h-6 fill-white" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-elegant text-gray-900 dark:text-white">
            Pesan untuk Kekasihku
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Paragraphs with Scroll Reveal Fade-Up */}
        <div className="space-y-6 text-center sm:text-left relative z-10 font-light text-gray-700 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
          {SWEET_MESSAGE_PARAGRAPHS.map((para, idx) => {
            const isVisible = visibleIndices.includes(idx);
            const isFirst = idx === 0;
            const isLast = idx === SWEET_MESSAGE_PARAGRAPHS.length - 1;

            return (
              <p
                key={idx}
                className={`msg-para transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${isFirst ? 'font-serif-elegant font-semibold text-2xl sm:text-3xl text-pink-600 dark:text-pink-400 text-center mb-8' : ''} ${
                  isLast ? 'font-serif-elegant italic font-bold text-xl sm:text-2xl text-rose-600 dark:text-rose-400 text-center pt-6' : ''
                }`}
                style={{ transitionDelay: `${(idx % 3) * 150}ms` }}
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* Decorative Rose Gold Shimmer bottom bar */}
        <div className="mt-12 pt-8 border-t border-pink-100 dark:border-pink-900/30 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <span>❤️ Forever & Always • Aldi & Azzahera ❤️</span>
        </div>

      </div>
    </section>
  );
};
