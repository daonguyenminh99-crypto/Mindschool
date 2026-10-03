import { SkillItem } from '../types';

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'skill-time-management',
    number: '01',
    title: 'Quản lý thời gian học tập',
    subtitle: 'Kỹ thuật chia khối thời gian & phương pháp Pomodoro điều chỉnh',
    target: 'Giúp học sinh phân bổ thời gian học tập - nghỉ ngơi hợp lý, tránh dồn bài vở vào đêm khuya.',
    whyItMatters: 'Khi không có kế hoạch rõ ràng, não bộ liên tục bị ám ảnh bởi cảm giác "còn nhiều bài chưa làm", dẫn đến căng thẳng và mất ngủ. Một lịch trình linh hoạt mang lại sự chủ động và giải phóng tâm trí.',
    steps: [
      {
        title: 'Bước 1: Liệt kê toàn bộ nhiệm vụ',
        description: 'Vào đầu mỗi buổi tối, viết ra tất cả bài tập cần nộp vào ngày mai và các dự án trong tuần.'
      },
      {
        title: 'Bước 2: Phân loại theo Ma trận Ưu tiên',
        description: 'Nhận diện việc quan trọng & khẩn cấp (cần làm ngay), việc quan trọng nhưng chưa khẩn (chia nhỏ làm dần).'
      },
      {
        title: 'Bước 3: Học theo khối Pomodoro (25 phút học - 5 phút nghỉ)',
        description: 'Trong 25 phút, chỉ mở một môn duy nhất và cất điện thoại ngoài tầm với. Hết 25 phút, đứng dậy đi lại và uống nước.'
      },
      {
        title: 'Bước 4: Đánh giá và điều chỉnh',
        description: 'Sau 4 chu kỳ Pomodoro, nghỉ dài 15-20 phút. Nếu nhiệm vụ nào chưa xong, chuyển sang khung giờ bổ sung.'
      }
    ],
    practicalExample: 'Bạn Nam lớp 10 thường thức đến 1h sáng vì vừa học vừa lướt mạng xã hội. Khi áp dụng 3 chu kỳ Pomodoro (tổng 75 phút tập trung cao độ), Nam hoàn thành bài tập toán và lý trước 22h, có trọn vẹn 1 tiếng đọc truyện thư giãn trước khi ngủ.',
    checklist: [
      { id: 'tm-1', text: 'Tôi đã ghi ra danh sách bài tập cần hoàn thành hôm nay.' },
      { id: 'tm-2', text: 'Tôi đã chọn ra một việc quan trọng nhất để làm trước tiên.' },
      { id: 'tm-3', text: 'Tôi đã để điện thoại ở chế độ im lặng hoặc để cách xa bàn học.' },
      { id: 'tm-4', text: 'Tôi đã hoàn thành ít nhất 1 phiên học tập trung không chuyển tab.' }
    ]
  },
  {
    id: 'skill-focus-recovery',
    number: '02',
    title: 'Học tập khi mất tập trung',
    subtitle: 'Kỹ thuật lấy lại sự chú ý và vượt qua "sương mù não"',
    target: 'Nhận diện các tác nhân gây xao nhãng và đưa tâm trí quay trở lại trang sách nhẹ nhàng.',
    whyItMatters: 'Trong thời đại của thông báo mạng xã hội và video ngắn, khoảng chú ý của học sinh bị phân mảnh nghiêm trọng. Rèn luyện khả năng chú ý đơn nhiệm là chìa khóa để tiếp thu bài nhanh gấp đôi.',
    steps: [
      {
        title: 'Bước 1: Làm sạch không gian thị giác',
        description: 'Dọn sạch mặt bàn, chỉ để lại cuốn sách và dụng cụ học của môn bạn đang học. Mặt bàn bừa bộn kích thích não bộ phân tán.'
      },
      {
        title: 'Bước 2: Sử dụng "Tờ giấy ghi xao nhãng"',
        description: 'Đặt một tờ giấy trắng cạnh bàn. Mỗi khi một ý nghĩ bất chợt nảy ra (như "nhớ xem video này", "nhắn cho bạn kia"), ghi nó xuống giấy và quay lại học ngay.'
      },
      {
        title: 'Bước 3: Quy tắc 2 phút khởi động',
        description: 'Tự nhủ: "Mình chỉ cần đọc 2 trang này hoặc chép đề câu này thôi". Khi guồng quay đã bắt đầu, sự tập trung sẽ tự động đến.'
      }
    ],
    practicalExample: 'Thay vì ngồi bần thần trước bài văn nghị luận xã hội, bạn Mai vẽ nhanh sơ đồ 3 luận điểm chính vào giấy nháp. Hoạt động viết tay giúp kích hoạt bán cầu não trái và dập tắt cảm giác chán nản.',
    checklist: [
      { id: 'fc-1', text: 'Tôi đã dọn gọn gàng mặt bàn học chỉ để lại sách vở môn cần làm.' },
      { id: 'fc-2', text: 'Tôi đã chuẩn bị một tờ giấy ghi chép ý nghĩ xao nhãng.' },
      { id: 'fc-3', text: 'Tôi đã hít thở sâu 3 nhịp chậm trước khi bắt đầu đọc bài.' },
      { id: 'fc-4', text: 'Tôi không mở nhiều hơn 3 tab trình duyệt khi tra cứu tài liệu.' }
    ]
  },
  {
    id: 'skill-exam-prep',
    number: '03',
    title: 'Chuẩn bị trước kỳ thi',
    subtitle: 'Chiến lược ôn tập khoa học & giữ vững tâm lý phòng thi',
    target: 'Chấm dứt thói quen học vẹt xuyên đêm, xây dựng sơ đồ kiến thức bền vững và tự tin.',
    whyItMatters: 'Kiến thức được nhồi nhét trong đêm trước thi sẽ bay biến rất nhanh sau khi nộp bài và làm cơ thể kiệt quệ. Ôn tập phân tán (Spaced Repetition) giúp kiến thức lưu vào trí nhớ dài hạn mà không gây hoảng loạn.',
    steps: [
      {
        title: 'Bước 1: Lập sơ đồ cây kiến thức',
        description: 'Vẽ lại mục lục chương trình học theo dạng nhánh chính - nhánh phụ để nhìn thấy bức tranh tổng thể.'
      },
      {
        title: 'Bước 2: Thực hành tự kiểm tra (Active Recall)',
        description: 'Gấp sách lại và tự giảng giải lại định lý hoặc tự giải một đề thi năm trước không nhìn đáp án.'
      },
      {
        title: 'Bước 3: Giữ nhịp sinh học tối trước ngày thi',
        description: 'Dừng ôn tập trước 21h30 tối trước ngày thi. Chuẩn bị sẵn bút chì, thước kẻ, máy tính bỏ túi và đi ngủ trước 22h30.'
      }
    ],
    practicalExample: 'Bạn Quân trước đây thường thức đến 3h sáng trước ngày thi Sử và vào phòng thi bị lẫn lộn các mốc thời gian. Sau khi áp dụng thẻ ghi nhớ flashcards tự đố bản thân từ 1 tuần trước, Quân ngủ đủ 8 tiếng và đạt điểm 9 một cách nhẹ nhõm.',
    checklist: [
      { id: 'ep-1', text: 'Tôi đã nắm rõ cấu trúc đề thi và các phần trọng tâm.' },
      { id: 'ep-2', text: 'Tôi đã thử giải ít nhất một đề minh họa có canh giờ.' },
      { id: 'ep-3', text: 'Tôi đã chuẩn bị sẵn đầy đủ dụng cụ học tập vào balô từ tối hôm trước.' },
      { id: 'ep-4', text: 'Tôi cam kết đi ngủ trước 22h30 tối trước ngày kiểm tra.' }
    ]
  },
  {
    id: 'skill-conflict-communication',
    number: '04',
    title: 'Giao tiếp khi có mâu thuẫn',
    subtitle: 'Nghệ thuật tháo gỡ hiểu lầm bằng thông điệp "Tôi cảm thấy..."',
    target: 'Biết cách chia sẻ cảm xúc và bảo vệ ranh giới cá nhân một cách tôn trọng mà không gây chiến tranh.',
    whyItMatters: 'Khi tức giận, chúng ta hay dùng từ "Cậu lúc nào cũng..." hoặc "Tại cậu mà...". Điều này kích hoạt cơ chế phòng vệ của đối phương và biến một mâu thuẫn nhỏ thành một cuộc cãi vã lớn.',
    steps: [
      {
        title: 'Bước 1: Hạ nhiệt cảm xúc (Quy tắc 24 giờ)',
        description: 'Nếu cảm thấy giận sôi người, không nhắn tin hay gọi điện tranh luận ngay. Đợi ít nhất vài tiếng đến khi nhịp tim trở lại bình thường.'
      },
      {
        title: 'Bước 2: Sử dụng công thức "Tôi - Khi - Vì - Mong muốn"',
        description: 'Nói: "Mình cảm thấy buồn [Cảm xúc] khi cậu huỷ hẹn [Sự việc cụ thể] vì mình đã chờ cả buổi [Lý do]. Lần sau cậu báo trước giúp mình nhé [Giải pháp]".'
      },
      {
        title: 'Bước 3: Lắng nghe phản hồi không ngắt lời',
        description: 'Cho đối phương cơ hội giải thích lý do từ góc nhìn của họ mà không nhảy vào chỉ trích.'
      }
    ],
    practicalExample: 'Khi Lan phát hiện bài làm nhóm của mình bị bạn cùng tổ tự ý sửa, thay vì đăng đàn bóng gió lên Story, Lan nhắn riêng: "Mình thấy hơi bất ngờ và chạnh lòng khi phần của mình bị thay đổi mà chưa trao đổi. Chiều nay tụi mình cùng xem lại bản thảo nhé?". Hai bạn đã thống nhất được bài làm tốt hơn rất nhiều.',
    checklist: [
      { id: 'cc-1', text: 'Tôi đã dừng lại và không trả lời tin nhắn khi đang bực tức.' },
      { id: 'cc-2', text: 'Tôi đã xác định rõ sự việc cụ thể khiến mình khó chịu (không khái quát hóa).' },
      { id: 'cc-3', text: 'Tôi đã chuẩn bị cách nói bắt đầu bằng "Mình cảm thấy..." thay vì "Cậu lúc nào cũng...".' },
      { id: 'cc-4', text: 'Tôi sẵn sàng lắng nghe lý do của bạn với thái độ thiện chí.' }
    ]
  },
  {
    id: 'skill-peer-pressure',
    number: '05',
    title: 'Nói "không" với áp lực bạn bè',
    subtitle: 'Bảo vệ giá trị bản thân trước những lời rủ rê tiêu cực',
    target: 'Giúp học sinh tự tin từ chối những hành vi không phù hợp với chuẩn mực cá nhân mà vẫn giữ được sự văn minh.',
    whyItMatters: 'Nhu cầu được hòa nhập vào nhóm bạn ở lứa tuổi dậy thì là rất mạnh mẽ. Tuy nhiên, đánh mất chính mình để làm hài lòng người khác thường dẫn đến cảm giác hối hận và tự ti sau này.',
    steps: [
      {
        title: 'Bước 1: Nhận diện phản ứng cơ thể',
        description: 'Khi bị rủ rê làm điều gì đó (trốn học, thử chất kích thích, nói xấu người khác), nếu bụng bạn thắt lại hoặc thấy bất an, đó là tín hiệu cảnh báo của trực giác.'
      },
      {
        title: 'Bước 2: Kỹ thuật "Đĩa hát xước" (Broken Record)',
        description: 'Lặp lại lời từ chối ngắn gọn và chắc chắn với cùng một tông giọng bình thản: "Không, mình không muốn làm việc đó đâu".'
      },
      {
        title: 'Bước 3: Đưa ra lựa chọn thay thế tích cực',
        description: 'Nếu muốn duy trì tình bạn: "Mình không đi trốn học được, nhưng tan học tụi mình đi uống trà sữa nhé".'
      }
    ],
    practicalExample: 'Khi nhóm bạn thân rủ cúp tiết thể dục để chơi điện tử, Đức mỉm cười và nói: "Hôm nay mình cần kiểm tra thể lực để lấy điểm học kỳ nên mình không cúp được. Chiều xong việc tụi mình gặp nhau sau". Nhóm bạn tôn trọng quyết định của Đức mà không trêu chọc.',
    checklist: [
      { id: 'pp-1', text: 'Tôi hiểu rõ điều gì là an toàn và phù hợp với giá trị của mình.' },
      { id: 'pp-2', text: 'Tôi tập sẵn câu từ chối ngắn gọn, dứt khoát nhưng lịch sự.' },
      { id: 'pp-3', text: 'Tôi không cảm thấy phải bịa lý do phức tạp để nói "Không".' },
      { id: 'pp-4', text: 'Tôi nhớ rằng một người bạn thực sự sẽ tôn trọng ranh giới của tôi.' }
    ]
  },
  {
    id: 'skill-rest-recovery',
    number: '06',
    title: 'Nghỉ ngơi và phục hồi tinh thần',
    subtitle: 'Nghệ thuật "sạc pin" năng lượng cho não bộ và cơ thể',
    target: 'Phân biệt giữa việc "nghỉ ngơi thực sự" và "lướt mạng xã hội gây kiệt sức thêm", tái tạo năng lượng hiệu quả.',
    whyItMatters: 'Nhiều bạn nghĩ lướt video ngắn 2 tiếng là nghỉ ngơi, nhưng thực chất não bộ đang bị bội thực dopamine và ánh sáng xanh, khiến bạn càng mệt mỏi hơn sau khi rời màn hình.',
    steps: [
      {
        title: 'Bước 1: Thực hành Thở Hộp (Box Breathing)',
        description: 'Ngồi thẳng lưng, hít vào bằng mũi 4 giây, giữ hơi 4 giây, thở ra bằng miệng 4 giây, giữ phổi trống 4 giây. Lặp lại 4 vòng.'
      },
      {
        title: 'Bước 2: Thiết lập 15 phút Detox Màn hình',
        description: 'Mỗi ngày dành 15-30 phút không chạm vào bất kỳ thiết bị điện tử nào. Nhìn ra xa qua cửa sổ, ngắm cây xanh hoặc vươn vai.'
      },
      {
        title: 'Bước 3: Giấc ngủ phục hồi chất lượng',
        description: 'Đảm bảo ngủ đủ 7-8 tiếng mỗi đêm. Tắt thiết bị phát sóng wifi gần đầu giường và giữ phòng ngủ mát mẻ, tối.'
      }
    ],
    practicalExample: 'Sau mỗi buổi chiều học đội tuyển căng thẳng, thay vì nằm lướt TikTok, Hân đi bộ nhẹ nhàng quanh công viên gần nhà 20 phút và nghe tiếng chim hót. Khi trở về nhà, đầu óc Hân nhẹ bẫng và ăn tối ngon miệng hơn hẳn.',
    checklist: [
      { id: 'rr-1', text: 'Tôi đã thực hành ít nhất 1 bài tập thở sâu hôm nay.' },
      { id: 'rr-2', text: 'Tôi đã dành ra 15 phút rời xa màn hình điện thoại/máy tính.' },
      { id: 'rr-3', text: 'Tôi đã uống đủ một ly nước lọc ấm khi cảm thấy mệt mỏi.' },
      { id: 'rr-4', text: 'Tôi đã lên kế hoạch đi ngủ đúng giờ để cơ thể được phục hồi.' }
    ]
  }
];
