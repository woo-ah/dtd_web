import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import './UnlockHeader.css'; // CSS 파일 임포트

function UnlockHeader({ title, onBack }) {
  return (
    <div>
      <div className="unlock-header">
        <button className="back-button" onClick={onBack}>
          <FaChevronLeft />
        </button>
        <h1 className="unlock-title">{title}</h1>
      </div>
      <hr className="unlock-divider" />
    </div>
  );
}

export default UnlockHeader;
