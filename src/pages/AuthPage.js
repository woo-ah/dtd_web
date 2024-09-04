import React from 'react';
import '../css/AuthPage.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <p className="auth-beta" >Beta Version</p>
      <div className="auth-logo">
        <img src="/dtd_door.svg" alt="PlantB Logo" className="auth-logo-icon" />
      </div>
      <p className="auth-intro">"도어투도어"에 오신 것을 환영합니다!</p>
      <div className="auth-buttons">
        <button onClick={() => navigate('/saved')}>익명으로 시작하기</button>
      </div>
    </div>
  );
};

export default AuthPage;
