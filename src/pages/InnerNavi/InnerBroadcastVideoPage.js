import React, { useState, useEffect } from 'react';
import { getRoomList } from '../../services/Door/firebaseService';
import { sendMessage } from '../../services/WebRTC/messaging';
import './InnerBroadcastVideoPage.css';  // 스타일 파일 임포트

function InnerBroadcastVideoPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchRooms() {
      const roomList = await getRoomList();
      setRooms(roomList);
    }
    fetchRooms();
  }, []);

  const handleSendMessage = () => {
    if (selectedRoom && message.trim()) {
      sendMessage(selectedRoom, 'Broadcaster', message);
      setMessage('');  // 메시지 전송 후 입력란 초기화
    }
  };

  return (
    <div className="broadcast-page">
      <div className="room-list">
        <h1>생성된 룸 목록</h1>
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              {room.name}
              <button onClick={() => setSelectedRoom(room.id)}>선택</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedRoom && (
        <div className="selected-room-container">
          <h2>선택된 룸: {selectedRoom}</h2>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
            placeholder="메시지 입력"
          />
          <button className="message-send-button" onClick={handleSendMessage}>
            메시지 보내기
          </button>
        </div>
      )}
    </div>
  );
}

export default InnerBroadcastVideoPage;
