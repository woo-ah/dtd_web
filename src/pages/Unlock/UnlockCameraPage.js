// src/pages/Unlock.js

import React, { useState } from 'react';
import WebcamCapture from '../../services/Door/WebcamCapture';
import DoorAnalysis from '../../services/Door/DoorAnalysis';
import ResultDisplay from '../../services/Door/ResultDisplay';

const UnlockCameraPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);  // 캡처된 이미지
  const [result, setResult] = useState(null);  // 분석 결과
  const [loading, setLoading] = useState(false);  // 로딩 상태

  const handleImageCapture = (image) => {
    setCapturedImage(image);
    setResult(null);  // 이전 결과 초기화
  };

  const handleAnalyze = async () => {
    if (capturedImage) {
      setLoading(true);
      const analysisResult = await DoorAnalysis(capturedImage);  // 서버로 이미지 전송 및 결과 수신
      setResult(analysisResult);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Unlock Your Door</h1>

      {/* 웹캠 컴포넌트 */}
      <WebcamCapture onCapture={handleImageCapture} />

      {capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <img src={capturedImage} alt="Captured" style={{ width: '350px' }} />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleAnalyze}>Analyze Door</button>
          </div>
        </div>
      )}

      {loading && <p>Analyzing the image...</p>}

      {!loading && result && <ResultDisplay result={result} />}
    </div>
  );
};

export default UnlockCameraPage;
