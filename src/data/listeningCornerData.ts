import { ListeningQuestion } from '../types';

export interface ListeningTopicInfo {
  id: 'all' | 'academic' | 'friendship' | 'family' | 'mental-health';
  title: string;
  shortDesc: string;
  iconName: string;
  badge: string;
}

export const LISTENING_TOPICS: ListeningTopicInfo[] = [
  {
    id: 'all',
    title: 'Tất cả nội dung',
    shortDesc: 'Tổng hợp mọi bài viết và câu hỏi học đường',
    iconName: 'LayoutGrid',
    badge: 'Toàn bộ'
  },
  {
    id: 'academic',
    title: 'Học tập & Áp lực thi cử',
    shortDesc: 'Lo lắng thi cử, mất động lực và stress điểm số',
    iconName: 'GraduationCap',
    badge: 'Học tập'
  },
  {
    id: 'friendship',
    title: 'Tình bạn & Hòa nhập',
    shortDesc: 'Khó kết bạn, cô đơn chuyển trường, giao tiếp và chống bắt nạt',
    iconName: 'Users',
    badge: 'Tình bạn'
  },
  {
    id: 'family',
    title: 'Gia đình & Cảm xúc cá nhân',
    shortDesc: 'Áp lực điểm số, kỳ vọng của cha mẹ và cách mở lời trò chuyện',
    iconName: 'Home',
    badge: 'Gia đình'
  },
  {
    id: 'mental-health',
    title: 'Khi cảm xúc quá sức & An toàn',
    shortDesc: 'Buồn bã kéo dài, kiệt sức tinh thần và các bước an toàn khẩn cấp',
    iconName: 'ShieldAlert',
    badge: 'Sức khỏe tinh thần'
  }
];

export const LISTENING_QUESTIONS: ListeningQuestion[] = [
  // --- CHỦ ĐỀ 1: TÌNH BẠN VÀ SỰ HÒA NHẬP ---
  {
    id: 'friendship-make-friends-new-school',
    topicId: 'friendship',
    topicTitle: 'Tình bạn và sự hòa nhập',
    question: 'Làm thế nào để kết bạn khi em cảm thấy lạc lõng ở trường mới?',
    summary: 'Bắt đầu môi trường mới khiến em bỡ ngỡ, ngại ngùng. Không cần phải nổi bật, hãy bắt đầu từ những kết nối nhỏ bé.',
    fullAnswer: {
      lead: 'Bắt đầu ở một môi trường mới có thể khiến em cảm thấy bỡ ngỡ, ngại ngùng hoặc cô đơn. Em không cần phải trở nên thật nổi bật để được mọi người yêu quý. Hãy bắt đầu từ những điều nhỏ bé:',
      bulletPoints: [
        {
          title: 'Tìm người có chung sở thích',
          desc: 'Tham gia câu lạc bộ thể thao, nhóm vẽ, nhóm đọc sách, âm nhạc hoặc những hoạt động ngoại khóa em yêu thích. Những mối quan tâm chung sẽ giúp việc bắt chuyện tự nhiên hơn rất nhiều.'
        },
        {
          title: 'Chủ động kết nối từng bước nhỏ',
          desc: 'Ngồi cạnh một bạn có vẻ thân thiện, mỉm cười, chào hỏi hoặc bắt đầu bằng một câu hỏi đơn giản về bài học (ví dụ: mượn bút, hỏi trang sách vừa học).'
        },
        {
          title: 'Cho bản thân thời gian',
          desc: 'Tình bạn chân thành thường cần thời gian để phát triển và thấu hiểu. Em không cần vội vàng hay ép mình phải hòa nhập ngay lập tức với tất cả mọi nhóm bạn.'
        },
        {
          title: 'Tìm kiếm sự hỗ trợ khi cần',
          desc: 'Nếu cảm giác cô đơn kéo dài và khiến em sợ đến trường, hãy chia sẻ với giáo viên chủ nhiệm, người thân hoặc cán bộ tư vấn học đường để nhận được sự đồng hành an toàn.'
        }
      ],
      rememberNote: 'Chưa tìm được bạn thân không có nghĩa là em không đáng được yêu quý. Em xứng đáng có những mối quan hệ khiến mình cảm thấy an toàn và được tôn trọng.',
      copyableScript: {
        label: 'Mẫu câu bắt chuyện tự nhiên với bạn mới:',
        text: 'Chào bạn, mình mới chuyển đến lớp mình chưa lâu nên còn hơi bỡ ngỡ. Mình thấy bạn cũng thích vẽ tranh/đọc sách, mình có thể ngồi cùng và làm quen với bạn được không?'
      },
      relatedSkillId: 'skill-peer-pressure',
      relatedArticleId: 'peer-conflict'
    }
  },
  {
    id: 'friendship-bullying-and-exclusion',
    topicId: 'friendship',
    topicTitle: 'Tình bạn và sự hòa nhập',
    question: 'Bị bạn bè cô lập ngầm hoặc bắt nạt học đường, em nên ứng phó ra sao?',
    summary: 'Tẩy chay ngầm hay bắt nạt không bao giờ là lỗi của em. Hãy ưu tiên an toàn, lưu giữ bằng chứng và báo ngay cho người lớn.',
    fullAnswer: {
      lead: 'Bị cô lập, phớt lờ hay bị nói xấu sau lưng là trải nghiệm rất đau đớn. Điều đầu tiên em cần ghi nhớ: Bắt nạt hay cô lập hoàn toàn không phải lỗi của em, và em không đáng phải chịu đựng sự đối xử bất công đó.',
      bulletPoints: [
        {
          title: 'Ưu tiên sự an toàn của bản thân',
          desc: 'Tránh đi một mình ở những khu vực vắng vẻ trong trường (nhà vệ sinh xa, góc cầu thang vắng). Hãy ở gần nơi có đông bạn bè hoặc phòng giáo viên.'
        },
        {
          title: 'Không đáp trả bằng bạo lực',
          desc: 'Đáp trả bạo lực thường khiến tình hình phức tạp hơn. Giữ bình tĩnh, nói dứt khoát: "Dừng lại, hành vi này không được chấp nhận", sau đó rời khỏi nơi đó.'
        },
        {
          title: 'Lưu giữ bằng chứng',
          desc: 'Nếu là bắt nạt trên mạng (tin nhắn đe dọa, bài đăng bôi nhọ), hãy chụp ảnh màn hình, lưu lại đường link trước khi kẻ bắt nạt xóa đi.'
        },
        {
          title: 'Báo cáo ngay cho người lớn đáng tin',
          desc: 'Nói với cha mẹ, thầy cô chủ nhiệm, phòng tư vấn trường hoặc gọi Tổng đài 111 (miễn phí 24/7). Lên tiếng là để bảo vệ an toàn cho chính em.'
        }
      ],
      rememberNote: 'Sự im lặng của nạn nhân là mảnh đất cho kẻ bắt nạt lấn tới. Việc tìm kiếm người lớn can thiệp là hành động tự bảo vệ chính đáng, không phải "mách lẻo".',
      copyableScript: {
        label: 'Mẫu câu đặt ranh giới dứt khoát:',
        text: 'Mình cảm thấy không thoải mái khi các bạn nói những lời xúc phạm đó. Mình yêu cầu các bạn dừng lại ngay.'
      },
      relatedArticleId: 'school-bullying'
    }
  },

  // --- CHỦ ĐỀ 2: GIA ĐÌNH VÀ CẢM XÚC CÁ NHÂN ---
  {
    id: 'family-expectations-pressure',
    topicId: 'family',
    topicTitle: 'Gia đình và cảm xúc cá nhân',
    question: 'Bố mẹ kỳ vọng quá lớn vào điểm số khiến em thấy ngột ngạt. Em nên nói chuyện với bố mẹ ra sao?',
    summary: 'Kỳ vọng xuất phát từ nỗi lo lắng của cha mẹ, nhưng dễ biến thành áp lực đè nặng. Chọn thời điểm bình tĩnh để đối thoại chân thành.',
    fullAnswer: {
      lead: 'Đôi khi, bố mẹ đặt nhiều kỳ vọng vì lo lắng cho tương lai của con. Tuy nhiên, dù xuất phát từ sự quan tâm, những kỳ vọng ấy vẫn có thể khiến em cảm thấy căng thẳng, mệt mỏi hoặc không được thấu hiểu. Em có thể thử những cách sau:',
      bulletPoints: [
        {
          title: 'Chọn thời điểm phù hợp',
          desc: 'Hãy nói chuyện khi cả em và bố mẹ đều bình tĩnh, thay vì lúc đang tranh luận gay gắt hoặc vừa nhận kết quả kiểm tra chưa như ý.'
        },
        {
          title: 'Chia sẻ cảm xúc thay vì trách móc',
          desc: 'Dùng thông điệp "Con cảm thấy..." thay vì "Bố mẹ lúc nào cũng...". Điều này giúp bố mẹ lắng nghe mà không rơi vào tâm lý phòng thủ.'
        },
        {
          title: 'Nói về nỗ lực và sự cố gắng của mình',
          desc: 'Chia sẻ chân thành những gì em đã cố gắng, những phần kiến thức em còn gặp khó khăn và kế hoạch cải thiện từng bước của em.'
        },
        {
          title: 'Đề xuất một cách đồng hành tích cực',
          desc: 'Chẳng hạn, cùng bố mẹ đặt mục tiêu học tập vừa sức hơn, có thời gian nghỉ ngơi thư giãn và đánh giá sự tiến bộ thay vì chỉ nhìn vào điểm số tuyệt đối.'
        },
        {
          title: 'Nhờ người hỗ trợ khi khó mở lời',
          desc: 'Nếu em khó nói trực tiếp mặt đối mặt, hãy thử viết một bức thư tay, gửi tin nhắn hoặc nhờ một giáo viên, anh chị họ đáng tin cậy hỗ trợ cuộc trò chuyện.'
        }
      ],
      practicalSteps: [
        'Bố mẹ có thể chưa hiểu hết cảm xúc của em ngay lập tức. Điều đó không có nghĩa là em nên im lặng chịu đựng.',
        'Em có quyền được lắng nghe, được nghỉ ngơi và được hỗ trợ trong quá trình học tập.'
      ],
      rememberNote: 'Giá trị của em không chỉ được quyết định bởi điểm số. Việc học rất quan trọng, nhưng sức khỏe tinh thần và sự phát triển toàn diện của em cũng quan trọng không kém.',
      copyableScript: {
        label: 'Mẫu câu mở lời tâm sự với bố mẹ:',
        text: 'Con rất muốn học tốt, nhưng gần đây con cảm thấy áp lực và mệt mỏi. Con mong bố mẹ lắng nghe và động viên con nhiều hơn.'
      },
      relatedSkillId: 'skill-conflict-communication',
      relatedArticleId: 'family-expectations'
    }
  },
  {
    id: 'family-comparison-coping',
    topicId: 'family',
    topicTitle: 'Gia đình và cảm xúc cá nhân',
    question: 'Khi bố mẹ thường so sánh em với "con nhà người ta", em nên đối diện thế nào?',
    summary: 'Nhận diện rằng mỗi người có một lộ trình phát triển riêng, tách biệt giá trị tự thân khỏi sự so sánh và bày tỏ mong muốn được công nhận.',
    fullAnswer: {
      lead: 'Nghe bố mẹ khen ngợi bạn khác và so sánh với mình là cảm giác khiến nhiều bạn trẻ cảm thấy chạnh lòng và tự ti. Tuy nhiên, sự so sánh đó phản ánh nỗi bất an của người lớn nhiều hơn là khả năng thực tế của em.',
      bulletPoints: [
        {
          title: 'Nhắc nhở bản thân về lộ trình riêng',
          desc: 'Mỗi người có thế mạnh, tốc độ tiếp thu và năng khiếu khác nhau. Sự so sánh duy nhất có ý nghĩa là so sánh bản thân hôm nay với chính mình ngày hôm qua.'
        },
        {
          title: 'Bày tỏ cảm xúc nhẹ nhàng với cha mẹ',
          desc: 'Khi không khí gia đình vui vẻ, hãy nhẹ nhàng nói với bố mẹ rằng việc so sánh khiến em áp lực hơn chứ không làm em có thêm động lực.'
        },
        {
          title: 'Ghi nhận những tiến bộ nhỏ của mình',
          desc: 'Đừng đợi người khác khen mới thấy mình có giá trị. Hãy tự khen mình khi hoàn thành được một bài toán khó hay giữ thói quen dậy đúng giờ.'
        }
      ],
      rememberNote: 'Em là một cá thể độc nhất với những phẩm chất riêng. Em không cần phải trở thành bản sao của bất kỳ ai để xứng đáng được tự hào.',
      copyableScript: {
        label: 'Mẫu câu chia sẻ khi bị so sánh:',
        text: 'Khi bố mẹ so sánh con với bạn khác, con thấy rất buồn và tự ti. Con vẫn đang nỗ lực mỗi ngày và con rất mong bố mẹ nhìn nhận sự tiến bộ của riêng con.'
      },
      relatedSkillId: 'skill-conflict-communication'
    }
  },

  // --- CHỦ ĐỀ 3: KHI CẢM XÚC TRỞ NÊN QUÁ SỨC ---
  {
    id: 'mental-health-overwhelmed-and-unsafe',
    topicId: 'mental-health',
    topicTitle: 'Khi cảm xúc trở nên quá sức',
    question: 'Tại sao dạo này em thường buồn chán, khó kiểm soát cảm xúc hoặc có những suy nghĩ khiến bản thân không an toàn?',
    summary: 'Nếu cảm xúc kiệt sức kéo dài, đó là tín hiệu cơ thể và tâm trí đang cần được quan tâm. Em không hề yếu đuối và không cần chịu đựng một mình.',
    fullAnswer: {
      lead: 'Nếu em thường xuyên buồn bã, dễ xúc động, cảm thấy kiệt sức hoặc gặp những suy nghĩ đáng sợ, điều đó có thể cho thấy em đang phải đối mặt với những khó khăn cần được quan tâm. Những cảm xúc này có thể liên quan đến áp lực học tập, mâu thuẫn trong các mối quan hệ, những trải nghiệm khó khăn hoặc nhiều yếu tố sinh học khác. Chỉ dựa vào một vài biểu hiện thì chưa thể xác định chính xác nguyên nhân.',
      bulletPoints: [
        {
          title: 'Gọi tên cảm xúc',
          desc: 'Thử nhận biết mình đang buồn, lo lắng, tức giận, cô đơn hay quá tải. Việc gọi tên chính xác cảm xúc giúp vùng não cảm xúc hạ nhiệt.'
        },
        {
          title: 'Tạm giảm áp lực ngay lập tức',
          desc: 'Nếu có thể, hãy nghỉ ngơi ở nơi yên tĩnh, uống một ly nước ấm, hít thở chậm và cho mình một khoảng thời gian ngắn để bình tĩnh lại.'
        },
        {
          title: 'Chia sẻ với người đáng tin cậy',
          desc: 'Hãy tìm đến cha mẹ, người thân, giáo viên, cán bộ tư vấn học đường hoặc chuyên gia tâm lý. Nói ra là bước đầu tiên để giảm nhẹ gánh nặng.'
        },
        {
          title: 'Tìm sự hỗ trợ chuyên môn',
          desc: 'Nếu cảm giác buồn bã kéo dài từ 2 tuần trở lên, ảnh hưởng đến việc học, giấc ngủ hoặc sinh hoạt hằng ngày, em nên trao đổi với chuyên gia sức khỏe tâm thần hoặc bác sĩ.'
        }
      ],
      practicalSteps: [
        'Em không yếu đuối vì cảm thấy như vậy.',
        'Em không cần phải tự mình giải quyết tất cả mọi chuyện một mình.'
      ],
      rememberNote: 'Sức khỏe tinh thần cũng như sức khỏe thể chất. Khi bị cảm cúm ta cần uống thuốc và nghỉ ngơi; khi tâm trí quá tải, ta hoàn toàn có quyền tìm kiếm sự chăm sóc.',
      copyableScript: {
        label: 'Mẫu câu mở lời khi cảm thấy quá tải:',
        text: 'Dạo này con/em cảm thấy rất mệt mỏi và không ổn trong lòng. Con/em cần có người lắng nghe và giúp con vượt qua giai đoạn này.'
      },
      relatedSkillId: 'skill-rest-recovery',
      relatedArticleId: 'academic-stress'
    }
  },
  {
    id: 'mental-health-self-harm-crisis',
    topicId: 'mental-health',
    topicTitle: 'Khi cảm xúc trở nên quá sức',
    question: 'Nếu em có suy nghĩ muốn làm tổn thương bản thân thì sao?',
    summary: 'Sự an toàn của em là ưu tiên cao nhất lúc này. Hãy nói ngay với người lớn, đến nơi có người bên cạnh và liên hệ Tổng đài 111 hoặc cơ sở y tế.',
    fullAnswer: {
      lead: 'Em không cần phải xấu hổ hay che giấu những gì mình đang trải qua. Điều quan trọng nhất lúc này là sự an toàn và tính mạng của chính em.',
      practicalSteps: [
        '1. Hãy nói ngay với một người lớn đáng tin cậy (bố mẹ, thầy cô, người thân) và nhờ họ ở bên cạnh em lúc này.',
        '2. Nếu em cảm thấy mình có thể hành động theo những suy nghĩ đó, hãy đến ngay nơi có người hỗ trợ, tránh xa những vật dụng có thể gây nguy hiểm và đừng cố gắng tự xoay xở một mình.',
        '3. Nếu em đang gặp nguy hiểm tức thời hoặc đã bị thương, hãy nhờ người lớn liên hệ dịch vụ cấp cứu (115) hoặc đến ngay cơ sở y tế gần nhất.',
        '4. Em cũng có thể gọi Tổng đài quốc gia bảo vệ trẻ em 111 để được tư vấn và hỗ trợ. Tổng đài hoạt động hoàn toàn miễn phí, 24 giờ mỗi ngày trên toàn quốc.'
      ],
      rememberNote: 'Nếu chưa biết bắt đầu từ đâu, em chỉ cần nói một câu đơn giản: "Dạo này em cảm thấy không ổn. Em đang gặp những suy nghĩ khiến em lo sợ và em cần một người ở bên giúp đỡ." Em không cần phải giải thích mọi chuyện thật hoàn hảo mới xứng đáng được giúp đỡ.',
      copyableScript: {
        label: 'Mẫu câu đề nghị hỗ trợ khẩn cấp:',
        text: 'Dạo này em cảm thấy không ổn. Em đang gặp những suy nghĩ khiến em lo sợ và em cần một người ở bên giúp đỡ.'
      },
      isUrgent: true,
      relatedArticleId: 'academic-stress'
    }
  }
];

export const INSPIRING_CLOSING_MESSAGE = {
  title: 'Một lời nhắn dành cho em 🌱',
  content: [
    'Không phải ngày nào em cũng cần mạnh mẽ. Có những ngày em chỉ cần nghỉ ngơi, chia sẻ với ai đó hoặc hoàn thành một việc nhỏ cũng đã là một nỗ lực đáng ghi nhận.',
    'Hãy cho mình thời gian để trưởng thành, kết nối và hiểu rõ cảm xúc của bản thân. Khi mọi thứ trở nên quá sức, tìm kiếm sự giúp đỡ không phải là thất bại — đó là một cách chăm sóc chính mình.'
  ]
};
