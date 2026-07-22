import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { MUSIC_DATA } from '../data/mockData';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_DATA.url);
    audioRef.current.loop = true;

    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, []);

  const startWebAudioSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      // Play soft romantic arpeggios
      const notes = [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63]; // C major romantic scale
      let idx = 0;

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = setInterval(() => {
        if (isMuted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[idx % notes.length], ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
        idx++;
        setProgress((idx % 100));
      }, 600);
    } catch {
      // Ignore synth errors
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to Web Audio API ambient romantic music if HTML5 audio source blocked/unsupported
        setIsPlaying(true);
        startWebAudioSynth();
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = clickX / rect.width;
    audioRef.current.currentTime = newPercent * audioRef.current.duration;
    setProgress(newPercent * 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce" style={{ animationDuration: '4s' }}>
      <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-[#f8bbd0] dark:border-pink-800/60 rounded-full p-2.5 sm:p-3 shadow-2xl flex items-center gap-3 sm:gap-4 max-w-[340px] box-glow-pink">
        
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 sm:w-11 sm:h-11 bg-[#d81b60] hover:bg-[#880e4f] active:scale-95 text-white rounded-full flex items-center justify-center shadow-md transition-all flex-shrink-0 relative overflow-hidden group"
          title={isPlaying ? "Pause Music" : "Play Romantic Music"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white relative z-10" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5 relative z-10" />
          )}
          {isPlaying && (
            <span className="absolute inset-0 bg-white/20 animate-ping rounded-full"></span>
          )}
        </button>

        {/* Track Info */}
        <div className="flex-grow min-w-[120px] max-w-[160px] sm:max-w-[180px]">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter text-[#ad1457] dark:text-pink-400">
            <Music className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Now Playing</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-[#5d4037] dark:text-gray-100 truncate font-serif-elegant">
            {MUSIC_DATA.title}
          </div>

          {/* Interactive Progress Bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1.5 bg-pink-100 dark:bg-zinc-800 rounded-full mt-1 cursor-pointer relative overflow-hidden"
          >
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#f48fb1] to-[#d81b60] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Mute/Volume Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-zinc-800 text-[#880e4f] dark:text-pink-300 transition-colors flex-shrink-0"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
        </button>

      </div>
    </div>
  );
};
