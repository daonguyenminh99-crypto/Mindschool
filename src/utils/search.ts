import { SearchItem } from '../types';
import { ARTICLES_DATA } from '../data/articlesData';
import { SKILLS_DATA } from '../data/skillsData';
import { EMOTIONS } from '../data/emotionsData';
import { LISTENING_QUESTIONS } from '../data/listeningCornerData';
import { BRAND } from '../constants/branding';

export function getAllSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // Articles (Merged into Lắng nghe)
  ARTICLES_DATA.forEach(article => {
    items.push({
      id: `article-${article.id}`,
      title: article.title,
      category: `Lắng nghe · Bài viết ${article.category}`,
      type: 'article',
      snippet: article.shortDescription,
      page: 'corner'
    });
  });

  // Skills
  SKILLS_DATA.forEach(skill => {
    items.push({
      id: `skill-${skill.id}`,
      title: skill.title,
      category: `Kỹ năng học đường · ${skill.subtitle}`,
      type: 'skill',
      snippet: skill.target,
      page: 'skills'
    });
  });

  // Emotions
  Object.values(EMOTIONS).forEach(emo => {
    items.push({
      id: `emotion-${emo.id}`,
      title: `Cảm xúc: ${emo.label} ${emo.emoji}`,
      category: 'Góc cảm xúc',
      type: 'emotion',
      snippet: emo.description,
      page: 'emotion'
    });
  });

  // Listening Corner Q&A
  LISTENING_QUESTIONS.forEach(q => {
    items.push({
      id: `corner-${q.id}`,
      title: q.question,
      category: `Lắng nghe bạn · ${q.topicTitle}`,
      type: 'faq',
      snippet: q.summary,
      page: 'corner'
    });
  });

  // Common FAQ items
  items.push(
    {
      id: 'faq-quiz',
      title: 'Bài check-in tâm trạng có phải chẩn đoán bệnh không?',
      category: 'Hỏi đáp · Quiz',
      type: 'faq',
      snippet: 'Không. Đây là công cụ tự phản ánh mức độ căng thẳng hiện tại, không phải chẩn đoán y khoa.',
      page: 'quiz'
    },
    {
      id: 'faq-privacy',
      title: 'Dữ liệu nhật ký và cảm xúc của tôi có bị lộ không?',
      category: 'Hỏi đáp · Quyền riêng tư',
      type: 'faq',
      snippet: `${BRAND.name} lưu toàn bộ dữ liệu cục bộ trên trình duyệt của bạn (localStorage), không gửi về máy chủ ngoài.`,
      page: 'dashboard'
    },
    {
      id: 'faq-help-111',
      title: 'Khi bị bắt nạt hoặc bạo lực học đường thì gọi số nào?',
      category: 'Hỏi đáp · Trợ giúp',
      type: 'faq',
      snippet: 'Gọi ngay Tổng đài Quốc gia Bảo vệ Trẻ em 111 (miễn phí, 24/7) hoặc tìm đến phòng tư vấn của trường.',
      page: 'help'
    }
  );

  return items;
}

export function searchContent(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const items = getAllSearchItems();
  return items.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.snippet.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
}
