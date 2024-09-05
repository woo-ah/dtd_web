// src/services/WebRTC/videoStream.js

// 로컬 비디오 스트림 시작
export const startLocalVideo = async (videoRef) => {
  try {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = localStream;
    return localStream;
  } catch (error) {
    console.error('로컬 비디오 스트림을 시작할 수 없습니다:', error);
    throw error;
  }
};

// 로컬 스트림을 피어 연결에 추가
export const addLocalStreamToPeerConnection = (localStream, peerConnection) => {
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
};
