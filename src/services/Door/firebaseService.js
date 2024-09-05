// services/Door/firebaseService.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';  // Realtime Database 추가

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Firebase 초기화 (중복 초기화를 방지)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase Realtime Database 가져오기
export const database = firebase.database();

// Firebase에 이미지 업로드 후 URL 가져오기
export const uploadImageToFirebase = async (blob) => {
  const storageRef = firebase.storage().ref();
  const uniqueFileName = `images/${Date.now()}.jpg`; // 고유 파일 이름 생성
  const fileRef = storageRef.child(uniqueFileName);

  try {
    // 이미지 업로드
    await fileRef.put(blob);
    console.log('이미지가 Firebase에 저장되었습니다:', uniqueFileName);

    // 이미지 다운로드 URL 가져오기
    const downloadURL = await fileRef.getDownloadURL();
    console.log('이미지 다운로드 URL:', downloadURL);

    return downloadURL; // URL 반환
  } catch (error) {
    console.error('Firebase 업로드 중 오류:', error);
    return null;
  }
};

// 방 생성
export const createRoom = async () => {
  const newRoomRef = database.ref('rooms').push();  // 새 방 생성
  const newRoomId = newRoomRef.key;
  await newRoomRef.set({
    name: `Room ${newRoomId}`,
    createdAt: Date.now(),
  });
  return newRoomId;  // 새로 생성된 방 ID 반환
};

// 방 목록 가져오기
export const getRoomList = async () => {
  const snapshot = await database.ref('rooms').once('value');  // 방 목록 조회
  const rooms = [];
  snapshot.forEach((childSnapshot) => {
    rooms.push({ id: childSnapshot.key, ...childSnapshot.val() });
  });
  return rooms;  // 방 목록 반환
};

// 방 참가 (추후 사용 가능)
export const joinRoom = async (roomId) => {
  console.log(`Joined room: ${roomId}`);  // 방 참가 로직은 추후 WebRTC와 함께 구현 가능
};
