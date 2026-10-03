import React, { useState } from 'react';
import { PageId } from '../types';
import { SUPPORT_PILLARS, WHEN_TO_SEEK_HELP, HOTLINES } from '../data/helpData';
import { 
  PhoneCall, 
  MessageSquare, 
  HeartHandshake, 
  GraduationCap, 
  Building2, 
  Stethoscope, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink 
} from 'lucide-react';

interface HelpPageProps {
  onOpenChat: () => void;
  onNavigate: (page: PageId) => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onOpenChat, onNavigate }) => {
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(null);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-rose-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-blue-500" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-purple-500" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-emerald-500" />;
      default:
        return <HeartHandshake className="w-6 h-6 text-[#5B7CFA]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* 1. HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-3.5 py-1.5 rounded-full border border-rose-200/80 dark:border-rose-900">
          <PhoneCall className="w-3.5 h-3.5" />
          Mạng lưới hỗ trợ học sinh
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Bạn không cần phải đối mặt với mọi chuyện một mình.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Tìm kiếm sự trợ giúp khi cảm thấy quá tải không phải là dấu hiệu yếu đuối, mà là sự dũng cảm và trách nhiệm cao nhất với chính tương lai của bạn.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenChat}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-[#5B7CFA] hover:bg-[#486be8] shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Nói chuyện với MindBot</span>
          </button>

          <a
            href="tel:111"
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-500" />
            <span>Gọi Tổng đài 111 (Miễn phí 24/7)</span>
          </a>
        </div>
      </div>

      {/* 2. 4 SUPPORT PILLAR CARDS */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            4 Điểm tựa tin cậy xung quanh bạn
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Mỗi người đều có vai trò riêng trong việc đồng hành cùng bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUPPORT_PILLARS.map(pillar => {
            const isExpanded = expandedPillarId === pillar.id;
            return (
              <div
                key={pillar.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {pillar.title}
                      </h3>
                      <span className="text-xs text-[#5B7CFA] font-medium">Điểm tựa hỗ trợ</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.roleDescription}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Cách mở lời trò chuyện:
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.howToApproach}
                    </p>
                  </div>

                  {/* Expandable Suggested Phrases */}
                  {isExpanded && (
                    <div className="space-y-3 pt-2 animate-in fade-in duration-150">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Mẫu câu gợi ý bạn có thể dùng:
                      </h4>
                      <div className="space-y-2">
                        {pillar.suggestedPhrases.map((phrase, idx) => (
                          <p
                            key={idx}
                            className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300 italic"
                          >
                            {phrase}
                          </p>
                        ))}
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Phù hợp nhất khi bạn gặp vấn đề về:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.goodFor.map((g, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            >
                              ✓ {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setExpandedPillarId(isExpanded ? null : pillar.id)}
                    className="text-xs font-semibold text-[#5B7CFA] hover:text-[#4162e2] flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? 'Thu gọn gợi ý' : 'Xem mẫu câu mở lời'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SECTION: KHI NÀO NÊN TÌM SỰ HỖ TRỢ? */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#5B7CFA]">
            Dấu hiệu cảnh báo
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Khi nào bạn nên tìm kiếm sự hỗ trợ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Nếu nhận thấy bản thân hoặc bạn bè có 1 trong 5 biểu hiện dưới đây, đó là tín hiệu nên mở lời chia sẻ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHEN_TO_SEEK_HELP.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100/70 dark:bg-blue-900/40 text-[#5B7CFA] font-bold text-xs flex items-center justify-center">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

          {/* Quick Quiz invitation tile */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#5B7CFA] to-[#7C6FF2] text-white space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                Tự đánh giá
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Làm bài check-in tâm trạng 10 câu
              </h3>
              <p className="text-xs text-white/90 leading-relaxed mt-1">
                Nhìn nhận mức độ áp lực hiện tại của bạn trong 3 phút.
              </p>
            </div>
            <button
              onClick={() => onNavigate('quiz')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#5B7CFA] hover:bg-slate-100 transition-colors self-start shadow-xs"
            >
              Làm check-in ngay
            </button>
          </div>
        </div>
      </div>

      {/* 4. EMERGENCY HOTLINES DIRECTORY (Việt Nam) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-xl shadow-xs">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Đường dây nóng hỗ trợ khẩn cấp tại Việt Nam
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Lưu lại những số điện thoại này vào danh bạ khi cần trợ giúp tức thì
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HOTLINES.map(hl => (
            <div
              key={hl.number}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-950 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  {hl.badge}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                  {hl.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {hl.note}
                </p>
              </div>

              <a
                href={`tel:${hl.number.replace(/\s+/g, '')}`}
                className="mt-2 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Gọi {hl.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
