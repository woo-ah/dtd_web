import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import './InnerNaviHeader.css'; // CSS 파일 임포트

function InnerNaviHeader({ title, onBack }) {
  return (
    <div>
      <div className="innernavi-header">
        <button className="back-button" onClick={onBack}>
          <FaChevronLeft />
        </button>
        <h1 className="innernavi-title">{title}</h1>
      </div>
      <hr className="innernavi-divider" />
    </div>
  );
}

export default InnerNaviHeader;
