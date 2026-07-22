import React from 'react';
import { TIMELINE_EVENTS } from '../data/mockData';

export const MemoriesTimeline: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto" id="timeline">
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 border border-[#f8bbd0] dark:border-pink-900/40 shadow-xl box-glow-pink">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#880e4f] dark:text-pink-400 block mb-2">
            Milestones of Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-elegant text-[#880e4f] dark:text-pink-300">
            ⏳ Perjalanan Cerita Kita
          </h2>
          <div className="w-20 h-1 bg-[#d81b60] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Events List */}
        <div className="space-y-8 sm:space-y-10 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-[#f06292] before:via-[#f8bbd0] before:to-transparent">
          {TIMELINE_EVENTS.map((evt, idx) => {
            const isHighlight = idx === 3; // Birthday 18th event

            return (
              <div key={evt.id} className="relative flex items-start gap-6 sm:gap-8 group">
                
                {/* Timeline Dot & Icon */}
                <div className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110 ${
                  isHighlight
                    ? 'bg-gradient-to-tr from-[#880e4f] via-[#d81b60] to-[#f06292] text-white animate-pulse'
                    : 'bg-white dark:bg-zinc-800 border-2 border-[#f06292] text-[#d81b60]'
                }`}>
                  <span>{evt.icon}</span>
                </div>

                {/* Event Content Card */}
                <div className={`flex-grow p-6 rounded-3xl border transition-all duration-300 ${
                  isHighlight
                    ? 'bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-transparent border-[#d81b60] shadow-lg'
                    : 'bg-pink-50/40 dark:bg-zinc-800/40 border-pink-100 dark:border-zinc-800 group-hover:border-[#f8bbd0] dark:group-hover:border-pink-700'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className={`text-lg sm:text-xl font-bold font-serif-elegant ${
                      isHighlight ? 'text-[#d81b60] dark:text-pink-300 italic text-xl sm:text-2xl' : 'text-[#880e4f] dark:text-pink-200'
                    }`}>
                      {evt.title}
                    </h3>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#ad1457] dark:text-pink-400 bg-white/80 dark:bg-zinc-900/80 px-3 py-1 rounded-full w-fit border border-pink-200 dark:border-zinc-700">
                      {evt.date}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#5d4037] dark:text-gray-300 font-light leading-relaxed">
                    {evt.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
