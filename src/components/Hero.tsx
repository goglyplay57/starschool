import React from 'react';
import { ArrowRight, Calendar, Info, ShieldAlert, Award } from 'lucide-react';
import { SCHOOL_STATS, PRINCIPAL_MESSAGE, PRINCIPAL_NAME } from '../data';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  lang: 'EN' | 'ES';
}

export default function Hero({ setCurrentTab, lang }: HeroProps) {
  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Main Hero Carousel/Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl h-[420px] md:h-[520px] lg:h-[580px] flex items-center bg-blue-900">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600"
            alt="STAR SCHOOL Campus and Students"
            className="w-full h-full object-cover transform scale-100 opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          {/* Abstract Geometric Background Pattern from Design HTML */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 border-4 border-white rotate-45 -ml-12 -mb-12"></div>
            <div className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-white/50 rounded-full"></div>
            <div className="absolute top-1/4 right-1/3 w-20 h-20 border border-white/30 rotate-12"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/80 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-3xl px-6 sm:px-12 md:px-16 text-white space-y-6 z-10">
          <span className="inline-block px-3 py-1 bg-blue-500/30 text-blue-100 text-xs font-bold rounded tracking-widest uppercase border border-blue-400/20">
            ★ {lang === 'EN' ? 'Excellence in Education' : 'Excelencia en Educación'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight">
            {lang === 'EN' ? (
              <>Shape Your Future <br />With Purpose.</>
            ) : (
              <>Modele Su Futuro <br />Con Propósito.</>
            )}
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 font-medium max-w-2xl leading-relaxed">
            {lang === 'EN' 
              ? 'Join a community of lifelong learners, innovators, and leaders dedicated to academic excellence and character development.'
              : 'Únase a una comunidad de aprendices, innovadores y líderes dedicados a la excelencia académica y al desarrollo del carácter.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('admissions')}
              className="px-8 py-3.5 rounded-lg bg-white text-blue-900 font-bold text-sm tracking-wide shadow-md hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {lang === 'EN' ? 'Apply Now' : 'Aplicar Ahora'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-650 text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {lang === 'EN' ? 'Campus Tour' : 'Recorrido por el Campus'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Statistics Dashboard - Grid Pattern */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {SCHOOL_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 md:p-8 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 text-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="text-3xl sm:text-4xl font-black font-display text-blue-700 dark:text-blue-400 mb-2">
              {stat.value}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'EN' ? stat.label : (
                stat.label === 'Active Students' ? 'Estudiantes Activos' :
                stat.label === 'Expert Faculty' ? 'Facultad Experta' :
                stat.label === 'Years of Excellence' ? 'Años de Excelencia' : 'Programas Académicos'
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Welcome Message from the Principal */}
      <div className="p-8 md:p-10 rounded-2xl border border-slate-250/70 dark:border-slate-800 bg-white dark:bg-slate-900/20 relative overflow-hidden">
        {/* Subtle geometric line patterns inside */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow border border-slate-200/80 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
              alt="Elizabeth Thorne, Principal"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-4 flex-1">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
              {lang === 'EN' ? 'Welcome Note' : 'Nota de Bienvenida'}
            </span>
            <blockquote className="text-sm sm:text-base text-slate-600 dark:text-slate-300 italic leading-relaxed font-semibold">
              "{PRINCIPAL_MESSAGE.short}"
            </blockquote>
            
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-slate-100 dark:border-slate-850">
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">{PRINCIPAL_NAME}</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                  {lang === 'EN' ? 'Principal, STAR SCHOOL' : 'Directora, STAR SCHOOL'}
                </span>
              </div>
              
              <button
                onClick={() => setCurrentTab('about')}
                className="inline-flex items-center text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 gap-1.5 group"
              >
                {lang === 'EN' ? 'Read Full Statement' : 'Leer Mensaje Completo'}
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Latest News, Highlights and Accreditations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-750 dark:text-blue-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display tracking-tight">
              {lang === 'EN' ? 'Admissions Active' : 'Admisiones Activas'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-555 dark:text-slate-400 leading-relaxed font-medium">
              {lang === 'EN'
                ? 'Enrolments for grades K-12 are officially active for the academic year 2027. Schedule a personal campus tour today.'
                : 'Las inscripciones para los grados K-12 están activas para el año académico 2027. Agende un recorrido hoy.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('admissions')}
            className="text-xs font-bold text-blue-750 dark:text-blue-400 hover:underline flex items-center gap-1 mt-4 cursor-pointer self-start"
          >
            {lang === 'EN' ? 'Admission Process' : 'Proceso de Admisión'} &rarr;
          </button>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display tracking-tight">
              {lang === 'EN' ? 'STEM Innovation Award' : 'Premio de Innovación STEM'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-555 dark:text-slate-400 leading-relaxed font-medium">
              {lang === 'EN'
                ? 'STAR SCHOOL has been recognized as the region’s premier technological secondary institution for integrating AI into middle schools.'
                : 'STAR SCHOOL ha sido reconocida como la principal institución tecnológica de la región por integrar IA en escuelas secundarias.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('academics')}
            className="text-xs font-bold text-blue-750 dark:text-blue-400 hover:underline flex items-center gap-1 mt-4 cursor-pointer self-start"
          >
            {lang === 'EN' ? 'Explore Curriculum' : 'Explorar Currículo'} &rarr;
          </button>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display tracking-tight">
              {lang === 'EN' ? 'Upcoming Exams' : 'Próximos Exámenes'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-555 dark:text-slate-400 leading-relaxed font-medium">
              {lang === 'EN'
                ? 'Fall mid-term grading schedules are updated and posted on the notice board. Download syllabuses from the board.'
                : 'Los cronogramas de exámenes de otoño se actualizan y se publican en el mural de anuncios. Descargue los temarios.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('notices')}
            className="text-xs font-bold text-blue-750 dark:text-blue-400 hover:underline flex items-center gap-1 mt-4 cursor-pointer self-start"
          >
            {lang === 'EN' ? 'Notice Board' : 'Mural de Anuncios'} &rarr;
          </button>
        </div>

      </div>

    </div>
  );
}
