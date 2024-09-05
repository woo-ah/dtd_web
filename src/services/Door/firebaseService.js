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
