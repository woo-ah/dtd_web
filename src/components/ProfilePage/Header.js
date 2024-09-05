// src/components/ProfilePage/ProfileHeader.js
import React from 'react';
import './Header.css'; // 분리된 CSS 파일 임포트

function Header() {
  return (
    <div>
      <h1 className="profile-title-ori">내 정보 페이지</h1>
      <hr className="profile-divider-ori" />
    </div>
  );
}

export default Header;
