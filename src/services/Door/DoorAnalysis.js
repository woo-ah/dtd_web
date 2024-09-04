// src/pages/Door/DoorAnalysis.js

import axios from 'axios';

const DoorAnalysis = async (image) => {
  try {
    // 서버로 요청을 보낼 때 명시적으로 서버 주소를 추가
    const response = await axios.post('http://localhost:5000/analyze-door', { image });
    return response.data;  // 서버로부터 받은 결과 반환
  } catch (error) {
    console.error('Error analyzing image:', error);
    return { doorType: 'Unknown', instructions: 'Error analyzing the image.' };
  }
};

export default DoorAnalysis;