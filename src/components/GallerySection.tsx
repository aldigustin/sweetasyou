import React, { useState, useMemo } from 'react';
import { Search, ZoomIn, Film, Image as ImageIcon, X, Maximize2, Minimize2, Heart } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filtered items
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter(item => {
      const matchesFilter = filter === 'all' || item.type === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.caption.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const toggleFullscreen = () => {
    const lightboxEl = document.getElementById('lightbox-modal');
    if (!lightboxEl) return;

    if (!document.fullscreenElement) {
      lightboxEl.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="gallery">
      
      {/* Title & Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-pink-600 dark:text-pink-400 font-semibold mb-2 block">
          Our Sweetest Moments
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold font-serif-elegant text-gray-900 dark:text-white mb-4">
          📸 Kenangan Indah Kita
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto font-light text-sm sm:text-base">
          Setiap gambar dan video di sini menyimpan cerita tawa, rindu, dan kebahagiaan yang tak tergantikan.
        </p>
      </div>

      {/* Controls Bar: Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 glass-card p-4 rounded-2xl shadow-sm border border-pink-100 dark:border-zinc-800">
        
        {/* Filter Tabs with Ripple feedback */}
        <div className="flex items-center gap-2 bg-pink-50 dark:bg-zinc-800/80 p-1.5 rounded-xl w-full sm:w-auto overflow-x-auto">
          <FilterTab active={filter === 'all'} label="Semua Media" count={GALLERY_ITEMS.length} onClick={() => setFilter('all')} />
          <FilterTab active={filter === 'photo'} label="Foto" icon={<ImageIcon className="w-3.5 h-3.5" />} count={GALLERY_ITEMS.filter(i => i.type === 'photo').length} onClick={() => setFilter('photo')} />
          <FilterTab active={filter === 'video'} label="Video" icon={<Film className="w-3.5 h-3.5" />} count={GALLERY_ITEMS.filter(i => i.type === 'video').length} onClick={() => setFilter('video')} />
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kenangan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-700 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Masonry Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-3xl p-8">
          <Heart className="w-12 h-12 text-pink-300 mx-auto mb-3 animate-pulse" />
          <p className="text-gray-500 dark:text-gray-400">Tidak ada kenangan yang cocok dengan pencarian "{searchQuery}"</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="break-inside-avoid glass-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-white/80 dark:border-zinc-800 group cursor-pointer transition-all duration-500 hover:-translate-y-1.5 relative"
            >
              {/* Media Preview (Lazy Loading) */}
              <div className="relative overflow-hidden aspect-auto bg-pink-100 dark:bg-zinc-800">
                {item.type === 'photo' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={item.url}
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => e.currentTarget.pause()}
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                      <Film className="w-3 h-3" /> Video klip
                    </span>
                  </div>
                )}

                {/* Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-pink-500/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                      {item.date || "Sweet Memory"}
                    </span>
                    <ZoomIn className="w-5 h-5 text-pink-300 transform group-hover:rotate-90 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold font-serif-elegant leading-snug">{item.title}</h3>
                  <p className="text-xs text-gray-200 line-clamp-2 mt-1 font-light">{item.description}</p>
                  <p className="text-xs italic text-pink-300 mt-2 font-serif-elegant">"{item.caption}"</p>
                </div>
              </div>

              {/* Static Card Footer (Visible when not hovered on touch) */}
              <div className="p-4 bg-white/60 dark:bg-zinc-900/60 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base font-serif-elegant">{item.title}</h4>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20 group-hover:fill-rose-500 transition-colors" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{item.description}</p>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Smooth Lightbox Modal */}
      {selectedItem && (
        <div
          id="lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
        >
          {/* Lightbox Controls */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-50">
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Gallery"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSelectedItem(null)}
              className="p-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors shadow-lg"
              title="Tutup Preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Modal Media Container */}
            <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px] relative overflow-hidden">
              {selectedItem.type === 'photo' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[75vh] object-contain select-none"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[75vh]"
                />
              )}
            </div>

            {/* Modal Details Panel */}
            <div className="w-full md:w-80 p-6 sm:p-8 bg-zinc-900 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
              <div>
                <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-1 block">
                  {selectedItem.date || "Kenangan Spesial"}
                </span>
                <h3 className="text-2xl font-bold font-serif-elegant mb-3 text-white">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-gray-300 font-light mb-6 leading-relaxed">
                  {selectedItem.description}
                </p>
                
                <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-950/60 to-rose-950/40 border border-pink-800/40">
                  <span className="text-[11px] uppercase tracking-wider text-pink-300 font-semibold block mb-1">
                    Romantic Caption ❤️
                  </span>
                  <p className="font-serif-elegant italic text-sm text-pink-100">
                    "{selectedItem.caption}"
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800 text-center">
                <span className="text-xs text-gray-500">Azzahera & Gustin Aldiansyah</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

const FilterTab: React.FC<{ active: boolean; label: string; count: number; icon?: React.ReactNode; onClick: () => void }> = ({ active, label, count, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
      active
        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20'
        : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-zinc-700'
    }`}
  >
    {icon}
    <span>{label}</span>
    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-pink-100 dark:bg-zinc-700 text-pink-700 dark:text-pink-300'}`}>
      {count}
    </span>
  </button>
);
