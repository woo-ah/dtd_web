// src/components/Header.js
import React from 'react';
import './Header.css'; // 분리된 CSS 파일 임포트

function Header() {
  return (
    <div>
      <h1 className="innernavi-title-ori">내부 길 안내 페이지</h1>
      <hr className="innernavi-divider-ori" />
    </div>
  );
}

export default Header;
