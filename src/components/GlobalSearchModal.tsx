import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Wrench, Heart, HelpCircle, ArrowRight } from 'lucide-react';
import { PageId, SearchItem } from '../types';
import { searchContent, getAllSearchItems } from '../utils/search';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(getAllSearchItems().slice(0, 6)); // default suggestions
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(getAllSearchItems().slice(0, 6));
    } else {
      setResults(searchContent(query));
    }
  }, [query]);

  if (!isOpen) return null;

  const getIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />;
      case 'skill':
        return <Wrench className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'emotion':
        return <Heart className="w-4 h-4 text-rose-500 shrink-0" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />;
    }
  };

  const handleSelect = (item: SearchItem) => {
    onNavigate(item.page, item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Tìm kiếm nội dung MindSchool"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Bạn muốn tìm hiểu điều gì? (áp lực, lo lắng, thi cử, bạn bè...)"
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Không tìm thấy kết quả phù hợp cho &quot;{query}&quot;. Hãy thử từ khóa khác như <span className="text-[#5B7CFA]">&quot;thi cử&quot;</span>, <span className="text-[#5B7CFA]">&quot;bạn bè&quot;</span> hoặc <span className="text-[#5B7CFA]">&quot;tập trung&quot;</span>.
            </div>
          ) : (
            results.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full text-left p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-start gap-3 group"
              >
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-[#5B7CFA] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-[#5B7CFA] group-hover:translate-x-0.5 transition-all shrink-0 self-center" />
              </button>
            ))
          )}
        </div>

        {/* Modal footer shortcut note */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <span>Tìm kiếm bài viết, kỹ năng, cảm xúc và thông tin hỗ trợ</span>
          <span className="hidden sm:inline">Phím tắt nhanh: Ctrl + K / ⌘ + K</span>
        </div>
      </div>
    </div>
  );
};
