import { useState } from 'react';
import { Trophy, Cpu, Globe, Music, MessageSquare, Leaf, Camera, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { SPORTS_CLUBS } from '../data';

interface StudentLifeSectionProps {
  lang: 'EN' | 'ES';
}

export default function StudentLifeSection({ lang }: StudentLifeSectionProps) {
  const [activeClub, setActiveClub] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cpu': return <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'globe': return <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'music': return <Music className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'message-square': return <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case 'leaf': return <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'camera': return <Camera className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'Student Life & Campus Vibrancy' : 'Vida Estudiantil y Actividades'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN'
            ? 'At STAR SCHOOL, learning expands outside the classroom. We offer a competitive athletic framework and diverse leadership clubs.'
            : 'En STAR SCHOOL, el aprendizaje va más allá del aula. Ofrecemos un marco deportivo competitivo y diversos clubes de liderazgo.'}
        </p>
      </div>

      {/* 2. Varsity Athletics */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          {lang === 'EN' ? 'Elite Varsity Athletics' : 'Deportes Universitarios de Élite'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPORTS_CLUBS.sports.map((sport, idx) => (
            <div
              key={idx}
              className="group rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-lg transition-all"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-yellow-400 text-black font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  🏆 {lang === 'EN' ? 'Champions' : 'Campeones'}
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {sport.name}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {sport.achievements}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Extracurricular Clubs Bento Grid */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {lang === 'EN' ? 'Leadership Clubs & Societies' : 'Clubes y Sociedades de Liderazgo'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">{lang === 'EN' ? 'Click on any club box below to inspect activities and agendas.' : 'Haga clic en un club para inspeccionar actividades.'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPORTS_CLUBS.clubs.map((club, idx) => (
            <div
              key={idx}
              onClick={() => setActiveClub(activeClub === club.name ? null : club.name)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 space-y-3 ${
                activeClub === club.name
                  ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/20 shadow-md scale-[1.01]'
                  : 'border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
                  {getIcon(club.icon)}
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold uppercase">
                  {club.icon === 'cpu' ? 'STEM' : club.icon === 'globe' ? 'POLITICS' : club.icon === 'music' ? 'ARTS' : club.icon === 'leaf' ? 'ECOLOGY' : 'GENERAL'}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white leading-tight">
                {club.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {club.info}
              </p>

              {activeClub === club.name && (
                <div className="text-[11px] text-slate-600 dark:text-slate-350 border-t border-slate-100 dark:border-slate-850 pt-3 space-y-1.5 animate-fade-in font-medium">
                  <p className="font-bold text-blue-600 dark:text-blue-400">📅 {lang === 'EN' ? 'Meets Every Tuesday & Thursday' : 'Se reúne Martes y Jueves'}</p>
                  <p className="leading-relaxed">
                    {club.name === 'STEM & Robotics Guild' && (lang === 'EN' ? 'Builds vex-robots and designs CAD blueprints for national tournament competitions.' : 'Construye vex-robots y diseña planos CAD para torneos nacionales.')}
                    {club.name === 'Model United Nations (MUN)' && (lang === 'EN' ? 'Engages in geopolitical debates, mock global summits, and travels to varsity debate conferences.' : 'Participa en debates geopolíticos, cumbres simuladas y viaja a conferencias.')}
                    {club.name === 'Symphony Orchestra' && (lang === 'EN' ? 'Rehearses twice weekly under Professor Higgins to prep classical movements for annual galas.' : 'Ensaya dos veces por semana para preparar movimientos clásicos.')}
                    {club.name === 'Debating & Forensics League' && (lang === 'EN' ? 'Cultivates logical critique, persuasive rhetoric, and public speaking excellence.' : 'Cultiva la crítica lógica, la retórica persuasiva y la oratoria.')}
                    {club.name === 'Eco-Warriors Alliance' && (lang === 'EN' ? 'Coordinates campus organic agriculture pods, waste management, and local cleanups.' : 'Coordina huertos agrícolas orgánicos en el campus.')}
                    {club.name === 'Digital Arts & Journalism' && (lang === 'EN' ? 'Publishes the monthly Gazette and films the campus weekly video chronicles.' : 'Publica la revista mensual STAR SCHOOL Gazette.')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Student Achievements Highlighting */}
      <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {lang === 'EN' ? 'Recent Student Achievements' : 'Logros de los Estudiantes'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              We celebrate our students who consistently challenge boundaries and secure national recognition in academics, sciences, debate, and athletic leagues.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 flex gap-4">
              <div className="text-2xl shrink-0">🥇</div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">{lang === 'EN' ? '1st Place, National Science Olympiad' : '1er Lugar, Olimpiada Nacional de Ciencia'}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                  Our High prep robotics guild secured the prestigious National Science & Automation Trophy in Boston, 2026.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 flex gap-4">
              <div className="text-2xl shrink-0">🗣️</div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Model UN Best Delegate Honors' : 'Mención de Mejor Delegado en Modelo UN'}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                  Sophia Rodriguez (Grade 11) awarded 'Best Delegate' honors for representing climate committees at Harvard MUN.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 flex gap-4">
              <div className="text-2xl shrink-0">⚽</div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Back-to-Back Soccer Championships' : 'Bicampeones de Fútbol Escolar'}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                  Our STAR SCHOOL Hawks Soccer squad retained the Regional Varsity Cup, securing a flawless 12-0 season record.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
