import React, { useState } from 'react';
import { PageId, EmotionType, Article } from '../types';
import { EMOTIONS, QUICK_EMOTIONS } from '../data/emotionsData';
import { SCHOOL_ISSUES, ARTICLES_DATA } from '../data/articlesData';
import { saveCheckIn } from '../utils/storage';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Brain, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Check, 
  MessageSquare,
  Wind
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenArticle: (article: Article) => void;
  onOpenBreathing: () => void;
  onOpenChat: () => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenBreathing,
  onOpenChat,
  onShowToast
}) => {
  const [selectedEmotionId, setSelectedEmotionId] = useState<EmotionType>('anxious');
  const [hasSavedToday, setHasSavedToday] = useState(false);

  const selectedEmotion = EMOTIONS[selectedEmotionId];

  const handleSaveCheckIn = () => {
    saveCheckIn({
      dateStr: new Date().toISOString().split('T')[0],
      emotion: selectedEmotionId,
      intensity: 3,
      contextTag: 'Học tập',
      note: `Check-in cảm xúc: ${selectedEmotion.label}`
    });
    setHasSavedToday(true);
    onShowToast('Đã lưu check-in!', `Cảm xúc ${selectedEmotion.label} đã được ghi vào biểu đồ của bạn.`);
  };

  const handleIssueClick = (articleRef: string) => {
    const article = ARTICLES_DATA.find(a => a.id === articleRef);
    if (article) {
      onOpenArticle(article);
    } else {
      onNavigate('explore');
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      {/* 1. HERO SECTION (16:9 Aspect Ratio Friendly Canvas) */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                <span>🌱</span>
                <span>Không gian dành cho học sinh</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Bạn không cần phải <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#5B7CFA] via-[#7C6FF2] to-[#4CAF7D] bg-clip-text text-transparent">
                  ổn mọi lúc.
                </span>
              </h1>

              {/* Highlight line */}
              <p className="text-lg sm:text-xl font-semibold text-[#5B7CFA] dark:text-[#7C6FF2] leading-relaxed">
                Hiểu cảm xúc của mình là bước đầu tiên để chăm sóc bản thân.
              </p>

              {/* Body paragraph */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                MindSchool cung cấp kiến thức, kỹ năng và công cụ tương tác giúp học sinh hiểu bản thân, quản lý áp lực học tập và biết cách tìm kiếm sự hỗ trợ phù hợp trong một không gian an toàn, không phán xét.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('explore')}
                  className="px-6 py-3 rounded-2xl font-semibold text-sm text-white bg-[#5B7CFA] hover:bg-[#486be8] shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('emotion-checkin-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-2xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Check-in cảm xúc</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </button>

                <button
                  onClick={onOpenBreathing}
                  className="px-4 py-3 rounded-2xl font-medium text-xs text-[#5B7CFA] dark:text-[#7C6FF2] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors flex items-center gap-1.5"
                  title="Thực hành bài tập thở 4-4-4"
                >
                  <Wind className="w-4 h-4" />
                  <span>Tập thở 2 phút</span>
                </button>
              </div>
            </div>

            {/* Right Educational Illustration (SVG Native Vector Art) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none aspect-[16/11] rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-emerald-50 dark:from-slate-800/90 dark:via-indigo-950/30 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between shadow-xl overflow-hidden group">
                {/* Floating soft decorative blobs */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Illustration UI Mock - Speech Bubbles */}
                <div className="flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="text-base">💬</span>
                    <span>&quot;Cậu đang cảm thấy thế nào?&quot;</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-white px-2.5 py-1 rounded-xl text-[11px] font-bold shadow-xs">
                    <span>🌱 An tâm chia sẻ</span>
                  </div>
                </div>

                {/* Center Vector Visual: Students Study Desk Scene */}
                <div className="my-auto py-4 flex items-center justify-center relative z-10">
                  <svg
                    viewBox="0 0 380 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full max-w-[340px] drop-shadow-sm select-none"
                  >
                    {/* Desk Surface */}
                    <rect x="20" y="150" width="340" height="12" rx="6" fill="#CBD5E1" className="dark:fill-slate-700" />
                    <rect x="50" y="162" width="10" height="35" rx="3" fill="#94A3B8" className="dark:fill-slate-600" />
                    <rect x="320" y="162" width="10" height="35" rx="3" fill="#94A3B8" className="dark:fill-slate-600" />

                    {/* Potted Plant */}
                    <rect x="45" y="132" width="18" height="18" rx="4" fill="#F97316" />
                    <path d="M54 132 C48 118, 38 118, 44 110 C50 110, 54 122, 54 132 Z" fill="#22C55E" />
                    <path d="M54 132 C60 120, 70 120, 64 112 C58 112, 54 124, 54 132 Z" fill="#16A34A" />

                    {/* Books Stack */}
                    <rect x="290" y="138" width="45" height="12" rx="3" fill="#5B7CFA" />
                    <rect x="294" y="128" width="40" height="10" rx="2" fill="#7C6FF2" />
                    <rect x="298" y="120" width="35" height="8" rx="2" fill="#F2B84B" />

                    {/* Laptop on desk */}
                    <path d="M150 150 L140 120 L220 120 L210 150 Z" fill="#475569" className="dark:fill-slate-500" />
                    <rect x="145" y="124" width="70" height="24" rx="2" fill="#38BDF8" opacity="0.9" />
                    <rect x="130" y="148" width="100" height="4" rx="2" fill="#64748B" />

                    {/* Student 1 (Girl with glasses studying calmly) */}
                    <circle cx="110" cy="70" r="18" fill="#FBCFE8" />
                    <path d="M92 70 C92 52, 128 52, 128 70 C128 75, 120 73, 110 73 C100 73, 92 75, 92 70 Z" fill="#475569" />
                    <rect x="94" y="88" width="32" height="48" rx="10" fill="#5B7CFA" />
                    <circle cx="104" cy="70" r="4" fill="#1E293B" stroke="#FDE047" strokeWidth="1.5" />
                    <circle cx="116" cy="70" r="4" fill="#1E293B" stroke="#FDE047" strokeWidth="1.5" />
                    <path d="M108 70 L112 70" stroke="#FDE047" strokeWidth="1.5" />
                    <path d="M106 78 Q110 82 114 78" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Student 2 (Boy with smile and headphones) */}
                    <circle cx="250" cy="70" r="18" fill="#FED7AA" />
                    <path d="M232 65 C235 50, 265 50, 268 65 C268 70, 260 67, 250 67 C240 67, 232 70, 232 65 Z" fill="#78350F" />
                    <path d="M230 70 C230 50, 270 50, 270 70" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <rect x="229" y="65" width="4" height="10" rx="2" fill="#2563EB" />
                    <rect x="267" y="65" width="4" height="10" rx="2" fill="#2563EB" />
                    <rect x="234" y="88" width="32" height="48" rx="10" fill="#4CAF7D" />
                    <circle cx="244" cy="70" r="2.5" fill="#1E293B" />
                    <circle cx="256" cy="70" r="2.5" fill="#1E293B" />
                    <path d="M246 78 Q250 82 254 78" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Floating Heart & Smile Emotion Bubbles */}
                    <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                      <circle cx="180" cy="50" r="16" fill="#FFFFFF" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" className="dark:fill-slate-800" />
                      <text x="173" y="56" fontSize="14">✨</text>
                    </g>
                  </svg>
                </div>

                {/* Bottom interactive insight */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 z-10">
                  <span>Môi trường học đường lành mạnh</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Không phán xét</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Illustrated Statistics Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('emotion')}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#5B7CFA] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🧠
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
                <span>Hiểu cảm xúc</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#5B7CFA] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Nhận diện từng sắc thái: vui, buồn, lo lắng, tức giận. Nhận thức rằng mọi cảm xúc đều mang thông điệp cần được lắng nghe.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('skills')}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#7C6FF2] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
                <span>Quản lý áp lực</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#7C6FF2] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Trang bị kỹ năng phân bổ thời gian học, ôn thi thông minh và phục hồi năng lượng tinh thần để không bị kiệt sức.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('help')}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#4CAF7D] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
                <span>Kết nối hỗ trợ</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#4CAF7D] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Biết khi nào cần tìm sự giúp đỡ từ gia đình, giáo viên, phòng tư vấn tâm lý trường hoặc các đường dây nóng bảo vệ học sinh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: "BẠN ĐANG CẢM THẤY THẾ NÀO?" */}
      <section id="emotion-checkin-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Hôm nay bạn đang cảm thấy thế nào?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Không có cảm xúc nào là sai. Hãy bắt đầu bằng việc nhận diện chúng.
            </p>
          </div>

          {/* 8 Emotion Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {QUICK_EMOTIONS.map(emoId => {
              const emo = EMOTIONS[emoId];
              const isSelected = selectedEmotionId === emoId;
              return (
                <button
                  key={emo.id}
                  onClick={() => {
                    setSelectedEmotionId(emoId);
                    setHasSavedToday(false);
                  }}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#5B7CFA] bg-blue-50/70 dark:bg-blue-950/60 shadow-md scale-105 ring-2 ring-[#5B7CFA]/30'
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl transition-transform duration-200 hover:scale-125">
                    {emo.emoji}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {emo.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Emotion Detail Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 animate-in fade-in duration-150">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{selectedEmotion.emoji}</span>
                <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Bạn đang chọn: <span className="text-[#5B7CFA]">{selectedEmotion.label}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {selectedEmotion.description}
              </p>

              {/* Suggestions / Gợi ý */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Gợi ý chăm sóc bản thân:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedEmotion.copingTips.map((tip, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions for this emotion */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={handleSaveCheckIn}
                disabled={hasSavedToday}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#5B7CFA] hover:bg-[#486be8] disabled:opacity-60 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
              >
                {hasSavedToday ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Đã lưu vào nhật ký</span>
                  </>
                ) : (
                  <span>Lưu check-in hôm nay</span>
                )}
              </button>

              <button
                onClick={() => onNavigate('emotion')}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Khám phá thêm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: "KHÁM PHÁ TÂM LÝ HỌC ĐƯỜNG" (6 Large Problem Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#5B7CFA] dark:text-[#7C6FF2] mb-1">
                Chủ đề thường gặp
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Khám phá tâm lý học đường
              </h2>
            </div>
            <button
              onClick={() => onNavigate('explore')}
              className="text-xs sm:text-sm font-semibold text-[#5B7CFA] hover:text-[#4465e8] flex items-center gap-1.5 group self-start sm:self-auto"
            >
              <span>Xem tất cả bài viết</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOL_ISSUES.map(issue => (
              <div
                key={issue.id}
                onClick={() => handleIssueClick(issue.articleRef)}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {issue.number}
                    </span>
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: issue.accentColor }} 
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#5B7CFA] transition-colors mb-2">
                    {issue.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {issue.shortDesc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between text-xs font-semibold text-[#5B7CFA]">
                  <span>Tìm hiểu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION: QUIZ TEASER & INTERACTIVE SKILLS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quiz Teaser Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-blue-50 dark:from-slate-900 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Tự phản ánh bản thân
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Check-in tâm trạng 10 câu
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Chỉ mất 3 phút với 10 câu hỏi đơn giản để bạn tự nhìn nhận mức độ căng thẳng hiện tại. Công cụ tự phản ánh, không phải chẩn đoán y khoa.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('quiz')}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#7C6FF2] hover:bg-[#6c5ee0] shadow-xs active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>Bắt đầu bài check-in</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MindBot Teaser Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-50/60 dark:from-slate-900 dark:to-slate-800/80 border border-blue-100 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B7CFA]">
                Trợ lý học đường MindBot
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Cần một người lắng nghe ngay lúc này?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                MindBot luôn sẵn sàng 24/7 để chia sẻ về áp lực học tập, lo lắng trước kỳ thi hay mâu thuẫn với bạn bè một cách thấu cảm và bảo mật.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={onOpenChat}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#5B7CFA] hover:bg-[#486be8] shadow-xs active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nói chuyện với MindBot</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#5B7CFA] via-[#7C6FF2] to-[#5B7CFA] text-white text-center shadow-xl space-y-6 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Bạn không cần phải tự mình giải quyết mọi chuyện.
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Đôi khi chia sẻ với một người đáng tin cậy là bước đầu tiên rất quan trọng để tìm lại sự bình yên trong tâm trí.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('help')}
                className="px-6 py-3 rounded-2xl font-bold text-sm bg-white text-[#5B7CFA] hover:bg-slate-100 shadow-md active:scale-95 transition-all"
              >
                Tìm người hỗ trợ
              </button>
              <button
                onClick={() => onNavigate('skills')}
                className="px-6 py-3 rounded-2xl font-semibold text-sm bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-xs active:scale-95 transition-all"
              >
                Xem kỹ năng cân bằng
              </button>
            </div>
          </div>

          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
};
