import { EmotionInfo, EmotionType } from '../types';

export const EMOTIONS: Record<EmotionType, EmotionInfo> = {
  happy: {
    id: 'happy',
    label: 'Vui',
    emoji: '😊',
    color: '#4CAF7D',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/40',
    borderLight: 'border-emerald-200 dark:border-emerald-800',
    description: 'Cảm giác phấn chấn, hài lòng, tràn đầy năng lượng tích cực khi đạt được điều gì đó hoặc ở cạnh người thân quen.',
    commonTriggers: ['Đạt điểm tốt sau thời gian cố gắng', 'Được bạn bè khen ngợi', 'Tham gia hoạt động yêu thích', 'Hoàn thành bài tập sớm'],
    physicalSensations: ['Cơ thể nhẹ nhõm, thư thái', 'Nụ cười tự nhiên trên môi', 'Nhịp tim ổn định và tràn đầy sinh khí'],
    copingTips: [
      'Ghi lại khoảnh khắc vui này vào nhật ký để lưu giữ.',
      'Chia sẻ niềm vui với bạn bè hoặc người thân.',
      'Dùng nguồn năng lượng tích cực này để bắt đầu một thói quen tốt mới.'
    ],
    selfCareActions: ['Gọi điện trò chuyện với bạn thân', 'Thưởng thức món ăn yêu thích', 'Chụp một tấm ảnh kỷ niệm']
  },
  peaceful: {
    id: 'peaceful',
    label: 'Bình yên',
    emoji: '😌',
    color: '#5B7CFA',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/40',
    borderLight: 'border-blue-200 dark:border-blue-800',
    description: 'Trạng thái tĩnh lặng, an tâm, không bị thúc ép bởi lo toan hay xáo trộn bên trong suy nghĩ.',
    commonTriggers: ['Một buổi chiều cuối tuần không có bài tập dồn', 'Ngồi đọc cuốn sách yêu thích', 'Nghe bản nhạc nhẹ nhàng sau giờ học'],
    physicalSensations: ['Hơi thở đều và sâu', 'Cơ bắp vai và hàm được thả lỏng hoàn toàn', 'Đầu óc thông suốt'],
    copingTips: [
      'Tận hưởng trọn vẹn hiện tại mà không vội nghĩ về ngày mai.',
      'Thực hành hít thở sâu để ghi nhớ trạng thái thư giãn này.',
      'Sắp xếp lại góc bàn học thật gọn gàng để duy trì cảm giác này.'
    ],
    selfCareActions: ['Đi dạo 15 phút ngoài trời', 'Pha một ly nước ấm', 'Tập một bài giãn cơ nhẹ']
  },
  neutral: {
    id: 'neutral',
    label: 'Bình thường',
    emoji: '😐',
    color: '#6B7280',
    bgLight: 'bg-slate-100',
    bgDark: 'dark:bg-slate-800/50',
    borderLight: 'border-slate-200 dark:border-slate-700',
    description: 'Trạng thái trung tính, một ngày trôi qua bình lặng, không có biến cố vui hay buồn đặc biệt.',
    commonTriggers: ['Một ngày học tập tuần hoàn bình thường', 'Thực hiện các công việc quen thuộc hằng ngày', 'Vừa thức dậy hoặc đang nghỉ ngơi'],
    physicalSensations: ['Năng lượng vừa phải, không thừa không thiếu', 'Nhịp sinh học đều đặn'],
    copingTips: [
      'Bình thường là một trạng thái rất ổn định, không nhất thiết lúc nào cũng phải hào hứng.',
      'Có thể đặt một mục tiêu nhỏ mới mẻ cho ngày hôm nay để tạo thêm chút cảm hứng.',
      'Uống đủ nước và duy trì giấc ngủ đúng giờ.'
    ],
    selfCareActions: ['Đọc 5 trang sách mới', 'Dọn dẹp lại balô đi học', 'Nghe một podcast thú vị']
  },
  anxious: {
    id: 'anxious',
    label: 'Lo lắng',
    emoji: '😟',
    color: '#F2B84B',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/40',
    borderLight: 'border-amber-200 dark:border-amber-800',
    description: 'Cảm giác bồn chồn, bất an trước một sự việc sắp diễn ra mà mình cảm thấy chưa kiểm soát được hoàn toàn.',
    commonTriggers: ['Trước giờ kiểm tra hoặc thi học kỳ', 'Phải thuyết trình trước toàn trường/lớp', 'Chờ đợi kết quả học tập', 'Đối mặt với tình huống mới'],
    physicalSensations: ['Tim đập nhanh hơn', 'Hơi thở nông, cảm giác nghẹn ở cổ', 'Bàn tay hơi lạnh hoặc đổ mồ hôi', 'Bụng cồn cào'],
    copingTips: [
      'Thực hiện bài tập thở 4-4-4: Hít vào 4 giây, giữ 4 giây, thở ra 4 giây.',
      'Viết ra giấy những điều đang làm bạn lo, rồi phân loại điều bạn kiểm soát được và không kiểm soát được.',
      'Chia nhỏ công việc sắp làm thành từng bước 10-15 phút.',
      'Nhắc nhở bản thân: Lo lắng là phản xạ tự nhiên của não bộ muốn bảo vệ bạn, không phải dấu hiệu bạn yếu kém.'
    ],
    selfCareActions: ['Rửa mặt bằng nước mát', 'Uống từng ngụm nước ấm', 'Tập bài thở hộp (Box breathing)']
  },
  sad: {
    id: 'sad',
    label: 'Buồn',
    emoji: '😔',
    color: '#7C6FF2',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-950/40',
    borderLight: 'border-indigo-200 dark:border-indigo-800',
    description: 'Cảm giác hụt hẫng, nặng nề trong lòng khi mất mát, thất vọng hoặc cảm thấy cô đơn, không được thấu hiểu.',
    commonTriggers: ['Điểm số không như kỳ vọng dù đã rất cố gắng', 'Mâu thuẫn hay hiểu lầm với bạn bè', 'Bị bố mẹ trách phạt', 'Cảm giác bị lạc lõng giữa tập thể'],
    physicalSensations: ['Cảm giác nặng ở ngực', 'Thiếu năng lượng, muốn thu mình lại', 'Mắt cay hoặc muốn khóc'],
    copingTips: [
      'Cho phép bản thân buồn, không cần phải giả vờ cười gượng ép.',
      'Khóc là một cách tự nhiên để cơ thể giải phóng hormone căng thẳng.',
      'Nói chuyện với một người bạn tin tưởng hoặc viết ra nhật ký.',
      'Tránh lướt mạng xã hội liên tục để so sánh bản thân với người khác.'
    ],
    selfCareActions: ['Cuộn mình trong chăn ấm nghe nhạc êm dịu', 'Ôm thú cưng hoặc gối ôm', 'Viết nhật ký không phán xét']
  },
  stressed: {
    id: 'stressed',
    label: 'Áp lực',
    emoji: '😣',
    color: '#E96A6A',
    bgLight: 'bg-rose-50',
    bgDark: 'dark:bg-rose-950/40',
    borderLight: 'border-rose-200 dark:border-rose-800',
    description: 'Cảm giác quá tải khi khối lượng công việc, kỳ vọng hoặc thử thách vượt quá khả năng xử lý hiện tại của bạn.',
    commonTriggers: ['Lịch học thêm, bài tập về nhà dày đặc', 'Kỳ vọng điểm số từ thầy cô và gia đình', 'Vừa phải học vừa phải tham gia nhiều hoạt động'],
    physicalSensations: ['Đau đầu, căng cứng vùng cơ cổ và vai', 'Khó ngủ hoặc ngủ chập chờn', 'Dễ mất kiên nhẫn'],
    copingTips: [
      'Áp dụng quy tắc dừng 10 phút: Đứng dậy, rời khỏi bàn học và vận động nhẹ.',
      'Lập danh sách 3 việc quan trọng nhất cho hôm nay, tạm hoãn những việc còn lại.',
      'Dám nói với bố mẹ hoặc thầy cô: "Con đang cảm thấy hơi quá tải, con cần thêm chút thời gian".',
      'Nhớ rằng giá trị của bạn không chỉ gói gọn trong một bài kiểm tra hay một kỳ học.'
    ],
    selfCareActions: ['Đi tắm nước ấm', 'Tập giãn cơ vai gáy 5 phút', 'Tạm tắt thông báo điện thoại trong 1 giờ']
  },
  angry: {
    id: 'angry',
    label: 'Tức giận',
    emoji: '😡',
    color: '#DC2626',
    bgLight: 'bg-red-50',
    bgDark: 'dark:bg-red-950/40',
    borderLight: 'border-red-200 dark:border-red-800',
    description: 'Phản ứng bảo vệ khi bạn cảm thấy ranh giới của mình bị xâm phạm, bị đối xử bất công hoặc không được tôn trọng.',
    commonTriggers: ['Bị bạn bè phán xét vô cớ hoặc nói xấu sau lưng', 'Bị phạt oan', 'Ý kiến của mình bị gạt đi không lắng nghe'],
    physicalSensations: ['Nóng bừng ở mặt và ngực', 'Nắm chặt tay, nghiến răng', 'Hơi thở gấp gáp'],
    copingTips: [
      'Đếm ngược từ 10 về 1 trước khi phản hồi tin nhắn hoặc lời nói.',
      'Rời khỏi không gian căng thẳng tạm thời để hạ nhiệt cảm xúc.',
      'Viết hết những gì muốn nói vào một mẩu giấy rồi xé đi.',
      'Khi đã bình tĩnh, dùng câu "Tôi cảm thấy..." để nói chuyện rõ ràng thay vì công kích đối phương.'
    ],
    selfCareActions: ['Vận động mạnh như nhảy dây hoặc đi bộ nhanh', 'Uống một cốc nước lạnh', 'Hít thở sâu 5 lần']
  },
  tired: {
    id: 'tired',
    label: 'Mệt mỏi',
    emoji: '😴',
    color: '#8B5CF6',
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-950/40',
    borderLight: 'border-purple-200 dark:border-purple-800',
    description: 'Cạn kiệt năng lượng cả về thể chất lẫn tinh thần sau chuỗi ngày hoạt động liên tục mà chưa được nghỉ ngơi phục hồi.',
    commonTriggers: ['Thức khuya ôn bài nhiều đêm liên tục', 'Sử dụng điện thoại quá giờ ngủ', 'Phải đối diện với nhiều căng thẳng liên tiếp'],
    physicalSensations: ['Mắt trĩu nặng, đau nhức cơ bắp', 'Khó tập trung suy nghĩ', 'Chuyển động chậm chạp'],
    copingTips: [
      'Cho phép bản thân ngủ một giấc trọn vẹn tối nay mà không cắn rứt.',
      'Chợp mắt ngắn 20 phút (power nap) vào buổi trưa.',
      'Uống đủ nước lọc thay vì lạm dụng nước ngọt có ga hoặc trà sữa chứa caffeine.',
      'Tạm gác lại những việc không bắt buộc.'
    ],
    selfCareActions: ['Ngủ sớm hơn thường lệ 1 tiếng', 'Đặt điện thoại xa giường ngủ', 'Ngâm chân nước ấm']
  },
  confused: {
    id: 'confused',
    label: 'Bối rối',
    emoji: '🤔',
    color: '#0284C7',
    bgLight: 'bg-sky-50',
    bgDark: 'dark:bg-sky-950/40',
    borderLight: 'border-sky-200 dark:border-sky-800',
    description: 'Cảm giác phân vân, mơ hồ khi đứng trước nhiều lựa chọn hoặc khi các luồng thông tin xung quanh trái ngược nhau.',
    commonTriggers: ['Chọn ban học (KHTN hay KHXH)', 'Chọn trường thi cấp 3 hoặc đại học', 'Khi có sự bất đồng quan điểm giữa bố mẹ và bản thân'],
    physicalSensations: ['Cảm giác nghẽn suy nghĩ, khó đưa ra quyết định', 'Đảo mắt nhiều'],
    copingTips: [
      'Kẻ bảng ưu điểm và nhược điểm cho từng phương án.',
      'Hỏi kinh nghiệm của anh chị đi trước hoặc thầy cô tư vấn.',
      'Chấp nhận rằng không có lựa chọn nào là hoàn hảo 100%, quan trọng là mình sẵn sàng nỗ lực.'
    ],
    selfCareActions: ['Vẽ sơ đồ tư duy (mindmap)', 'Nói chuyện với một người có cái nhìn khách quan']
  },
  fearful: {
    id: 'fearful',
    label: 'Sợ hãi',
    emoji: '😨',
    color: '#D97706',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/40',
    borderLight: 'border-amber-200 dark:border-amber-800',
    description: 'Phản xạ bản năng báo động khi bạn cảm thấy nguy hiểm, bị đe dọa hoặc lo sợ điều tồi tệ nhất sẽ xảy ra.',
    commonTriggers: ['Bị đe dọa, tẩy chay ở trường', 'Sợ làm thất vọng người thân', 'Đối diện với bài kiểm tra quyết định'],
    physicalSensations: ['Ớn lạnh sống lưng, tim đập thình thịch', 'Run rẩy ở bàn tay hoặc chân'],
    copingTips: [
      'Xác định xem mối đe dọa có thật ngay lúc này hay chỉ là nỗi sợ trong tưởng tượng.',
      'Nếu bạn đang bị bắt nạt hoặc đe dọa, hãy báo ngay cho người lớn đáng tin cậy.',
      'Tìm một nơi an toàn và có người bạn tin cậy bên cạnh.'
    ],
    selfCareActions: ['Tìm ngay đến phòng giáo viên hoặc người nhà', 'Bám vào một vật thể quen thuộc để nối đất (grounding)']
  }
};

export const QUICK_EMOTIONS: EmotionType[] = [
  'happy',
  'peaceful',
  'neutral',
  'anxious',
  'sad',
  'stressed',
  'angry',
  'tired'
];
