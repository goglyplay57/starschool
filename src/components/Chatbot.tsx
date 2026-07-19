import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, Bot, AlertCircle, RefreshCw, X, ChevronDown, CheckCircle2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface ChatbotProps {
  lang: 'EN' | 'ES';
  isEmbedded?: boolean; // If true, render as a page view; if false, as a floating overlay
  onClose?: () => void;
}

export default function Chatbot({ lang, isEmbedded = true, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: lang === 'EN' 
        ? "Hello! Welcome to STAR SCHOOL. I am your Virtual AI assistant. Please choose a persona above or ask me anything!"
        : "¡Hola! Bienvenido a STAR SCHOOL. Soy su asistente virtual con IA. ¡Elija un rol arriba o pregúnteme lo que desee!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [role, setRole] = useState<'Counselor' | 'Mentor' | 'Helpdesk'>('Helpdesk');
  const [thinking, setThinking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Immersive Thinking Diagnostics State (for loading experience)
  const [thinkingStep, setThinkingStep] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Rotate thinking logs during Thinking Mode generation
  useEffect(() => {
    let interval: any;
    if (loading && thinking) {
      setThinkingStep(0);
      interval = setInterval(() => {
        setThinkingStep(prev => (prev + 1) % 4);
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [loading, thinking]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');
    setErrorMsg('');
    setLoading(true);

    const updatedMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(updatedMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          role,
          thinking
        })
      });

      if (!response.ok) {
        throw new Error('Chat API returned error state');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        lang === 'EN'
          ? "Failed to communicate with our AI engine. Make sure your GEMINI_API_KEY is configured in the secrets panel."
          : "Fallo al comunicar con la IA. Verifique que la clave GEMINI_API_KEY esté configurada en los secretos."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStepText = (step: number) => {
    if (lang === 'EN') {
      switch (step) {
        case 0: return "Invoking gemini-3.1-pro-preview reasoning model...";
        case 1: return "Analyzing STAR SCHOOL academic syllabus & historical policies...";
        case 2: return "Evaluating student enrollment & document prerequisites...";
        case 3: return "Formulating highly structured, personalized guidance outline...";
        default: return "Processing...";
      }
    } else {
      switch (step) {
        case 0: return "Invocando modelo de razonamiento gemini-3.1-pro-preview...";
        case 1: return "Analizando el plan de estudios y las políticas de STAR SCHOOL...";
        case 2: return "Evaluando los requisitos de matrícula del estudiante...";
        case 3: return "Formulando una respuesta estructurada y personalizada...";
        default: return "Procesando...";
      }
    }
  };

  return (
    <div className={`flex flex-col border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl ${
      isEmbedded ? 'w-full h-[650px]' : 'w-[400px] h-[580px] fixed bottom-6 right-6 z-50'
    }`}>
      
      {/* 1. Chatbot Header */}
      <div className="p-4 bg-blue-700 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
            <Bot className="w-5.5 h-5.5 text-white" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold flex items-center gap-1.5 leading-tight font-display">
              STAR SCHOOL AI Co-Pilot
              {thinking && <Sparkles className="w-4 h-4 text-yellow-350 animate-pulse" />}
            </h3>
            <p className="text-[9px] opacity-90 font-bold uppercase tracking-widest">
              {role === 'Counselor' ? (lang === 'EN' ? 'Admissions Counselor' : 'Asesor de Admisión') :
               role === 'Mentor' ? (lang === 'EN' ? 'Academic Mentor' : 'Mentor Académico') :
               (lang === 'EN' ? 'Helpdesk & Campus Clerk' : 'Mesa de Ayuda')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Thinking mode toggle pill */}
          <button
            onClick={() => setThinking(!thinking)}
            className={`px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 ${
              thinking 
                ? 'bg-yellow-400 text-black shadow font-black' 
                : 'bg-white/10 hover:bg-white/20 text-white font-bold'
            }`}
            title="Toggles gemini-3.1-pro-preview reasoning pipeline"
          >
            <Sparkles className="w-3 h-3 shrink-0" />
            {lang === 'EN' ? 'Thinking Level: High' : 'Modo Pensar'}
          </button>

          {!isEmbedded && onClose && (
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Persona Selector Bar */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/30 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between gap-2 shrink-0">
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {lang === 'EN' ? 'Assistant Role:' : 'Rol de Asistente:'}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setRole('Helpdesk')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              role === 'Helpdesk' 
                ? 'bg-blue-700/10 text-blue-700 dark:text-blue-400 font-extrabold' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {lang === 'EN' ? 'Helpdesk' : 'Ayuda'}
          </button>
          <button
            onClick={() => setRole('Counselor')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              role === 'Counselor' 
                ? 'bg-blue-700/10 text-blue-700 dark:text-blue-400 font-extrabold' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {lang === 'EN' ? 'Counselor' : 'Asesor'}
          </button>
          <button
            onClick={() => setRole('Mentor')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
              role === 'Mentor' 
                ? 'bg-blue-700/10 text-blue-700 dark:text-blue-400 font-extrabold' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {lang === 'EN' ? 'Academic Mentor' : 'Mentor'}
          </button>
        </div>
      </div>

      {/* 3. Messages Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-950/10">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm font-semibold leading-relaxed shadow-sm ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-850 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Thinking mode steps loading screen */}
        {loading && (
          <div className="space-y-3">
            {thinking && (
              <div className="p-3.5 rounded-2xl border border-yellow-200 dark:border-yellow-950/50 bg-yellow-50/30 dark:bg-yellow-950/10 space-y-2 animate-pulse max-w-[85%] rounded-tl-none">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
                  {lang === 'EN' ? 'Thinking Process Logs' : 'Bitácora de Pensamiento'}
                </div>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  &gt; {getStepText(thinkingStep)}
                </p>
              </div>
            )}

            <div className="flex justify-start">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-tl-none flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex gap-2 items-start font-bold">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 4. Chat Input Form */}
      <form onSubmit={handleSendMessage} className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-850 shrink-0 flex gap-2">
        <input
          type="text"
          disabled={loading}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            role === 'Counselor' ? (lang === 'EN' ? "Ask about tuition, forms, dates..." : "Pregunte sobre matrículas, requisitos...") :
            role === 'Mentor' ? (lang === 'EN' ? "Ask for studying syllabus or grades..." : "Pregunte sobre el plan de estudios...") :
            (lang === 'EN' ? "How can I help you today?" : "¿Cómo le puedo ayudar hoy?")
          }
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-850 dark:text-slate-100 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="w-10.5 h-10.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 flex items-center justify-center shrink-0 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
