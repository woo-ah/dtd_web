// src/pages/InnerNavi/InnerBroadcastVideoPage.js
import React, { useEffect, useRef } from 'react';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';

function InnerBroadcastVideoPage({ roomId }) {
  const localVideoRef = useRef(null);

  useEffect(() => {
    // WebRTC 피어 연결 설정
    const peerConnection = createPeerConnection(roomId, (stream) => {
      localVideoRef.current.srcObject = stream;
    }, true);  // 스트리밍하는 사람

    return () => peerConnection.close();
  }, [roomId]);

  return (
    <div>
      <h1>스트리밍 중...</h1>
      <video ref={localVideoRef} autoPlay playsInline />
    </div>
  );
}

export default InnerBroadcastVideoPage;
