// services/openAiService.js
import axios from 'axios';

// OpenAI Vision API 호출 함수
export const getImageAnalysis = async (imageUrl) => {
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: "이미지를 분석하고 다음 정보를 제공하십시오: 0. 이미지에 문이 있습니까? 있다면 다음 질문들에 대답해주고 없다면 다음 질문들을 대답하지 않아도 되며 화면에 보이는 것들을 말해주세요. 1. 이것은 어떤 유형의 문인가요? (예: 여닫이, 미닫이, 회전문 등등). 2. 손잡이가 있다면 손잡이의 위치는 어디인가요? 3. 현재 문이 열렸나요, 닫혔나요? 4.어떤 방법으로 문을 이용하여 건물안으로 들어갈 수 있나요?" },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content; // 분석 결과 반환
  } catch (error) {
    console.error('OpenAI Vision API 호출 오류:', error.response?.data || error.message);
    throw new Error('OpenAI Vision API 호출 오류');
  }
};
