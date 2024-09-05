// src/pages/InnerNaviPage.js
import React from 'react';
import { FaMicrophone, FaSearchLocation } from 'react-icons/fa';
import '../css/InnerNaviPage.css';

function InnerNaviPage() {
  const handleSearch = () => {
    // 검색 기능 처리 로직 (예: 음성 입력 또는 텍스트 입력을 통해 검색)
    console.log('Searching for building...');
  };

  const handleRequestInfo = () => {
    // 정보 요청 기능 처리 로직
    console.log('Requesting information...');
  };

  return (
    <div className="inner-navi-page">
      <div className="search-bar">
        <FaSearchLocation className="search-icon" />
        <input 
          type="text" 
          placeholder="건물명을 검색하세요" 
          className="search-input"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <FaMicrophone className="microphone-icon" onClick={handleSearch} />
      </div>

      <div className="result-message">
        <h2>결과 없음</h2>
        <p>
          검색하신 건물에 대한 정보가 없습니다. 하단의 버튼을 통해, 내부 길 안내 정보 요청을 할 수 있습니다.
        </p>
        <button className="request-info-button" onClick={handleRequestInfo}>
          정보 요청하기
        </button>
      </div>
    </div>
  );
}

export default InnerNaviPage;
