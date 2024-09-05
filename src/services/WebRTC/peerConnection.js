// src/services/WebRTC/peerConnection.js
import { database } from '../Door/firebaseService';

// WebRTC 피어 연결 생성
export const createPeerConnection = (roomId, onTrackCallback, isCaller) => {
  const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

  const peerConnection = new RTCPeerConnection(configuration);

  peerConnection.ontrack = (event) => {
    if (onTrackCallback) {
      onTrackCallback(event.streams[0]);
    }
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      database.ref(`rooms/${roomId}/iceCandidates`).push({
        candidate: event.candidate,
      });
    }
  };

  if (isCaller) {
    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);
      database.ref(`rooms/${roomId}`).push({
        type: 'offer',
        offer,
      });
    });
  } else {
    database.ref(`rooms/${roomId}`).on('child_added', async (snapshot) => {
      const data = snapshot.val();
      if (data.type === 'offer') {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        database.ref(`rooms/${roomId}`).push({
          type: 'answer',
          answer,
        });
      } else if (data.type === 'ice-candidate') {
        peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });
  }

  return peerConnection;
};
