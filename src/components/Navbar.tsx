import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Search, Accessibility, Eye, Type, Globe } from 'lucide-react';
import { SCHOOL_NAME } from '../data';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  fontSizeClass: string;
  setFontSizeClass: (size: string) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  onSearch: (query: string) => void;
  lang: 'EN' | 'ES';
  setLang: (lang: 'EN' | 'ES') => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  fontSizeClass,
  setFontSizeClass,
  highContrast,
  setHighContrast,
  onSearch,
  lang,
  setLang
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccessDropdown, setShowAccessDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'home', label: lang === 'EN' ? 'Home' : 'Inicio' },
    { id: 'about', label: lang === 'EN' ? 'About Us' : 'Nosotros' },
    { id: 'academics', label: lang === 'EN' ? 'Academics' : 'Académico' },
    { id: 'admissions', label: lang === 'EN' ? 'Admissions' : 'Admisiones' },
    { id: 'studentlife', label: lang === 'EN' ? 'Student Life' : 'Vida Estudiantil' },
    { id: 'gallery', label: lang === 'EN' ? 'Gallery' : 'Galería' },
    { id: 'notices', label: lang === 'EN' ? 'Notice Board' : 'Noticias' },
    { id: 'contact', label: lang === 'EN' ? 'Contact' : 'Contacto' },
    { id: 'portals', label: lang === 'EN' ? 'Portals & Fees' : 'Portales y Pagos' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleLanguage = () => {
    setLang(lang === 'EN' ? 'ES' : 'EN');
  };

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-yellow-400' 
        : darkMode 
          ? 'bg-slate-900 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo and Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xl shadow-sm transition-transform hover:scale-105 ${
              highContrast 
                ? 'bg-yellow-400 text-black border border-yellow-500' 
                : 'bg-blue-700 text-white'
            }`}>
              OA
            </div>
            <div>
              <span className={`text-xl font-extrabold tracking-tight block uppercase ${
                highContrast ? 'text-yellow-400' : 'text-blue-900 dark:text-blue-200'
              }`}>
                {SCHOOL_NAME}
              </span>
              <span className="text-[9px] tracking-widest uppercase opacity-80 font-bold block -mt-1.5 text-slate-500 dark:text-slate-400">
                {lang === 'EN' ? 'Fostering Global Excellence' : 'Fomentando la Excelencia Global'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-xs sm:text-sm font-semibold tracking-tight transition-all relative ${
                  currentTab === item.id
                    ? highContrast
                      ? 'bg-yellow-400 text-black font-black rounded-lg'
                      : 'text-blue-700 dark:text-blue-400 font-extrabold border-b-2 border-blue-700 dark:border-blue-400 rounded-none'
                    : highContrast
                      ? 'hover:bg-yellow-400/20 text-yellow-400 rounded-lg'
                      : 'text-slate-600 dark:text-slate-350 hover:text-blue-700 dark:hover:text-blue-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Bar (Search, Accessibility, Mode, Language) */}
          <div className="hidden md:flex items-center space-x-2">
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={lang === 'EN' ? 'Search school...' : 'Buscar...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-40 xl:w-56 pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-1 transition-all ${
                  highContrast 
                    ? 'bg-black border-yellow-400 text-yellow-400 placeholder-yellow-600 focus:ring-yellow-400' 
                    : darkMode 
                      ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:ring-blue-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-blue-500'
                }`}
              />
              <Search className={`absolute left-3 top-2 w-4 h-4 ${highContrast ? 'text-yellow-400' : 'text-slate-400'}`} />
            </form>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              title={lang === 'EN' ? 'Translate to Spanish' : 'Traducir al Inglés'}
              className={`p-2 rounded-xl border transition-all ${
                highContrast 
                  ? 'border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400/10' 
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-[10px] ml-1 font-bold">{lang}</span>
            </button>

            {/* Accessibility Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                className={`p-2 rounded-xl border transition-all ${
                  highContrast 
                    ? 'border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400/10' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Accessibility Options"
              >
                <Accessibility className="w-4 h-4" />
              </button>
              
              {showAccessDropdown && (
                <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl p-4 border z-50 animate-fade-in ${
                  highContrast
                    ? 'bg-black border-yellow-400 text-yellow-400'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                }`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center">
                    <Accessibility className="w-3.5 h-3.5 mr-1.5" />
                    {lang === 'EN' ? 'Accessibility Tools' : 'Herramientas de Acceso'}
                  </h4>
                  
                  {/* Text Size */}
                  <div className="mb-4">
                    <span className="text-xs block mb-1.5 font-medium">{lang === 'EN' ? 'Text Scale' : 'Tamaño del Texto'}</span>
                    <div className="grid grid-cols-3 gap-1">
                      {['text-sm', 'text-base', 'text-lg'].map((sz, idx) => (
                        <button
                          key={sz}
                          onClick={() => setFontSizeClass(sz)}
                          className={`text-xs py-1 rounded-lg border ${
                            fontSizeClass === sz
                              ? highContrast 
                                ? 'bg-yellow-400 text-black border-yellow-500 font-bold' 
                                : 'bg-blue-600 text-white border-blue-600'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          {idx === 0 ? 'A' : idx === 1 ? 'A+' : 'A++'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* High Contrast */}
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                      highContrast
                        ? 'bg-yellow-400 text-black border-yellow-500'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="flex items-center">
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      {lang === 'EN' ? 'High Contrast' : 'Alto Contraste'}
                    </span>
                    <span className="text-[10px] uppercase">{highContrast ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-all ${
                highContrast 
                  ? 'border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400/10' 
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border ${
                highContrast ? 'border-yellow-400 text-yellow-400' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${
                highContrast ? 'border-yellow-400 text-yellow-400' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t py-4 px-4 space-y-2 animate-slide-down ${
          highContrast
            ? 'bg-black border-yellow-400 text-yellow-400'
            : darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-slate-50 border-slate-200'
        }`}>
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder={lang === 'EN' ? 'Search...' : 'Buscar...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none ${
                highContrast 
                  ? 'bg-black border-yellow-400 text-yellow-400' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </form>

          {/* Mobile Menu Items */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  currentTab === item.id
                    ? highContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-blue-600 text-white'
                    : highContrast
                      ? 'hover:bg-yellow-400/20 text-yellow-400'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick Language switch on mobile */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold">{lang === 'EN' ? 'Language:' : 'Idioma:'}</span>
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded-lg border text-xs font-bold ${
                highContrast ? 'border-yellow-400' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {lang === 'EN' ? 'Español' : 'English'}
            </button>
          </div>

          {/* Text scale on mobile */}
          <div className="pt-3 flex items-center justify-between">
            <span className="text-xs font-bold">{lang === 'EN' ? 'Text Scale:' : 'Tamaño:'}</span>
            <div className="flex gap-1">
              {['text-sm', 'text-base', 'text-lg'].map((sz, idx) => (
                <button
                  key={sz}
                  onClick={() => setFontSizeClass(sz)}
                  className={`text-xs px-2.5 py-1 rounded border ${
                    fontSizeClass === sz
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {idx === 0 ? 'A' : idx === 1 ? 'A+' : 'A++'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
