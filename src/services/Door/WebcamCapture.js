// src/pages/Door/WebcamCapture.js

import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);  // 부모 컴포넌트로 이미지 전달
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
        height={250}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={capture}>Capture Photo</button>
      </div>
    </div>
  );
};

export default WebcamCapture;
