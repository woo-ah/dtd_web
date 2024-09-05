// src/pages/InnerNavi/InnerBroadcastVideoPage.js
import React, { useState, useEffect } from 'react';
import { getRoomList } from '../../services/Door/firebaseService';
import { sendMessage } from '../../services/WebRTC/messaging';

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
    <div>
      <h1>생성된 룸 목록</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name}
            <button onClick={() => setSelectedRoom(room.id)}>선택</button>
          </li>
        ))}
      </ul>

      {selectedRoom && (
        <div>
          <h2>선택된 룸: {selectedRoom}</h2> {/* 선택된 방 ID 표시 */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 입력"
          />
          <button onClick={handleSendMessage}>메시지 보내기</button>
        </div>
      )}
    </div>
  );
}

export default InnerBroadcastVideoPage;
