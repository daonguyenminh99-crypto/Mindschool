import React from 'react';
import { PageId } from '../types';
import { Heart, Shield, PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const links: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'explore', label: 'Khám phá' },
    { id: 'emotion', label: 'Cảm xúc' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'skills', label: 'Kỹ năng' },
    { id: 'dashboard', label: 'Biểu đồ' },
    { id: 'help', label: 'Trợ giúp' }
  ];

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Mind<span className="text-[#5B7CFA]">School</span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 italic">
              &quot;Hiểu mình – Chăm sóc mình – Kết nối với mọi người.&quot;
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Dự án website giáo dục tâm lý học đường dành cho học sinh THCS và THPT. Tạo dựng một không gian trực tuyến thân thiện, tích cực, an toàn và không phán xét.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Tổng đài Quốc gia Bảo vệ Trẻ em: 111 (Miễn phí 24/7)</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Điều hướng chính
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {links.map(l => (
                <li key={l.id}>
                  <button
                    onClick={() => {
                      onNavigate(l.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#5B7CFA] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy & Ethics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Quyền riêng tư & An toàn
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                <Shield className="w-4 h-4 text-[#5B7CFA]" />
                Bảo mật cục bộ
              </div>
              <p className="leading-relaxed">
                MindSchool ưu tiên quyền riêng tư. Dữ liệu check-in trên phiên bản demo được lưu cục bộ trên thiết bị của bạn.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center sm:text-left leading-relaxed">
            ⚠️ <strong>Lưu ý quan trọng:</strong> Thông tin trên website nhằm mục đích giáo dục và hỗ trợ chung, không thay thế chẩn đoán hoặc tư vấn chuyên môn y tế / tâm thần học.
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <span>Dành cho học sinh Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
