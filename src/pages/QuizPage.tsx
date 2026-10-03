import React, { useState } from 'react';
import { PageId } from '../types';
import { QUIZ_QUESTIONS, QUIZ_OPTIONS, calculateQuizResult } from '../data/quizData';
import { 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (page: PageId) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQuestion.id]: score };
    setAnswers(updated);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  // Compute total score
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const result = calculateQuizResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Tự phản ánh tâm trạng
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Check-in tâm trạng
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Đây là công cụ tự phản ánh, <strong>KHÔNG</strong> phải công cụ chẩn đoán y khoa. Hãy trả lời theo cảm nhận thực tế của bạn trong 2 tuần qua.
        </p>
      </div>

      {!isCompleted ? (
        /* QUIZ STEPPER VIEW */
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Câu {currentIdx + 1}/{QUIZ_QUESTIONS.length}</span>
              <span>{progressPercent}% hoàn thành</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#5B7CFA] to-[#7C6FF2] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-4 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B7CFA] mb-2 block">
              Chủ đề: {currentQuestion.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.id}. {currentQuestion.question}
            </h2>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {QUIZ_OPTIONS.map(opt => {
              const isSelected = answers[currentQuestion.id] === opt.score;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption(opt.score)}
                  className={`p-4 rounded-2xl text-left border font-medium text-sm transition-all duration-150 flex items-center justify-between group ${
                    isSelected
                      ? 'border-[#5B7CFA] bg-blue-50/80 dark:bg-blue-950/60 text-[#5B7CFA] dark:text-[#7C6FF2] shadow-xs ring-1 ring-[#5B7CFA]'
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span>{opt.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#5B7CFA] bg-[#5B7CFA] text-white'
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-[#5B7CFA]'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <span className="text-xs text-slate-400">
              Chọn một câu trả lời để tự động sang câu tiếp theo
            </span>
          </div>
        </div>
      ) : (
        /* QUIZ RESULT VIEW (Ethical, Non-diagnostic Reflection) */
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 animate-in fade-in duration-200">
          {/* Result Badge & Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#5B7CFA] flex items-center justify-center text-3xl mx-auto shadow-xs">
              📊
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Kết quả tự phản ánh
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {result.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Advice List */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Những điều bạn có thể lưu tâm lúc này:
            </h4>
            <div className="space-y-2">
              {result.reflectionAdvice.map((adv, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#5B7CFA] shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reassuring Guidance & Safe Escalation */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-900 dark:text-amber-200">
                Ghi nhớ dành cho bạn:
              </p>
              <p className="leading-relaxed text-xs">
                Nếu những cảm giác khó khăn, mệt mỏi này kéo dài hoặc ảnh hưởng đáng kể đến việc học tập, sinh hoạt hằng ngày hoặc các mối quan hệ, hãy cân nhắc chia sẻ với một người lớn đáng tin cậy hoặc chuyên viên tư vấn phù hợp. Bạn không cần phải một mình gánh vác mọi chuyện.
              </p>
            </div>
          </div>

          {/* Recommended Next Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('skills')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-[#5B7CFA] hover:bg-[#486be8] shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem kỹ năng phù hợp</span>
            </button>

            <button
              onClick={() => onNavigate('help')}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>Tìm người hỗ trợ</span>
            </button>

            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài check-in</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
