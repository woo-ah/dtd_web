import React, { useState, useRef } from 'react';
import { uploadImageToFirebase } from '../../services/Door/firebaseService';
import { getImageAnalysis } from '../../services/Door/openAiService';

const UnlockCameraPage = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
