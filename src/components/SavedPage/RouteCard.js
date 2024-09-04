import React from 'react';
import './RouteCard.css'; // CSS 파일 임포트

function RouteCard({ route }) {
  return (
    <div className="save-route-card">
      <h2 className="save-route-card-title">출발: {route.departure}</h2>
      <div className="save-route-details">
        {route.route.map((step, index) => (
          <p key={index} className="save-route-step">
            {step.type === 'walk' && <span>🚶‍♂️</span>}
            {step.type === 'bus' && <span>🚌</span>}
            {step.description} {step.time && `(${step.time})`}
          </p>
        ))}
      </div>
      <h3 className="save-route-card-end">도착: {route.arrival}</h3>
      {route.isFavorite && <span className="save-favorite-icon">❤️</span>}
    </div>
  );
}

export default RouteCard;
