//4.분석결과
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, result, error } = location.state || {};

  const handleRetakePhoto = () => {
    navigate('/unlock-camera-camera'); // 카메라 페이지로 이동
  };

  const handleGoBack = () => {
    navigate('/unlock'); // 소개 페이지로 이동
  };

  return (
    <div className="unlockcamera-result-container">
      <h1 className="unlockcamera-result-header">분석 결과</h1>
      {error ? (
        <p className="unlockcamera-result-error">{error}</p>
      ) : (
        <>
          <img src={image} alt="Captured" className="unlockcamera-result-image" />
          <div className="unlockcamera-result-text">
            <p>{result}</p>
          </div>
        </>
      )}
      <div className="unlockcamera-button-container">
        <button className="unlockcamera-result-button" onClick={handleRetakePhoto}>
          사진 다시 찍기
        </button>
        <button className="unlockcamera-result-button" onClick={handleGoBack}>
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
