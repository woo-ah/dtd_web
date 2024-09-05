import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import Header from '../components/UnlockPage/Header';
import UnlockOption from '../components/UnlockPage/UnlockOption';
import { FaSearch, FaCamera, FaVideo, FaMicrophone } from 'react-icons/fa';
import '../css/UnlockPage.css'; // 페이지 전용 스타일(있다면) 임포트

function UnlockPage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

  return (
    <div className="unlock-page">
      <Header/>
      
      <UnlockOption 
        icon={FaSearch} 
        title="문 정보 검색하기" 
        description="문의 위치, 여는 방법, 내부 길 안내"
        onClick={() => navigate('/unlock-search')}
      />
      
      <UnlockOption 
        icon={FaCamera} 
        title="문 사진 촬영하기" 
        description="문의 위치, 여는 방법, 문 사용법 안내"
        onClick={() => navigate('/unlock-camera-intro')}
      />
      
      <UnlockOption 
        icon={FaVideo} 
        title="영상 중계 받기" 
        description="영상 촬영 실시간 안내 받기"
        onClick={() => navigate('/receive-video')}
      />
      
      <UnlockOption 
        icon={FaMicrophone} 
        title="영상 중계 하기" 
        description="촬영된 영상 실시간 안내 하기"
        onClick={() => navigate('/broadcast-video')}
      />
    </div>
  );
}

export default UnlockPage;
