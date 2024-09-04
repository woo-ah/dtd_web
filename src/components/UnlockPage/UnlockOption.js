// src/components/UnlockOption.js
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './UnlockOption.css'; // 분리된 CSS 파일 임포트

function UnlockOption({ icon: Icon, title, description, onClick }) {
  return (
    <div className="unlock-option" onClick={onClick}>
      <Icon className="unlock-icon" />
      <div className="unlock-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <FaChevronRight className="unlock-arrow" />
    </div>
  );
}

export default UnlockOption;
