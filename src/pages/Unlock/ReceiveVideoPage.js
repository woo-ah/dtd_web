// src/pages/ReceiveVideoPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnlockHeader from '../../components/UnlockPage/UnlockHeader';

function ReceiveVideoPage() {
  const navigate = useNavigate();

  return (
    <div className="unlock-page">
      <UnlockHeader title="영상 중계 받기" onBack={() => navigate(-1)} />
      <div className="content">
        <p>영상 중계 받기 페이지 내용</p>
      </div>
    </div>
  );
}

export default ReceiveVideoPage;
