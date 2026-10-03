export interface SupportPillar {
  id: string;
  icon: string;
  title: string;
  roleDescription: string;
  howToApproach: string;
  suggestedPhrases: string[];
  goodFor: string[];
}

export const SUPPORT_PILLARS: SupportPillar[] = [
  {
    id: 'family',
    icon: 'HeartHandshake',
    title: 'Gia đình & Người thân',
    roleDescription: 'Bố mẹ, anh chị em hoặc người thân lớn tuổi trong gia đình là chỗ dựa bền vững nhất về mặt tinh thần và điều kiện vật chất.',
    howToApproach: 'Chọn một buổi tối rảnh rỗi hoặc khi cùng bố mẹ làm việc nhà để bắt đầu cuộc trò chuyện. Có thể viết thư nếu thấy khó mở lời trực tiếp.',
    suggestedPhrases: [
      '"Dạo này con cảm thấy hơi áp lực trong chuyện học hành, con muốn tâm sự với bố mẹ một chút được không ạ?"',
      '"Con thấy mình đang hơi quá tải, con cần bố mẹ giúp con sắp xếp lại lịch học thêm."'
    ],
    goodFor: ['Áp lực học tập và chi phí', 'Sức khỏe thể chất và giấc ngủ', 'Thay đổi lịch sinh hoạt gia đình']
  },
  {
    id: 'teachers',
    icon: 'GraduationCap',
    title: 'Giáo viên & Thầy cô tin cậy',
    roleDescription: 'Thầy cô chủ nhiệm hoặc giáo viên bộ môn mà bạn cảm thấy gần gũi, thấu hiểu và có cái nhìn bao dung với học sinh.',
    howToApproach: 'Gặp thầy cô sau giờ tan học ở phòng chờ giáo viên hoặc gửi một email/tin nhắn xin một buổi gặp riêng 10-15 phút.',
    suggestedPhrases: [
      '"Em chào cô, gần đây em gặp chút khó khăn trong việc tiếp thu môn học và đang thấy lo lắng, em có thể xin cô lời khuyên được không ạ?"',
      '"Thưa thầy, trong lớp em đang gặp một số khúc mắc với bạn bè làm ảnh hưởng việc học, em nhờ thầy lắng nghe và tư vấn giúp em."'
    ],
    goodFor: ['Khó khăn với bài vở, kiến thức', 'Mâu thuẫn hoặc hiểu lầm trong lớp học', 'Định hướng học tập và kỳ thi']
  },
  {
    id: 'school-counselor',
    icon: 'Building2',
    title: 'Phòng Tư vấn Tâm lý Học đường',
    roleDescription: 'Các thầy cô phụ trách phòng tham vấn tâm lý tại trường được đào tạo để lắng nghe một cách bảo mật, không phán xét và không chấm điểm.',
    howToApproach: 'Bạn có thể ghé trực tiếp phòng tham vấn vào giờ ra chơi hoặc đăng ký qua hòm thư/mẫu đơn ẩn danh của trường (nếu có).',
    suggestedPhrases: [
      '"Em muốn tìm một không gian yên tĩnh để chia sẻ về những căng thẳng gần đây mà em không biết phải nói cùng ai."',
      '"Em muốn học cách quản lý cảm xúc và vượt qua sự tự ti khi ở trong tập thể."'
    ],
    goodFor: ['Cảm giác cô đơn, lo âu, lạc lõng', 'Bị bắt nạt hoặc cô lập', 'Tìm kiếm phương pháp cân bằng cảm xúc']
  },
  {
    id: 'specialists',
    icon: 'Stethoscope',
    title: 'Chuyên gia Tâm lý & Bác sĩ Sức khỏe Tinh thần',
    roleDescription: 'Các nhà tâm lý lâm sàng, chuyên viên tâm lý giáo dục và bác sĩ chuyên khoa tại các trung tâm tham vấn hoặc bệnh viện uy tín.',
    howToApproach: 'Trao đổi cùng phụ huynh để được đưa đến các cơ sở y tế hoặc trung tâm tham vấn tâm lý chuyên nghiệp được cấp phép.',
    suggestedPhrases: [
      '"Con cảm thấy những căng thẳng này kéo dài nhiều tuần và ảnh hưởng đến giấc ngủ của con, con muốn được gặp chuyên gia để hiểu rõ hơn."',
      '"Em cần sự trợ giúp chuyên môn để vượt qua giai đoạn khủng hoảng này."'
    ],
    goodFor: ['Mất ngủ kéo dài, suy sụp năng lượng', 'Căng thẳng trầm trọng ảnh hưởng thể chất', 'Cần can thiệp tâm lý chuyên sâu']
  }
];

export const WHEN_TO_SEEK_HELP = [
  {
    icon: 'Clock',
    title: 'Khi cảm giác khó khăn kéo dài liên tục',
    desc: 'Cảm giác buồn bã, lo âu, chán nản kéo dài từ 2 tuần trở lên mà không có dấu hiệu thuyên giảm dù bạn đã cố gắng nghỉ ngơi.'
  },
  {
    icon: 'TrendingDown',
    title: 'Khi ảnh hưởng rõ rệt đến việc học tập',
    desc: 'Không thể tập trung nghe giảng, kết quả học tập sa sút đột ngột, luôn sợ hãi mỗi khi nghĩ đến việc bước chân vào lớp học.'
  },
  {
    icon: 'Moon',
    title: 'Khi sinh hoạt thường ngày bị đảo lộn',
    desc: 'Mất ngủ triền miên, thức giấc giữa đêm hoảng sợ, chán ăn hoặc ăn uống vô độ, đau đầu hoặc đau bụng không rõ nguyên nhân y tế.'
  },
  {
    icon: 'UserX',
    title: 'Khi khó khăn trong các mối quan hệ',
    desc: 'Cảm thấy xa lánh bạn bè, tự thu mình vào một góc, dễ nổi nóng và cắt đứt liên lạc với những người thân thiết nhất.'
  },
  {
    icon: 'MessageSquareHeart',
    title: 'Khi bạn cảm thấy mình cần một người lắng nghe',
    desc: 'Chỉ đơn giản là bạn cảm thấy gánh nặng trong lòng quá lớn và không muốn phải tự mình chống chọi thêm một mình nữa.'
  }
];

export const HOTLINES = [
  {
    name: 'Tổng đài Quốc gia Bảo vệ Trẻ em',
    number: '111',
    note: 'Miễn phí cước cuộc gọi · Hoạt động 24/7 toàn quốc · Tư vấn, hỗ trợ khẩn cấp cho trẻ em và học sinh',
    badge: 'Khẩn cấp quốc gia'
  },
  {
    name: 'Đường dây nóng Hỗ trợ Khủng hoảng Ngày Mai',
    number: '096 306 1414',
    note: 'Hỗ trợ tâm lý miễn phí cho người trầm cảm, khủng hoảng cảm xúc (từ 13h - 20h30 hằng ngày)',
    badge: 'Tư vấn tâm lý'
  },
  {
    name: 'Tổng đài Tư vấn Sức khỏe Tâm thần TW',
    number: '1900 9095',
    note: 'Kênh tư vấn thông tin y tế và sức khỏe tinh thần chuyên môn của Bộ Y tế',
    badge: 'Y tế chính thống'
  }
];
