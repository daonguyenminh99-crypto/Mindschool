import { ChatMessage, PageId } from '../types';

export interface BotResponse {
  text: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    page: PageId;
  };
}

export function generateBotReply(userMessage: string): BotResponse {
  const lower = userMessage.toLowerCase().trim();

  // 1. Safety & Crisis Detection (Critical Guardrail)
  const crisisKeywords = [
    'tự tử', 'chết', 'kết thúc cuộc sống', 'làm hại bản thân', 
    'không muốn sống', 'rạch tay', 'tự hại', 'muốn biến mất',
    'bị đánh đập', 'bị xâm hại'
  ];

  if (crisisKeywords.some(kw => lower.includes(kw))) {
    return {
      text: 'Mình nghe thấy bạn đang phải trải qua một nỗi đau và khó khăn rất lớn. Bạn không hề đơn độc và luôn có người sẵn sàng ở bên lắng nghe bạn. Xin bạn hãy chia sẻ ngay với một người lớn đáng tin cậy (bố mẹ, thầy cô) hoặc liên hệ ngay với Tổng đài Quốc gia Bảo vệ Trẻ em 111 (miễn phí, bảo mật 24/7). Sự an toàn và tính mạng của bạn là điều quý giá nhất.',
      suggestions: [
        'Gọi Tổng đài 111 ngay',
        'Tôi muốn tìm người hỗ trợ',
        'Cần không gian yên tĩnh'
      ],
      actionLink: {
        label: 'Xem danh bạ hỗ trợ khẩn cấp',
        page: 'help'
      }
    };
  }

  // 2. Stress from studies / Áp lực học tập
  if (lower.includes('stress') || lower.includes('áp lực') || lower.includes('quá tải') || lower.includes('bài tập')) {
    return {
      text: 'Mình rất thấu hiểu cảm giác này. Khi khối lượng bài vở và kỳ vọng dồn dập, cơ thể và não bộ rất dễ bị quá tải. Bạn hãy thử tạm dừng 10 phút, đứng dậy uống một ly nước mát và hít thở sâu. Sau đó, hãy chỉ chọn MỘT việc nhỏ duy nhất để hoàn thành trước nhé.',
      suggestions: [
        'Cho tôi một kế hoạch học tập',
        'Giúp tôi bình tĩnh hơn',
        'Kỹ thuật Pomodoro là gì?'
      ],
      actionLink: {
        label: 'Xem kỹ năng Quản lý thời gian',
        page: 'skills'
      }
    };
  }

  // 3. Exam Anxiety / Thi cử, kiểm tra
  if (lower.includes('thi') || lower.includes('kiểm tra') || lower.includes('lo lắng') || lower.includes('sợ rớt')) {
    return {
      text: 'Hồi hộp trước kỳ thi là phản xạ tự nhiên của cơ thể để giúp bạn tỉnh táo hơn, không có nghĩa là bạn học kém đâu! Bạn có thể thử bài tập Thở Hộp 4-4-4 ngay lúc này: Hít sâu 4 giây, giữ 4 giây, và thở ra 4 giây. Bạn đã bỏ ra rất nhiều công sức ôn luyện, hãy tập trung làm từng câu một nhé.',
      suggestions: [
        'Giúp tôi bình tĩnh hơn',
        'Chiến lược ôn thi hiệu quả',
        'Làm gì khi đầu óc trống rỗng?'
      ],
      actionLink: {
        label: 'Đọc bài: Vì sao trước kỳ thi thường lo lắng',
        page: 'explore'
      }
    };
  }

  // 4. Peer conflict / Mâu thuẫn bạn bè
  if (lower.includes('bạn bè') || lower.includes('mâu thuẫn') || lower.includes('cãi nhau') || lower.includes('tẩy chay') || lower.includes('cô lập')) {
    return {
      text: 'Bất đồng với bạn bè thực sự khiến chúng ta rất buồn và nặng lòng. Thay vì nhắn tin vội vã lúc đang giận, bạn hãy để cảm xúc lắng xuống một chút. Bạn có thể thử công thức nói chuyện: "Mình cảm thấy buồn khi sự việc xảy ra vì mình rất quý cậu...". Nếu bạn đang bị cô lập hay bắt nạt, đừng ngần ngại báo cho thầy cô nhé.',
      suggestions: [
        'Cách giao tiếp khi có mâu thuẫn',
        'Làm sao khi bị bắt nạt?',
        'Nói "không" với áp lực bạn bè'
      ],
      actionLink: {
        label: 'Xem kỹ năng Giao tiếp khi có mâu thuẫn',
        page: 'skills'
      }
    };
  }

  // 5. Time management / Quản lý thời gian
  if (lower.includes('thời gian') || lower.includes('trì hoãn') || lower.includes('kế hoạch') || lower.includes('lười')) {
    return {
      text: 'Để quản lý thời gian tốt hơn, bí quyết là đừng cố làm tất cả cùng lúc! Hãy áp dụng phương pháp Pomodoro: 25 phút chỉ tập trung làm 1 việc (tắt điện thoại), sau đó nghỉ trọn vẹn 5 phút. Bạn sẽ ngạc nhiên vì mình hoàn thành bài tập nhanh hơn rất nhiều đấy.',
      suggestions: [
        'Cho tôi một kế hoạch học tập',
        'Cách học khi mất tập trung',
        'Checklist quản lý thời gian'
      ],
      actionLink: {
        label: 'Mở checklist Quản lý thời gian',
        page: 'skills'
      }
    };
  }

  // 6. Need someone to talk / Tìm người nói chuyện
  if (lower.includes('nói chuyện') || lower.includes('chia sẻ') || lower.includes('tâm sự') || lower.includes('cô đơn') || lower.includes('buồn')) {
    return {
      text: 'MindSchool luôn ở đây lắng nghe bạn. Khi bạn cảm thấy buồn hoặc cô đơn, viết những dòng suy nghĩ vào Góc Nhật Ký hoặc tâm sự với một người bạn tin cậy (bạn thân, thầy cô, anh chị) sẽ giúp lòng nhẹ đi rất nhiều. Bạn muốn chia sẻ thêm về điều gì đang làm bạn bận tâm không?',
      suggestions: [
        'Tôi muốn viết nhật ký cảm xúc',
        'Tôi muốn làm quiz check-in',
        'Tìm người hỗ trợ xung quanh'
      ],
      actionLink: {
        label: 'Đến Góc Cảm xúc & Nhật ký',
        page: 'emotion'
      }
    };
  }

  // 7. Calming down / Giúp tôi bình tĩnh
  if (lower.includes('bình tĩnh') || lower.includes('thở') || lower.includes('tim đập nhanh')) {
    return {
      text: 'Hãy cùng mình thực hiện một bài tập thở nhé! 1. Ngồi thẳng lưng, thả lỏng vai. 2. Hít vào thật sâu bằng mũi trong 4 giây. 3. Giữ hơi thở lại trong 4 giây. 4. Thở ra thật chậm bằng miệng trong 4 giây. Cứ lặp lại như vậy 4 lần, nhịp tim của bạn sẽ dịu xuống ngay.',
      suggestions: [
        'Mở bài tập thở tương tác',
        'Check-in cảm xúc hiện tại',
        'Kỹ năng phục hồi tinh thần'
      ],
      actionLink: {
        label: 'Đến trang Bài tập thở & Cảm xúc',
        page: 'emotion'
      }
    };
  }

  // Default friendly response
  return {
    text: 'Cảm ơn bạn đã chia sẻ với MindBot. Mỗi ngày ở trường đều có những trải nghiệm và cảm xúc khác nhau. Bạn có thể chọn các câu hỏi gợi ý bên dưới hoặc chia sẻ thêm điều bạn đang suy nghĩ nhé. Mình luôn sẵn sàng đồng hành cùng bạn!',
    suggestions: [
      'Tôi đang stress vì học tập.',
      'Tôi đang lo trước kỳ thi.',
      'Tôi có mâu thuẫn với bạn.',
      'Tôi muốn quản lý thời gian tốt hơn.',
      'Tôi muốn tìm người để nói chuyện.'
    ],
    actionLink: {
      label: 'Làm bài check-in tâm trạng',
      page: 'quiz'
    }
  };
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'mindbot',
    text: 'Chào bạn! Mình là MindBot 🧠 – trợ lý tâm lý học đường tại MindSchool. Mình ở đây để lắng nghe, chia sẻ kiến thức và cùng bạn tìm ra các cách cân bằng cảm xúc. Hôm nay bạn đang cảm thấy thế nào?',
    timestamp: 'Vừa xong',
    suggestions: [
      'Tôi đang stress vì học tập.',
      'Tôi đang lo trước kỳ thi.',
      'Tôi có mâu thuẫn với bạn.',
      'Tôi muốn quản lý thời gian tốt hơn.',
      'Tôi muốn tìm người để nói chuyện.'
    ]
  }
];
