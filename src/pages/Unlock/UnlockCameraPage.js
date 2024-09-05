import React, { useState, useRef } from 'react';
import axios from 'axios';
import firebase from 'firebase/compat/app'; // Firebase의 호환 모듈 사용
import 'firebase/compat/storage'; // Firebase 스토리지 호환 모듈

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Firebase 초기화 (중복 초기화를 방지)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const UnlockCameraPage = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  // 카메라 스트림을 시작하는 함수
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true); // 카메라 상태를 켬으로 변경
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // 사진 찍기 기능
  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 비디오 크기와 동일한 크기로 캔버스를 설정
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 캔버스에 현재 비디오 프레임을 그림
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 이미지 압축 후 Blob 생성
    canvas.toBlob((blob) => {
      if (blob) {
        setImage(blob);
        uploadImageToFirebase(blob); // Firebase에 저장
      } else {
        console.error('Blob 생성 실패');
      }
    }, 'image/jpeg', 0.5); // 품질 50%로 압축
  };

  // Firebase에 이미지 업로드 후 URL 가져오기
  const uploadImageToFirebase = async (blob) => {
    const storageRef = firebase.storage().ref();
    const uniqueFileName = `images/${Date.now()}.jpg`; // 고유 파일 이름 생성
    const fileRef = storageRef.child(uniqueFileName);

    try {
      // 이미지 업로드
      await fileRef.put(blob);
      console.log('이미지가 Firebase에 저장되었습니다:', uniqueFileName);

      // 이미지 다운로드 URL 가져오기
      const downloadURL = await fileRef.getDownloadURL();
      console.log('이미지 다운로드 URL:', downloadURL);

      return downloadURL; // URL 반환
    } catch (error) {
      console.error('Firebase 업로드 중 오류:', error);
      return null;
    }
  };

  // OpenAI Vision API 호출 함수
  const getImageAnalysis = async (imageUrl) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o', // 사용할 모델 ID
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: "이미지를 분석하고 다음 정보를 제공하십시오: 0. 이미지에 문이 있습니까? 있다면 다음 질문들에 대답해주고 없다면 다음 질문들을 대답하지 않아도 되며 화면에 보이는 것들을 말해주세요. 1. 이것은 어떤 유형의 문인가요? (예: 여닫이, 미닫이, 회전문 등등). 2. 손잡이가 있다면 손잡이의 위치는 어디인가요? 3. 현재 문이 열렸나요, 닫혔나요?" },
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

  // 이미지 업로드 및 분석 처리 함수
  const handleSubmit = async () => {
    if (!image) {
      alert('먼저 사진을 찍어주세요.');
      return;
    }

    try {
      // Firebase에 이미지 업로드 후 URL 가져오기
      const imageUrl = await uploadImageToFirebase(image);

      if (imageUrl) {
        // OpenAI Vision API 호출 - Firebase URL을 전송
        const doorInfo = await getImageAnalysis(imageUrl);
        setResponse(doorInfo);
      } else {
        console.error('이미지 업로드 중 오류 발생');
        setResponse('이미지 업로드 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('이미지 처리 중 오류 발생:', error);
      setResponse(error.message || '이미지 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>Door Unlock Assistant</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', maxWidth: '500px', display: isCameraOn ? 'block' : 'none' }}
      />
      {!isCameraOn && <button onClick={startCamera}>Start Camera</button>}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {isCameraOn && <button onClick={takePicture}>Take Picture</button>}
      <button onClick={handleSubmit}>Analyze and Unlock</button>
      {response && <div><h2>Response:</h2><p>{response}</p></div>}
    </div>
  );
};

export default UnlockCameraPage;
