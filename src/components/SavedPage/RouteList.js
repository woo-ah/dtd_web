// src/components/RouteList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import RouteCard from './RouteCard';
import Modal from './modal/RouteModal'; // 모달 컴포넌트 임포트
import './RouteList.css'; // CSS 파일 임포트

function RouteList({ routes, activeTab }) {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleAddRouteClick = () => {
    if (activeTab === 'external') {
      navigate('/map'); // 외부 경로일 경우 /map으로 이동
    } else {
      navigate('/inner-navi'); // 내부 경로일 경우 /inner-navi로 이동
    }
  };

  const handleCardClick = (route) => {
    setSelectedRoute(route); // 카드 클릭 시 모달에 표시할 경로를 설정
  };

  const handleCloseModal = () => {
    setSelectedRoute(null); // 모달 창 닫기
  };

  if (routes.length === 0) {
    return (
      <div className="save-no-routes">
        <p className="save-no-routes-text">저장된 {activeTab === 'external' ? '외부 길 안내' : '내부 길 안내'} 리스트가 없습니다. 하단의 버튼을 통해, 경로를 추가 할 수 있습니다.</p>
        <button className="save-add-route-button" onClick={handleAddRouteClick}>
          경로 추가하기
        </button>
      </div>
    );
  } else {
    return (
      <div className="save-route-list">
        {routes.map((route, index) => (
          <RouteCard key={index} route={route} onClick={() => handleCardClick(route)} />
        ))}
        {selectedRoute && (
          <Modal route={selectedRoute} onClose={handleCloseModal} />
        )}
      </div>
    );
  }
}

export default RouteList;
