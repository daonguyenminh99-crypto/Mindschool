import { EmotionCheckIn, EmotionType } from '../types';

export interface JournalEntry {
  id: string;
  timestamp: number;
  dateStr: string;
  emotion: EmotionType;
  content: string;
  tags?: string[];
}

const CHECKINS_KEY = 'mindschool_checkins';
const JOURNAL_KEY = 'mindschool_journal';
const SKILLS_CHECKLIST_KEY = 'mindschool_skills_checklist';
const THEME_KEY = 'mindschool_theme';

export function getCheckIns(): EmotionCheckIn[] {
  try {
    const raw = localStorage.getItem(CHECKINS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading check-ins', e);
    return [];
  }
}

export function saveCheckIn(checkIn: Omit<EmotionCheckIn, 'id' | 'timestamp'>): EmotionCheckIn {
  const all = getCheckIns();
  const newItem: EmotionCheckIn = {
    ...checkIn,
    id: `checkin_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now()
  };
  const updated = [newItem, ...all];
  try {
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving check-in', e);
  }
  return newItem;
}

export function getJournalEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading journal', e);
    return [];
  }
}

export function saveJournalEntry(entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry {
  const all = getJournalEntries();
  const newItem: JournalEntry = {
    ...entry,
    id: `journal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now()
  };
  const updated = [newItem, ...all];
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving journal', e);
  }
  return newItem;
}

export function deleteJournalEntry(id: string): void {
  const all = getJournalEntries();
  const updated = all.filter(e => e.id !== id);
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting journal entry', e);
  }
}

export function getSkillChecklist(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(SKILLS_CHECKLIST_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Error reading checklist', e);
    return {};
  }
}

export function toggleSkillChecklistItem(itemId: string): Record<string, boolean> {
  const cur = getSkillChecklist();
  const updated = {
    ...cur,
    [itemId]: !cur[itemId]
  };
  try {
    localStorage.setItem(SKILLS_CHECKLIST_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving checklist', e);
  }
  return updated;
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === 'dark' || t === 'light') return t;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    console.error('Error reading theme', e);
  }
  return 'light';
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    console.error('Error saving theme', e);
  }
}

export function clearAllUserData(): void {
  try {
    localStorage.removeItem(CHECKINS_KEY);
    localStorage.removeItem(JOURNAL_KEY);
    localStorage.removeItem(SKILLS_CHECKLIST_KEY);
  } catch (e) {
    console.error('Error clearing data', e);
  }
}

// Helper to seed simulated sample check-in data with clear disclaimer
export function seedIllustrativeSampleData(): void {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  const sampleCheckIns: EmotionCheckIn[] = [
    {
      id: 'demo-1',
      timestamp: now - 6 * oneDay,
      dateStr: new Date(now - 6 * oneDay).toISOString().split('T')[0],
      emotion: 'anxious',
      intensity: 4,
      note: 'Lo lắng trước buổi kiểm tra 1 tiết Toán hình',
      contextTag: 'Học tập'
    },
    {
      id: 'demo-2',
      timestamp: now - 5 * oneDay,
      dateStr: new Date(now - 5 * oneDay).toISOString().split('T')[0],
      emotion: 'stressed',
      intensity: 3,
      note: 'Bài tập nhóm chưa kịp nộp, cả nhóm căng thẳng',
      contextTag: 'Bạn bè'
    },
    {
      id: 'demo-3',
      timestamp: now - 4 * oneDay,
      dateStr: new Date(now - 4 * oneDay).toISOString().split('T')[0],
      emotion: 'tired',
      intensity: 3,
      note: 'Thức hơi khuya ôn bài, sáng dậy uể oải',
      contextTag: 'Bản thân'
    },
    {
      id: 'demo-4',
      timestamp: now - 3 * oneDay,
      dateStr: new Date(now - 3 * oneDay).toISOString().split('T')[0],
      emotion: 'neutral',
      intensity: 3,
      note: 'Một ngày trôi qua bình thường, làm hết bài sớm',
      contextTag: 'Học tập'
    },
    {
      id: 'demo-5',
      timestamp: now - 2 * oneDay,
      dateStr: new Date(now - 2 * oneDay).toISOString().split('T')[0],
      emotion: 'happy',
      intensity: 4,
      note: 'Được cô khen bài văn tiến bộ, chiều đi uống trà sữa với bạn',
      contextTag: 'Bạn bè'
    },
    {
      id: 'demo-6',
      timestamp: now - 1 * oneDay,
      dateStr: new Date(now - 1 * oneDay).toISOString().split('T')[0],
      emotion: 'peaceful',
      intensity: 5,
      note: 'Dành buổi tối dọn dẹp bàn học và nghe nhạc nhẹ',
      contextTag: 'Bản thân'
    },
    {
      id: 'demo-7',
      timestamp: now,
      dateStr: new Date(now).toISOString().split('T')[0],
      emotion: 'happy',
      intensity: 4,
      note: 'Cảm thấy tự tin hơn nhiều cho tuần tới',
      contextTag: 'Bản thân'
    }
  ];

  try {
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(sampleCheckIns));
  } catch (e) {
    console.error('Error seeding demo data', e);
  }
}
