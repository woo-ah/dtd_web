// src/pages/RoomSelectionPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomSelectionPage() {
  const [roomId, setRoomId] = useState('');
  const [role, setRole] = useState('');  // 역할 선택 (streamer, viewer)
  const navigate = useNavigate();

  // 새로운 룸 생성
  const handleCreateRoom = async (role) => {
    const newRoomId = `room-${Math.random().toString(36).substring(7)}`; // 임시 roomId 생성
    setRoomId(newRoomId);
    navigate(`/room/${newRoomId}/${role}`);  // 선택된 역할과 함께 방으로 이동
  };

  // 기존 룸 참가
  const handleJoinRoom = async () => {
    if (roomId && role) {
      navigate(`/room/${roomId}/${role}`);  // 선택된 역할에 맞게 룸으로 이동
    } else {
      console.error("룸 ID와 역할을 입력하세요.");
    }
  };

  return (
    <div>
      <h1>역할 선택 및 룸 참가</h1>
      
      {/* 새로운 룸 생성 (스트리밍 또는 수신 역할 선택) */}
      <button onClick={() => handleCreateRoom('streamer')}>새로운 스트리밍 룸 생성</button>
      <button onClick={() => handleCreateRoom('viewer')}>새로운 시청 룸 생성</button>

      {/* 기존 룸 참가 (룸 ID와 역할 입력) */}
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="룸 ID 입력"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">역할 선택</option>
        <option value="streamer">스트리밍</option>
        <option value="viewer">시청</option>
      </select>
      <button onClick={handleJoinRoom}>룸에 참가</button>
    </div>
  );
}

export default RoomSelectionPage;
