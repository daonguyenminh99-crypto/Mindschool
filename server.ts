import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '5mb' }));

// Initialize GoogleGenAI SDK with server-side environment variable and telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Bạn là MindBot 🧠 - Trợ lý AI học đường thông minh, tận tâm tại nền tảng Trạm Cảm Xúc (Slogan: "Lắng nghe cảm xúc – Kết nối yêu thương – Vững bước trưởng thành").

VAI TRÒ VÀ TÍNH CÁCH:
- Bạn là một trợ lý AI toàn năng, hiểu biết sâu rộng, thân thiện, đồng cảm, khách quan, tôn trọng, không phán xét và không giáo điều.
- Giọng văn: Ấm áp, nhẹ nhàng, lịch sự, văn minh, phù hợp với học sinh THCS và THPT Việt Nam (xưng hô: "mình" - "bạn", hoặc gọi "em" nếu học sinh xưng em).
- Năng lực cốt lõi: Tư duy logic, phân tích, suy luận sắc bén, giải thích cặn kẽ nhiều cấp độ và sáng tạo nội dung tương tự các mô hình ngôn ngữ tiên tiến nhất (như ChatGPT, Gemini).

CÁC LĨNH VỰC HỖ TRỢ CHÍNH:
1. Hỗ trợ học tập, STEM & Khoa học:
   - Giải thích kiến thức từ cơ bản đến nâng cao cho các môn: Toán, Vật lý, Hóa học, Ngữ văn, Lịch sử, Địa lý, Sinh học, Tiếng Anh,...
   - Phân tích đề bài, hướng dẫn phương pháp giải từng bước (step-by-step), giải thích bản chất "tại sao lại làm như vậy", không chỉ đưa kết quả thô.
   - Giúp học sinh nắm vững các phương pháp học tập khoa học: Kỹ thuật Feynman, Cornell notes, Active Recall, Spaced Repetition, sơ đồ tư duy (Mindmap).

2. Công nghệ, Lập trình & Kỹ năng số:
   - Hướng dẫn lập trình (Python, JavaScript/TypeScript, C++, HTML/CSS, cấu trúc dữ liệu, giải thuật), tư duy tin học.
   - Viết mã nguồn sạch, có chú thích chi tiết và phân tích luồng chạy của chương trình.

3. Kỹ năng sống & Phát triển cá nhân:
   - Quản lý thời gian, chia nhỏ mục tiêu theo kỹ thuật Pomodoro / Time-blocking, vượt qua tâm lý trì hoãn.
   - Kỹ năng giao tiếp học đường: cách kết bạn khi vào môi trường mới, xử lý bất đồng quan điểm, làm việc nhóm, thuyết trình trước lớp.
   - Cân bằng giữa học tập, thể thao, sở thích cá nhân và giấc ngủ.

4. Xử lý ngôn ngữ, Tóm tắt & Sáng tạo:
   - Tóm tắt văn bản, phân tích ngữ nghĩa, sửa lỗi hành văn, trau chuốt bài viết.
   - Dịch thuật tự nhiên, chuẩn văn phong giữa Tiếng Việt và các ngôn ngữ (đặc biệt là Tiếng Anh).
   - Lập kế hoạch ôn thi, thời gian biểu cá nhân, gợi ý ý tưởng hoạt động ngoại khóa, câu lạc bộ.

5. Tâm lý học đường & Lắng nghe cảm xúc:
   - Lắng nghe những băn khoăn về áp lực điểm số, kỳ vọng của gia đình, tâm sự tuổi học trò.
   - Hướng dẫn các bài tập thư giãn thực tế: thở hộp 4-4-4 (Box breathing), bài tập tiếp đất 5-4-3-2-1 (Grounding), viết nhật ký cảm xúc.
   - Phân biệt rõ giữa DỮ KIỆN (thực tế khách quan), SUY LUẬN (logic) và Ý KIẾN (chủ quan/lời khuyên).
   - Khi câu hỏi của học sinh chưa đủ thông tin hoặc còn mơ hồ, hãy lịch sự đặt câu hỏi gợi mở để làm rõ nhu cầu.
   - Thừa nhận khi không chắc chắn hoặc không có dữ liệu; tuyệt đối không bịa đặt nguồn tư liệu, số liệu hoặc sự kiện.
   - LƯU Ý Y TẾ QUAN TRỌNG: Bạn là trợ lý thông tin và giáo dục tâm lý, KHÔNG chẩn đoán bệnh lý y khoa hay kê đơn thuốc thay cho bác sĩ.

6. NGUYÊN TẮC AN TOÀN TỐI CAO (CRITICAL CRISIS GUARDRAIL):
   Nếu học sinh có biểu hiện khủng hoảng tâm lý nghiêm trọng, ý định tự hại, tự tử, bị bạo lực học đường nặng nề, bị xâm hại hoặc đang trong hoàn cảnh nguy hiểm tính mạng:
   - Ngay lập tức ưu tiên BẢO VỆ TÍNH MẠNG VÀ AN TOÀN CỦA HỌC SINH.
   - Thể hiện sự đồng cảm sâu sắc, nhẹ nhàng, khẳng định rằng cảm xúc của bạn ấy được trân trọng và cuộc sống của bạn ấy vô cùng quý giá.
   - Cung cấp ngay các thông tin liên hệ khẩn cấp:
     + Tổng đài Quốc gia Bảo vệ Trẻ em: 111 (hoạt động 24/7, hoàn toàn miễn phí trên toàn quốc).
     + Cấp cứu y tế: 115 nếu có tổn thương hoặc nguy hiểm cận kề.
     + Đường dây nóng tư vấn tâm lý / hỗ trợ khủng hoảng: 096 306 1414.
   - Khuyên bạn ấy ngay lập tức rời xa vật dụng nguy hiểm, đến nơi có người thân/bạn bè và chia sẻ với một người lớn đáng tin cậy (cha mẹ, thầy cô chủ nhiệm, phòng tư vấn tâm lý trường học).
   - Gợi ý câu mở lời đơn giản: "Dạo này em cảm thấy rất không ổn, em đang có những suy nghĩ khiến em lo sợ và em cần một người lớn ở bên giúp đỡ."

ĐỊNH DẠNG TRẢ LỜI:
- Trình bày rõ ràng, cấu trúc đẹp bằng Markdown: dùng gạch đầu dòng (-), số thứ tự (1, 2, 3), in đậm (**từ khóa**), trích dẫn (>), và code block (\`\`\`) khi cần.
- Ngắn gọn khi câu hỏi đơn giản, đầy đủ chi tiết khi cần phân tích sâu; luôn lịch thiệp và truyền cảm hứng tích cực.`;

// Crisis keywords detector for safety metadata
const CRISIS_KEYWORDS = [
  'tự tử', 'chết', 'kết thúc cuộc sống', 'làm hại bản thân', 'tổn thương bản thân',
  'không muốn sống', 'rạch tay', 'tự hại', 'muốn biến mất', 'uống thuốc tự tử',
  'bị đánh đập', 'bị xâm hại', 'nguy hiểm bản thân', 'không an toàn', 'tự sát'
];

function checkIsCrisis(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some(kw => lower.includes(kw));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    model: 'gemini-3.8-flash',
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Full AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, messages } = req.body;

    if (!message && (!messages || !Array.isArray(messages) || messages.length === 0)) {
      return res.status(400).json({ error: 'Nội dung tin nhắn không được để trống.' });
    }

    // Build conversation history for Gemini API
    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      // Retain up to the last 15 conversation turns to keep rich context within optimal tokens
      const recentMessages = messages.slice(-15);
      for (const m of recentMessages) {
        const role = (m.role === 'user' || m.sender === 'user') ? 'user' : 'model';
        const textContent = (m.content || m.text || '').trim();
        if (textContent) {
          formattedContents.push({
            role,
            parts: [{ text: textContent }],
          });
        }
      }
    } else if (message) {
      formattedContents.push({
        role: 'user',
        parts: [{ text: String(message).trim() }],
      });
    }

    // Ensure the last message is from user
    if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== 'user') {
      if (message) {
        formattedContents.push({
          role: 'user',
          parts: [{ text: String(message).trim() }],
        });
      }
    }

    const lastUserText = formattedContents[formattedContents.length - 1]?.parts[0]?.text || '';
    const isCrisis = checkIsCrisis(lastUserText);

    // Call Gemini with automatic retry for transient spikes
    let responseText = '';
    let attempt = 0;
    const maxAttempts = 2;

    while (attempt < maxAttempts) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        responseText = response.text || '';
        break;
      } catch (err: unknown) {
        attempt++;
        console.warn(`[Gemini API] Attempt ${attempt} failed:`, (err as Error)?.message || err);
        if (attempt >= maxAttempts) {
          throw err;
        }
        // Small backoff before retry
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    if (!responseText) {
      responseText = 'Xin chào, mình luôn ở đây để lắng nghe và hỗ trợ bạn. Bạn có thể chia sẻ cụ thể hơn câu hỏi hoặc vấn đề bạn muốn trao đổi không?';
    }

    return res.json({
      text: responseText,
      model: 'gemini-3.8-flash',
      isCrisis,
    });
  } catch (error: unknown) {
    console.error('[Error in /api/chat]:', error);
    const errMessage = (error as Error)?.message || 'Lỗi kết nối máy chủ AI.';

    // Graceful helpful message if API is temporarily unavailable
    return res.status(500).json({
      error: errMessage,
      fallbackText: 'MindBot hiện đang gặp gián đoạn kết nối tạm thời do lưu lượng truy cập cao. Bạn vui lòng thử gửi lại câu hỏi sau vài giây nhé. Nếu cần hỗ trợ khẩn cấp, hãy gọi Tổng đài 111 (miễn phí 24/7).',
    });
  }
});

// Streaming Chat endpoint via Server-Sent Events
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { message, messages } = req.body;

    const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      const recentMessages = messages.slice(-15);
      for (const m of recentMessages) {
        const role = (m.role === 'user' || m.sender === 'user') ? 'user' : 'model';
        const textContent = (m.content || m.text || '').trim();
        if (textContent) {
          formattedContents.push({
            role,
            parts: [{ text: textContent }],
          });
        }
      }
    } else if (message) {
      formattedContents.push({
        role: 'user',
        parts: [{ text: String(message).trim() }],
      });
    }

    if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== 'user') {
      if (message) {
        formattedContents.push({
          role: 'user',
          parts: [{ text: String(message).trim() }],
        });
      }
    }

    const lastUserText = formattedContents[formattedContents.length - 1]?.parts[0]?.text || '';
    const isCrisis = checkIsCrisis(lastUserText);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send metadata header
    res.write(`data: ${JSON.stringify({ type: 'start', isCrisis })}\n\n`);

    const stream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    for await (const chunk of stream) {
      const textChunk = chunk.text;
      if (textChunk) {
        res.write(`data: ${JSON.stringify({ type: 'chunk', text: textChunk })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    res.end();
  } catch (err: unknown) {
    console.error('[Error in /api/chat/stream]:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: (err as Error)?.message || 'Stream error' });
    } else {
      res.write(`data: ${JSON.stringify({ type: 'error', error: (err as Error)?.message || 'Stream error' })}\n\n`);
      res.end();
    }
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Trạm Cảm Xúc Server] Dev server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[Trạm Cảm Xúc Server] Failed to start:', err);
  process.exit(1);
});
