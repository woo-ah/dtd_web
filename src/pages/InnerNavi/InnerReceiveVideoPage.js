import React, { useEffect, useRef, useState } from 'react';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';
import { sendMessage, receiveMessages } from '../../services/WebRTC/messaging';  // 메시지 관련 함수 사용

function InnerReceiveVideoPage({ roomId }) {
  const remoteVideoRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // WebRTC 피어 연결 설정
    const peerConnection = createPeerConnection(roomId, (stream) => {
      remoteVideoRef.current.srcObject = stream;
    }, false);  // 시청하는 사람

    // 메시지 수신 설정
    const unsubscribeMessages = receiveMessages(roomId, (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      peerConnection.close();  // 컴포넌트 언마운트 시 연결 해제
      unsubscribeMessages();  // 메시지 수신 구독 해제
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(roomId, 'Viewer', message);  // 'Viewer' 역할로 메시지 전송
      setMessage('');  // 메시지 입력란 초기화
    }
  };

  return (
    <div>
      <h1>시청 중...</h1>
      <video ref={remoteVideoRef} autoPlay playsInline />

      {/* 메시지 목록 */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </li>
        ))}
      </ul>

      {/* 메시지 입력 */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      <button onClick={handleSendMessage}>메시지 보내기</button>
    </div>
  );
}

export default InnerReceiveVideoPage;
