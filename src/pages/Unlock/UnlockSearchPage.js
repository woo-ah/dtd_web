// src/pages/UnlockSearchPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnlockHeader from '../../components/UnlockPage/UnlockHeader';

function UnlockSearchPage() {
  const navigate = useNavigate();

  return (
    <div className="unlock-page">
      <UnlockHeader title="문 정보 검색하기" onBack={() => navigate(-1)} />
      <div className="content">
        <p>문 정보 검색하기 페이지 내용</p>
      </div>
    </div>
  );
}

export default UnlockSearchPage;
