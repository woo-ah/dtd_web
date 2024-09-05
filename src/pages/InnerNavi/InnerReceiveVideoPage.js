// src/pages/InnerNavi/InnerReceiveVideoPage.js
import React, { useEffect, useRef, useState } from 'react';
import { createRoom } from '../../services/Door/firebaseService';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';
import { addLocalStreamToPeerConnection, startLocalVideo } from '../../services/WebRTC/videoStream';
import { receiveMessages } from '../../services/WebRTC/messaging';  // 메시지 수신 기능 추가

function InnerReceiveVideoPage() {
  const localVideoRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');  // 방 ID 상태 저장

  useEffect(() => {
    async function startStreaming() {
      const newRoomId = await createRoom();  // 새로운 방 생성
      setRoomId(newRoomId);  // 생성된 방 ID 저장
      const localStream = await startLocalVideo(localVideoRef);  // 로컬 비디오 시작
      const peerConnection = createPeerConnection(newRoomId, null, true);  // 스트리머로 연결
      addLocalStreamToPeerConnection(localStream, peerConnection);  // 스트림을 피어 연결에 추가

      // 메시지 수신 설정
      const unsubscribeMessages = receiveMessages(newRoomId, (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      // 컴포넌트 언마운트 시 메시지 수신 구독 해제
      return () => {
        unsubscribeMessages();
        peerConnection.close();
      };
    }

    startStreaming();
  }, []);

  return (
    <div>
      <h1>영상 송출 중...</h1>
      <p>현재 방 ID: {roomId}</p> {/* 방 ID 표시 */}
      <video ref={localVideoRef} autoPlay playsInline muted />

      {/* 메시지 목록 */}
      <div>
        <h2>메시지 목록</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}:</strong> {msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InnerReceiveVideoPage;
