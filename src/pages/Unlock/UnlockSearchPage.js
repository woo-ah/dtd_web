import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnlockHeader from '../../components/UnlockPage/UnlockHeader';
import '../../css/Unlock/UnlockSearchPage.css'; // 스타일 파일 임포트

function UnlockSearchPage() {
  const navigate = useNavigate();

  return (
    <div className="Unlock-search-page">
      <UnlockHeader title="문 정보 검색하기" onBack={() => navigate(-1)} />
      <div className="Unlock-search-container">
        <div className="Unlock-search-bar">
          <input 
            type="text" 
            placeholder="문 이름을 입력하세요" 
            className="Unlock-search-input"
            onKeyPress={(e) => e.key === 'Enter' && console.log('Searching for door...')}
          />
          <button className="Unlock-search-button" onClick={() => console.log('Searching for door...')}>검색</button>
        </div>
        <div className="Unlock-search-result-message">
          <h2>결과 없음</h2>
          <p>검색한 문에 대한 정보가 없습니다. 다른 정보를 입력해 보세요.</p>
        </div>
      </div>
    </div>
  );
}

export default UnlockSearchPage;
