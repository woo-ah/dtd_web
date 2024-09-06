import React, { useState, useEffect, useRef } from 'react';
import { getRoomList } from '../../services/Door/firebaseService';
import { sendMessage, receiveMessages } from '../../services/WebRTC/messaging';
import { startLocalVideo } from '../../services/WebRTC/videoStream';
import './InnerBroadcastVideoPage.css';  // 스타일 파일 임포트

function InnerBroadcastVideoPage() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // 받은 메시지 목록
  const localVideoRef = useRef(null);

  useEffect(() => {
    // 방 목록을 가져옴
    async function fetchRooms() {
      const roomList = await getRoomList();
      setRooms(roomList);
    }
    fetchRooms();
  }, []);

  // 방을 선택하면 해당 방의 영상과 메시지를 받음
  useEffect(() => {
    let unsubscribeMessages;
    if (selectedRoom) {
      // 메시지 수신 시작
      unsubscribeMessages = receiveMessages(selectedRoom, (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // 선택된 방의 영상을 시작
      startLocalVideo(localVideoRef)
        .then((stream) => {
          localVideoRef.current.srcObject = stream;
        })
        .catch((error) => console.error('영상을 시작할 수 없습니다:', error));
    }

    return () => {
      // 메시지 수신 해제
      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
    };
  }, [selectedRoom]);

  const handleSendMessage = () => {
    if (selectedRoom && message.trim()) {
      sendMessage(selectedRoom, 'Broadcaster', message);  // 메시지 전송
      setMessage('');  // 메시지 전송 후 입력란 초기화
    }
  };

  return (
    <div className="broadcast-page">
      {/* 방 목록 표시 */}
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

      {/* 선택된 방이 있을 경우 */}
      {selectedRoom && (
        <div className="selected-room-container">
          <h2>선택된 룸: {selectedRoom}</h2>

          {/* 메시지 입력 및 전송 */}
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

          {/* 받은 메시지 목록 */}
          <div className="message-list">
            <h2>메시지 목록</h2>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>{msg.sender}:</strong> {msg.content}
                </li>
              ))}
            </ul>
          </div>

          {/* 영상 표시 */}
          <div className="video-container">
            <video ref={localVideoRef} autoPlay playsInline muted className="video-player" />
          </div>
        </div>
      )}
    </div>
  );
}

export default InnerBroadcastVideoPage;
