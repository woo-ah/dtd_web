// src/services/WebRTC/messaging.js
import { database } from '../Door/firebaseService';

// 메시지 전송
export const sendMessage = (roomId, sender, content) => {
  database.ref(`rooms/${roomId}/messages`).push({
    sender,
    content,
    timestamp: Date.now()
  });
};

// 메시지 수신
export const receiveMessages = (roomId, callback) => {
  const messageRef = database.ref(`rooms/${roomId}/messages`);
  messageRef.on('child_added', (snapshot) => {
    callback(snapshot.val());
  });

  return () => messageRef.off();
};
