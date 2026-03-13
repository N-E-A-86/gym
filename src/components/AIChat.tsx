import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatWithCoach } from '../services/gemini';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu Coach Gym. ¿En qué puedo ayudarte hoy con tu entrenamiento o biometría?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await chatWithCoach(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'Lo siento, no pude procesar tu solicitud.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error al conectar con el coach. Por favor, intenta de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center gap-4">
        <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </div>
        <div>
          <h3 className="text-xl font-bold">Coach Gym</h3>
          <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            En línea • Experto en Biometría
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user'
              ? 'bg-primary text-white rounded-tr-none'
              : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
              }`}>
              <div className="markdown-body text-sm leading-relaxed">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex gap-2">
              <span className="size-2 rounded-full bg-slate-500 animate-bounce"></span>
              <span className="size-2 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="size-2 rounded-full bg-slate-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre tu volumen, fatiga o rutinas..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white size-12 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
