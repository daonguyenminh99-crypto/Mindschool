import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RefreshCw, 
  ChevronDown, 
  ShieldCheck, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  PhoneCall,
  AlertTriangle
} from 'lucide-react';
import { ChatMessage, PageId } from '../types';
import { INITIAL_MESSAGES, sendChatMessageToAI } from '../utils/mindbotEngine';
import { MarkdownView } from './MarkdownView';
import { BRAND } from '../constants/branding';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (page: PageId) => void;
}

const CHAT_STORAGE_KEY = 'tramcamxuc_chat_history';
const LEGACY_CHAT_STORAGE_KEY = 'mindschool_chat_history';

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY) || localStorage.getItem(LEGACY_CHAT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      // Call real Gemini 3.8 Flash backend API with conversational context
      const botResponse = await sendChatMessageToAI(text, newHistory);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'mindbot',
        text: botResponse.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isCrisis: botResponse.isCrisis,
        suggestions: botResponse.suggestions,
        actionLink: botResponse.actionLink,
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('[Chatbot] Error receiving AI message:', err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'mindbot',
        text: 'Rất tiếc, đã có lỗi kết nối với máy chủ AI. Bạn hãy thử lại sau giây lát nhé.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      localStorage.removeItem(LEGACY_CHAT_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating launcher trigger button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#5B7CFA] to-[#7C6FF2] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
          aria-label="Mở trợ lý MindBot AI"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="font-semibold text-sm tracking-tight hidden sm:inline">Nói chuyện với MindBot AI</span>
          <span className="font-semibold text-sm tracking-tight sm:hidden">MindBot AI</span>
        </button>
      )}

      {/* Slide-in & Expandable Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ${
            isExpanded
              ? 'w-[calc(100vw-2rem)] sm:w-[680px] h-[720px] max-h-[92vh]'
              : 'w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh]'
          } bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5`}
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#5B7CFA] via-[#6B75F5] to-[#7C6FF2] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold shadow-inner">
                🧠
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#5B7CFA]" title="Trực tuyến"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base tracking-tight leading-tight flex items-center gap-2">
                  MindBot AI
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    Gemini 3.8
                  </span>
                </h3>
                <p className="text-[11px] text-white/85 leading-tight flex items-center gap-1.5 mt-0.5">
                  <span>Trợ lý AI · {BRAND.name}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Expand / Minimize Window */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Thu gọn cửa sổ' : 'Phóng to cửa sổ'}
                aria-label={isExpanded ? 'Thu gọn' : 'Phóng to'}
                className="hidden sm:inline-flex p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Reset Chat */}
              <button
                onClick={handleReset}
                title="Làm mới cuộc trò chuyện"
                aria-label="Làm mới cuộc trò chuyện"
                className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Close/Minimize */}
              <button
                onClick={onToggle}
                aria-label="Thu nhỏ MindBot"
                className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Privacy & Safety hotline notification bar */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">Bảo mật thông tin · {BRAND.name}</span>
            </div>
            <a
              href="tel:111"
              title="Tổng đài Quốc gia Bảo vệ Trẻ em (Miễn phí 24/7)"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-semibold text-[10px] hover:bg-rose-100 transition-colors shrink-0"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Tổng đài 111</span>
            </a>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40 dark:bg-slate-900/60">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Sender label and actions */}
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    {msg.sender === 'user' ? (
                      'Bạn'
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B7CFA]"></span>
                        <span>MindBot AI</span>
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>

                  {msg.sender === 'mindbot' && (
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      title="Sao chép nội dung"
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-1 p-0.5"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed max-w-[90%] sm:max-w-[85%] shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#5B7CFA] to-[#6B75F5] text-white rounded-tr-xs'
                      : msg.isCrisis
                      ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-slate-900 dark:text-slate-100 rounded-tl-xs'
                      : 'bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 rounded-tl-xs'
                  }`}
                >
                  {msg.isCrisis && (
                    <div className="flex items-center gap-2 mb-2 p-2 rounded-xl bg-rose-100/70 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 text-xs font-semibold">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Thông tin hỗ trợ khẩn cấp: Bạn không phải một mình</span>
                    </div>
                  )}

                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <MarkdownView content={msg.text} />
                  )}
                </div>

                {/* Crisis hotlines direct call bar if isCrisis */}
                {msg.isCrisis && (
                  <div className="mt-2.5 flex flex-wrap gap-2 max-w-[90%]">
                    <a
                      href="tel:111"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-md hover:bg-rose-700 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Gọi Tổng đài 111 (Miễn phí 24/7)</span>
                    </a>
                    <a
                      href="tel:115"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white font-semibold text-xs shadow-md hover:bg-amber-700 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Cấp cứu 115</span>
                    </a>
                  </div>
                )}

                {/* Optional action link */}
                {msg.actionLink && (
                  <button
                    onClick={() => {
                      onNavigate(msg.actionLink!.page);
                      onToggle();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B7CFA] hover:text-[#4364e8] bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-200/60 dark:border-blue-900 transition-colors shadow-xs"
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
                        disabled={isTyping}
                        className="text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#5B7CFA] hover:text-[#5B7CFA] dark:hover:text-[#8ea5fa] px-3 py-1.5 rounded-full transition-all text-left shadow-2xs hover:scale-102"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 py-2 px-1 animate-in fade-in">
                <div className="w-7 h-7 rounded-2xl bg-gradient-to-tr from-[#5B7CFA] to-[#7C6FF2] text-white flex items-center justify-center text-xs shadow-xs">
                  🧠
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  <span>MindBot đang suy nghĩ...</span>
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B7CFA] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B7CFA] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B7CFA] animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick topic shortcuts carousel above input */}
          <div className="px-3 py-2 bg-slate-50/90 dark:bg-slate-800/60 border-t border-slate-200/60 dark:border-slate-800 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
            {[
              { label: '📚 Giải bài tập & phương pháp', prompt: 'Hãy hướng dẫn mình phương pháp học tập hiệu quả để ôn thi.' },
              { label: '💻 Hướng dẫn lập trình', prompt: 'Giải thích khái niệm hàm (function) trong Python bằng ví dụ dễ hiểu.' },
              { label: '⏳ Quản lý thời gian', prompt: 'Làm thế nào để áp dụng kỹ thuật Pomodoro khi khối lượng bài tập quá nhiều?' },
              { label: '🌱 Giảm căng thẳng', prompt: 'Mình đang cảm thấy rất áp lực và lo lắng trước kỳ thi. Hãy gợi ý cách giải tỏa.' },
              { label: '🤝 Kỹ năng kết bạn', prompt: 'Làm thế nào để bắt chuyện và kết bạn tự nhiên trong lớp học mới?' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.prompt)}
                disabled={isTyping}
                className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#5B7CFA] hover:border-[#5B7CFA] px-3 py-1.5 rounded-xl transition-colors shrink-0 shadow-2xs font-medium"
              >
                {item.label}
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
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi, bài tập, code hoặc tâm sự cùng MindBot..."
              disabled={isTyping}
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs sm:text-sm px-4 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#5B7CFA]/50 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-[#5B7CFA] to-[#6B75F5] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all shadow-md shrink-0"
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
