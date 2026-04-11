import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { sendChatMessage } from '../service/chatService.js';

const QUICK_CHIPS = ['Projects', 'Skills', 'Contact', 'About me'];

const INITIAL_MESSAGE = {
  text: "Hi! I'm your portfolio assistant. Ask me about projects, skills, or contact info.",
  sender: 'bot',
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;

    setInput('');
    setMessages((prev) => [...prev, { text: msg, sender: 'user' }]);
    setIsTyping(true);

    try {
      const reply = await sendChatMessage(msg);
      setMessages((prev) => [...prev, { text: reply, sender: 'bot' }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't reach the server. Please try again.", sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
          <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 shadow-sm whitespace-nowrap">
            Need help exploring the portfolio?
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition"
          >
            <MessageCircle size={24} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#46d369] rounded-full border-2 border-white" />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-700">

          {/* Header */}
          <div className="bg-[#141414] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Portfolio Assistant</p>
              <p className="text-[11px] text-[#46d369] flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#46d369] inline-block" />
                Online
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X size={14} className="text-gray-400" />
            </button>
          </div>

          {/* Quick chips */}
          <div className="flex gap-2 flex-wrap px-3 py-2.5 border-b border-gray-700 bg-[#1a1a1a] flex-shrink-0">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-[11px] px-3 py-1 rounded-full border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 bg-transparent transition whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#141414] px-3.5 py-3 flex flex-col gap-2.5 scrollbar-hide">
            <p className="text-[10px] text-gray-600 text-center">Today</p>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0
                    ${msg.sender === 'bot' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}
                >
                  {msg.sender === 'bot' ? 'P' : 'U'}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[76%] px-3.5 py-2.5 text-[13px] leading-relaxed
                    ${msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-2xl rounded-br-[4px]'
                      : 'bg-[#2a2a2a] text-gray-200 rounded-2xl rounded-bl-[4px] border border-gray-700'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">
                  P
                </div>
                <div className="bg-[#2a2a2a] border border-gray-700 rounded-2xl rounded-bl-[4px] px-4 py-3 flex gap-1.5 items-center">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-500"
                      style={{ animation: `chatbotBlink 1.2s ${delay}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-[#1a1a1a] border-t border-gray-700 px-3 py-3 flex-shrink-0">
            <div className="flex items-center gap-2 bg-[#2a2a2a] rounded-full border border-gray-600 px-4 py-1.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me something…"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={isTyping || !input.trim()}
                className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center flex-shrink-0 transition disabled:opacity-40"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
            <p className="text-[10px] text-gray-700 text-center mt-2">Powered by Portfolio AI</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatbotBlink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>
    </>
  );
}