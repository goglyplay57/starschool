import { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Users, Compass, Eye } from 'lucide-react';
import { SCHOOL_HISTORY, VISION_MISSION, PRINCIPAL_MESSAGE, PRINCIPAL_NAME, FACULTY_MEMBERS, CAMPUS_FACILITIES } from '../data';

interface AboutSectionProps {
  lang: 'EN' | 'ES';
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const [selectedFaculty, setSelectedFaculty] = useState<number | null>(null);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'About STAR SCHOOL' : 'Sobre STAR SCHOOL'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN' 
            ? 'Discover our 25-year history of nurturing intellectual competence, ethical clarity, and athletic excellence.'
            : 'Descubra nuestros 25 años de historia de formación de competencias intelectuales, claridad ética y excelencia.'}
        </p>
      </div>

      {/* 2. History & Vision/Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* History */}
        <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-4 flex flex-col justify-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            {lang === 'EN' ? 'Our Heritage' : 'Nuestra Herencia'}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {lang === 'EN' ? 'A Quarter Century of Distinctions' : 'Un Cuarto de Siglo de Distinciones'}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {SCHOOL_HISTORY}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="p-6 sm:p-8 rounded-3xl border border-blue-100 dark:border-blue-950 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
              <Eye className="w-5 h-5 shrink-0" />
              <span>{lang === 'EN' ? 'Our Strategic Vision' : 'Nuestra Visión'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {VISION_MISSION.vision}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
              <Compass className="w-5 h-5 shrink-0" />
              <span>{lang === 'EN' ? 'Our Educational Mission' : 'Nuestra Misión'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {VISION_MISSION.mission}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Principal's Message (Full) */}
      <div className="p-8 md:p-12 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3 space-y-4 text-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                alt="Elizabeth Thorne"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">{PRINCIPAL_NAME}</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">{lang === 'EN' ? 'Principal & Academic Director' : 'Directora Académica'}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">dr.thorne@oakridge.edu</p>
            </div>
          </div>
          <div className="w-full lg:w-2/3 space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              {lang === 'EN' ? "Letter From The Principal's Desk" : "Carta de la Oficina de Dirección"}
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed font-medium whitespace-pre-line">
              {PRINCIPAL_MESSAGE.full}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Faculty & Staff Interactive Grid */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Our Governing Faculty' : 'Nuestra Facultad Docente'}</h3>
          <p className="text-xs sm:text-sm text-slate-400">{lang === 'EN' ? 'Click on any faculty member to inspect academic credentials and emails.' : 'Haga clic en un miembro para inspeccionar credenciales.'}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FACULTY_MEMBERS.map((fac, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFaculty(selectedFaculty === idx ? null : idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center text-center space-y-3 ${
                selectedFaculty === idx
                  ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
              }`}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{fac.name}</h4>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold tracking-tight mt-0.5">{fac.role}</p>
              </div>

              {selectedFaculty === idx && (
                <div className="text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850 pt-2 w-full space-y-1 animate-fade-in font-medium">
                  <p className="font-bold text-slate-700 dark:text-slate-300">{fac.degree}</p>
                  <p className="text-blue-500/80 underline font-mono">{fac.name.toLowerCase().replace('. ', '-').replace(' ', '')}@oakridge.edu</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Campus Facilities Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'World-Class Campus Facilities' : 'Instalaciones del Campus'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPUS_FACILITIES.map((fac, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-lg transition-all"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {fac.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
