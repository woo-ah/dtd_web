// src/pages/ReportPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../../components/ProfilePage/ProfileHeader';

function ReportPage() {
  const navigate = useNavigate();

  return (
    <div className="unlock-page">
      <ProfileHeader title="제보 하기" onBack={() => navigate(-1)} />
      <div className="content">
        <p> 제보 목록</p>
      </div>
    </div>
  );
}

export default ReportPage;

