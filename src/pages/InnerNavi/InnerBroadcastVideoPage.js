// src/pages/InnerNavi/InnerBroadcastVideoPage.js
import React, { useEffect, useRef } from 'react';
import { createPeerConnection } from '../../services/WebRTC/peerConnection';
import { startLocalVideo, addLocalStreamToPeerConnection } from '../../services/WebRTC/videoStream';  // videoStream.js에서 가져옴

function InnerBroadcastVideoPage({ roomId }) {
  const localVideoRef = useRef(null);

  useEffect(() => {
    // 로컬 비디오 스트림 시작
    startLocalVideo(localVideoRef).then((localStream) => {
      // WebRTC 피어 연결 설정
      const peerConnection = createPeerConnection(roomId, null, true);  // 스트리밍하는 사람
      
      // 로컬 비디오 스트림을 피어 연결에 추가
      addLocalStreamToPeerConnection(localStream, peerConnection);

      return () => peerConnection.close();  // 컴포넌트 언마운트 시 연결 해제
    });
  }, [roomId]);

  return (
    <div>
      <h1>스트리밍 중...</h1>
      <video ref={localVideoRef} autoPlay playsInline muted /> {/* 자신을 보므로 음소거 */}
    </div>
  );
}

export default InnerBroadcastVideoPage;
