import React, { useEffect, useRef, useState } from 'react';
import { createRoom } from '../../services/Door/firebaseService';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';
import { addLocalStreamToPeerConnection, startLocalVideo } from '../../services/WebRTC/videoStream';
import { receiveMessages } from '../../services/WebRTC/messaging';
import './InnerReceiveVideoPage.css';  // 스타일 파일 추가

function InnerReceiveVideoPage() {
  const localVideoRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');  // 방 ID 상태 저장
  const [isBackCamera, setIsBackCamera] = useState(true); // 후방 카메라 상태 저장

  const startCamera = async (useBackCamera) => {
    const constraints = {
      video: {
        facingMode: useBackCamera ? { exact: 'environment' } : 'user', // 후방/전방 카메라 설정
        audio: true,
      },
    };
    
    try {
      const localStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      return localStream;
    } catch (error) {
      console.error('카메라 설정 중 오류 발생:', error);
  
      if (error.name === 'OverconstrainedError') {
        console.warn('요구한 카메라를 찾을 수 없습니다. 기본 카메라로 대체합니다.');
  
        const fallbackConstraints = {
          video: true,
          audio: true,
        };
        const localStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
        return localStream;
      }
  
      throw error;  
    }
  };

  const toggleCamera = async () => {
    setIsBackCamera((prevState) => !prevState); 
    await startCamera(!isBackCamera); 
  };

  useEffect(() => {
    async function startStreaming() {
      const newRoomId = await createRoom(); 
      setRoomId(newRoomId);  
      const localStream = await startCamera(isBackCamera); 
      const peerConnection = createPeerConnection(newRoomId, null, true); 
      addLocalStreamToPeerConnection(localStream, peerConnection); 

      const unsubscribeMessages = receiveMessages(newRoomId, (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        unsubscribeMessages();
        peerConnection.close();
      };
    }

    startStreaming();
  }, [isBackCamera]);  

  return (
    <div className="inner-video-page">
      <h1>영상 송출 중...</h1>
      <p>현재 방 ID: {roomId}</p> 
      <div className="inner-video-container">
        <video ref={localVideoRef} className="inner-video" autoPlay playsInline muted />
      </div>

      <button className="camera-toggle-button" onClick={toggleCamera}>카메라 전환</button>

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
    </div>
  );
}

export default InnerReceiveVideoPage;
