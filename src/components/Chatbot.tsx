import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { ChatMessage, PageId } from '../types';
import { INITIAL_MESSAGES, generateBotReply } from '../utils/mindbotEngine';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (page: PageId) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('mindschool_chat_history');
      return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mindschool_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate thoughtful typing response
    setTimeout(() => {
      const botResponse = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'mindbot',
        text: botResponse.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        suggestions: botResponse.suggestions,
        actionLink: botResponse.actionLink
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('mindschool_chat_history');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#5B7CFA] to-[#7C6FF2] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
          aria-label="Mở trợ lý MindBot"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm tracking-tight hidden sm:inline">Nói chuyện với MindBot</span>
          <span className="font-semibold text-sm tracking-tight sm:hidden">MindBot</span>
        </button>
      )}

      {/* Slide-in Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[540px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#5B7CFA] to-[#7C6FF2] text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg font-bold">
                🧠
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-tight flex items-center gap-1.5">
                  MindBot
                  <span className="text-[10px] font-normal px-1.5 py-0.5 rounded-md bg-white/20 text-white/90">
                    Học đường
                  </span>
                </h3>
                <p className="text-[11px] text-white/80 leading-tight">Luôn lắng nghe & không phán xét</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Làm mới cuộc trò chuyện"
                aria-label="Làm mới cuộc trò chuyện"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                aria-label="Thu nhỏ MindBot"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Privacy & Educational notice pill */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">Hỗ trợ thông tin chung · Không thay thế chẩn đoán y tế</span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#5B7CFA] text-white rounded-br-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Optional action link */}
                {msg.actionLink && (
                  <button
                    onClick={() => {
                      onNavigate(msg.actionLink!.page);
                      onToggle();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B7CFA] hover:text-[#4364e8] bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-200/60 dark:border-blue-900 transition-colors"
                  >
                    <span>{msg.actionLink.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Optional quick follow-up chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="text-[11px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-[#5B7CFA] hover:text-[#5B7CFA] px-2.5 py-1 rounded-full transition-colors text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 py-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">
                  🧠
                </div>
                <span>MindBot đang nhập...</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions carousel above input */}
          <div className="px-3 py-1.5 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap">
            {[
              'Tôi đang stress vì học tập.',
              'Tôi đang lo trước kỳ thi.',
              'Tôi có mâu thuẫn với bạn.',
              'Tôi muốn quản lý thời gian.'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#5B7CFA] hover:border-[#5B7CFA] px-2.5 py-1 rounded-lg transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Input form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Chia sẻ với MindBot..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B7CFA]/50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-2xl bg-[#5B7CFA] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4a6ae0] transition-colors shrink-0"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
