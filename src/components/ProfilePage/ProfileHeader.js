// src/components/ProfilePage/ProfileHeader.js
import React from 'react';
import './ProfileHeader.css'; // CSS 파일 임포트

function ProfileHeader({ title }) {
  return (
    <div>
      <div className="profile-header">
        <h1 className="profile-title">{title}</h1>
      </div>
      <hr className="profile-divider" />
    </div>
  );
}

export default ProfileHeader;
