import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import AcademicsSection from './components/AcademicsSection';
import AdmissionsSection from './components/AdmissionsSection';
import StudentLifeSection from './components/StudentLifeSection';
import GallerySection from './components/GallerySection';
import NoticeBoardSection from './components/NoticeBoardSection';
import ContactSection from './components/ContactSection';
import PortalsSection from './components/PortalsSection';
import Chatbot from './components/Chatbot';
import { Bot, Sparkles, MessageSquare, Phone, Mail, MapPin, X } from 'lucide-react';
import { SCHOOL_NAME } from './data';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [fontSizeClass, setFontSizeClass] = useState<string>('text-base');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [lang, setLang] = useState<'EN' | 'ES'>('EN');

  // Search Query state propagated from Navbar
  const [searchQuery, setSearchQuery] = useState('');

  // Floating Chatbot Toggle
  const [showFloatingChat, setShowFloatingChat] = useState(false);

  // Sync dark mode class with HTML document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavbarSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentTab('notices'); // Route automatically to notices where bulletins search is active
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-350 geometric-grid ${
      fontSizeClass
    } ${
      highContrast 
        ? 'bg-black text-yellow-400 selection:bg-yellow-400 selection:text-black' 
        : darkMode 
          ? 'bg-slate-950 text-slate-100' 
          : 'bg-slate-50/70 text-slate-800'
    }`}>
      
      {/* 1. Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        fontSizeClass={fontSizeClass}
        setFontSizeClass={setFontSizeClass}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        onSearch={handleNavbarSearch}
        lang={lang}
        setLang={setLang}
      />

      {/* 2. Main Content Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
        
        {currentTab === 'home' && (
          <Hero setCurrentTab={setCurrentTab} lang={lang} />
        )}

        {currentTab === 'about' && (
          <AboutSection lang={lang} />
        )}

        {currentTab === 'academics' && (
          <AcademicsSection lang={lang} />
        )}

        {currentTab === 'admissions' && (
          <AdmissionsSection lang={lang} />
        )}

        {currentTab === 'studentlife' && (
          <StudentLifeSection lang={lang} />
        )}

        {currentTab === 'gallery' && (
          <GallerySection lang={lang} />
        )}

        {currentTab === 'notices' && (
          <NoticeBoardSection lang={lang} />
        )}

        {currentTab === 'contact' && (
          <ContactSection lang={lang} />
        )}

        {currentTab === 'portals' && (
          <PortalsSection lang={lang} />
        )}

      </main>

      {/* 3. Footer */}
      <footer className={`border-t py-12 md:py-16 transition-colors ${
        highContrast
          ? 'bg-black border-yellow-400 text-yellow-400'
          : darkMode
            ? 'bg-slate-900 border-slate-800 text-slate-400'
            : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            
            {/* School details column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
                  highContrast ? 'bg-yellow-400 text-black border border-yellow-500' : 'bg-blue-600 text-white'
                }`}>OA</span>
                <span className={`text-lg font-black tracking-tight ${
                  highContrast ? 'text-yellow-400' : 'text-slate-800 dark:text-white'
                }`}>{SCHOOL_NAME}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-semibold">
                {lang === 'EN' 
                  ? 'STAR SCHOOL combines academic rigor with moral guidance models to groom the leaders of tomorrow.' 
                  : 'STAR SCHOOL combina rigor académico con modelos de formación moral para educar a los líderes del mañana.'}
              </p>
              <p className="text-[10px] font-mono opacity-60">
                &copy; {new Date().getFullYear()} {SCHOOL_NAME} Private Prep School. All Rights Reserved.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${
                highContrast ? 'text-yellow-400' : 'text-slate-900 dark:text-white'
              }`}>
                {lang === 'EN' ? 'Navigation' : 'Navegación'}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button onClick={() => { setCurrentTab('home'); window.scrollTo(0,0); }} className="text-left hover:text-blue-600 transition-colors">Home</button>
                <button onClick={() => { setCurrentTab('about'); window.scrollTo(0,0); }} className="text-left hover:text-blue-600 transition-colors">About Us</button>
                <button onClick={() => { setCurrentTab('academics'); window.scrollTo(0,0); }} className="text-left hover:text-blue-600 transition-colors">Academics</button>
                <button onClick={() => { setCurrentTab('admissions'); window.scrollTo(0,0); }} className="text-left hover:text-blue-600 transition-colors">Admissions</button>
                <button onClick={() => { setCurrentTab('studentlife'); window.scrollTo(0,0); }} className="text-left hover:text-blue-600 transition-colors">Student Life</button>
                <button onClick={() => { setCurrentTab('gallery'); window.scrollTo(0,0); }} className="text-left hover:text-blue-600 transition-colors">Gallery</button>
              </div>
            </div>

            {/* Accreditations and Status */}
            <div className="space-y-3">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${
                highContrast ? 'text-yellow-400' : 'text-slate-900 dark:text-white'
              }`}>
                {lang === 'EN' ? 'Accreditation' : 'Acreditación'}
              </h4>
              <p className="text-xs leading-relaxed font-semibold">
                Member of Western Association of Schools and Colleges (WASC). Registered prep academy under state department authorization regulations.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 py-1 px-2 rounded-lg font-bold">WASC Member</span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 py-1 px-2 rounded-lg font-bold">IB World School</span>
              </div>
            </div>

            {/* Quick Contacts Column */}
            <div className="space-y-3 text-xs font-semibold">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${
                highContrast ? 'text-yellow-400' : 'text-slate-900 dark:text-white'
              }`}>
                {lang === 'EN' ? 'Quick Contact' : 'Contacto Rápido'}
              </h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-blue-600" /> +1 (555) 012-9843</p>
                <p className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-emerald-600" /> info@oakridge.edu</p>
                <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-purple-600" /> Pine Hills, CA 90210</p>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* 4. Floating AI Co-Pilot Chatbot */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
        
        {showFloatingChat && (
          <div className="shadow-2xl">
            <Chatbot
              lang={lang}
              isEmbedded={false}
              onClose={() => setShowFloatingChat(false)}
            />
          </div>
        )}

        {/* Floating Trigger button */}
        <button
          onClick={() => setShowFloatingChat(!showFloatingChat)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer relative group ${
            highContrast
              ? 'bg-yellow-400 text-black border-2 border-black'
              : 'bg-blue-600 text-white'
          }`}
          title={lang === 'EN' ? 'Talk to STAR SCHOOL AI Assistant' : 'Hable con el Asistente de IA'}
        >
          {showFloatingChat ? (
            <X className="w-6 h-6 animate-spin-once" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white dark:border-slate-900 animate-pulse">
                AI
              </span>
            </>
          )}
        </button>

      </div>

    </div>
  );
}
