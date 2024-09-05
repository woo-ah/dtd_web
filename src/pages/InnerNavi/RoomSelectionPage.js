// src/pages/RoomSelectionPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom, getRoomList } from '../../services/Door/firebaseService';  // Firebase 서비스 함수들 사용

function RoomSelectionPage() {
  const [rooms, setRooms] = useState([]); // 방 목록
  const navigate = useNavigate();

  useEffect(() => {
    // 방 목록 불러오기
    async function fetchRooms() {
      const roomList = await getRoomList();
      setRooms(roomList);
    }
    fetchRooms();
  }, []);

  // 새로운 방 생성
  const handleCreateRoom = async () => {
    const newRoomId = await createRoom();  // Firebase에서 방 생성
    navigate(`/room/${newRoomId}/streamer`);  // 방 생성 후 바로 스트리밍 시작 (스트리머 역할)
  };

  // 방에 참가
  const handleJoinRoom = (roomId) => {
    navigate(`/room/${roomId}/viewer`);  // 방에 참가 (시청자 역할)
  };

  return (
    <div>
      <h1>룸 선택</h1>
      
      {/* 방 생성 */}
      <button onClick={handleCreateRoom}>새로운 룸 생성</button>

      {/* 방 목록 표시 */}
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              {room.name} 
              <button onClick={() => handleJoinRoom(room.id)}>참가</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>생성된 방이 없습니다.</p>
      )}
    </div>
  );
}

export default RoomSelectionPage;
