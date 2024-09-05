//1.페이지소개
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroductionPage.css';

const IntroductionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="unlockcamera-introduction-container">
      <h1 className="unlockcamera-intro-title">문 사진 분석 페이지</h1>
      <div className="unlockcamera-description-container">
        <p className="unlockcamera-intro-description">다음과 같은 사실을 알려드립니다.</p><br></br>
        <p className="unlockcamera-intro-description">1.현재 사진의 문의 존재 여부</p>
        <p className="unlockcamera-intro-description">2.문의 유형</p>
        <p className="unlockcamera-intro-description">3.손잡이의 위치</p>
        <p className="unlockcamera-intro-description">4.들어가는 방법</p>
      </div>
      <button onClick={() => navigate('/unlock-camera-camera')} className="unlockcamera-intro-button">사진 촬영하기</button>
    </div>
  );
};

export default IntroductionPage;


//0. 이미지에 문이 있습니까? 있다면 다음 질문들에 대답해주고 없다면 다음 질문들을 대답하지 않아도 되며 화면에 보이는 것들을 말해주세요. 1. 이것은 어떤 유형의 문인가요? (예: 여닫이, 미닫이, 회전문 등등). 2. 손잡이가 있다면 손잡이의 위치는 어디인가요? 3. 현재 문이 열렸나요, 닫혔나요? 4.어떤 방법으로 문을 이용하여 건물안으로 들어갈 수 있나요?