import { ChatMessage, PageId } from '../types';
import { BRAND } from '../constants/branding';

export interface BotResponse {
  text: string;
  isCrisis?: boolean;
  suggestions?: string[];
  actionLink?: {
    label: string;
    page: PageId;
  };
}

// Crisis Keywords for instant client-side priority detection
const CRISIS_KEYWORDS = [
  'tự tử', 'chết', 'kết thúc cuộc sống', 'làm hại bản thân', 'tổn thương bản thân',
  'không muốn sống', 'rạch tay', 'tự hại', 'muốn biến mất', 'uống thuốc tự tử',
  'bị đánh đập', 'bị xâm hại', 'nguy hiểm bản thân', 'không an toàn', 'tự sát'
];

export function isCrisisMessage(text: string): boolean {
  const lower = text.toLowerCase().trim();
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw));
}

export const CRISIS_FALLBACK_RESPONSE: BotResponse = {
  text: `Mình hiểu rằng bạn đang phải trải qua những cảm xúc vô cùng khó khăn, đau đớn và mệt mỏi. Bạn không hề đơn độc và bạn không cần phải cố gắng chịu đựng điều này một mình. Tính mạng và sự an toàn của bạn là điều quan trọng nhất lúc này.

Xin bạn hãy thực hiện các bước an toàn sau:
1. **Tìm người ở bên:** Hãy nói ngay với một người lớn đáng tin cậy (cha mẹ, thầy cô, người thân) hoặc bạn thân và nhờ họ ở cạnh bạn ngay bây giờ.
2. **Rời khỏi nơi nguy hiểm:** Di chuyển đến nơi có người xung quanh, tránh xa các vật dụng có thể gây hại.
3. **Liên hệ khẩn cấp:** 
   - **Tổng đài Quốc gia Bảo vệ Trẻ em 111** (hoạt động 24/7, miễn phí).
   - **Cấp cứu y tế 115** nếu có thương tổn hoặc nguy cơ cấp bách.
   - **Đường dây nóng Ngày Mai / Hỗ trợ tâm lý:** 096 306 1414.

Nếu chưa biết mở lời thế nào, bạn chỉ cần nói một câu đơn giản:
> *"Dạo này em cảm thấy rất không ổn, em đang có những suy nghĩ khiến em lo sợ và em cần một người ở bên giúp đỡ."*`,
  isCrisis: true,
  suggestions: [
    'Gọi Tổng đài 111 ngay',
    'Tôi cần người ở bên',
    'Đến Góc Lắng nghe bạn'
  ],
  actionLink: {
    label: 'Đến mục: Hỗ trợ khẩn cấp',
    page: 'corner'
  }
};

/**
 * Sends conversation to the real Gemini 3.8 Flash backend API
 * Maintains multi-turn context and handles resilience/fallbacks
 */
export async function sendChatMessageToAI(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<BotResponse> {
  const text = userMessage.trim();
  if (!text) {
    return {
      text: 'Bạn hãy nhập câu hỏi hoặc điều bạn muốn tâm sự nhé.',
    };
  }

  // Instant safety guardrail priority check
  const crisisDetected = isCrisisMessage(text);

  try {
    // Format conversation history for multi-turn reasoning
    const conversationPayload = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      content: msg.text,
    }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: text,
        messages: conversationPayload,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn('[MindBot] API returned non-200:', response.status, errData);

      if (crisisDetected) {
        return CRISIS_FALLBACK_RESPONSE;
      }

      return {
        text: errData.fallbackText || 'MindBot đang xử lý nhiều lượt trao đổi từ các bạn học sinh. Bạn vui lòng thử gửi lại câu hỏi sau giây lát nhé!',
        suggestions: [
          'Giải thích lại ngắn hơn',
          'Gợi ý cách giải bài tập',
          'Lắng nghe tâm sự'
        ]
      };
    }

    const data = await response.json();
    const botText = data.text || '';
    const isCrisis = data.isCrisis || crisisDetected;

    // Generate contextual action link or suggestions if applicable
    let actionLink: BotResponse['actionLink'];
    const lowerBotText = botText.toLowerCase();

    if (isCrisis) {
      actionLink = {
        label: 'Xem đường dây nóng & người hỗ trợ',
        page: 'corner',
      };
    } else if (lowerBotText.includes('thở hộp') || lowerBotText.includes('hít thở') || lowerBotText.includes('thư giãn')) {
      actionLink = {
        label: 'Mở bài tập Thở Hộp 4-4-4',
        page: 'home',
      };
    } else if (lowerBotText.includes('quản lý thời gian') || lowerBotText.includes('pomodoro') || lowerBotText.includes('kỹ năng')) {
      actionLink = {
        label: 'Khám phá Kỹ năng học đường',
        page: 'skills',
      };
    } else if (lowerBotText.includes('nhật ký cảm xúc') || lowerBotText.includes('vòng quay cảm xúc')) {
      actionLink = {
        label: 'Viết Nhật ký cảm xúc',
        page: 'emotion',
      };
    }

    // Dynamic suggested follow-ups
    const suggestions = generateDynamicSuggestions(text, botText, isCrisis);

    return {
      text: botText,
      isCrisis,
      suggestions,
      actionLink,
    };
  } catch (error) {
    console.error('[MindBot] Network or server error:', error);

    if (crisisDetected) {
      return CRISIS_FALLBACK_RESPONSE;
    }

    return {
      text: 'Rất tiếc, đường truyền mạng vừa bị gián đoạn tạm thời. Bạn hãy kiểm tra lại kết nối và gửi lại tin nhắn nhé. Mình luôn sẵn sàng đồng hành cùng bạn!',
      suggestions: [
        'Gửi lại câu hỏi',
        'Cách giảm stress khi học',
        'Kỹ năng quản lý thời gian'
      ]
    };
  }
}

/**
 * Generate smart contextual follow-up questions
 */
function generateDynamicSuggestions(userPrompt: string, botResponse: string, isCrisis: boolean): string[] {
  if (isCrisis) {
    return [
      'Tôi cần một người lớn ở bên',
      'Tổng đài 111 có miễn phí không?',
      'Cách mở lời với cha mẹ'
    ];
  }

  const promptLower = userPrompt.toLowerCase();
  const respLower = botResponse.toLowerCase();

  if (promptLower.includes('code') || promptLower.includes('lập trình') || promptLower.includes('python') || promptLower.includes('javascript')) {
    return [
      'Cho mình xem ví dụ code cụ thể',
      'Giải thích từng dòng code trên',
      'Làm thế nào để tránh lỗi này?'
    ];
  }

  if (promptLower.includes('toán') || promptLower.includes('lý') || promptLower.includes('hóa') || promptLower.includes('bài tập')) {
    return [
      'Giải thích từng bước chi tiết hơn',
      'Có cách giải nào nhanh hơn không?',
      'Cho mình một bài tập tương tự để tự luyện'
    ];
  }

  if (promptLower.includes('bạn bè') || promptLower.includes('lạc lõng') || promptLower.includes('bắt nạt') || promptLower.includes('tẩy chay')) {
    return [
      'Mẫu câu bắt chuyện tự nhiên',
      'Làm sao khi bị hiểu lầm?',
      'Kỹ năng nói không khéo léo'
    ];
  }

  if (promptLower.includes('bố mẹ') || promptLower.includes('điểm số') || promptLower.includes('kỳ vọng')) {
    return [
      'Mẫu câu tâm sự chân thành với bố mẹ',
      'Làm sao khi bị so sánh với người khác?',
      'Cách giữ bình tĩnh khi tranh luận'
    ];
  }

  if (respLower.includes('1.') && respLower.includes('2.')) {
    return [
      'Tóm tắt lại thành 3 ý chính',
      'Cho ví dụ thực tế trong trường học',
      'Bước nào là quan trọng nhất?'
    ];
  }

  return [
    'Giải thích cụ thể hơn',
    'Cho một ví dụ thực tế',
    'Mình nên bắt đầu từ bước nào trước?'
  ];
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'mindbot',
    text: `Chào bạn! Mình là **MindBot 🧠** – Trợ lý AI học đường thông minh tại ${BRAND.name}.

Mình được tích hợp mô hình AI hiện đại với khả năng:
- 📚 **Hỗ trợ học tập & STEM:** Phân tích bài tập Toán, Lý, Hóa, Văn, Anh,... giải thích từng bước rõ ràng.
- 💻 **Công nghệ & Lập trình:** Viết và giải thích code Python, JS/TS, C++, sửa lỗi thuật toán.
- ⏳ **Kỹ năng & Kế hoạch:** Quản lý thời gian Pomodoro, lập kế hoạch ôn thi, phương pháp ghi nhớ.
- 🌱 **Tâm lý & Cuộc sống:** Lắng nghe áp lực thi cử, kỳ vọng gia đình, kỹ năng kết bạn và hòa nhập.

Hôm nay bạn muốn cùng mình trao đổi về chủ đề gì?`,
    timestamp: 'Vừa xong',
    suggestions: [
      'Giải bài tập & phương pháp học hiệu quả',
      'Cách vượt qua áp lực thi cử',
      'Kỹ năng kết bạn khi ở trường mới',
      'Lập thời gian biểu học tập Pomodoro'
    ]
  }
];
