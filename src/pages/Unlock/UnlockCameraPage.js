// src/pages/UnlockCameraPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnlockHeader from '../../components/UnlockPage/UnlockHeader';

function UnlockCameraPage() {
  const navigate = useNavigate();

  return (
    <div className="unlock-page">
      <UnlockHeader title="문 사진 촬영하기" onBack={() => navigate(-1)} />
      <div className="content">
        <p>문 사진 촬영하기 페이지 내용</p>
      </div>
    </div>
  );
}

export default UnlockCameraPage;
