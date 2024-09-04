import React from 'react';
import './TabNavigation.css'; // CSS 파일 임포트

function TabNavigation({ activeTab, setActiveTab }) {
  const indicatorStyle = {
    transform: activeTab === 'internal' ? 'translateX(100%)' : 'translateX(0)',
  };

  return (
    <div className="save-tab-navigation">
      <button 
        className={`save-tab-button ${activeTab === 'external' ? 'save-nav-active' : ''}`} 
        onClick={() => setActiveTab('external')}
      >
        외부 길 안내
      </button>
      <button 
        className={`save-tab-button ${activeTab === 'internal' ? 'save-nav-active' : ''}`} 
        onClick={() => setActiveTab('internal')}
      >
        내부 길 안내
      </button>
      <div className="save-tab-indicator" style={indicatorStyle} /> {/* 탭 아래의 노란색 바 */}
    </div>
  );
}

export default TabNavigation;
