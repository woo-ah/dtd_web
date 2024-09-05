import React from 'react';
import { FaWalking, FaBus, FaHeart } from 'react-icons/fa'; // 필요한 아이콘 임포트
import './RouteCard.css'; // CSS 파일 임포트

function RouteCard({ route }) {
  return (
    <div className="save-route-card">
      <h2 className="save-route-card-title">출발: {route.departure}</h2>
      {route.isFavorite && <FaHeart className="save-favorite-icon" />}
      <div className="save-route-details">
        {route.route.map((step, index) => (
          <p key={index} className="save-route-step">
            {step.type === 'walk' && <FaWalking className="save-step-icon" />}
            {step.type === 'bus' && <FaBus className="save-step-icon" />}
            {step.description} {step.time && `(${step.time})`}
          </p>
        ))}
      </div>
      <h3 className="save-route-card-end">도착: {route.arrival}</h3>
    </div>
  );
}

export default RouteCard;
