// src/components/Modal.js
import React from 'react';
import './Modal.css';

function Modal({ route, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>출발: {route.departure}</h2>
        <h2>도착: {route.arrival}</h2>
        <p>경로 안내를 시작하시겠습니까?</p>
        <button className="modal-button">네</button>
        <button className="modal-button">아니오</button>
        <button className="modal-delete-button">경로 삭제하기</button>
        <button className="modal-close-button" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
