import React, { useState, useEffect } from 'react';
import { SKILLS_DATA } from '../data/skillsData';
import { SkillItem } from '../types';
import { getSkillChecklist, toggleSkillChecklistItem } from '../utils/storage';
import { 
  Wrench, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  Lightbulb, 
  Target, 
  BookOpen, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SkillsPageProps {
  onShowToast: (title: string, desc?: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ onShowToast }) => {
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SKILLS_DATA[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCheckedItems(getSkillChecklist());
  }, []);

  const selectedSkill = SKILLS_DATA.find(s => s.id === selectedSkillId) || SKILLS_DATA[0];

  const handleToggleCheck = (itemId: string) => {
    const updated = toggleSkillChecklistItem(itemId);
    setCheckedItems(updated);
    if (updated[itemId]) {
      onShowToast('Tuyệt vời!', 'Bạn đã hoàn thành thêm một mục tiêu nhỏ trong checklist.');
    }
  };

  const completedCount = selectedSkill.checklist.filter(item => checkedItems[item.id]).length;
  const totalCount = selectedSkill.checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
          <Wrench className="w-3.5 h-3.5" />
          Bộ công cụ thực hành
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Kỹ năng giúp bạn cân bằng hơn
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Những phương pháp cụ thể, từng bước rõ ràng để bạn làm chủ thời gian học, vượt qua sự phân tán và duy trì các mối quan hệ tích cực.
        </p>
      </div>

      {/* Main Layout: Left Selector Sidebar + Right Interactive Detail Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Skills Navigation List */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Danh sách 6 kỹ năng
          </h3>
          {SKILLS_DATA.map(skill => {
            const isSelected = skill.id === selectedSkillId;
            const skillDone = skill.checklist.filter(it => checkedItems[it.id]).length;
            const skillTotal = skill.checklist.length;

            return (
              <button
                key={skill.id}
                onClick={() => setSelectedSkillId(skill.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between group ${
                  isSelected
                    ? 'border-[#5B7CFA] bg-blue-50/70 dark:bg-blue-950/50 text-[#5B7CFA] dark:text-[#7C6FF2] shadow-xs ring-1 ring-[#5B7CFA]/40'
                    : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isSelected 
                      ? 'bg-[#5B7CFA] text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {skill.number}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold leading-tight">
                      {skill.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                      Tiến độ: {skillDone}/{skillTotal}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform ${
                  isSelected ? 'text-[#5B7CFA] translate-x-0.5' : 'text-slate-300 dark:text-slate-600'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Active Skill Detail & Interactive Checklist */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 animate-in fade-in duration-150">
          {/* Skill Title & Subtitle */}
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5B7CFA]">
              <span>Kỹ năng #{selectedSkill.number}</span>
              <span>·</span>
              <span>{selectedSkill.subtitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {selectedSkill.title}
            </h2>
          </div>

          {/* Target & Why it matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B7CFA] uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>Mục tiêu</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedSkill.target}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Vì sao hữu ích?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedSkill.whyItMatters}
              </p>
            </div>
          </div>

          {/* The Concrete Steps */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#5B7CFA]" />
              Các bước thực hành cụ thể
            </h3>

            <div className="space-y-3">
              {selectedSkill.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#5B7CFA] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {st.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Example */}
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Ví dụ thực tế ở trường
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
              &quot;{selectedSkill.practicalExample}&quot;
            </p>
          </div>

          {/* Interactive Checklist */}
          <div className="p-6 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  Checklist hành động của bạn
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tích chọn khi bạn đã áp dụng bước này vào ngày hôm nay
                </p>
              </div>

              {/* Progress counter pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                <span>{completedCount}/{totalCount} hoàn thành</span>
                <span className="font-mono">({progressPercent}%)</span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 pt-1">
              {selectedSkill.checklist.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleCheck(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-100'
                        : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-200'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span className={isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
