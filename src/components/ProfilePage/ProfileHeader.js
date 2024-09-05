import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import './ProfileHeader.css'; // CSS 파일 임포트

function ProfileHeader({ title, onBack }) {
  return (
    <div>
      <div className="profile-header">
        <button className="back-button" onClick={onBack}>
          <FaChevronLeft />
        </button>
        <h1 className="profile-title">{title}</h1>
      </div>
      <hr className="profile-divider" />
    </div>
  );
}

export default ProfileHeader;
