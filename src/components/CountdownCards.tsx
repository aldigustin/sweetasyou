import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';
import { COUNTDOWN_DATA } from '../data/mockData';

export const CountdownCards: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Card 1 Calculations: Age & Countdown to 18th Birthday (25 July 2026)
  const birthDate = new Date(COUNTDOWN_DATA.card1.birthDate);
  const targetDate = new Date(COUNTDOWN_DATA.card1.targetBirthday);

  // Time diff to 18th birthday
  const diffTo18 = targetDate.getTime() - now.getTime();
  const hasReached18 = diffTo18 <= 0;

  // Live timer breakdown for Card 1 (if reached 18, count elapsed since birth or 18; if not reached, count down to 18)
  const absDiff18 = Math.abs(diffTo18);
  const c1Days = Math.floor(absDiff18 / (1000 * 60 * 60 * 24));
  const c1Hours = Math.floor((absDiff18 / (1000 * 60 * 60)) % 24);
  const c1Minutes = Math.floor((absDiff18 / 1000 / 60) % 60);
  const c1Seconds = Math.floor((absDiff18 / 1000) % 60);

  // Exact age right now
  let ageYears = now.getFullYear() - birthDate.getFullYear();
  let ageMonths = now.getMonth() - birthDate.getMonth();
  let ageDays = now.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }
  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }

  // Card 2 Calculations: Relationship Start (1 Feb 2026)
  const relStart = new Date(COUNTDOWN_DATA.card2.startDate);
  const diffRel = now.getTime() - relStart.getTime();
  const totalHariBersama = Math.max(0, Math.floor(diffRel / (1000 * 60 * 60 * 24)));
  
  let relYears = now.getFullYear() - relStart.getFullYear();
  let relMonths = now.getMonth() - relStart.getMonth();
  if (relMonths < 0) {
    relYears -= 1;
    relMonths += 12;
  }
  const totalBulanBersama = relYears * 12 + relMonths;

  const relHours = Math.floor((diffRel / (1000 * 60 * 60)) % 24);
  const relMinutes = Math.floor((diffRel / (1000 * 60)) % 60);
  const relSeconds = Math.floor((diffRel / 1000) % 60);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto" id="countdown">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* CARD 1: 🎉 Umur Azzahera */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-xl border border-pink-200/80 dark:border-pink-900/40 group hover:shadow-2xl hover:border-pink-300 transition-all duration-300">
          
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-rose-300/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs sm:text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                <span>Lahir: 25 July 2008</span>
              </span>
              <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-elegant text-gray-900 dark:text-white mb-2">
              {COUNTDOWN_DATA.card1.title}
            </h2>

            <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/5 border border-pink-200 dark:border-pink-800/30 text-center">
              <span className="text-xs uppercase tracking-wider text-pink-600 dark:text-pink-400 font-semibold block mb-1">
                Target Ulang Tahun • 25 July 2026
              </span>
              <span className="text-4xl sm:text-5xl font-extrabold font-modern bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 dark:from-pink-400 dark:via-rose-300 dark:to-pink-400 bg-clip-text text-transparent">
                {COUNTDOWN_DATA.card1.targetAgeDisplay}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-2">
                Usia aktual saat ini: {ageYears} Tahun, {ageMonths} Bulan, {ageDays} Hari
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-3 text-center">
              {hasReached18 ? "⏱️ Waktu berjalan sejak tepat 18 Tahun" : "⏳ Countdown Menuju Hari Ulang Tahun Ke-18"}
            </span>

            {/* Counter Boxes */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <TimeBox label="Hari" value={c1Days} />
              <TimeBox label="Jam" value={c1Hours} />
              <TimeBox label="Menit" value={c1Minutes} />
              <TimeBox label="Detik" value={c1Seconds} isHighlight />
            </div>
          </div>

        </div>

        {/* CARD 2: ❤️ Perjalanan Kita */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-xl border border-rose-200/80 dark:border-rose-900/40 group hover:shadow-2xl hover:border-rose-300 transition-all duration-300">
          
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-tr from-rose-400/20 to-amber-300/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Mulai: 1 February 2026</span>
              </span>
              <Clock className="w-6 h-6 text-rose-400 animate-spin" style={{ animationDuration: '12s' }} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-elegant text-gray-900 dark:text-white mb-2">
              {COUNTDOWN_DATA.card2.title}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 font-light">
              Menghitung setiap detik berharga yang telah kita lalui bersama dengan penuh cinta hingga hari ini.
            </p>

            {/* Summary Stat Pills */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <StatPill label="Total Hari" value={`${totalHariBersama} Hari`} />
              <StatPill label="Bulan Bersama" value={`${totalBulanBersama} Bulan`} />
              <StatPill label="Tahun Bersama" value={`${relYears} Tahun`} />
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-3 text-center">
              ⏱️ Ticking Live Counter (Jam • Menit • Detik)
            </span>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <TimeBox label="Jam" value={relHours} color="rose" />
              <TimeBox label="Menit" value={relMinutes} color="rose" />
              <TimeBox label="Detik" value={relSeconds} color="rose" isHighlight />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

// Sub-components for clean rendering
const TimeBox: React.FC<{ label: string; value: number; color?: 'pink' | 'rose'; isHighlight?: boolean }> = ({ label, value, color = 'pink', isHighlight }) => {
  const bgClass = isHighlight
    ? color === 'pink' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
    : 'bg-white/80 dark:bg-zinc-800/80 text-gray-800 dark:text-gray-100 border border-white dark:border-zinc-700';

  return (
    <div className={`rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center transition-all ${bgClass}`}>
      <span className="text-xl sm:text-3xl font-extrabold font-modern tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className={`text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${isHighlight ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
};

const StatPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-3 rounded-xl glass-pill text-center border border-rose-200/50 dark:border-rose-900/30">
    <span className="text-xs text-gray-500 dark:text-gray-400 block">{label}</span>
    <span className="text-sm sm:text-base font-bold text-rose-600 dark:text-rose-400 font-modern">{value}</span>
  </div>
);
