//# WebRTC 연결 설정 (P2P 및 시그널링)
// services/WebRTC/peerConnection.js
import { database } from '../Door/firebaseService';

// WebRTC 피어 연결 생성
export const createPeerConnection = (roomId, onTrackCallback, isCaller) => {
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN 서버 설정
  };

  const peerConnection = new RTCPeerConnection(configuration);

  // 수신된 트랙 처리
  peerConnection.ontrack = (event) => {
    if (onTrackCallback) onTrackCallback(event.streams[0]);
  };

  // ICE Candidate 처리
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      database.ref(`rooms/${roomId}/iceCandidates`).push({
        candidate: event.candidate,
      });
    }
  };

  // 송신자인 경우 Offer 생성
  if (isCaller) {
    peerConnection.createOffer().then((offer) => {
      return peerConnection.setLocalDescription(offer);
    }).then(() => {
      database.ref(`rooms/${roomId}`).push({
        type: 'offer',
        offer: peerConnection.localDescription,
      });
    }).catch((error) => {
      console.error("Offer 생성 중 오류:", error);
    });
  } else {
    // Offer 수신 및 Answer 생성
    database.ref(`rooms/${roomId}`).on('child_added', async (snapshot) => {
      const data = snapshot.val();
      if (data.type === "offer") {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        database.ref(`rooms/${roomId}`).push({
          type: 'answer',
          answer: peerConnection.localDescription,
        });
      } else if (data.type === "answer") {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    // ICE 후보를 수신하여 추가
    database.ref(`rooms/${roomId}/iceCandidates`).on('child_added', (snapshot) => {
      const data = snapshot.val();
      if (data.candidate) {
        peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate)).catch((error) => {
          console.error("ICE 후보 추가 중 오류:", error);
        });
      }
    });
  }

  return peerConnection;
};
