import React, { useState, useEffect } from 'react';
import { Megaphone, Search, Calendar, FileCheck, Award, Printer, ArrowRight, BookOpen } from 'lucide-react';
import { Notice, ExamResult } from '../types';
import { CALENDAR_EVENTS, MOCK_EXAM_RESULTS } from '../data';

interface NoticeBoardSectionProps {
  lang: 'EN' | 'ES';
}

export default function NoticeBoardSection({ lang }: NoticeBoardSectionProps) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Exam Result Lookup State
  const [studentIdInput, setStudentIdInput] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [lookupResult, setLookupResult] = useState<ExamResult | null>(null);
  const [lookupError, setLookupError] = useState('');

  // Fetch notices from full-stack server
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      console.error("Failed to load notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(not => {
    const matchesSearch = not.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          not.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || not.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExamLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedId(studentIdInput);
    setLookupError('');
    setLookupResult(null);

    if (!studentIdInput.trim()) {
      setLookupError(lang === 'EN' ? 'Please enter a Student ID.' : 'Por favor ingrese un ID de Estudiante.');
      return;
    }

    const matched = MOCK_EXAM_RESULTS.find(res => res.studentId.toLowerCase() === studentIdInput.trim().toLowerCase());
    if (matched) {
      setLookupResult(matched);
    } else {
      setLookupError(lang === 'EN' 
        ? 'No exam records located for this ID. Try searching "STU-2026-101" or "STU-2026-102".' 
        : 'No se encontraron registros. Pruebe con "STU-2026-101".');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'Mural & Interactive Notice Board' : 'Mural de Anuncios y Calendario'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN'
            ? 'Access our central dynamic notifications feed, review upcoming calendar holidays, or inspect midterm academic scores.'
            : 'Acceda a nuestro mural dinámico de anuncios, revise el calendario escolar o inspeccione calificaciones.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================== ANNOUNCEMENTS COLUMN ==================== */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Megaphone className="w-5.5 h-5.5 text-blue-600" />
              {lang === 'EN' ? 'Recent Announcements' : 'Anuncios Recientes'}
            </h3>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1">
              {['All', 'General', 'Academic', 'Exam', 'Holiday', 'Event'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search notice board */}
          <div className="relative">
            <input
              type="text"
              placeholder={lang === 'EN' ? "Search bulletins..." : "Buscar anuncios..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 text-slate-850 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          </div>

          {/* Notice Bulletins Feed */}
          {loading ? (
            <div className="py-12 text-center text-slate-400 animate-pulse">
              <Megaphone className="w-8 h-8 mx-auto animate-spin mb-2" />
              {lang === 'EN' ? 'Fetching notice database...' : 'Cargando anuncios de base de datos...'}
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="py-12 border border-dashed border-slate-200 dark:border-slate-850 rounded-3xl text-center text-slate-400">
              {lang === 'EN' ? 'No notices matches search query.' : 'No se encontraron anuncios.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((not) => (
                <div
                  key={not.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    not.isUrgent
                      ? 'border-red-200 dark:border-red-950 bg-red-50/25 dark:bg-red-950/10'
                      : 'border-slate-200/60 dark:border-slate-850 bg-white dark:bg-slate-900/40 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-mono ${
                          not.category === 'Exam' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' :
                          not.category === 'Holiday' ? 'bg-red-100 text-red-600 dark:bg-red-900/20' :
                          not.category === 'Event' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/20' :
                          not.category === 'Academic' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                        }`}>
                          {not.category}
                        </span>
                        {not.isUrgent && (
                          <span className="text-[9px] font-extrabold uppercase bg-red-600 text-white px-2.5 py-0.5 rounded-full font-mono animate-pulse">
                            URGENT
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-semibold font-mono">{not.date}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white mt-1 leading-snug">
                        {not.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium mt-3">
                    {not.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==================== CALENDAR & RESULTS COLUMN ==================== */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Calendar List */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-50 dark:border-slate-850 pb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              {lang === 'EN' ? 'Holiday & Event Calendar' : 'Calendario de Festivos'}
            </h3>
            <div className="space-y-4">
              {CALENDAR_EVENTS.map((ev) => (
                <div key={ev.id} className="flex gap-4 items-start text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 text-center text-[10px] font-mono font-bold w-12 text-blue-600 dark:text-blue-400 leading-tight">
                    {ev.date.split("-")[2]}<br />
                    <span className="text-[8px] uppercase text-slate-400">
                      {new Date(ev.date).toLocaleString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-850 dark:text-white leading-snug">{ev.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-0.5">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Results lookup system */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              {lang === 'EN' ? 'Scores & Results' : 'Boleta de Calificaciones'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Parents & pupils can instantly review midterm report sheets by inputting their assigned Student ID.
            </p>
            
            <form onSubmit={handleExamLookup} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. STU-2026-101"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 text-slate-850 dark:text-slate-100 text-xs sm:text-sm font-mono font-semibold uppercase focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  {lang === 'EN' ? 'Search' : 'Buscar'}
                </button>
              </div>
              
              {lookupError && (
                <p className="text-[10px] font-bold text-red-500">{lookupError}</p>
              )}
            </form>

            {/* Render matched lookup results card */}
            {lookupResult && (
              <div className="p-5 rounded-2xl border border-slate-200 bg-white dark:bg-slate-900/60 dark:border-slate-850 text-slate-800 dark:text-slate-200 animate-fade-in space-y-4">
                
                {/* Score card header */}
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase">{lookupResult.studentName}</h4>
                    <p className="text-[9px] font-mono text-slate-400 mt-0.5">{lookupResult.studentId} | {lookupResult.grade}</p>
                  </div>
                  <span className="text-[9px] font-bold bg-blue-50 text-blue-600 py-0.5 px-2 rounded font-mono">ATT: {lookupResult.attendance}</span>
                </div>

                {/* Score subjects list */}
                <div className="space-y-1.5 text-xs">
                  {lookupResult.subjects.map((sub, idx) => (
                    <div key={idx} className="flex justify-between font-bold text-slate-600 dark:text-slate-350">
                      <span>{sub.subject}</span>
                      <span className="font-mono">{sub.marks}/100 (<strong className="text-blue-500">{sub.grade}</strong>)</span>
                    </div>
                  ))}
                </div>

                {/* Instructor Remarks */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-2.5 space-y-1">
                  <span className="text-[9px] text-slate-400 block uppercase font-extrabold">{lang === 'EN' ? 'Academic Remarks:' : 'Observaciones:'}</span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic leading-relaxed font-semibold">"{lookupResult.remarks}"</p>
                </div>

                {/* Print button mock */}
                <button
                  onClick={() => window.print()}
                  className="w-full py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 text-[10px] font-extrabold flex items-center justify-center gap-1 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  {lang === 'EN' ? 'Print Official Scorecard' : 'Imprimir Calificaciones'}
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
