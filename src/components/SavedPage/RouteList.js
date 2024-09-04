import React from 'react';
import RouteCard from './RouteCard';
import './RouteList.css'; // CSS 파일 임포트

function RouteList({ routes, activeTab }) {
  if (routes.length === 0) {
    return (
      <div className="save-no-routes">
        <p className="save-no-routes-text">저장된 {activeTab === 'external' ? '외부 길 안내' : '내부 길 안내'} 리스트가 없습니다.</p>
        <button className="save-add-route-button">경로 추가하기</button>
      </div>
    );
  } else {
    return (
      <div className="save-route-list">
        {routes.map((route, index) => (
          <RouteCard key={index} route={route} />
        ))}
      </div>
    );
  }
}

export default RouteList;
