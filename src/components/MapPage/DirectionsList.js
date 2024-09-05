import React from 'react';
import { FaWalking, FaBus, FaTimes } from 'react-icons/fa'; // 필요한 아이콘 임포트
import './DirectionsList.css';

const DirectionsList = ({ directionsSteps, onClose }) => {
  return (
    <div className="directions-list">
      <div className="directions-header">
        <h3>가는 길</h3>
        <FaTimes className="close-icon" onClick={onClose} /> {/* 닫기 버튼 추가 */}
      </div>
      <ul>
        {directionsSteps.map((step, index) => (
          <li key={index} className="directions-step">
            <div className="step-icon">
              {step.instructions.includes("도보") && <FaWalking />}
              {step.instructions.includes("버스") && <FaBus />}
            </div>
            <div className="step-details" dangerouslySetInnerHTML={{ __html: step.instructions }} />
            <small className="step-info">{step.distance} - {step.duration}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectionsList;
