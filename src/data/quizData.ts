import { QuizQuestion, QuizResult } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Gần đây bạn có khó tập trung khi học không?',
    category: 'Tập trung'
  },
  {
    id: 2,
    question: 'Bạn có thường cảm thấy áp lực vì điểm số không?',
    category: 'Học tập'
  },
  {
    id: 3,
    question: 'Bạn có cảm thấy khó thư giãn sau giờ học không?',
    category: 'Căng thẳng'
  },
  {
    id: 4,
    question: 'Bạn có cảm thấy mình đang có quá nhiều việc phải làm không?',
    category: 'Khối lượng'
  },
  {
    id: 5,
    question: 'Bạn có cảm thấy dễ cáu gắt hơn bình thường không?',
    category: 'Cảm xúc'
  },
  {
    id: 6,
    question: 'Bạn có thường xuyên lo lắng về những việc sắp xảy ra không?',
    category: 'Lo lắng'
  },
  {
    id: 7,
    question: 'Bạn có cảm thấy thiếu động lực học tập không?',
    category: 'Động lực'
  },
  {
    id: 8,
    question: 'Bạn có cảm thấy khó chia sẻ suy nghĩ với người khác không?',
    category: 'Kết nối'
  },
  {
    id: 9,
    question: 'Bạn có cảm thấy mệt mỏi dù đã nghỉ ngơi không?',
    category: 'Năng lượng'
  },
  {
    id: 10,
    question: 'Bạn có cảm thấy mình cần một người để trò chuyện không?',
    category: 'Nhu cầu hỗ trợ'
  }
];

export const QUIZ_OPTIONS = [
  { label: 'Không bao giờ', score: 0 },
  { label: 'Thỉnh thoảng', score: 1 },
  { label: 'Thường xuyên', score: 2 },
  { label: 'Gần như mỗi ngày', score: 3 }
];

export function calculateQuizResult(totalScore: number): QuizResult {
  if (totalScore <= 7) {
    return {
      score: totalScore,
      totalQuestions: 10,
      level: 'low',
      title: 'Tâm trạng tương đối ổn định & cân bằng',
      description: 'Bạn dường như đang duy trì một nhịp sống và học tập khá nhịp nhàng. Bạn vẫn có những lúc mệt mỏi hay hồi hộp thoáng qua, nhưng nhìn chung bạn kiểm soát tốt các tác nhân căng thẳng xung quanh.',
      reflectionAdvice: [
        'Tiếp tục duy trì thói quen học tập và nghỉ ngơi đều đặn hiện tại.',
        'Thực hành ghi lại những niềm vui nhỏ mỗi ngày để củng cố sức bền tinh thần.',
        'Sẵn sàng làm chỗ dựa tích cực, biết lắng nghe cho bạn bè xung quanh khi họ cần.'
      ],
      recommendedSkills: ['Quản lý thời gian học tập', 'Nghỉ ngơi và phục hồi tinh thần'],
      needSupportWarning: false
    };
  } else if (totalScore <= 15) {
    return {
      score: totalScore,
      totalQuestions: 10,
      level: 'moderate',
      title: 'Đang có một số dấu hiệu căng thẳng hoặc áp lực nhẹ',
      description: 'Nhịp sống học đường gần đây có thể đang bắt đầu đòi hỏi nhiều năng lượng hơn từ bạn. Bạn có thể cảm thấy hơi quá tải vào một số ngày nhất định hoặc cảm thấy khó tập trung hơn trước.',
      reflectionAdvice: [
        'Dành thời gian rà soát lại thời khóa biểu, chủ động cắt giảm bớt những việc không quá cần thiết.',
        'Thực hành kỹ thuật hít thở sâu hoặc dành 15 phút mỗi ngày đi dạo ngoài trời mà không dùng điện thoại.',
        'Chia sẻ với một người bạn thân hoặc anh chị về những điều đang khiến bạn bận lòng.'
      ],
      recommendedSkills: ['Học tập khi mất tập trung', 'Nghỉ ngơi và phục hồi tinh thần', 'Quản lý thời gian học tập'],
      needSupportWarning: false
    };
  } else if (totalScore <= 22) {
    return {
      score: totalScore,
      totalQuestions: 10,
      level: 'elevated',
      title: 'Bạn đang có một số dấu hiệu cho thấy mình có thể đang chịu khá nhiều áp lực',
      description: 'Khối lượng bài vở, kỳ vọng hoặc những mối quan hệ có thể đang tích tụ tạo nên gánh nặng đáng kể lên cảm xúc và cơ thể của bạn. Việc cảm thấy mệt mỏi, lo âu hay khó chia sẻ là điều dễ hiểu khi bạn phải gồng gánh quá nhiều một mình.',
      reflectionAdvice: [
        'Hãy cho phép bản thân nghỉ ngơi, bạn không cần phải luôn đạt điểm tuyệt đối hay làm hài lòng tất cả mọi người.',
        'Thử áp dụng kỹ thuật chia nhỏ công việc và dành một buổi tối trọn vẹn để ngủ sớm.',
        'Đừng ngần ngại nói chuyện với thầy cô chủ nhiệm, phòng tư vấn tâm lý trường hoặc cha mẹ về cảm giác quá tải này.'
      ],
      recommendedSkills: ['Chuẩn bị trước kỳ thi', 'Giao tiếp khi có mâu thuẫn', 'Nghỉ ngơi và phục hồi tinh thần'],
      needSupportWarning: true
    };
  } else {
    return {
      score: totalScore,
      totalQuestions: 10,
      level: 'high',
      title: 'Mức độ căng thẳng đang ở mức khá cao – Cơ thể và tâm trí bạn cần được chăm sóc',
      description: 'Bạn đang phải đối mặt với nhiều áp lực dồn dập khiến cơ thể mệt mỏi và cảm xúc nặng nề. Hãy nhớ rằng đây không phải là lỗi của bạn và bạn hoàn toàn không cần phải tự mình gánh chịu mọi thứ một mình.',
      reflectionAdvice: [
        'Tạm gác lại những kỳ vọng không bắt buộc để ưu tiên cho sức khỏe thể chất và giấc ngủ của bản thân.',
        'Nếu những cảm giác này kéo dài hoặc ảnh hưởng rõ rệt đến việc học, ăn ngủ hay các mối quan hệ, hãy cân nhắc chia sẻ với một người lớn đáng tin cậy hoặc chuyên viên tư vấn phù hợp.',
        'Bạn luôn xứng đáng được lắng nghe, tôn trọng và hỗ trợ an toàn.'
      ],
      recommendedSkills: ['Nghỉ ngơi và phục hồi tinh thần', 'Nói "không" với áp lực bạn bè', 'Giao tiếp khi có mâu thuẫn'],
      needSupportWarning: true
    };
  }
}
