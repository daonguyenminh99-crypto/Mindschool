import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Wind } from 'lucide-react';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const BreathingExerciseModal: React.FC<BreathingModalProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      return;
    }
    setIsActive(true);
    setPhase('inhale');
    setSecondsLeft(4);
    setCycleCount(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 1) {
          return prev - 1;
        }

        // Switch phases
        setPhase(currentPhase => {
          if (currentPhase === 'inhale') return 'hold1';
          if (currentPhase === 'hold1') return 'exhale';
          if (currentPhase === 'exhale') return 'hold2';
          // hold2 completed one full cycle
          setCycleCount(c => c + 1);
          return 'inhale';
        });

        return 4; // Reset to 4 seconds for next phase
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isActive]);

  if (!isOpen) return null;

  const phaseDetails: Record<BreathPhase, { text: string; instruction: string; scale: string; color: string }> = {
    inhale: {
      text: 'Hít vào nhẹ nhàng',
      instruction: 'Hít chậm rãi bằng mũi, lồng ngực và bụng phồng lên',
      scale: 'scale-125',
      color: 'from-blue-400 to-indigo-500'
    },
    hold1: {
      text: 'Giữ hơi thở',
      instruction: 'Giữ không khí trong phổi, thả lỏng bờ vai và cơ mặt',
      scale: 'scale-125',
      color: 'from-indigo-500 to-purple-500'
    },
    exhale: {
      text: 'Thở ra chậm rãi',
      instruction: 'Thở êm qua khóe môi, cảm nhận mọi căng thẳng trút bỏ',
      scale: 'scale-75',
      color: 'from-emerald-400 to-teal-500'
    },
    hold2: {
      text: 'Tạm nghỉ tĩnh lặng',
      instruction: 'Thả lỏng toàn thân, chuẩn bị cho nhịp thở mới',
      scale: 'scale-75',
      color: 'from-slate-400 to-slate-500'
    }
  };

  const current = phaseDetails[phase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col items-center text-center overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Bài tập thở 4-4-4 thư giãn tâm trí"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Đóng bài tập thở"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full mb-3">
          <Wind className="w-3.5 h-3.5" />
          Bài tập thở hộp 4-4-4
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Thư Giãn Tâm Trí
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-8 max-w-xs">
          Kỹ thuật thở khoa học giúp đưa nhịp tim và hệ thần kinh về trạng thái an tĩnh trong 2 phút.
        </p>

        {/* Breathing Animation Canvas */}
        <div className="relative w-56 h-56 flex items-center justify-center my-2">
          {/* Outer ripples */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr ${current.color} opacity-20 blur-xl transition-all duration-1000 ease-in-out ${current.scale}`}
          />
          
          {/* Main animated orb */}
          <div
            className={`w-40 h-40 rounded-full bg-gradient-to-tr ${current.color} shadow-lg flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out transform ${current.scale}`}
          >
            <span className="text-3xl font-extrabold tracking-tight font-mono">
              {secondsLeft}s
            </span>
            <span className="text-xs font-medium uppercase tracking-wider mt-1 opacity-90">
              {phase === 'inhale' ? 'Hít' : phase === 'hold1' ? 'Giữ' : phase === 'exhale' ? 'Thở' : 'Nghỉ'}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 min-h-[56px] flex flex-col items-center">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white transition-all duration-300">
            {current.text}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            {current.instruction}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-[#5B7CFA] hover:bg-[#4a6be8] transition-colors shadow-sm active:scale-95"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? 'Tạm dừng' : 'Tiếp tục'}
          </button>
          
          <button
            onClick={() => {
              setPhase('inhale');
              setSecondsLeft(4);
              setCycleCount(0);
            }}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
            title="Làm lại từ đầu"
            aria-label="Làm lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-5 text-xs text-slate-400 dark:text-slate-500">
          Đã hoàn thành: <span className="font-semibold text-slate-700 dark:text-slate-300">{cycleCount}</span> chu kỳ
        </div>
      </div>
    </div>
  );
};
