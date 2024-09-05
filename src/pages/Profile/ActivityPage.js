// src/pages/ActivityPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../../components/ProfilePage/ProfileHeader';

function ActivityPage() {
  const navigate = useNavigate();

  return (
    <div className="unlock-page">
      <ProfileHeader title="내 활동 목록" onBack={() => navigate(-1)} />
      <div className="content">
        <p> 활동 목록</p>
      </div>
    </div>
  );
}

export default ActivityPage;
