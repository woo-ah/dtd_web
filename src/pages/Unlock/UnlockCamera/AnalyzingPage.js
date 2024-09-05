//3.분석중 페이지
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadImageToFirebase } from '../../../services/Door/firebaseService';
import { getImageAnalysis } from '../../../services/Door/openAiService';
import './AnalyzingPage.css';

const AnalyzingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const analyzeImage = async () => {
      const imageBlob = location.state?.image;

      if (!imageBlob) {
        console.error('이미지 없음');
        return;
      }

      try {
        const imageUrl = await uploadImageToFirebase(imageBlob);
        const analysisResult = await getImageAnalysis(imageUrl);

        navigate('/unlock-camera-result', { state: { image: imageUrl, result: analysisResult } });
      } catch (error) {
        console.error('분석 중 오류 발생:', error);
        navigate('/unlock-camera-result', { state: { error: error.message } });
      }
    };

    analyzeImage();
  }, [location.state, navigate]);

  return (
    <div className="unlockcamera-analyzing-container">
      <h1 className="unlockcamera-analyzing-text">분석 중...</h1>
    </div>
  );
};

export default AnalyzingPage;
