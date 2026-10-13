import React, { useState, useMemo } from 'react';
import { PageId, Article } from '../types';
import { 
  LISTENING_TOPICS, 
  LISTENING_QUESTIONS, 
  INSPIRING_CLOSING_MESSAGE,
  ListeningTopicInfo
} from '../data/listeningCornerData';
import { ARTICLES_DATA } from '../data/articlesData';
import { 
  HeartHandshake, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  PhoneCall, 
  AlertCircle, 
  ShieldCheck, 
  Users, 
  Home, 
  ShieldAlert, 
  BookOpen, 
  Wrench, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
  GraduationCap,
  Layers,
  HelpCircle
} from 'lucide-react';
import { BRAND } from '../constants/branding';

interface ListeningCornerPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenArticle: (article: Article) => void;
  onOpenChat: () => void;
  onShowToast: (title: string, desc?: string) => void;
}

type ContentFormatFilter = 'all' | 'articles' | 'qa';

export const ListeningCornerPage: React.FC<ListeningCornerPageProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenChat,
  onShowToast
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<ContentFormatFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'friendship-make-friends-new-school': true,
    'family-expectations-pressure': true,
    'mental-health-self-harm-crisis': true
  });
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // Map article categories to topicId for unified filtering
  const getArticleTopicId = (category: Article['category']): string => {
    switch (category) {
      case 'Học tập': return 'academic';
      case 'Bạn bè': return 'friendship';
      case 'Gia đình': return 'family';
      case 'Cảm xúc': return 'mental-health';
      case 'Kỹ năng': return 'friendship';
      default: return 'all';
    }
  };

  // Filter Articles
  const filteredArticles = useMemo(() => {
    if (formatFilter === 'qa') return [];

    return ARTICLES_DATA.filter(art => {
      const artTopic = getArticleTopicId(art.category);
      const matchTopic = selectedTopicId === 'all' || artTopic === selectedTopicId;

      const qLower = searchQuery.toLowerCase().trim();
      if (!qLower) return matchTopic;

      const matchText = 
        art.title.toLowerCase().includes(qLower) ||
        art.shortDescription.toLowerCase().includes(qLower) ||
        art.category.toLowerCase().includes(qLower) ||
        art.fullContent.some(p => p.toLowerCase().includes(qLower));

      return matchTopic && matchText;
    });
  }, [selectedTopicId, formatFilter, searchQuery]);

  // Filter Questions
  const filteredQuestions = useMemo(() => {
    if (formatFilter === 'articles') return [];

    return LISTENING_QUESTIONS.filter(q => {
      const matchTopic = selectedTopicId === 'all' || q.topicId === selectedTopicId;
      const qLower = searchQuery.toLowerCase().trim();
      if (!qLower) return matchTopic;

      const matchText = 
        q.question.toLowerCase().includes(qLower) ||
        q.summary.toLowerCase().includes(qLower) ||
        q.fullAnswer.lead.toLowerCase().includes(qLower) ||
        (q.fullAnswer.bulletPoints && q.fullAnswer.bulletPoints.some(b => 
          b.title.toLowerCase().includes(qLower) || b.desc.toLowerCase().includes(qLower)
        )) ||
        (q.fullAnswer.copyableScript && q.fullAnswer.copyableScript.text.toLowerCase().includes(qLower));

      return matchTopic && matchText;
    });
  }, [selectedTopicId, formatFilter, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredQuestions.forEach(q => {
      allExpanded[q.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const handleCopyScript = (scriptText: string, scriptId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(scriptText);
      setCopiedScriptId(scriptId);
      onShowToast('Đã sao chép câu gợi ý!', 'Bạn có thể dán vào tin nhắn hoặc dùng làm lời mở đầu khi nói chuyện.');
      setTimeout(() => {
        setCopiedScriptId(null);
      }, 2500);
    }
  };

  const getTopicIcon = (topicId: string) => {
    switch (topicId) {
      case 'academic':
        return <GraduationCap className="w-4 h-4 text-[#5B7CFA]" />;
      case 'friendship':
        return <Users className="w-4 h-4 text-emerald-500" />;
      case 'family':
        return <Home className="w-4 h-4 text-[#7C6FF2]" />;
      case 'mental-health':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      default:
        return <HeartHandshake className="w-4 h-4 text-[#5B7CFA]" />;
    }
  };

  const totalResults = filteredArticles.length + filteredQuestions.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. HERO BANNER */}
      <section className="relative rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-purple-50/60 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#5B7CFA]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#7C6FF2]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-[#5B7CFA] dark:text-[#7C6FF2] border border-blue-200/60 dark:border-slate-700 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
            <span>{BRAND.name} · Chuyên mục Lắng nghe &amp; Khám phá</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Trạm Cảm Xúc <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#5B7CFA] via-[#7C6FF2] to-rose-500 bg-clip-text text-transparent">
              – Lắng nghe bạn
            </span>
          </h1>

          <p className="text-base sm:text-lg font-semibold text-[#5B7CFA] dark:text-[#7C6FF2] italic">
            &quot;{BRAND.slogan}&quot;
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Không gian thống nhất giúp bạn hiểu rõ cảm xúc, tìm hiểu các bài viết tâm lý học đường chuyên sâu, tháo gỡ khó khăn về bạn bè, gia đình, thi cử, kèm các mẫu câu gợi ý giao tiếp và chỉ dẫn an toàn khi quá tải.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#sos-urgent-section"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-rose-600 hover:bg-rose-700 shadow-xs active:scale-95 transition-all flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Em cần hỗ trợ ngay</span>
            </a>

            <button
              onClick={onOpenChat}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs active:scale-95 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#5B7CFA]" />
              <span>Trò chuyện cùng MindBot</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. KHỐI "EM CẦN HỖ TRỢ NGAY" (URGENT / SAFETY SOS BOX) */}
      <section
        id="sos-urgent-section"
        className="rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-900/80 p-6 sm:p-8 shadow-sm space-y-6 scroll-mt-24"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200/70 dark:border-rose-900/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Hỗ trợ khẩn cấp & An toàn
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Em đang cảm thấy quá tải hoặc không an toàn?
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="tel:111"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Gọi Tổng đài 111 (Miễn phí 24/7)</span>
            </a>
            <a
              href="tel:115"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-800 dark:text-rose-200 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 hover:bg-rose-50 transition-colors"
            >
              <span>Cấp cứu: 115</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-300">
              4 Bước quan trọng để bảo vệ bản thân lúc này:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span><strong>Nói ngay với người lớn đáng tin:</strong> Cha mẹ, thầy cô chủ nhiệm, anh chị hoặc người thân gần nhất.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span><strong>Đến nơi an toàn:</strong> Tránh xa những vật dụng nguy hiểm và ở tại nơi có người xung quanh.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span><strong>Nếu đang gặp nguy hiểm tức thời hoặc đã bị thương:</strong> Đến ngay cơ sở y tế gần nhất hoặc gọi cấp cứu 115.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span><strong>Gọi Tổng đài quốc gia 111:</strong> Luôn có người lắng nghe, tư vấn và can thiệp bảo vệ em 24/24.</span>
              </li>
            </ul>
          </div>

          {/* Copyable emergency cry-for-help script */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Nếu chưa biết mở lời thế nào, hãy dùng câu này:
              </span>
              <button
                onClick={() => handleCopyScript('Dạo này em cảm thấy không ổn. Em đang gặp những suy nghĩ khiến em lo sợ và em cần một người ở bên giúp đỡ.', 'sos-script')}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors"
                title="Sao chép câu này"
              >
                {copiedScriptId === 'sos-script' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 italic p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
              &quot;Dạo này em cảm thấy không ổn. Em đang gặp những suy nghĩ khiến em lo sợ và em cần một người ở bên giúp đỡ.&quot;
            </p>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              💡 <em>Em không cần phải giải thích mọi chuyện thật hoàn hảo mới xứng đáng được giúp đỡ.</em>
            </p>
          </div>
        </div>
      </section>

      {/* 3. TÌM KIẾM, BỘ LỌC CHỦ ĐỀ & ĐỊNH DẠNG NỘI DUNG */}
      <section className="space-y-6">
        {/* Search & Topic Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Format Filter (Segmented control) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/70 dark:border-slate-800">
              <button
                onClick={() => setFormatFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  formatFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-[#5B7CFA] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tất cả ({ARTICLES_DATA.length + LISTENING_QUESTIONS.length})</span>
              </button>

              <button
                onClick={() => setFormatFilter('articles')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  formatFilter === 'articles'
                    ? 'bg-white dark:bg-slate-900 text-[#5B7CFA] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bài viết chuyên sâu ({ARTICLES_DATA.length})</span>
              </button>

              <button
                onClick={() => setFormatFilter('qa')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  formatFilter === 'qa'
                    ? 'bg-white dark:bg-slate-900 text-[#5B7CFA] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Hỏi – đáp & Tình huống ({LISTENING_QUESTIONS.length})</span>
              </button>
            </div>

            {/* Global Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết, câu hỏi (áp lực, thi cử, bạn bè...)"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7CFA]/50"
              />
            </div>
          </div>

          {/* Topic Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {LISTENING_TOPICS.map(topic => {
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#5B7CFA] text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  {topic.id !== 'all' && getTopicIcon(topic.id)}
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick jump Table of Contents (Mục lục nhanh) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <BookOpen className="w-4 h-4 text-[#5B7CFA]" />
              <span>Nội dung đang hiển thị ({totalResults})</span>
            </div>
            {filteredQuestions.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={expandAll}
                  className="text-xs text-[#5B7CFA] hover:underline font-medium"
                >
                  Mở rộng tất cả Q&A
                </button>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <button
                  onClick={collapseAll}
                  className="text-xs text-slate-500 hover:underline font-medium"
                >
                  Thu gọn tất cả
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {filteredArticles.map(art => (
              <button
                key={art.id}
                onClick={() => onOpenArticle(art)}
                className="text-xs px-3 py-1.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 hover:bg-blue-100 text-[#5B7CFA] dark:text-[#7C6FF2] border border-blue-200/60 dark:border-blue-900 transition-colors truncate max-w-xs sm:max-w-md text-left flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{art.title}</span>
              </button>
            ))}

            {filteredQuestions.map((q, idx) => (
              <a
                key={q.id}
                href={`#question-${q.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedIds(prev => ({ ...prev, [q.id]: true }));
                  const el = document.getElementById(`question-${q.id}`);
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-[#7C6FF2] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 transition-colors truncate max-w-xs sm:max-w-md"
              >
                <HelpCircle className="w-3.5 h-3.5 inline mr-1 text-[#7C6FF2]" />
                <span className="truncate">{q.question}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PHẦN BÀI VIẾT CHUYÊN SÂU (EDUCATIONAL ARTICLES FROM KHÁM PHÁ) */}
      {filteredArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B7CFA]">
                Tri thức & Nghiên cứu tâm lý
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#5B7CFA]" />
                Bài viết chuyên sâu ({filteredArticles.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Nhấp để đọc toàn bộ luận điểm & gợi ý
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                    <span className="font-semibold text-[#5B7CFA] dark:text-[#7C6FF2]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#5B7CFA] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {article.shortDescription}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{article.author}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B7CFA] group-hover:text-[#4363e8]">
                    <span>Đọc bài</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PHẦN HỎI – ĐÁP & TÌNH HUỐNG (Q&A ACCORDIONS WITH COMMUNICATION SCRIPTS) */}
      {filteredQuestions.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C6FF2]">
                Tình huống thực tế & Gợi ý xử lý
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#7C6FF2]" />
                Góc hỏi – đáp & Tình huống ({filteredQuestions.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Có sẵn mẫu câu gợi ý giao tiếp
            </span>
          </div>

          <div className="space-y-6">
            {filteredQuestions.map((item, index) => {
              const isExpanded = !!expandedIds[item.id];
              const isUrgent = !!item.fullAnswer.isUrgent;

              return (
                <article
                  key={item.id}
                  id={`question-${item.id}`}
                  className={`rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-xs scroll-mt-24 ${
                    isUrgent 
                      ? 'border-rose-300 dark:border-rose-900/80 ring-1 ring-rose-200 dark:ring-rose-950' 
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Clickable Accordion Bar */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="flex items-center gap-1.5 text-[#5B7CFA] dark:text-[#7C6FF2]">
                          {getTopicIcon(item.topicId)}
                          {item.topicTitle}
                        </span>
                        {isUrgent && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[11px] font-bold">
                            Ưu tiên an toàn
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        <span className="text-slate-400 font-mono text-base mr-2">0{index + 1}.</span>
                        {item.question}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Detailed Q&A Content */}
                  {isExpanded && (
                    <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-6 animate-in fade-in duration-150">
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item.fullAnswer.lead}
                      </p>

                      {/* Bullet points if present */}
                      {item.fullAnswer.bulletPoints && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.fullAnswer.bulletPoints.map((bp, bIdx) => (
                            <div
                              key={bIdx}
                              className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                            >
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#5B7CFA] shrink-0" />
                                {bp.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {bp.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Practical steps if present */}
                      {item.fullAnswer.practicalSteps && (
                        <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                            Các bước hành động cụ thể:
                          </h4>
                          <div className="space-y-2">
                            {item.fullAnswer.practicalSteps.map((st, sIdx) => (
                              <p key={sIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                {st}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Remember Note */}
                      {item.fullAnswer.rememberNote && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B7CFA]">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Điều em cần nhớ:</span>
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                            &quot;{item.fullAnswer.rememberNote}&quot;
                          </p>
                        </div>
                      )}

                      {/* Copyable Communication Script */}
                      {item.fullAnswer.copyableScript && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                              {item.fullAnswer.copyableScript.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyScript(item.fullAnswer.copyableScript!.text, item.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors shadow-xs active:scale-95"
                            >
                              {copiedScriptId === item.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Đã sao chép</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Sao chép gợi ý</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/70 dark:border-amber-900 text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed select-all">
                            &quot;{item.fullAnswer.copyableScript.text}&quot;
                          </div>
                        </div>
                      )}

                      {/* Related Links */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                          {item.fullAnswer.relatedSkillId && (
                            <button
                              onClick={() => onNavigate('skills')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200/60 dark:border-emerald-800 font-medium transition-colors"
                            >
                              <Wrench className="w-3.5 h-3.5" />
                              <span>Thực hành kỹ năng liên quan</span>
                            </button>
                          )}

                          {item.fullAnswer.relatedArticleId && (
                            <button
                              onClick={() => {
                                const art = ARTICLES_DATA.find(a => a.id === item.fullAnswer.relatedArticleId);
                                if (art) onOpenArticle(art);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#5B7CFA] hover:bg-blue-100 border border-blue-200/60 dark:border-blue-900 font-medium transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Đọc bài viết liên quan</span>
                            </button>
                          )}
                        </div>

                        <button
                          onClick={onOpenChat}
                          className="inline-flex items-center gap-1 text-[#5B7CFA] hover:text-[#4162e2] font-semibold"
                        >
                          <span>Hỏi thêm MindBot về vấn đề này</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Empty State */}
      {totalResults === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Không tìm thấy bài viết hoặc câu hỏi phù hợp với tiêu chí lọc &quot;{searchQuery || selectedTopicId}&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTopicId('all');
              setFormatFilter('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 rounded-xl"
          >
            Xem toàn bộ nội dung
          </button>
        </div>
      )}

      {/* 6. MỘT LỜI NHẮN DÀNH CHO EM (INSPIRING CLOSING MESSAGE) */}
      <section className="rounded-3xl bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-emerald-50/60 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-xs space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-3xl">🌱</span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {INSPIRING_CLOSING_MESSAGE.title}
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {INSPIRING_CLOSING_MESSAGE.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('help')}
            className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-[#5B7CFA] hover:bg-[#486be8] transition-colors shadow-xs"
          >
            Tìm người hỗ trợ xung quanh
          </button>
        </div>
      </section>

      {/* 7. ETHICAL & SAFETY PRINCIPLES DISCLAIMER */}
      <footer className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Nguyên tắc an toàn & Trách nhiệm nội dung:
          </p>
          <p>
            Nội dung trong &quot;Góc tâm lý học đường – Lắng nghe bạn&quot; mang tính chất tham khảo giáo dục tâm lý, hoàn toàn không thay thế chẩn đoán y khoa, điều trị rối loạn tâm thần hay dịch vụ can thiệp lâm sàng. Nếu bạn hoặc ai đó đang trong tình trạng nguy cấp, hãy liên hệ ngay với người lớn có trách nhiệm, cơ sở y tế hoặc <strong>Tổng đài Quốc gia 111</strong>.
          </p>
        </div>
      </footer>
    </div>
  );
};
