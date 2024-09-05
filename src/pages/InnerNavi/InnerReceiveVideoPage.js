// src/pages/InnerNavi/InnerReceiveVideoPage.js
import React, { useEffect, useRef } from 'react';
import { createRoom } from '../../services/Door/firebaseService';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';
import { addLocalStreamToPeerConnection, startLocalVideo } from '../../services/WebRTC/videoStream';  // 수정된 경로

function InnerReceiveVideoPage() {
  const localVideoRef = useRef(null);

  useEffect(() => {
    async function startStreaming() {
      const newRoomId = await createRoom();  // 새로운 방 생성
      const localStream = await startLocalVideo(localVideoRef);  // 로컬 비디오 시작
      const peerConnection = createPeerConnection(newRoomId, null, true);  // 스트리머로 연결
      addLocalStreamToPeerConnection(localStream, peerConnection);  // 스트림을 피어 연결에 추가
    }

    startStreaming();
  }, []);

  return (
    <div>
      <h1>영상 송출 중...</h1>
      <video ref={localVideoRef} autoPlay playsInline muted />
    </div>
  );
}

export default InnerReceiveVideoPage;
