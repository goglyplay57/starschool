import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, HelpCircle, Compass } from 'lucide-react';
import { FAQs } from '../data';

interface ContactSectionProps {
  lang: 'EN' | 'ES';
}

export default function ContactSection({ lang }: ContactSectionProps) {
  // Contact Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Interactive Map Zone State
  const [selectedZone, setSelectedZone] = useState<string | null>("Main Admin");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setErrorMsg(lang === 'EN' ? 'Please complete all required inquiry fields.' : 'Por favor complete todos los campos.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setErrorMsg(lang === 'EN' ? 'Failed to log inquiry. Please retry.' : 'Fallo al registrar la consulta.');
    } finally {
      setSubmitting(false);
    }
  };

  const mapZones = [
    { id: "Admin", name: "Main Admin & Hall", desc: "Houses Dr. Elizabeth Thorne's main office, registrar services, academic counselor pods, and assembly halls.", color: "fill-blue-500 hover:fill-blue-600" },
    { id: "Science", name: "Science Wing Labs", desc: "Hosts physics, chemistry, biology practical hubs, and STEM robotics makerspaces.", color: "fill-purple-500 hover:fill-purple-600" },
    { id: "Athletics", name: "Athletics & Pool Complex", desc: "Includes an indoor heating swimming pool, FIFA-standard turf football fields, and locker hubs.", color: "fill-emerald-500 hover:fill-emerald-600" },
    { id: "Library", name: "Centennial hybrid Library", desc: "Houses 35k catalog books, quiet study pods, computer terminals, and fine arts spaces.", color: "fill-amber-500 hover:fill-amber-600" }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'Connect With STAR SCHOOL' : 'Contacto y Consultas'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN'
            ? 'We are here to support your questions. Drop us a dynamic inquiry message or explore our physical campus blocks.'
            : 'Estamos aquí para responder sus preguntas. Envíenos un mensaje o explore el mapa interactivo del campus.'}
        </p>
      </div>

      {/* 2. Contact Details & Dynamic Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info (Column 1) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-50 dark:border-slate-850 pb-3">
              {lang === 'EN' ? 'Office Contact Details' : 'Información de Contacto'}
            </h3>

            <div className="space-y-4">
              
              <div className="flex gap-4 items-start text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Physical Address' : 'Dirección Física'}</h4>
                  <p className="text-slate-400 font-medium mt-0.5">25 STAR Avenue, Pine Hills, CA 90210</p>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Phone Lines' : 'Teléfonos'}</h4>
                  <p className="text-slate-400 font-semibold mt-0.5">+1 (555) 012-9843 (Front Desk)</p>
                  <p className="text-slate-400 font-semibold">+1 (555) 012-4421 (Registrar)</p>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Email Boxes' : 'Correos'}</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mt-0.5">info@oakridge.edu</p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">admissions@oakridge.edu</p>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Office Hours' : 'Horarios'}</h4>
                  <p className="text-slate-400 font-medium mt-0.5">Monday &ndash; Friday: 8:00 AM &ndash; 4:30 PM</p>
                  <p className="text-slate-400 font-medium">Saturday: 9:00 AM &ndash; 1:00 PM (TPA Days)</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Contact Form (Column 2) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-50 dark:border-slate-850 pb-3">
            {lang === 'EN' ? 'Send An Educational Inquiry' : 'Formulario de Consultas'}
          </h3>

          {success ? (
            <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-950 bg-emerald-50/40 dark:bg-emerald-950/20 text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-850 dark:text-white">{lang === 'EN' ? 'Inquiry Submitted!' : '¡Consulta Enviada!'}</h4>
              <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto">
                {lang === 'EN' 
                  ? 'Our admin receptionist has catalogued your contact request. We average an email follow-up in under 24 business hours.'
                  : 'Nuestra recepcionista ha registrado su consulta. Nos pondremos en contacto en menos de 24 horas hábiles.'}
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs cursor-pointer"
              >
                {lang === 'EN' ? 'Submit New Inquiry' : 'Nueva Consulta'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              
              {errorMsg && (
                <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Your Name *' : 'Su Nombre *'}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Green"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Your Email *' : 'Su Correo *'}</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rgreen@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Subject *' : 'Asunto *'}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enrollment inquiry for Middle School"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{lang === 'EN' ? 'Message Body *' : 'Mensaje *'}</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your inquiry details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all transform active:translate-y-0.5 cursor-pointer shadow"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                      {lang === 'EN' ? 'Sending...' : 'Enviando...'}
                    </>
                  ) : (
                    <>
                      {lang === 'EN' ? 'Submit Inquiry' : 'Enviar Consulta'}
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

      {/* 3. Interactive SVG Campus Map */}
      <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Compass className="w-5.5 h-5.5 text-blue-600" />
            {lang === 'EN' ? 'Interactive Campus Blocks Map' : 'Mapa Interactivo del Campus'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'EN' 
              ? 'Click on any highlighted architectural zone block to read directions, office listings, and operational hours.'
              : 'Haga clic en una zona arquitectónica resaltada para leer direcciones e información.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* SVG Map Layout */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-850 flex items-center justify-center relative">
            <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto">
              {/* Ground Canvas Grid */}
              <rect x="10" y="10" width="380" height="280" rx="16" className="fill-slate-100 dark:fill-slate-900/40 stroke-slate-200 dark:stroke-slate-800 stroke-2" />
              <path d="M 40 150 L 360 150 M 200 30 L 200 270" className="stroke-slate-200/50 dark:stroke-slate-800/40 stroke-2 stroke-dasharray-[4,4]" />
              
              {/* Map roads/paths mock */}
              <rect x="180" y="20" width="40" height="260" rx="4" className="fill-slate-200 dark:fill-slate-800/30 opacity-70" />
              <rect x="20" y="130" width="360" height="40" rx="4" className="fill-slate-200 dark:fill-slate-800/30 opacity-70" />

              {/* Zone 1: Main Admin */}
              <g className="cursor-pointer" onClick={() => setSelectedZone("Admin")}>
                <rect x="40" y="40" width="110" height="70" rx="12" className={`transition-all duration-300 stroke-slate-200/40 ${selectedZone === "Admin" ? 'fill-blue-600' : 'fill-blue-500/80 hover:fill-blue-500'}`} />
                <text x="95" y="80" textAnchor="middle" className="fill-white font-extrabold text-[10px] tracking-tight">ADMIN BLOCK</text>
              </g>

              {/* Zone 2: Science Wing */}
              <g className="cursor-pointer" onClick={() => setSelectedZone("Science")}>
                <rect x="250" y="40" width="110" height="70" rx="12" className={`transition-all duration-300 stroke-slate-200/40 ${selectedZone === "Science" ? 'fill-purple-600' : 'fill-purple-500/80 hover:fill-purple-500'}`} />
                <text x="305" y="80" textAnchor="middle" className="fill-white font-extrabold text-[10px] tracking-tight">SCIENCE LABS</text>
              </g>

              {/* Zone 3: Centennial Library */}
              <g className="cursor-pointer" onClick={() => setSelectedZone("Library")}>
                <rect x="40" y="190" width="110" height="70" rx="12" className={`transition-all duration-300 stroke-slate-200/40 ${selectedZone === "Library" ? 'fill-amber-600' : 'fill-amber-500/80 hover:fill-amber-500'}`} />
                <text x="95" y="230" textAnchor="middle" className="fill-white font-extrabold text-[10px] tracking-tight">HYBRID LIBRARY</text>
              </g>

              {/* Zone 4: Athletics */}
              <g className="cursor-pointer" onClick={() => setSelectedZone("Athletics")}>
                <rect x="250" y="190" width="110" height="70" rx="12" className={`transition-all duration-300 stroke-slate-200/40 ${selectedZone === "Athletics" ? 'fill-emerald-600' : 'fill-emerald-500/80 hover:fill-emerald-500'}`} />
                <text x="305" y="230" textAnchor="middle" className="fill-white font-extrabold text-[10px] tracking-tight">ATHLETICS POOL</text>
              </g>

            </svg>
          </div>

          {/* Map Zone Information Panel */}
          <div className="lg:col-span-5 space-y-4">
            {selectedZone ? (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/65 animate-fade-in space-y-3 shadow-inner">
                <span className={`inline-block text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full ${
                  selectedZone === "Admin" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20" :
                  selectedZone === "Science" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/20" :
                  selectedZone === "Library" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/20" :
                  "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20"
                }`}>
                  📍 {selectedZone === "Admin" ? "Administrative Zone" : selectedZone === "Science" ? "Experimental Laboratory" : selectedZone === "Library" ? "Academic Catalog" : "Sports Complex"}
                </span>
                
                <h4 className="text-base font-bold text-slate-850 dark:text-white">
                  {mapZones.find(z => z.id === selectedZone)?.name}
                </h4>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  {mapZones.find(z => z.id === selectedZone)?.desc}
                </p>

                <div className="border-t border-slate-100 dark:border-slate-850 pt-3 text-[10px] text-slate-400 space-y-1 font-mono">
                  <p>🔑 Access: <strong>Keycard Entry Required</strong></p>
                  <p>🕙 Hours: <strong>8:00 AM &ndash; 5:00 PM</strong></p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400">
                {lang === 'EN' ? 'Click any zone box in the campus map.' : 'Haga clic en una zona del mapa.'}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 4. FAQs Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5.5 h-5.5 text-blue-600" />
          {lang === 'EN' ? 'Frequently Asked Questions (FAQ)' : 'Preguntas Frecuentes'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-2 shadow-sm"
            >
              <h4 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white leading-snug">
                Q: {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
