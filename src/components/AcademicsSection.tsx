import { useState } from 'react';
import { BookOpen, GraduationCap, Cpu, Landmark, Settings, ArrowRight, Award } from 'lucide-react';
import { CURRICULUM_INFO, DEPARTMENTS } from '../data';

interface AcademicsSectionProps {
  lang: 'EN' | 'ES';
}

export default function AcademicsSection({ lang }: AcademicsSectionProps) {
  const [activeCurriculum, setActiveCurriculum] = useState<'primary' | 'middle' | 'high'>('high');

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'Scholastic Excellence & Curriculums' : 'Excelencia Académica y Programas'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN'
            ? 'We offer tailored college preparatory curriculums focused on deep critical inquiry, collaborative STEM experimentation, and classical humanities.'
            : 'Ofrecemos currículos diseñados para la preparación universitaria con un enfoque en la indagación crítica y el desarrollo integral.'}
        </p>
      </div>

      {/* 2. Dynamic Curriculum Tabs */}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-4">
          {(['primary', 'middle', 'high'] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setActiveCurriculum(curr)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCurriculum === curr
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {curr === 'primary' && (lang === 'EN' ? 'Primary Years (K-5)' : 'Primaria (K-5)')}
              {curr === 'middle' && (lang === 'EN' ? 'Middle School (6-8)' : 'Secundaria (6-8)')}
              {curr === 'high' && (lang === 'EN' ? 'College Prep (9-12)' : 'Preparatoria (9-12)')}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 p-8 rounded-3xl">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-4 h-4" />
              {lang === 'EN' ? 'Academics Focus' : 'Enfoque Académico'}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {CURRICULUM_INFO[activeCurriculum].title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {CURRICULUM_INFO[activeCurriculum].focus}
            </p>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {lang === 'EN' ? 'Curriculum Certifications' : 'Certificaciones del Programa'}
              </div>
              <ul className="space-y-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">✔ {lang === 'EN' ? 'Fully Accredited syllabus framework' : 'Marco curricular totalmente acreditado'}</li>
                <li className="flex items-center gap-2">✔ {lang === 'EN' ? 'Integrated experiential learning' : 'Aprendizaje experiencial integrado'}</li>
                <li className="flex items-center gap-2">✔ {lang === 'EN' ? 'Technology-supported digital assignments' : 'Tareas digitales con soporte tecnológico'}</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              {lang === 'EN' ? 'Core Course Syllabuses' : 'Syllabus de Cursos Principales'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CURRICULUM_INFO[activeCurriculum].subjects.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 flex items-center gap-3 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Departments Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
          {lang === 'EN' ? 'Academic Departments & Head Chairs' : 'Departamentos Académicos y Directores'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {DEPARTMENTS.map((dept, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase font-mono">
                {dept.count}
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
                {dept.name}
              </h4>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">{lang === 'EN' ? 'Department Chair' : 'Director de Dept.'}</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{dept.head}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Examination & Grading System */}
      <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {lang === 'EN' ? 'Rigorous Grading & Examination' : 'Sistema de Evaluación Riguroso'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {lang === 'EN'
                ? 'We employ multi-tiered criteria assessments comprising mid-term examinations, research theses, and capstone presentations to record scholastic progress.'
                : 'Utilizamos evaluaciones integrales que incluyen exámenes parciales, proyectos de investigación y exposiciones para registrar el progreso.'}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">1. Formative Checks (40%)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Continuous weekly quizzes, lab journals, homework portfolios, and seminar participation indexes.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">2. Summative Grading (40%)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Comprehensive semester-end examinations, laboratory practical clearances, and certified exam cycles.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">3. Projects & Capstones (20%)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Collaborative research projects, science fair exhibitions, and senior capstone dissertation defense.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Grade Transparency</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                All grades are instantly published onto our encrypted online Parent and Student Portals for detailed analytical reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Smart Classrooms & Centennial Library */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Centennial hybrid library' : 'Biblioteca Centennial'}</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Featuring quiet-zoned learning alcoves, 35,000 reference catalogs, digital database logins, JSTOR subscription clearances, and private tutoring tables for student councils.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Smart Classrooms Initiatives' : 'Iniciativas de Aulas Inteligentes'}</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Our study environments are equipped with dynamic touch-interactive display modules, high-frequency ceiling camera feeds for distance tutors, and ergonomic acoustic padding to ensure perfect focus.
          </p>
        </div>

      </div>

    </div>
  );
}
