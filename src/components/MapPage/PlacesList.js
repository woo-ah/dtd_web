import React from 'react';
import './PlacesList.css';

const PlacesList = ({ places, handlePlaceSelect, distances }) => {
  return (
    <div className="places-list">
      <ul>
        {places.map((place, index) => (
          <li key={index} onClick={() => handlePlaceSelect(place)}>
            <div>
              <strong>{place.name}</strong>
              <p>{place.vicinity}</p>
              <p>{distances[place.place_id] ? `거리: ${distances[place.place_id]} km` : '계산 중...'}</p>
            </div>
            <button className="select-button">선택</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesList;
