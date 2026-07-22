/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LoadingEntrance } from './components/LoadingEntrance';
import { HeaderHero } from './components/HeaderHero';
import { CountdownCards } from './components/CountdownCards';
import { SweetMessage } from './components/SweetMessage';
import { GallerySection } from './components/GallerySection';
import { LoveLetter } from './components/LoveLetter';
import { MemoriesTimeline } from './components/MemoriesTimeline';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';
import { SpecialEffects } from './components/SpecialEffects';
import { HERO_DATA } from './data/mockData';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  if (!hasEntered) {
    return (
      <LoadingEntrance
        onEnter={() => setHasEntered(true)}
        title={HERO_DATA.title}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafb] dark:bg-[#12090c] text-[#5d4037] dark:text-[#fce4ec] relative overflow-x-hidden font-sans selection:bg-[#f48fb1] selection:text-[#880e4f]">
      {/* Environmental & Interactive Special Effects */}
      <SpecialEffects />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4">
        {/* Hero Banner Header */}
        <HeaderHero />

        {/* Live Counters */}
        <CountdownCards />

        {/* Heartfelt Sweet Message */}
        <SweetMessage />

        {/* Interactive Gallery with Lightbox & Filters */}
        <GallerySection />

        {/* Animated Typewriter Love Letter */}
        <LoveLetter />

        {/* Relationship Timeline */}
        <MemoriesTimeline />
      </main>

      {/* Floating Audio Player */}
      <MusicPlayer />

      {/* Romantic Footer */}
      <Footer />
    </div>
  );
}
