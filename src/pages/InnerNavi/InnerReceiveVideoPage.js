import React, { useEffect, useRef, useState } from 'react';
import { createRoom } from '../../services/Door/firebaseService';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';
import { addLocalStreamToPeerConnection, startLocalVideo } from '../../services/WebRTC/videoStream';
import { receiveMessages } from '../../services/WebRTC/messaging';

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
  
        // fallback으로 기본 카메라로 다시 시도
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
  
      throw error;  // 다른 오류일 경우 그대로 throw
    }
  };
  

  // 카메라 전환 함수
  const toggleCamera = async () => {
    setIsBackCamera((prevState) => !prevState); // 카메라 방향 상태 변경
    await startCamera(!isBackCamera); // 카메라 방향에 따라 스트림 다시 시작
  };

  useEffect(() => {
    async function startStreaming() {
      const newRoomId = await createRoom();  // 새로운 방 생성
      setRoomId(newRoomId);  // 생성된 방 ID 저장
      const localStream = await startCamera(isBackCamera);  // 로컬 비디오 시작
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
  }, [isBackCamera]);  // 카메라 방향 상태가 변경될 때마다 스트리밍 다시 시작

  return (
    <div>
      <h1>영상 송출 중...</h1>
      <p>현재 방 ID: {roomId}</p> {/* 방 ID 표시 */}
      <video ref={localVideoRef} autoPlay playsInline muted />

      {/* 카메라 전환 버튼 */}
      <button onClick={toggleCamera}>카메라 전환</button>

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
