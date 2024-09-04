// src/components/ProfilePage/ProfileOption.js
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './ProfileOption.css'; // CSS 파일 임포트

function ProfileOption({ icon: Icon, title, description, onClick }) {
  return (
    <div className="profile-option" onClick={onClick}>
      <Icon className="profile-icon" />
      <div className="profile-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <FaChevronRight className="profile-arrow" />
    </div>
  );
}

export default ProfileOption;
