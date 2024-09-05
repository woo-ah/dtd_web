// src/components/InnerNaviOption.js
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './InnerNaviOption.css'; // 분리된 CSS 파일 임포트

function InnerNaviOption({ icon: Icon, title, description, onClick }) {
  return (
    <div className="innernavi-option" onClick={onClick}>
      <Icon className="innernavi-icon" />
      <div className="innernavi-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <FaChevronRight className="innernavi-arrow" />
    </div>
  );
}

export default InnerNaviOption;
