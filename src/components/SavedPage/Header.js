import React from 'react';
import './Header.css'; // CSS 파일 임포트

function Header({ title }) {
  return (
    <div className="save-header">
      <h1 className="save-header-title">{title}</h1>
    </div>
  );
}

export default Header;
