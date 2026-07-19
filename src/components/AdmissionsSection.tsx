import React, { useState } from 'react';
import { ClipboardList, CreditCard, FileText, CheckCircle, Download, Send, ArrowRight, X } from 'lucide-react';
import { FEE_STRUCTURE, REQUIRED_DOCUMENTS } from '../data';

interface AdmissionsSectionProps {
  lang: 'EN' | 'ES';
}

export default function AdmissionsSection({ lang }: AdmissionsSectionProps) {
  // Application Form States
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gradeApplied, setGradeApplied] = useState('Grade 9');
  const [previousSchool, setPreviousSchool] = useState('');
  const [birthCert, setBirthCert] = useState(false);
  const [transcript, setTranscript] = useState(false);
  const [transferCert, setTransferCert] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Prospectus Modal State
  const [showProspectus, setShowProspectus] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !guardianName || !email || !phone) {
      setErrorMsg(lang === 'EN' ? 'Please complete all required fields.' : 'Por favor complete todos los campos obligatorios.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          guardianName,
          email,
          phone,
          gradeApplied,
          previousSchool,
          documents: {
            birthCertificate: birthCert,
            academicTranscript: transcript,
            transferCertificate: transferCert,
          }
        })
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();
      setSubmissionSuccess(data);

      // Clear Form Fields
      setStudentName('');
      setGuardianName('');
      setEmail('');
      setPhone('');
      setPreviousSchool('');
      setBirthCert(false);
      setTranscript(false);
      setTransferCert(false);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(lang === 'EN' ? 'Failed to submit application. Ensure the server is online.' : 'Fallo al enviar la solicitud.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'Enrollment & Online Admissions' : 'Inscripciones y Admisión en Línea'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN'
            ? 'Begin your child’s educational journey with our seamless admissions process, dynamic fee structure, and online registration portal.'
            : 'Inicie el viaje educativo de su hijo con nuestro sencillo proceso de admisión, estructura de tarifas y registro en línea.'}
        </p>
      </div>

      {/* 2. Three-Step Process Timeline */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white text-center">
          {lang === 'EN' ? 'Our 4-Step Admission Journey' : 'Proceso de Admisión en 4 Pasos'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 relative z-10 space-y-3 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm">1</div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Step 1: Application Form' : 'Paso 1: Formulario'}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Complete our online registration form and upload required electronic documentation scans.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 relative z-10 space-y-3 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm">2</div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Step 2: Skill Assessment' : 'Paso 2: Evaluación'}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Applicants for grades 1-12 participate in a cognitive, literacy, and logical math assessment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 relative z-10 space-y-3 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm">3</div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Step 3: Principal Interview' : 'Paso 3: Entrevista'}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              A brief, warm conversational interview between the principal, the student, and guardians.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 relative z-10 space-y-3 hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm">4</div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Step 4: Enrollment Approval' : 'Paso 4: Matrícula'}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Receive formal acceptance, settle basic enrollment fees, and collect course prospectus sheets.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Fee Structure and Required Paperwork */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Tuition Fee Structure */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              {lang === 'EN' ? 'Tuition Fee Structure' : 'Estructura de Matrícula'}
            </h3>
            <button
              onClick={() => setShowProspectus(true)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-1.5 px-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              {lang === 'EN' ? 'Prospectus' : 'Folleto'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-3 px-2">{lang === 'EN' ? 'Grade Levels' : 'Nivel Escolar'}</th>
                  <th className="py-3 px-2">{lang === 'EN' ? 'Annual Tuition' : 'Matrícula Anual'}</th>
                  <th className="py-3 px-2">{lang === 'EN' ? 'Activity Settle' : 'Tarifa Actividad'}</th>
                  <th className="py-3 px-2">{lang === 'EN' ? 'Lab/Materials' : 'Laboratorios'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {FEE_STRUCTURE.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/10">
                    <td className="py-4 px-2 font-bold text-slate-800 dark:text-white">{fee.grade}</td>
                    <td className="py-4 px-2 text-blue-600 dark:text-blue-400">{fee.tuition}</td>
                    <td className="py-4 px-2">{fee.activityFee}</td>
                    <td className="py-4 px-2">{fee.materialsFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            {lang === 'EN' ? 'Required Documentation' : 'Documentación Requerida'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Please gather the following official certified documentation. Electronic scans must be fully legible in PDF format during registration.
          </p>
          <ul className="space-y-3">
            {REQUIRED_DOCUMENTS.map((doc, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-bold">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 4. Fully Functional Interactive Online Application Form */}
      <div className="p-8 md:p-12 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            {lang === 'EN' ? 'Online Admission Portal Form' : 'Solicitud de Admisión en Línea'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'EN' 
              ? 'Complete this live registration. Your application will post instantly into our database and can be evaluated on the Admin Terminal.' 
              : 'Complete el registro. Su solicitud se guardará y será visible en la terminal de administración.'}
          </p>
        </div>

        {submissionSuccess ? (
          <div className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-950 bg-emerald-50/40 dark:bg-emerald-950/20 text-center space-y-4 max-w-xl mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                {lang === 'EN' ? 'Application Registered!' : '¡Solicitud Registrada!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'EN' 
                  ? 'Your student registration has been captured in our backend system. Please record your unique Application ID below.'
                  : 'Su registro se ha capturado. Por favor guarde su número de solicitud.'}
              </p>
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-mono font-bold text-blue-600 dark:text-blue-400 select-all border border-slate-200 dark:border-slate-700 max-w-xs mx-auto">
                {submissionSuccess.id}
              </div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 text-xs font-semibold text-slate-500 dark:text-slate-400 space-y-1.5">
              <p>📍 {lang === 'EN' ? 'Registered for:' : 'Registrado para:'} <strong className="text-slate-750 dark:text-white">{submissionSuccess.studentName} ({submissionSuccess.gradeApplied})</strong></p>
              <p>📅 {lang === 'EN' ? 'Submission date:' : 'Fecha:'} <strong>{submissionSuccess.submissionDate}</strong></p>
            </div>
            <button
              onClick={() => setSubmissionSuccess(null)}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              {lang === 'EN' ? 'Register Another Student' : 'Registrar Otro Estudiante'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold animate-pulse">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Applicant Full Name *' : 'Nombre Completo del Solicitante *'}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Benjamin Miller"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Guardian Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Primary Guardian Name *' : 'Nombre de Tutor Principal *'}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Miller"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Guardian Email Address *' : 'Correo Electrónico de Tutor *'}</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rmiller@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Guardian Contact Number *' : 'Número de Teléfono del Tutor *'}</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Grade Applied */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Grade Level Applying For *' : 'Grado Solicitado *'}</label>
                <select
                  value={gradeApplied}
                  onChange={(e) => setGradeApplied(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-850 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="Kindergarten">Kindergarten</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>

              {/* Previous School */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Previous Educational Institution' : 'Institución Educativa Anterior'}</label>
                <input
                  type="text"
                  placeholder="e.g. Crestwood Academy (leave empty if none)"
                  value={previousSchool}
                  onChange={(e) => setPreviousSchool(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

            </div>

            {/* Document Checkbox list */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-850 pt-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {lang === 'EN' ? 'Preliminary Paperwork Attachments' : 'Documentos Adjuntos Preliminares'}
              </label>
              <p className="text-xs text-slate-400 mb-3">{lang === 'EN' ? 'Indicate which documents are currently prepared for electronic registration.' : 'Indique qué documentos posee listos para registro.'}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={birthCert}
                    onChange={(e) => setBirthCert(e.target.checked)}
                    className="w-4.5 h-4.5 rounded text-blue-600 focus:ring-0 border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold block text-slate-800 dark:text-slate-100">{lang === 'EN' ? 'Birth Certificate' : 'Certificado de Nacimiento'}</span>
                    <span className="text-[10px] text-slate-400 block font-semibold">Copy / Scan</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={transcript}
                    onChange={(e) => setTranscript(e.target.checked)}
                    className="w-4.5 h-4.5 rounded text-blue-600 focus:ring-0 border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold block text-slate-800 dark:text-slate-100">{lang === 'EN' ? 'Academic Transcript' : 'Historial Académico'}</span>
                    <span className="text-[10px] text-slate-400 block font-semibold">{lang === 'EN' ? 'Last 2 Years' : 'Últimos 2 Años'}</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={transferCert}
                    onChange={(e) => setTransferCert(e.target.checked)}
                    className="w-4.5 h-4.5 rounded text-blue-600 focus:ring-0 border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold block text-slate-800 dark:text-slate-100">{lang === 'EN' ? 'Transfer Certificate' : 'Certificado de Transferencia'}</span>
                    <span className="text-[10px] text-slate-400 block font-semibold">{lang === 'EN' ? 'If applicable' : 'Si aplica'}</span>
                  </div>
                </label>

              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-850">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all transform active:translate-y-0.5 cursor-pointer shadow-lg hover:shadow-blue-500/10"
              >
                {submitting ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    {lang === 'EN' ? 'Registering...' : 'Registrando...'}
                  </>
                ) : (
                  <>
                    {lang === 'EN' ? 'Submit Registration' : 'Enviar Solicitud'}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>

      {/* 5. Dynamic Prospectus PDF modal preview */}
      {showProspectus && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 max-w-2xl w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl animate-fade-in flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex justify-between items-center bg-blue-700 text-white">
              <div>
                <h4 className="text-lg font-bold">STAR SCHOOL Prospectus</h4>
                <p className="text-[10px] tracking-wider uppercase opacity-75 font-semibold">Official Academic Catalogue 2026/27</p>
              </div>
              <button
                onClick={() => setShowProspectus(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Brochure Body */}
            <div className="p-6 space-y-6 overflow-y-auto text-slate-750 dark:text-slate-300">
              <div className="text-center space-y-2">
                <span className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-2xl mx-auto shadow-md">SS</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Join STAR SCHOOL</h3>
                <p className="text-xs text-slate-400">Founded 2001 | Accredited Prep Academy</p>
              </div>

              <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider text-blue-600 dark:text-blue-400">1. Our Foundations</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                  STAR SCHOOL cultivates collaborative skills, technical coding mastery (Python/AI libraries), elite biological sciences laboratories, and moral governance models to prepare high school prep scholars for Stanford, Oxford, and top research institutions.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider text-blue-600 dark:text-blue-400">2. Accreditation & Honors</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                  A recognized standard of regional excellence, we host active sports varsity leagues, state robotics trophies, and maintain a strict 1:12 faculty-to-student instruction ratio.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">Annual Tuition Block</p>
                  <p className="text-slate-400">From Kindergarten up to Grade 12</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-blue-600 dark:text-blue-400">$12,500 - $19,500</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Annual Terms</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-850 flex justify-end gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-all"
              >
                {lang === 'EN' ? 'Print Brochure' : 'Imprimir Folleto'}
              </button>
              <button
                onClick={() => setShowProspectus(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
              >
                {lang === 'EN' ? 'Close Catalogue' : 'Cerrar Folleto'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
