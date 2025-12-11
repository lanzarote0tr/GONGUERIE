import axios from 'axios';
import env from '../config/env.js';

async function inferCategory(prompt) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.openAiKey}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          '당신은 게시물을 게시한 선생님의 담당 과목을 예측합니다. 예측할 과목은 국어, 영어, 수학, 과학입니다. 무조건 과목 이름으로만 대답합니다.',
      },
      { role: 'user', content: prompt },
    ],
  };

  const response = await axios.post(url, data, { headers });
  return response.data.choices[0].message.content;
}

export { inferCategory };
