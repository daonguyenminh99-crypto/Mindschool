export type PageId = 'home' | 'explore' | 'emotion' | 'quiz' | 'skills' | 'dashboard' | 'help';

export type EmotionType = 
  | 'happy'       // Vui
  | 'peaceful'    // Bình yên
  | 'neutral'     // Bình thường
  | 'anxious'     // Lo lắng
  | 'sad'         // Buồn
  | 'stressed'    // Áp lực
  | 'angry'       // Tức giận
  | 'tired'       // Mệt mỏi
  | 'confused'    // Bối rối
  | 'fearful';    // Sợ hãi

export interface EmotionInfo {
  id: EmotionType;
  label: string;
  emoji: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  description: string;
  commonTriggers: string[];
  physicalSensations: string[];
  copingTips: string[];
  selfCareActions: string[];
}

export interface EmotionCheckIn {
  id: string;
  timestamp: number;
  dateStr: string; // YYYY-MM-DD
  emotion: EmotionType;
  intensity: number; // 1 to 5
  note?: string;
  contextTag?: string; // 'Học tập' | 'Gia đình' | 'Bạn bè' | 'Bản thân' | 'Khác'
}

export interface Article {
  id: string;
  title: string;
  category: 'Học tập' | 'Cảm xúc' | 'Bạn bè' | 'Gia đình' | 'Kỹ năng';
  readTime: string;
  shortDescription: string;
  fullContent: string[];
  keyTakeaways: string[];
  practicalTips: string[];
  author: string;
  iconName: string;
}

export interface SkillItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  target: string;
  whyItMatters: string;
  steps: {
    title: string;
    description: string;
  }[];
  practicalExample: string;
  checklist: {
    id: string;
    text: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  category?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  level: 'low' | 'moderate' | 'elevated' | 'high';
  title: string;
  description: string;
  reflectionAdvice: string[];
  recommendedSkills: string[];
  needSupportWarning: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mindbot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    page: PageId;
  };
}

export interface SearchItem {
  id: string;
  title: string;
  category: string;
  type: 'article' | 'skill' | 'emotion' | 'faq';
  snippet: string;
  page: PageId;
}
