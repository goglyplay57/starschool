import React, { useState, useEffect } from 'react';
import { Landmark, Users, ClipboardCheck, GraduationCap, DollarSign, ChevronRight, CheckCircle, MessageSquare, Plus, Bell, Printer, ShieldCheck, RefreshCw } from 'lucide-react';
import { Notice, AdmissionApplication, ContactInquiry } from '../types';

interface PortalsProps {
  lang: 'EN' | 'ES';
}

export default function PortalsSection({ lang }: PortalsProps) {
  const [activePortalTab, setActivePortalTab] = useState<'student' | 'parent' | 'teacher' | 'billing' | 'admin'>('student');

  // Admin Dashboard States
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);

  // Teacher Notice States
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'General' | 'Academic' | 'Exam' | 'Holiday' | 'Event'>('Academic');
  const [newNoticeUrgent, setNewNoticeUrgent] = useState(false);
  const [teacherSuccessMsg, setTeacherSuccessMsg] = useState('');

  // Online Fee States
  const [studentSearchId, setStudentSearchId] = useState('STU-2026-101');
  const [searchedStudent, setSearchedStudent] = useState('');
  const [invoiceSettleMsg, setInvoiceSettleMsg] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<any | null>(null);

  // Fetch applications & inquiries for Admin Dashboard
  const fetchAdminData = async () => {
    setAdminLoading(true);
    try {
      const appRes = await fetch('/api/admissions');
      const apps = await appRes.json();
      setApplications(apps);

      const inqRes = await fetch('/api/inquiries');
      const inqs = await inqRes.json();
      setInquiries(inqs);
    } catch (err) {
      console.error(err);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    if (activePortalTab === 'admin') {
      fetchAdminData();
    }
  }, [activePortalTab]);

  // Handle Application Approval/Rejection on backend
  const handleApproveStatus = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Refresh local dashboard state
        setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle inquiry status reply toggle
  const handleInquiryStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Unread' ? 'Replied' : 'Unread';
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus as any } : i));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Teacher adding Notice on backend
  const handleTeacherNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) {
      alert("Please complete notice fields.");
      return;
    }

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newNoticeTitle,
          content: newNoticeContent,
          category: newNoticeCategory,
          isUrgent: newNoticeUrgent
        })
      });

      if (res.ok) {
        setTeacherSuccessMsg(lang === 'EN' ? "Announcement published to Notice Board in real-time!" : "¡Anuncio publicado en tiempo real!");
        setNewNoticeTitle('');
        setNewNoticeContent('');
        setNewNoticeUrgent(false);
        setTimeout(() => setTeacherSuccessMsg(''), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Online Tuition payment settlement
  const handleTuitionPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber) {
      alert("Please enter billing card credentials.");
      return;
    }

    const matchedId = studentSearchId.trim().toUpperCase();
    const mockReceipt = {
      receiptNumber: `REC-${Math.floor(500000 + Math.random() * 500000)}`,
      studentId: matchedId,
      amountPaid: "$4,500.00",
      invoiceDetail: "Fall Term 2026 Tuition Settlement",
      datePaid: new Date().toISOString().split("T")[0],
      clearingChannel: "Authorized Visa / MasterCard Credit Channel",
      hash: Math.random().toString(36).substring(2, 10).toUpperCase()
    };

    setPaymentSuccessReceipt(mockReceipt);
    setCardName('');
    setCardNumber('');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'EN' ? 'Governing Portals & Billing Intranets' : 'Portales Académicos y Facturación'}
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {lang === 'EN'
            ? 'Access customized student, parent, or instructor panels. Safely pay tuition balances, submit notices, or evaluate admissions.'
            : 'Acceda a paneles personalizados para estudiantes, padres o instructores. Pague matrículas y administre registros.'}
        </p>
      </div>

      {/* 2. Portal Switch Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {[
          { id: 'student', label: lang === 'EN' ? 'Student Portal' : 'Estudiante', icon: GraduationCap },
          { id: 'parent', label: lang === 'EN' ? 'Parent Portal' : 'Padres', icon: Users },
          { id: 'teacher', label: lang === 'EN' ? 'Teacher Terminal' : 'Docente', icon: ClipboardCheck },
          { id: 'billing', label: lang === 'EN' ? 'Online Payment' : 'Pago de Tasas', icon: DollarSign },
          { id: 'admin', label: lang === 'EN' ? 'Admin Dashboard' : 'Administrador', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePortalTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activePortalTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Render panels */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-8 rounded-3xl min-h-[350px]">
        
        {/* ================= STUDENT PORTAL PANEL ================= */}
        {activePortalTab === 'student' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Student Intranet Panel' : 'Panel de Estudiantes'}</h3>
                <p className="text-xs text-slate-400 font-mono">Active Student: Benjamin Miller (ID: STU-2026-101)</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">● Online</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1">⏰ {lang === 'EN' ? 'Today’s Lectures' : 'Clases de Hoy'}</h4>
                <div className="space-y-2 text-xs font-semibold text-slate-500">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850">
                    <p className="text-slate-800 dark:text-white font-bold">Advanced Computer Science (Python/AI)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">08:15 AM &ndash; 09:45 AM | Lab 3A (Vance)</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850">
                    <p className="text-slate-800 dark:text-white font-bold">AP Physics & experiment practicals</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">10:00 AM &ndash; 11:30 AM | Science Wing (Higgins)</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1">📝 {lang === 'EN' ? 'Upcoming Assignments' : 'Tareas Pendientes'}</h4>
                <div className="space-y-2 text-xs font-semibold text-slate-500">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-250 flex justify-between items-center">
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-white">World History Essay</p>
                      <p className="text-[10px] text-red-500 mt-0.5">Due: Tomorrow, 11:59 PM</p>
                    </div>
                    <span className="text-[9px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-mono">20%</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-250 flex justify-between items-center">
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-white">Math Calculus Chapter 4 Quiz</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Scheduled: Friday</p>
                    </div>
                    <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono">10%</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1">📊 {lang === 'EN' ? 'Co-Curricular Marks' : 'Rendimiento'}</h4>
                <div className="space-y-2.5 text-xs font-bold text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Library Attended ratio:</span>
                    <span>94%</span>
                  </div>
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-400">Robotics Guild streaks:</span>
                    <span className="text-emerald-500">12 Days Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">TPA assembly codes:</span>
                    <span>Authorized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PARENT PORTAL PANEL ================= */}
        {activePortalTab === 'parent' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Parent Guardian Intranet' : 'Intranet de Padres'}</h3>
                <p className="text-xs text-slate-400 font-mono">Welcome Guardian: Robert Miller | Child linked: Benjamin Miller (Grade 9)</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">● Sync Active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 p-6 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                <h4 className="font-bold text-slate-850 dark:text-white">📈 {lang === 'EN' ? 'Child Evaluation Analytics' : 'Progreso de Estudiante'}</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400">93.4%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Average Midterm Grade</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">96.0%</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Daily Attendance Ratio</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border">
                    <div className="text-2xl font-black text-purple-600 dark:text-purple-400">0 pending</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Absences or Warnings</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-950 text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
                  💡 <strong>Advisor Note:</strong> Benjamin Miller is performing exceptionally in mathematics and AP chemistry blocks. His project submission for the robotic guild science showcase was approved with distinction.
                </div>
              </div>

              <div className="md:col-span-4 p-6 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                <h4 className="font-bold text-slate-850 dark:text-white">🔔 {lang === 'EN' ? 'Direct Notices' : 'Notificaciones Directas'}</h4>
                <div className="space-y-3 text-xs text-slate-500">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 flex gap-2.5 items-start">
                    <Bell className="w-4 h-4 text-orange-600 shrink-0 mt-0.5 animate-bounce" />
                    <div>
                      <p className="text-slate-800 dark:text-white font-extrabold">Notice: Settle Fall Term tuition</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Please settle remaining term tuition by October 1st.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-800 dark:text-white font-extrabold">TPA Saturday Conference RSVP</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Robert Miller confirmed attendance for Saturday conference.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TEACHER TERMINAL PANEL ================= */}
        {activePortalTab === 'teacher' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Teacher Terminal Workspace' : 'Consola de Profesores'}</h3>
                <p className="text-xs text-slate-400 font-mono">Logged Teacher: Prof. Clara Higgins (Chemistry Department Chair)</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">● Active Session</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Action Form: Post announcements */}
              <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                <h4 className="font-bold text-slate-850 dark:text-white flex items-center gap-1.5">
                  <Plus className="w-5 h-5 text-blue-600" />
                  {lang === 'EN' ? 'Publish notice to school bulletin board' : 'Publicar Anuncio al Mural'}
                </h4>

                {teacherSuccessMsg && (
                  <p className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl animate-pulse">
                    {teacherSuccessMsg}
                  </p>
                )}

                <form onSubmit={handleTeacherNoticeSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400">{lang === 'EN' ? 'Announcement Title' : 'Título del Anuncio'}</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Science Wing Chemistry Lab closed for updates"
                        value={newNoticeTitle}
                        onChange={(e) => setNewNoticeTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400">{lang === 'EN' ? 'Category' : 'Categoría'}</label>
                      <select
                        value={newNoticeCategory}
                        onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none"
                      >
                        <option value="Academic">Academic</option>
                        <option value="General">General</option>
                        <option value="Exam">Exam</option>
                        <option value="Holiday">Holiday</option>
                        <option value="Event">Event</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">{lang === 'EN' ? 'Notice Description' : 'Descripción'}</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Input core announcement details..."
                      value={newNoticeContent}
                      onChange={(e) => setNewNoticeContent(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-350 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newNoticeUrgent}
                      onChange={(e) => setNewNoticeUrgent(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 border-slate-300"
                    />
                    <span>{lang === 'EN' ? 'Flag this Notice as URGENT (displays highlight banner)' : 'Marcar este anuncio como URGENTE'}</span>
                  </label>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all cursor-pointer shadow"
                    >
                      {lang === 'EN' ? 'Publish Announcement' : 'Publicar Anuncio'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Action: Quick grades checklist */}
              <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                <h4 className="font-bold text-slate-850 dark:text-white">📋 {lang === 'EN' ? 'Quick Grading Registry' : 'Registro de Calificaciones'}</h4>
                <div className="space-y-3 text-xs text-slate-500">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border flex justify-between items-center">
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-white">Clara Higgins Science Lab 2</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">8 Students submitted draft reports</p>
                    </div>
                    <button className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">Grade</button>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border flex justify-between items-center">
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-white">Grade 9 Chemistry Midterm</p>
                      <p className="text-[10px] text-emerald-500 font-bold mt-0.5">✓ All grades posted and sync’d</p>
                    </div>
                    <button className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-500 rounded-lg" disabled>Done</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= ONLINE FEE PAYMENT PORTAL ================= */}
        {activePortalTab === 'billing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Tuition & Fees Billing Portal' : 'Pagos de Matrícula en Línea'}</h3>
                <p className="text-xs text-slate-400 font-mono">Secure TLS 1.3 encrypted payments clearing gateway</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">● Encrypted</span>
            </div>

            {paymentSuccessReceipt ? (
              <div className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-950 bg-emerald-50/40 dark:bg-emerald-950/20 text-center space-y-4 max-w-xl mx-auto animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                    {lang === 'EN' ? 'Payment Settle Approved!' : '¡Pago Procesado con Éxito!'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    Transaction Cleared. Find your print-ready receipt details below.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border text-left text-xs font-mono font-bold text-slate-700 dark:text-slate-350 space-y-3 shadow-inner max-w-md mx-auto">
                  <div className="text-center border-b border-dashed pb-3">
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{paymentSuccessReceipt.invoiceDetail}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Receipt Hash: #{paymentSuccessReceipt.hash}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex justify-between"><span>Student ID:</span> <strong className="text-slate-900 dark:text-white">{paymentSuccessReceipt.studentId}</strong></p>
                    <p className="flex justify-between"><span>Amount Settled:</span> <strong className="text-blue-600 dark:text-blue-400">{paymentSuccessReceipt.amountPaid}</strong></p>
                    <p className="flex justify-between"><span>Settle Date:</span> <strong>{paymentSuccessReceipt.datePaid}</strong></p>
                    <p className="flex justify-between"><span>Clearing Gate:</span> <strong className="text-[10px] uppercase">{paymentSuccessReceipt.clearingChannel}</strong></p>
                  </div>
                  <div className="border-t border-dashed pt-3 text-center text-[10px] text-slate-400 leading-relaxed font-sans">
                    Thank you for supporting STAR SCHOOL Educational foundations.<br />
                    STAR SCHOOL Registrar, CA.
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-extrabold flex items-center justify-center gap-1"
                  >
                    <Printer className="w-4 h-4" />
                    {lang === 'EN' ? 'Print Receipt' : 'Imprimir Recibo'}
                  </button>
                  <button
                    onClick={() => setPaymentSuccessReceipt(null)}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
                  >
                    {lang === 'EN' ? 'Clear & Done' : 'Cerrar'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Billing details */}
                <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                  <h4 className="font-bold text-slate-850 dark:text-white">{lang === 'EN' ? '1. Pending Term Invoices' : '1. Facturas de Matrícula'}</h4>
                  
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border flex justify-between items-center text-xs">
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-white">Annual Tuition (Term 1 Balance)</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Invoice ID: #INV-0019</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-red-500">$4,500.00</p>
                      <p className="text-[8px] text-slate-400 uppercase font-bold">Unpaid</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border flex justify-between items-center text-xs opacity-60">
                    <div>
                      <p className="font-extrabold text-slate-800 dark:text-white">Activity fees & materials</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Invoice ID: #INV-0011</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-emerald-500">$350.00</p>
                      <p className="text-[8px] text-emerald-500 uppercase font-bold">✓ Settle Settle</p>
                    </div>
                  </div>
                </div>

                {/* Right Settle Form */}
                <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                  <h4 className="font-bold text-slate-850 dark:text-white">{lang === 'EN' ? '2. Billing settlement credentials' : '2. Credenciales de Facturación'}</h4>
                  
                  <form onSubmit={handleTuitionPaymentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">{lang === 'EN' ? 'Linked Student ID' : 'ID del Estudiante'}</label>
                        <input
                          type="text"
                          required
                          value={studentSearchId}
                          onChange={(e) => setStudentSearchId(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">{lang === 'EN' ? 'Select Invoice' : 'Seleccionar Factura'}</label>
                        <select className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-850 dark:text-white text-xs font-semibold focus:outline-none">
                          <option value="tuition">Annual Tuition (Term 1) &ndash; $4,500.00</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400">{lang === 'EN' ? 'Cardholder Full Name' : 'Nombre en la Tarjeta'}</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Robert Miller"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">{lang === 'EN' ? 'Credit Card Number' : 'Número de Tarjeta'}</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">CVV / Exp</label>
                        <input
                          type="text"
                          required
                          placeholder="123 | 12/29"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-white text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all cursor-pointer shadow"
                      >
                        {lang === 'EN' ? 'Authorize Payment Settlement' : 'Autorizar Pago de Tasas'}
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ================= ADMIN OPERATIONAL DASHBOARD ================= */}
        {activePortalTab === 'admin' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang === 'EN' ? 'Admin Operational Command Console' : 'Consola de Comando Administrativo'}</h3>
                <p className="text-xs text-slate-400 font-mono">Governing Director session: Registrar Office Level 4 (Accredited Clearance)</p>
              </div>
              <button
                onClick={fetchAdminData}
                disabled={adminLoading}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-white"
                title="Refresh database"
              >
                <RefreshCw className={`w-4 h-4 ${adminLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Admin Column: Admissions Applications */}
              <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                <h4 className="font-bold text-slate-850 dark:text-white flex items-center gap-1">📁 {lang === 'EN' ? 'Submitted Admissions Applications' : 'Solicitudes de Admisión Recibidas'}</h4>
                
                {applications.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No admissions applications logged in session.</p>
                ) : (
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {applications.map((app) => (
                      <div key={app.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border text-xs space-y-3">
                        <div className="flex justify-between items-start border-b pb-2">
                          <div>
                            <p className="font-extrabold text-slate-800 dark:text-white">{app.studentName}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{app.id} | {app.gradeApplied}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                            app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                            app.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                          }`}>{app.status}</span>
                        </div>
                        
                        <div className="space-y-1 text-slate-500 font-semibold text-[10px]">
                          <p>Guardian: <span className="text-slate-850 dark:text-white">{app.guardianName}</span></p>
                          <p>Email: <span>{app.email}</span> | Phone: <span>{app.phone}</span></p>
                          <p>Previous School: <span>{app.previousSchool}</span></p>
                        </div>

                        {app.status === 'Pending' && (
                          <div className="flex gap-2 justify-end pt-1">
                            <button
                              onClick={() => handleApproveStatus(app.id, 'Rejected')}
                              className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[10px]"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveStatus(app.id, 'Approved')}
                              className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold text-[10px]"
                            >
                              Approve
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Admin Column: Contact form Inquiries */}
              <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-150 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                <h4 className="font-bold text-slate-850 dark:text-white flex items-center gap-1">📨 {lang === 'EN' ? 'Contact Form Inquiries' : 'Mensajes de Consultas Recibidos'}</h4>
                
                {inquiries.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No inquiry logs registered.</p>
                ) : (
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border text-xs space-y-2.5">
                        <div className="flex justify-between items-start border-b pb-2">
                          <div>
                            <p className="font-extrabold text-slate-800 dark:text-white">{inq.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{inq.email} | {inq.date}</p>
                          </div>
                          <button
                            onClick={() => handleInquiryStatus(inq.id, inq.status)}
                            className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                              inq.status === 'Replied' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                            }`}
                          >
                            {inq.status}
                          </button>
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 dark:text-white">Subject: {inq.subject}</p>
                          <p className="text-slate-450 dark:text-slate-400 italic font-semibold leading-relaxed mt-1 text-[11px]">"{inq.message}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
