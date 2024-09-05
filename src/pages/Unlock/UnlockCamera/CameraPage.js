//2.카메라 촬영
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CameraPage.css';

const CameraPage = () => {
  const [, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [isFrontCamera, setIsFrontCamera] = useState(false); // 후방 카메라가 기본값으로 설정

  // 카메라 스트림 시작 함수
  const startCamera = async (useFrontCamera = true) => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices(); // 장치 목록 가져오기
      const videoDevices = devices.filter(device => device.kind === 'videoinput'); // 비디오 입력 장치 필터링

      // 전/후방 카메라 설정
      const constraints = {
        video: {
          deviceId: useFrontCamera
            ? videoDevices.find(device => device.label.toLowerCase().includes('front'))?.deviceId
            : videoDevices.find(device => device.label.toLowerCase().includes('back'))?.deviceId,
          facingMode: useFrontCamera ? 'user' : 'environment',
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // 컴포넌트 마운트 시 카메라 시작
  useEffect(() => {
    startCamera(isFrontCamera);
  }, [isFrontCamera]);

  // 사진 촬영 함수
  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        setImage(blob);
        navigate('/unlock-camera-analyz', { state: { image: blob } });
      } else {
        console.error('Blob 생성 실패');
      }
    }, 'image/jpeg', 0.5);
  };

  // 카메라 전환 함수
  const toggleCamera = () => {
    setIsFrontCamera(prevState => !prevState);
  };

  return (
    <div className="unlockcamera-camera-container">
      <video ref={videoRef} autoPlay playsInline className="unlockcamera-camera-video" />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="unlockcamera-button-group">
        <button onClick={takePicture} className="unlockcamera-camera-button">촬영하기</button>
        <button onClick={toggleCamera} className="unlockcamera-camera-button">카메라 전환</button>
      </div>
    </div>
  );
};

export default CameraPage;
