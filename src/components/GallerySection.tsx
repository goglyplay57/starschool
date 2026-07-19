import { useState } from 'react';
import { Camera, Play, Image as ImageIcon, X, Maximize } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

interface GallerySectionProps {
  lang: 'EN' | 'ES';
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const [filter, setFilter] = useState<'All' | 'Campus' | 'Events' | 'Sports'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const mockVideos = [
    { title: "STAR SCHOOL Robotics Guild 2026", duration: "3:42", category: "Events", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", id: "vid-1" },
    { title: "Athletic Meet opening ceremony", duration: "5:10", category: "Sports", thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400", id: "vid-2" },
    { title: "Dr. Elizabeth Thorne Speech 2026", duration: "12:15", category: "Campus", thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400", id: "vid-3" },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'Visual Archives & Media Gallery' : 'Galería y Archivos Visuales'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN'
            ? 'Explore our campus life, annual events, sports championships, and research laboratories through high-definition visual captures.'
            : 'Explore la vida en el campus, eventos anuales, campeonatos deportivos y laboratorios de investigación.'}
        </p>
      </div>

      {/* 2. Photo Gallery Filters */}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-2">
          {(['All', 'Campus', 'Events', 'Sports'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'All' && (lang === 'EN' ? 'All Photos' : 'Todas las Fotos')}
              {cat === 'Campus' && (lang === 'EN' ? 'Campus & Class' : 'Campus y Aulas')}
              {cat === 'Events' && (lang === 'EN' ? 'Events & Fairs' : 'Eventos y Ferias')}
              {cat === 'Sports' && (lang === 'EN' ? 'Athletics League' : 'Liga Atlética')}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item, idx) => {
            const originalIndex = GALLERY_ITEMS.findIndex(g => g.url === item.url);
            return (
              <div
                key={idx}
                onClick={() => setLightboxIndex(originalIndex)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer border border-slate-200/50 dark:border-slate-800 shadow-sm"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <Maximize className="absolute top-4 right-4 w-5 h-5 text-white/80" />
                  <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider mb-0.5">{item.category}</span>
                  <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Video Showcase */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Play className="w-5.5 h-5.5 text-blue-600" />
          {lang === 'EN' ? 'Chronicles & Videos' : 'Crónicas y Vídeos'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockVideos.map((vid, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => setPlayingVideo(vid.id)}
                    className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {vid.duration}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <h4 className="text-sm font-bold text-slate-850 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {vid.title}
                </h4>
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>{vid.category}</span>
                  <span>{lang === 'EN' ? 'Academic Broadcast' : 'Transmisión Académica'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center text-white p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {lightboxIndex + 1} / {GALLERY_ITEMS.length}
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <div className="max-w-4xl mx-auto max-h-[75vh] flex items-center justify-center p-2 relative">
            <img
              src={GALLERY_ITEMS[lightboxIndex].url}
              alt={GALLERY_ITEMS[lightboxIndex].title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10 animate-scale-up"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Details & Controllers */}
          <div className="p-6 text-center text-white space-y-4 max-w-xl mx-auto">
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{GALLERY_ITEMS[lightboxIndex].category}</span>
              <h3 className="text-lg font-bold tracking-tight mt-0.5">{GALLERY_ITEMS[lightboxIndex].title}</h3>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer"
              >
                &larr; {lang === 'EN' ? 'Prev' : 'Anterior'}
              </button>
              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer"
              >
                {lang === 'EN' ? 'Next' : 'Siguiente'} &rarr;
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 5. Playing Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center text-white">
              <h4 className="text-base font-bold">
                {mockVideos.find(v => v.id === playingVideo)?.title}
              </h4>
              <button
                onClick={() => setPlayingVideo(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Mock Streaming Player container */}
            <div className="aspect-video bg-black rounded-2xl flex flex-col items-center justify-center border border-slate-800 relative group overflow-hidden">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-blue-400 opacity-20"></span>
              <div className="z-10 text-center space-y-3">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase">Streaming video buffer feed...</p>
              </div>
              <div className="absolute bottom-4 inset-x-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs text-white">
                <span>0:04 / {mockVideos.find(v => v.id === playingVideo)?.duration}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest animate-pulse">● LIVE BROADCAST</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
