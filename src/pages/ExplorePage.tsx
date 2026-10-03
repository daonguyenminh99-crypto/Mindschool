import React, { useState } from 'react';
import { Article } from '../types';
import { ARTICLES_DATA } from '../data/articlesData';
import { Clock, BookOpen, ArrowRight, Sparkles, Filter, Search } from 'lucide-react';

interface ExplorePageProps {
  onOpenArticle: (article: Article) => void;
}

type CategoryFilter = 'Tất cả' | 'Học tập' | 'Cảm xúc' | 'Bạn bè' | 'Gia đình' | 'Kỹ năng';

export const ExplorePage: React.FC<ExplorePageProps> = ({ onOpenArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: CategoryFilter[] = ['Tất cả', 'Học tập', 'Cảm xúc', 'Bạn bè', 'Gia đình', 'Kỹ năng'];

  const filteredArticles = ARTICLES_DATA.filter(art => {
    const matchesCategory = selectedCategory === 'Tất cả' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          Kho tri thức học đường
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hiểu tâm lý học đường
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Những bài viết được biên soạn khoa học, dễ hiểu, giúp bạn giải mã cảm xúc, tháo gỡ áp lực và xây dựng các mối quan hệ tích cực ở trường lớp.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        {/* Category Tabs (Segmented control button group) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#5B7CFA] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quick text search within articles */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Tìm theo chủ đề bài viết..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B7CFA]/50"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Chưa có bài viết phù hợp với tiêu chí lọc &quot;{searchTerm || selectedCategory}&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Tất cả');
              setSearchTerm('');
            }}
            className="px-4 py-2 text-xs font-semibold text-[#5B7CFA] bg-blue-50 dark:bg-blue-950/50 rounded-xl"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Clean unboxed metadata with separators (no pill sandwich) */}
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

              {/* Action Button */}
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
      )}
    </div>
  );
};
