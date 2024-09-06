import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import Header from '../components/InnerNaviPage/Header';
import InnerNaviOption from '../components/InnerNaviPage/InnerNaviOption';
import { FaSearch, FaVideo, FaMicrophone } from 'react-icons/fa';
import '../css/InnerNaviPage.css'; // 페이지 전용 스타일(있다면) 임포트

function InnerNaviPage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

  return (
    <div className="innernavi-page">
      <Header/>
      
      <InnerNaviOption 
        icon={FaSearch} 
        title="내부 길 안내 검색하기" 
        description="저장된 길 안내 검색"
        onClick={() => navigate('/innernavi-search')}
      />
      
      {/* <InnerNaviOption 
        icon={FaCamera} 
        title="비콘으로 내부 길 찾기" 
        description="비콘을 통하여 내부 길 안내"
        onClick={() => navigate('/innernavi-beacon')}
      /> */}
      
      <InnerNaviOption 
        icon={FaVideo} 
        title="영상 중계 받기" 
        description="영상 촬영 실시간 안내 받기"
        onClick={() => navigate('/inner-receive-video')}
      />
      
      <InnerNaviOption 
        icon={FaMicrophone} 
        title="영상 중계 하기" 
        description="촬영된 영상 실시간 안내 하기"
        onClick={() => navigate('/inner-broadcast-video')}
      />
    </div>
  );
}

export default InnerNaviPage;
