//2.카메라 촬영
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CameraPage.css';

const CameraPage = () => {
  const [,setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();
  }, []);

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

  return (
      <div className="unlockcamera-camera-container">
        <video ref={videoRef} autoPlay playsInline className="unlockcamera-camera-video" />
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        <button onClick={takePicture} className="unlockcamera-camera-button">촬영하기</button>
      </div>
  );
};

export default CameraPage;
