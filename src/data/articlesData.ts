import { Article } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'exam-anxiety',
    title: 'Vì sao trước kỳ thi chúng ta thường lo lắng?',
    category: 'Học tập',
    readTime: '4 phút',
    shortDescription: 'Hiểu cơ chế sinh học của sự căng thẳng trước giờ kiểm tra và cách biến nỗi lo thành sự tập trung tích cực.',
    author: 'Tổ Tư vấn Tâm lý Học đường',
    iconName: 'GraduationCap',
    fullContent: [
      'Mỗi khi kỳ thi học kỳ hay kỳ thi chuyển cấp cận kề, nhiều bạn học sinh cảm thấy lồng ngực đập thình thịch, bàn tay đổ mồ hôi, thậm chí vừa nhìn vào đề thi đã có cảm giác "đầu óc trống rỗng". Đây không phải là dấu hiệu bạn học kém hay yếu đuối, mà là một phản xạ sinh học rất bình thường của cơ thể mang tên phản ứng "chiến đấu hoặc bỏ chạy" (Fight or Flight).',
      'Khi não bộ nhận định kỳ thi là một thử thách quan trọng ảnh hưởng đến tương lai, tuyến thượng thận sẽ tiết ra cortisol và adrenaline. Những hormone này giúp tăng nhịp tim, bơm máu đến cơ bắp để sẵn sàng ứng phó. Tuy nhiên, nếu lượng hormone này quá cao và kéo dài, vùng vỏ não trước trán (nơi chịu trách nhiệm ghi nhớ và tư duy logic) sẽ bị ức chế tạm thời, dẫn đến hiện tượng "quên sạch bài".',
      'Để kiểm soát lo lắng, bí quyết không phải là loại bỏ hoàn toàn cảm giác hồi hộp, mà là đưa nó về mức vừa phải – mức giúp bạn tỉnh táo và tập trung nhất (theo Định luật Yerkes-Dodson).'
    ],
    keyTakeaways: [
      'Lo lắng trước kỳ thi là phản ứng bảo vệ tự nhiên của cơ thể.',
      'Một lượng hồi hộp vừa phải thực chất giúp não bộ tỉnh táo hơn.',
      'Kiểm soát nhịp thở là chìa khóa vật lý nhanh nhất để báo hiệu cho não bộ rằng bạn đang an toàn.'
    ],
    practicalTips: [
      'Hít thở theo nhịp 4-4: Hít sâu qua mũi trong 4 giây, thở chậm qua miệng trong 4 giây ngay trước khi nhận đề.',
      'Chuyển câu thoại nội tâm từ "Nếu mình làm sai thì tiêu đời" thành "Mình đã ôn tập những phần cốt lõi và mình sẽ làm từng câu một".',
      'Dành 5 phút đầu giờ để lướt qua toàn bộ đề, bắt đầu từ những câu bạn chắc chắn nhất để tạo đà tự tin.'
    ]
  },
  {
    id: 'academic-stress',
    title: 'Stress học tập là gì & khi nào nó trở thành báo động?',
    category: 'Học tập',
    readTime: '5 phút',
    shortDescription: 'Phân biệt áp lực tích cực giúp bạn tiến bộ với căng thẳng độc hại gây kiệt sức tinh thần.',
    author: 'Chuyên viên Tâm lý Giáo dục',
    iconName: 'BookOpen',
    fullContent: [
      'Trong thời đại học tập cạnh tranh, khái niệm "áp lực" dường như đã trở thành người bạn đồng hành quen thuộc của học sinh THCS và THPT. Từ khối lượng bài vở khổng lồ, các lớp học thêm liên miên cho đến kỳ vọng của gia đình và sự so sánh với "con nhà người ta".',
      'Stress học tập là trạng thái căng thẳng về tinh thần lẫn thể chất nảy sinh khi yêu cầu của việc học vượt quá khả năng thích nghi và nguồn lực hỗ trợ hiện có của học sinh. Stress có hai dạng: Eustress (áp lực tích cực - thúc đẩy bạn hoàn thành hạn nộp) và Distress (áp lực tiêu cực - khiến bạn tê liệt và kiệt quệ).',
      'Khi stress chuyển sang giai đoạn mạn tính, bạn có thể bắt đầu xuất hiện những triệu chứng như: mất ngủ, đau dạ dày không rõ nguyên nhân, dễ cáu gắt với người thân, hoặc cảm thấy bất lực dù trước đây rất yêu thích môn học đó.'
    ],
    keyTakeaways: [
      'Áp lực chỉ hữu ích khi có thời gian nghỉ ngơi và hồi phục xen kẽ.',
      'Cơ thể luôn gửi tín hiệu cảnh báo sớm qua giấc ngủ và tiêu hóa trước khi tinh thần gục ngã.',
      'Thừa nhận mình đang quá tải là một hành động dũng cảm, không phải là sự bỏ cuộc.'
    ],
    practicalTips: [
      'Ghi chép lại lịch sinh hoạt trong 3 ngày để nhận diện những "kẻ cắp thời gian" và thời lượng ngủ thực tế.',
      'Thiết lập "vùng cấm học bài" ít nhất 45 phút trước khi đi ngủ (không mở sách vở hay giải toán trên giường).',
      'Nếu cảm giác quá tải kéo dài trên 2 tuần liên tiếp, hãy chủ động nói chuyện với giáo viên chủ nhiệm hoặc cha mẹ.'
    ]
  },
  {
    id: 'loss-of-motivation',
    title: 'Điều gì khiến chúng ta mất động lực học tập?',
    category: 'Cảm xúc',
    readTime: '4 phút',
    shortDescription: 'Khám phá nguyên nhân sâu xa phía sau sự trì hoãn và cách nhóm lại ngọn lửa tò mò tự nhiên.',
    author: 'Ban Cố vấn Học đường',
    iconName: 'Sparkles',
    fullContent: [
      'Nhiều bạn học sinh thường tự trách mình là "lười biếng" khi ngồi vào bàn học hàng giờ mà không viết được dòng nào. Nhưng dưới góc nhìn tâm lý học, lười biếng hiếm khi là nguyên nhân gốc rễ. Đằng sau sự mất động lực thường là nỗi sợ thất bại, sự quá tải thông tin hoặc cảm giác mất đi ý nghĩa của việc mình đang làm.',
      'Khi chúng ta chỉ học vì những yếu tố ngoại tại (như sợ bị mắng, học vì điểm số cho người khác xem), nguồn năng lượng ý chí sẽ cạn kiệt rất nhanh. Não bộ con người được thiết kế để tìm kiếm niềm vui và sự an toàn; nếu việc học gắn liền với sự căng thẳng và chỉ trích, não bộ sẽ tự động thúc đẩy hành vi né tránh (lướt mạng xã hội, chơi game, ngủ).',
      'Để khôi phục động lực, chúng ta cần chuyển dịch từ mục tiêu kết quả (phải đạt điểm 10) sang mục tiêu tiến trình (hôm nay mình hiểu rõ hơn định lý này).'
    ],
    keyTakeaways: [
      'Mất động lực thường là tiếng kêu cứu của não bộ khi bị quá tải, không phải bản chất con người bạn lười biếng.',
      'Sự hoàn hảo chủ nghĩa (Perfectionism) chính là kẻ thù lớn nhất của sự bắt đầu.',
      'Hành động tạo ra cảm hứng, chứ không phải chờ có cảm hứng mới hành động.'
    ],
    practicalTips: [
      'Áp dụng "Quy tắc 5 phút": Cam kết chỉ ngồi mở sách và làm đúng 5 phút. Sau 5 phút, bạn có quyền dừng lại nếu muốn (đa số não bộ sẽ tiếp tục làm khi đã vượt qua rào cản khởi động).',
      'Chia mục tiêu lớn thành các bước vi mô (Micro-tasks) dễ đến mức bạn không thể từ chối.',
      'Tự thưởng cho bản thân một niềm vui nhỏ sau mỗi buổi học tập trung.'
    ]
  },
  {
    id: 'peer-conflict',
    title: 'Cách xử lý mâu thuẫn lành mạnh với bạn bè',
    category: 'Bạn bè',
    readTime: '5 phút',
    shortDescription: 'Làm thế nào để bảo vệ chính kiến của mình mà không phá vỡ tình bạn quý giá ở tuổi học trò.',
    author: 'Tổ Tư vấn Kỹ năng Xã hội',
    iconName: 'Users',
    fullContent: [
      'Tình bạn ở lứa tuổi học sinh là một trong những điểm tựa tinh thần thiêng liêng nhất. Tuy nhiên, sự khác biệt về tính cách, những lời nói vô tình, hoặc áp lực từ nhóm bạn có thể dẫn đến những hiểu lầm, giận dỗi hoặc chiến tranh lạnh kéo dài.',
      'Khi mâu thuẫn nảy sinh, sai lầm phổ biến nhất là vội vàng công kích đối phương trên mạng xã hội (đăng status bóng gió) hoặc lôi kéo người khác "tẩy chay" phe đối lập. Những hành vi này chỉ làm mâu thuẫn leo thang và để lại tổn thương tâm lý sâu sắc cho tất cả các bên liên quan.',
      'Một mối quan hệ bạn bè lành mạnh không phải là không bao giờ cãi nhau, mà là biết cách đối thoại và lắng nghe nhau sau những bất đồng.'
    ],
    keyTakeaways: [
      'Bất đồng quan điểm là điều tự nhiên giữa hai cá nhân độc lập.',
      'Tránh tranh luận qua tin nhắn khi đang bốc hỏa vì câu chữ dễ bị suy diễn sai sắc thái biểu cảm.',
      'Lắng nghe để hiểu góc nhìn của bạn, không phải lắng nghe chỉ để tìm sơ hở phản bác.'
    ],
    practicalTips: [
      'Sử dụng công thức giao tiếp "Tôi cảm thấy... khi... vì...": Thay vì nói "Cậu lúc nào cũng ích kỷ", hãy thử: "Mình cảm thấy buồn khi cậu không đợi mình cùng về, vì mình rất coi trọng thời gian nói chuyện với cậu".',
      'Đề nghị một cuộc nói chuyện trực tiếp, riêng tư ở góc sân trường yên tĩnh.',
      'Nếu nhận ra mình có phần sai, một lời xin lỗi chân thành và cụ thể sẽ mở cánh cửa hòa giải nhanh nhất.'
    ]
  },
  {
    id: 'family-expectations',
    title: 'Áp lực kỳ vọng từ gia đình: Làm sao để đối thoại?',
    category: 'Gia đình',
    readTime: '6 phút',
    shortDescription: 'Cầu nối thấu hiểu giữa khoảng cách thế hệ và cách chia sẻ mong muốn cá nhân với bố mẹ.',
    author: 'Chuyên gia Tâm lý Gia đình & Trẻ vị thành niên',
    iconName: 'HeartHandshake',
    fullContent: [
      '"Bố mẹ chỉ muốn tốt cho con", "Nhìn con nhà người ta xem" – Đây là những câu nói quen thuộc có thể tạo nên sức nặng vô hình đè nặng lên vai của nhiều bạn trẻ. Đôi khi, tình yêu thương và sự lo lắng cho tương lai của con cái được các bậc phụ huynh thể hiện qua những kỳ vọng quá cao về điểm số và thành tích.',
      'Học sinh thường rơi vào hai trạng thái: hoặc im lặng chịu đựng rồi bùng nổ cãi vã, hoặc buông xuôi bất cần. Cả hai cách này đều làm sâu sắc thêm khoảng cách thế hệ. Cha mẹ không thể hiểu được cảm xúc của bạn nếu bạn không chia sẻ, và bạn cũng khó hiểu được nỗi sợ hãi của cha mẹ nếu chỉ nhìn bề ngoài.',
      'Đối thoại chân thành vào thời điểm bình tĩnh là chiếc chìa khóa duy nhất để xây dựng sự thấu hiểu bền vững.'
    ],
    keyTakeaways: [
      'Phần lớn áp lực từ bố mẹ xuất phát từ nỗi lo lắng cho sự an toàn và tương lai của bạn, dù cách biểu đạt có thể chưa phù hợp.',
      'Chọn đúng thời điểm để nói chuyện (không phải lúc vừa nhận sổ liên lạc hay lúc bố mẹ đang mệt mỏi sau giờ làm).',
      'Chứng minh sự trưởng thành bằng trách nhiệm trong những việc nhỏ trước khi đòi hỏi sự tự do lớn.'
    ],
    practicalTips: [
      'Viết một bức thư tay hoặc tin nhắn dài chân thành nếu bạn cảm thấy quá khó để nói trực tiếp mặt đối mặt.',
      'Bày tỏ lòng biết ơn trước khi nêu khó khăn: "Con biết bố mẹ vất vả vì con, nhưng hiện tại lịch học dày đang làm con cảm thấy kiệt sức...".',
      'Chủ động đề xuất giải pháp thay thế cụ thể thay vì chỉ phản đối.'
    ]
  },
  {
    id: 'school-bullying',
    title: 'Nhận diện & ứng phó với bắt nạt học đường an toàn',
    category: 'Kỹ năng',
    readTime: '5 phút',
    shortDescription: 'Hành lang an toàn: Phân biệt bắt nạt trực tiếp, tẩy chay ngầm và bắt nạt trên không gian mạng.',
    author: 'Tổ Tư vấn & Bảo vệ Học sinh',
    iconName: 'ShieldAlert',
    fullContent: [
      'Bắt nạt học đường không chỉ là những hành vi bạo lực thể xác. Ngày nay, bắt nạt tinh thần, tẩy chay cô lập có chủ đích, hoặc bôi nhọ trên mạng xã hội (Cyberbullying) diễn ra âm thầm và để lại vết thương lòng dai dẳng cho nạn nhân.',
      'Điều tối quan trọng mà mọi học sinh cần khắc cốt ghi tâm: Nếu bạn đang là nạn nhân của bắt nạt, ĐÓ HOÀN TOÀN KHÔNG PHẢI LỖI CỦA BẠN. Kẻ bắt nạt thường hành động vì những vấn đề bất an bên trong chính họ, hoặc muốn thị uy quyền lực.',
      'Sự im lặng của nạn nhân và người chứng kiến chính là mảnh đất màu mỡ cho hành vi bắt nạt tiếp diễn. Việc lên tiếng tìm kiếm sự can thiệp từ người lớn có trách nhiệm không phải là "mách lẻo", mà là bảo vệ sự an toàn và công lý học đường.'
    ],
    keyTakeaways: [
      'Bạn không làm gì sai để phải chịu đựng sự đối xử tàn nhẫn hay cô lập.',
      'Lưu giữ bằng chứng (chụp màn hình tin nhắn, ghi lại thời gian địa điểm sự việc).',
      'Người chứng kiến dũng cảm lên tiếng hoặc báo cáo có thể thay đổi hoàn toàn cục diện.'
    ],
    practicalTips: [
      'Tuyệt đối không đáp trả bạo lực bằng bạo lực; hãy giữ bình tĩnh và rời khỏi khu vực nguy hiểm đến nơi có đông người.',
      'Chia sẻ ngay lập tức với người lớn đáng tin: Bố mẹ, giáo viên chủ nhiệm, cô tư vấn tâm lý hoặc ban giám hiệu.',
      'Gọi ngay Tổng đài Quốc gia Bảo vệ Trẻ em 111 (miễn phí, bảo mật 24/7) khi cần sự trợ giúp khẩn cấp.'
    ]
  }
];

export const SCHOOL_ISSUES = [
  {
    id: 'issue-1',
    number: '01',
    title: 'Áp lực học tập',
    shortDesc: 'Khối lượng bài vở dày đặc, lịch học thêm kín tuần và nỗi sợ tụt lại phía sau.',
    articleRef: 'academic-stress',
    accentColor: '#5B7CFA'
  },
  {
    id: 'issue-2',
    number: '02',
    title: 'Lo lắng trước kỳ thi',
    shortDesc: 'Cảm giác hồi hộp, tim đập nhanh và "đầu óc trống rỗng" mỗi khi bước vào phòng thi.',
    articleRef: 'exam-anxiety',
    accentColor: '#7C6FF2'
  },
  {
    id: 'issue-3',
    number: '03',
    title: 'Mất động lực',
    shortDesc: 'Ngồi vào bàn học nhưng không thể tập trung, cảm thấy mệt mỏi và trì hoãn triền miên.',
    articleRef: 'loss-of-motivation',
    accentColor: '#F2B84B'
  },
  {
    id: 'issue-4',
    number: '04',
    title: 'Mâu thuẫn với bạn bè',
    shortDesc: 'Bất đồng quan điểm, hiểu lầm ngấm ngầm hoặc cảm giác bị cô lập giữa tập thể lớp.',
    articleRef: 'peer-conflict',
    accentColor: '#4CAF7D'
  },
  {
    id: 'issue-5',
    number: '05',
    title: 'Áp lực từ gia đình',
    shortDesc: 'Kỳ vọng điểm số quá cao từ cha mẹ và sự so sánh vô tình làm tổn thương lòng tự trọng.',
    articleRef: 'family-expectations',
    accentColor: '#E96A6A'
  },
  {
    id: 'issue-6',
    number: '06',
    title: 'Bắt nạt học đường',
    shortDesc: 'Những hành vi đe dọa, tẩy chay hay bôi nhọ danh dự cả trực tiếp lẫn trên mạng xã hội.',
    articleRef: 'school-bullying',
    accentColor: '#8B5CF6'
  }
];
