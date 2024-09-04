import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SplashPage.css';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후에 로그인 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
        <p className="title">Door To Door</p>
        <p className="subtitle">도어투도어</p>
        <img src="/dtd_door.svg" alt="DTD Logo" className="logo-icon" />
        <p className="description">당신의 눈길이 되어드려요</p>
    </div>
  );
};

export default SplashPage;
