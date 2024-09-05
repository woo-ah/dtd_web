// src/pages/InnerNavi/InnerReceiveVideoPage.js
import React, { useEffect, useRef } from 'react';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';

function InnerReceiveVideoPage({ roomId }) {
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // WebRTC 피어 연결 설정
    const peerConnection = createPeerConnection(roomId, (stream) => {
      remoteVideoRef.current.srcObject = stream;
    }, false);  // 시청하는 사람

    return () => peerConnection.close();
  }, [roomId]);

  return (
    <div>
      <h1>시청 중...</h1>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
}

export default InnerReceiveVideoPage;
