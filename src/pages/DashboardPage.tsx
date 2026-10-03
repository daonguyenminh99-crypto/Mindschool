import React, { useState, useEffect } from 'react';
import { PageId, EmotionCheckIn, EmotionType } from '../types';
import { EMOTIONS } from '../data/emotionsData';
import { 
  getCheckIns, 
  clearAllUserData, 
  seedIllustrativeSampleData, 
  saveCheckIn 
} from '../utils/storage';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Trash2, 
  Sparkles, 
  PlusCircle, 
  Info, 
  Clock, 
  AlertCircle,
  Calendar
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onShowToast }) => {
  const [checkIns, setCheckIns] = useState<EmotionCheckIn[]>([]);
  const [quickEmotion, setQuickEmotion] = useState<EmotionType>('happy');

  const refreshData = () => {
    setCheckIns(getCheckIns());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleAddQuickCheckIn = () => {
    saveCheckIn({
      dateStr: new Date().toISOString().split('T')[0],
      emotion: quickEmotion,
      intensity: 3,
      contextTag: 'Học tập',
      note: 'Check-in nhanh từ trang biểu đồ'
    });
    refreshData();
    onShowToast('Đã ghi nhận cảm xúc!', `Đã thêm check-in ${EMOTIONS[quickEmotion].label} vào biểu đồ.`);
  };

  const handleSeedDemo = () => {
    seedIllustrativeSampleData();
    refreshData();
    onShowToast('Đã nạp dữ liệu mẫu minh họa', 'Lưu ý: Đây chỉ là dữ liệu giả lập để hiển thị biểu đồ.');
  };

  const handleClearData = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử check-in và nhật ký trên thiết bị này?')) {
      clearAllUserData();
      refreshData();
      onShowToast('Đã xóa dữ liệu cục bộ');
    }
  };

  // Group check-ins by emotion for distribution
  const emotionCounts: Partial<Record<EmotionType, number>> = {};
  checkIns.forEach(c => {
    emotionCounts[c.emotion] = (emotionCounts[c.emotion] || 0) + 1;
  });

  // Find most frequent emotion
  let mostFrequentEmotion: EmotionType | null = null;
  let maxCount = 0;
  Object.entries(emotionCounts).forEach(([emo, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentEmotion = emo as EmotionType;
    }
  });

  // Calculate mood scores (happy/peaceful: high, anxious/stressed/sad: lower)
  const getEmotionScore = (type: EmotionType): number => {
    switch (type) {
      case 'happy': return 5;
      case 'peaceful': return 4.5;
      case 'neutral': return 3.5;
      case 'confused': return 3;
      case 'tired': return 2.5;
      case 'anxious': return 2;
      case 'sad': return 1.8;
      case 'stressed': return 1.5;
      case 'fearful': return 1.2;
      case 'angry': return 1;
      default: return 3;
    }
  };

  const hasData = checkIns.length > 0;
  const recent7 = [...checkIns].reverse().slice(-7);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
            <BarChart3 className="w-3.5 h-3.5" />
            Không gian tự phản ánh
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Nhìn lại cảm xúc của bạn
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Quan sát dòng chảy tâm trạng qua thời gian để hiểu rõ nhịp sinh hoạt và những tác nhân ảnh hưởng đến sự bình an của bạn.
          </p>
        </div>

        {/* Data Actions */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleSeedDemo}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
            title="Tải dữ liệu mẫu để xem giao diện biểu đồ"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Nạp dữ liệu mẫu</span>
          </button>

          {hasData && (
            <button
              onClick={handleClearData}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition-colors flex items-center gap-1.5"
              title="Xóa toàn bộ dữ liệu check-in trên máy này"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa dữ liệu của tôi</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Statistical & Psychological Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            Lưu ý về nguồn dữ liệu & tính bảo mật:
          </p>
          <p className="leading-relaxed text-xs">
            Đây chỉ là dữ liệu do bạn tự nhập/check-in trên website và được lưu cục bộ trên thiết bị của bạn. MindSchool không sử dụng dữ liệu này như khảo sát chung hay đánh giá bệnh lý tâm thần.
          </p>
        </div>
      </div>

      {!hasData ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-3xl mx-auto">
            📈
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Bạn chưa có đủ dữ liệu để tạo biểu đồ
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Hãy thực hiện một vài check-in cảm xúc để hệ thống tổng hợp xu hướng cảm xúc qua các ngày của bạn.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('emotion')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#5B7CFA] hover:bg-[#486be8] transition-colors"
            >
              Đến Góc Cảm Xúc Check-in
            </button>
            <button
              onClick={handleSeedDemo}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
            >
              Xem thử dữ liệu mẫu minh họa
            </button>
          </div>
        </div>
      ) : (
        /* Charts & Summary Container */
        <div className="space-y-8">
          {/* Top 3 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tổng số lần check-in
              </span>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {checkIns.length}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ghi nhận trên thiết bị này
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Cảm xúc thường gặp nhất
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {mostFrequentEmotion && EMOTIONS[mostFrequentEmotion as keyof typeof EMOTIONS] 
                    ? EMOTIONS[mostFrequentEmotion as keyof typeof EMOTIONS].emoji 
                    : '—'}
                </span>
                <p className="text-xl font-bold text-[#5B7CFA] leading-tight">
                  {mostFrequentEmotion && EMOTIONS[mostFrequentEmotion as keyof typeof EMOTIONS] 
                    ? EMOTIONS[mostFrequentEmotion as keyof typeof EMOTIONS].label 
                    : 'Chưa xác định'}
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Xuất hiện {maxCount} lần gần đây
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Trạng thái chung
              </span>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                Đang ghi nhận tích cực
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tự nhận diện giúp phục hồi nhanh hơn
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Chart 1: Mood Trend (SVG Line Chart) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#5B7CFA]" />
                    Xu hướng cảm xúc gần đây (Mood Trend)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Mức độ năng lượng tích cực qua các mốc check-in
                  </p>
                </div>
              </div>

              {/* Clean SVG Line Graph */}
              <div className="w-full h-56 relative flex items-end pt-6 pb-2">
                <svg
                  viewBox="0 0 500 180"
                  className="w-full h-full overflow-visible select-none"
                >
                  {/* Grid horizontal guideline */}
                  <line x1="20" y1="30" x2="480" y2="30" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4 4" />
                  <line x1="20" y1="85" x2="480" y2="85" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4 4" />
                  <line x1="20" y1="140" x2="480" y2="140" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4 4" />

                  {/* Left score labels */}
                  <text x="5" y="34" fontSize="10" fill="#94A3B8">Cao</text>
                  <text x="5" y="89" fontSize="10" fill="#94A3B8">Vừa</text>
                  <text x="5" y="144" fontSize="10" fill="#94A3B8">Thấp</text>

                  {/* Render Points and Polyline */}
                  {(() => {
                    const points = recent7.map((c, i) => {
                      const x = 50 + (i * (420 / Math.max(recent7.length - 1, 1)));
                      const score = getEmotionScore(c.emotion); // 1 to 5
                      // Map 1 -> 145, 5 -> 25
                      const y = 145 - ((score - 1) / 4) * 120;
                      return { x, y, c };
                    });

                    const pathStr = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                    return (
                      <>
                        {/* Area gradient under path */}
                        {points.length > 1 && (
                          <path
                            d={`${pathStr} L ${points[points.length - 1].x} 150 L ${points[0].x} 150 Z`}
                            fill="url(#moodGradient)"
                            opacity="0.25"
                          />
                        )}

                        <defs>
                          <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5B7CFA" />
                            <stop offset="100%" stopColor="#5B7CFA" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Connecting line */}
                        <path
                          d={pathStr}
                          fill="none"
                          stroke="#5B7CFA"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Node Dots & Tooltip Emojis */}
                        {points.map((p, idx) => (
                          <g key={idx} className="cursor-pointer group">
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="6"
                              fill="#FFFFFF"
                              stroke="#5B7CFA"
                              strokeWidth="3"
                              className="dark:fill-slate-900"
                            />
                            <text
                              x={p.x}
                              y={p.y - 12}
                              textAnchor="middle"
                              fontSize="12"
                            >
                              {EMOTIONS[p.c.emotion]?.emoji || '•'}
                            </text>
                            <text
                              x={p.x}
                              y="170"
                              textAnchor="middle"
                              fontSize="9"
                              fill="#94A3B8"
                              className="font-mono"
                            >
                              {p.c.dateStr.slice(5)}
                            </text>
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Chart 2: Emotion Distribution (SVG Donut Chart) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-[#7C6FF2]" />
                  Phân bố cảm xúc (Emotion Distribution)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tỷ lệ các nhóm cảm xúc bạn đã ghi nhận
                </p>
              </div>

              {/* Distribution Bar breakdown */}
              <div className="space-y-3 my-auto py-2">
                {Object.entries(emotionCounts).map(([emoKey, count]) => {
                  const emo = EMOTIONS[emoKey as EmotionType];
                  if (!emo) return null;
                  const percentage = Math.round((count / checkIns.length) * 100);

                  return (
                    <div key={emoKey} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <span>{emo.emoji}</span>
                          <span>{emo.label}</span>
                        </span>
                        <span className="text-slate-400 font-mono tabular-nums">
                          {count} lần ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: emo.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Check-in Mini Strip directly on Dashboard */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-slate-500">Check-in nhanh:</span>
                <div className="flex items-center gap-1">
                  {(['happy', 'anxious', 'tired', 'peaceful'] as EmotionType[]).map(e => (
                    <button
                      key={e}
                      onClick={() => setQuickEmotion(e)}
                      className={`text-sm p-1.5 rounded-lg transition-colors ${
                        quickEmotion === e ? 'bg-blue-100 dark:bg-blue-900/60 ring-1 ring-[#5B7CFA]' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={EMOTIONS[e].label}
                    >
                      {EMOTIONS[e].emoji}
                    </button>
                  ))}
                  <button
                    onClick={handleAddQuickCheckIn}
                    className="p-1.5 rounded-lg text-white bg-[#5B7CFA] hover:bg-[#486be8] transition-colors ml-1"
                    title="Ghi nhận cảm xúc này"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Check-Ins Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Lịch sử các lần check-in gần nhất
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-60 overflow-y-auto">
              {checkIns.map(item => {
                const emo = EMOTIONS[item.emotion] || EMOTIONS.neutral;
                return (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{emo.emoji}</span>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {emo.label}
                        </p>
                        {item.note && (
                          <p className="text-xs text-slate-400 line-clamp-1">{item.note}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-mono tabular-nums">
                        {item.dateStr}
                      </span>
                      {item.contextTag && (
                        <p className="text-[11px] text-slate-400">{item.contextTag}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
