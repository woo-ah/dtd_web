import React, { useState } from 'react';
import Header from '../components/SavedPage/Header';
import TabNavigation from '../components/SavedPage/TabNavigation';
import RouteList from '../components/SavedPage/RouteList';
import { externalRoutes } from '../data/externalRoutes'; // 데이터 파일 임포트
import '../css/SavedPage.css'; // CSS 파일 임포트

function SavedPage() {
  const [activeTab, setActiveTab] = useState('external'); // 'external' 또는 'internal' 값

  // 외부 길 안내 탭이 활성화되어 있는 경우만 externalRoutes를 사용
  const routes = activeTab === 'external' ? externalRoutes : [];

  return (
    <div className="save-page-container">
      <Header title="저장된 페이지" />
      <TabNavigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      <div className="saved-route-count">전체 경로: {routes.length} 개</div>
      <RouteList routes={routes} activeTab={activeTab} />
    </div>
  );
}

export default SavedPage;
