import React from 'react';
import '../css/PreparingPage.css';

const PreparingPage = () => {
    return (
        <div className="preparing-container">
            <h1 className="preparing-title">페이지 준비 중입니다</h1>
            <img src="/dtd_door.svg" alt="PlantB Logo" className="preparing-logo-icon" />
            <p className="preparing-message">현재 이 페이지를 준비 중입니다.<br/>나중에 다시 확인해 주세요!</p>
        </div>
    );
};

export default PreparingPage;
