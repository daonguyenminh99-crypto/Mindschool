/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Article } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { BreathingExerciseModal } from './components/BreathingExerciseModal';
import { ArticleModal } from './components/ArticleModal';
import { ToastContainer, ToastMessage } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { EmotionPage } from './pages/EmotionPage';
import { QuizPage } from './pages/QuizPage';
import { SkillsPage } from './pages/SkillsPage';
import { DashboardPage } from './pages/DashboardPage';
import { HelpPage } from './pages/HelpPage';

import { getStoredTheme, setStoredTheme } from './utils/storage';
import { ARTICLES_DATA } from './data/articlesData';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [hasError, setHasError] = useState(false);

  // Initialize theme from storage
  useEffect(() => {
    const saved = getStoredTheme();
    setTheme(saved);
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Listen for hash-based navigation if user bookmarks or presses back
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'explore', 'emotion', 'quiz', 'skills', 'dashboard', 'help'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard shortcut listener for Global Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsBreathingOpen(false);
        setActiveArticle(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId, targetId?: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If targetId is an article, open that article directly
    if (targetId && targetId.startsWith('article-')) {
      const artId = targetId.replace('article-', '');
      const art = ARTICLES_DATA.find(a => a.id === artId);
      if (art) {
        setActiveArticle(art);
      }
    }
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F9FC] dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        <div className="max-w-md p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl text-center space-y-4 border border-slate-200 dark:border-slate-700">
          <AlertCircle className="w-12 h-12 text-[#E96A6A] mx-auto" />
          <h2 className="text-xl font-bold">Đã xảy ra lỗi nhỏ. Hãy thử lại.</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Hệ thống đang được làm mới để đảm bảo trải nghiệm học tập tốt nhất cho bạn.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              window.location.reload();
            }}
            className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#5B7CFA] hover:bg-[#486be8] transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Thử lại</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-slate-950 text-[#172033] dark:text-slate-100 font-sans selection:bg-[#5B7CFA]/20 selection:text-[#5B7CFA] transition-colors duration-200">
      {/* 1. Header Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Main Page Content (with top padding for fixed navbar) */}
      <main className="flex-1 pt-20 sm:pt-24">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenArticle={setActiveArticle}
            onOpenBreathing={() => setIsBreathingOpen(true)}
            onOpenChat={() => setIsChatOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'explore' && (
          <ExplorePage
            onOpenArticle={setActiveArticle}
          />
        )}

        {currentPage === 'emotion' && (
          <EmotionPage
            onOpenBreathing={() => setIsBreathingOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'skills' && (
          <SkillsPage
            onShowToast={showToast}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'help' && (
          <HelpPage
            onOpenChat={() => setIsChatOpen(true)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Global Modals & Interactive Overlays */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <BreathingExerciseModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onShareToast={() => showToast('Đã sao chép liên kết bài viết!')}
      />

      {/* 5. Floating MindBot Chatbot Assistant */}
      <Chatbot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(prev => !prev)}
        onNavigate={handleNavigate}
      />

      {/* 6. Lightweight Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}
