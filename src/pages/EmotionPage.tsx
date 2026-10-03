import React, { useState, useEffect } from 'react';
import { EmotionType } from '../types';
import { EMOTIONS } from '../data/emotionsData';
import { 
  getJournalEntries, 
  saveJournalEntry, 
  deleteJournalEntry, 
  JournalEntry,
  saveCheckIn
} from '../utils/storage';
import { 
  Heart, 
  Sparkles, 
  Trash2, 
  BookHeart, 
  Check, 
  Wind, 
  Calendar, 
  Smile, 
  Clock 
} from 'lucide-react';

interface EmotionPageProps {
  onOpenBreathing: () => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const EmotionPage: React.FC<EmotionPageProps> = ({ onOpenBreathing, onShowToast }) => {
  const [activeEmotionId, setActiveEmotionId] = useState<EmotionType>('happy');
  const [journalContent, setJournalContent] = useState('');
  const [journalTag, setJournalTag] = useState<string>('Học tập');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setEntries(getJournalEntries());
  }, []);

  const activeEmotion = EMOTIONS[activeEmotionId];

  const wheelEmotions: EmotionType[] = [
    'happy',
    'peaceful',
    'neutral',
    'anxious',
    'sad',
    'stressed',
    'angry',
    'tired',
    'confused',
    'fearful'
  ];

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalContent.trim()) return;

    const newEntry = saveJournalEntry({
      dateStr: new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }),
      emotion: activeEmotionId,
      content: journalContent.trim(),
      tags: [journalTag]
    });

    // Also record check-in for dashboard charts
    saveCheckIn({
      dateStr: new Date().toISOString().split('T')[0],
      emotion: activeEmotionId,
      intensity: 3,
      contextTag: journalTag,
      note: journalContent.trim().slice(0, 60)
    });

    setEntries(prev => [newEntry, ...prev]);
    setJournalContent('');
    onShowToast('Đã lưu nhật ký!', 'Cảm xúc và suy nghĩ của bạn đã được ghi lại an toàn trên thiết bị.');
  };

  const handleDeleteEntry = (id: string) => {
    deleteJournalEntry(id);
    setEntries(prev => prev.filter(e => e.id !== id));
    onShowToast('Đã xóa dòng nhật ký.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Không gian nhận diện cảm xúc
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Góc cảm xúc
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Mọi cảm xúc bạn trải qua đều có lý do tồn tại. Nhận diện chính xác tên gọi của cảm xúc giúp não bộ bình tĩnh và tìm ra cách phản ứng phù hợp nhất.
          </p>
        </div>

        <button
          onClick={onOpenBreathing}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 border border-blue-200/80 dark:border-blue-900 transition-colors shadow-xs"
        >
          <Wind className="w-4 h-4" />
          <span>Tập thở hộp 4-4-4</span>
        </button>
      </div>

      {/* Interactive Emotion Wheel & Detail Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Emotion Wheel Diagram */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Bánh xe cảm xúc tương tác
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Nhấp vào bất kỳ cảm xúc nào để tìm hiểu sâu hơn
          </p>

          {/* Radial Wheel Representation */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-2">
            {/* Center Hub */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#5B7CFA] to-[#7C6FF2] text-white p-3 flex flex-col items-center justify-center shadow-lg z-10 select-none">
              <span className="text-2xl">{activeEmotion.emoji}</span>
              <span className="text-xs font-bold mt-1 tracking-tight">{activeEmotion.label}</span>
              <span className="text-[10px] text-white/80">Bạn đang chọn</span>
            </div>

            {/* Orbiting Emotion Nodes */}
            {wheelEmotions.map((emoId, index) => {
              const emo = EMOTIONS[emoId];
              const isSelected = activeEmotionId === emoId;
              const angle = (index * (360 / wheelEmotions.length) - 90) * (Math.PI / 180);
              const radius = 115; // px distance from center
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));

              return (
                <button
                  key={emo.id}
                  onClick={() => setActiveEmotionId(emoId)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className={`absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center text-base sm:text-lg transition-all duration-200 shadow-xs cursor-pointer ${
                    isSelected
                      ? 'scale-125 z-20 ring-3 ring-[#5B7CFA] shadow-md bg-white dark:bg-slate-800'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:scale-110 hover:border-[#5B7CFA]'
                  }`}
                  title={emo.label}
                  aria-label={`Chọn cảm xúc ${emo.label}`}
                >
                  <span>{emo.emoji}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-sm">
            {wheelEmotions.map(emoId => {
              const emo = EMOTIONS[emoId];
              return (
                <button
                  key={emo.id}
                  onClick={() => setActiveEmotionId(emoId)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                    activeEmotionId === emoId
                      ? 'bg-[#5B7CFA] text-white font-medium'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {emo.emoji} {emo.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Emotion Deep Dive Details */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
              {activeEmotion.emoji}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5B7CFA]">
                Khám phá cảm xúc
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {activeEmotion.label}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/60 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            {activeEmotion.description}
          </p>

          {/* Triggers & Sensations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                Tình huống thường gặp
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {activeEmotion.commonTriggers.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-2">
                Tín hiệu trên cơ thể
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {activeEmotion.physicalSensations.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#5B7CFA] font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coping & Self Care */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Cách chăm sóc bản thân khi thấy {activeEmotion.label.toLowerCase()}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeEmotion.copingTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EMOTION JOURNAL SECTION (Nhật ký cảm xúc) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-[#5B7CFA]" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Nhật ký cảm xúc (Emotion Journal)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dành 2 phút ghi lại những suy nghĩ trong ngày. Không ai phán xét câu chữ của bạn. Toàn bộ nội dung được lưu riêng tư trên trình duyệt của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Journal Form */}
          <form
            onSubmit={handleSaveJournal}
            className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Cảm xúc chủ đạo:
              </label>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-xl">{activeEmotion.emoji}</span>
                <span>{activeEmotion.label}</span>
                <span className="text-xs text-slate-400 font-normal ml-auto">(Chọn ở bánh xe phía trên)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Bối cảnh liên quan:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Học tập', 'Bạn bè', 'Gia đình', 'Bản thân', 'Khác'].map(tag => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setJournalTag(tag)}
                    className={`text-xs px-3 py-1 rounded-xl transition-colors ${
                      journalTag === tag
                        ? 'bg-[#5B7CFA] text-white font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Hôm nay mình cảm thấy...
              </label>
              <textarea
                value={journalContent}
                onChange={e => setJournalContent(e.target.value)}
                rows={4}
                placeholder="Điều gì đã diễn ra hôm nay? Bạn đã suy nghĩ hoặc cảm thấy thế nào? Bạn muốn nhắn nhủ điều gì với chính mình?..."
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7CFA]/50 resize-none leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!journalContent.trim()}
              className="w-full py-3 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-[#5B7CFA] hover:bg-[#486be8] disabled:opacity-40 transition-all shadow-xs"
            >
              Lưu dòng nhật ký
            </button>
          </form>

          {/* Journal Entries History List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Lịch sử nhật ký gần đây</span>
              <span className="text-xs text-slate-400 font-normal">
                {entries.length} ghi chép
              </span>
            </h3>

            {entries.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
                <Smile className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Chưa có dòng nhật ký nào được ghi lại.
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Hãy viết một vài dòng suy nghĩ ở bên cạnh để bắt đầu hành trình thấu hiểu chính mình!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {entries.map(entry => {
                  const emo = EMOTIONS[entry.emotion] || EMOTIONS.neutral;
                  return (
                    <div
                      key={entry.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-2.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{emo.emoji}</span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {emo.label}
                          </span>
                          {entry.tags && entry.tags.length > 0 && (
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                              · {entry.tags.join(', ')}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {entry.dateStr}
                          </span>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="p-1 text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                            title="Xóa ghi chép này"
                            aria-label="Xóa dòng nhật ký"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {entry.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
