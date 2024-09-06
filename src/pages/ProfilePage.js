// src/pages/ProfilePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import '../css/ProfilePage.css';
import Header from '../components/ProfilePage/Header';
import ProfileOption from '../components/ProfilePage/ProfileOption';
import { FaUser, FaEdit, FaExclamationTriangle, FaHistory } from 'react-icons/fa';

function ProfilePage() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div className="profile-page">
      <Header/>
      
      <ProfileOption 
        icon={FaUser} 
        title="내 정보" 
        description="익명 님"
        onClick={() => navigate('/preparing')} // 경로 설정
      />
      
      <ProfileOption 
        icon={FaEdit} 
        title="제보 하기" 
        description="문의처, 여는 방법, 내부 길안내"
        onClick={() => navigate('/preparing')} // 경로 설정
      />
      
      <ProfileOption 
        icon={FaExclamationTriangle} 
        title="불편함 신고하기" 
        description="사용 시 불편한 점 신고하기"
        onClick={() => navigate('/preparing')} // 경로 설정
      />
      
      <ProfileOption 
        icon={FaHistory} 
        title="내 활동 목록" 
        description="내 활동 목록을 확인합니다."
        onClick={() => navigate('/preparing')} // 경로 설정
      />
    </div>
  );
}

export default ProfilePage;
