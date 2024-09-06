import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import AuthPage from './pages/AuthPage';
import SavedPage from './pages/SavedPage';
import MapPage from './pages/MapPage';
import InnerNaviPage from './pages/InnerNaviPage';
import UnlockPage from './pages/UnlockPage';
import ProfilePage from './pages/ProfilePage';

import Navigation from './components/Navigation/Navigation';

import UnlockSearchPage from './pages/Unlock/UnlockSearchPage';
import UnlockCameraPage from './pages/Unlock/UnlockCameraPage';
import ReceiveVideoPage from './pages/Unlock/ReceiveVideoPage';
import BroadcastVideoPage from './pages/Unlock/BroadcastVideoPage';

import IntroductionPage from './pages/Unlock/UnlockCamera/IntroductionPage';
import CameraPage from './pages/Unlock/UnlockCamera/CameraPage';
import AnalyzingPage from './pages/Unlock/UnlockCamera/AnalyzingPage';
import ResultPage from './pages/Unlock/UnlockCamera/ResultPage';

import InnerNaviSearchPage from './pages/InnerNavi/InnerNaviSearchPage';
import BeaconPage from './pages/InnerNavi/BeaconPage';
import InnerReceiveVideoPage from './pages/InnerNavi/InnerReceiveVideoPage';
import InnerBroadcastVideoPage from './pages/InnerNavi/InnerBroadcastVideoPage';

import ProfileInfoPage from './pages/Profile/ProfileInfoPage';
import ReportPage from './pages/Profile/ReportPage';
import ReportIssuePage from './pages/Profile/ReportIssuePage';
import ActivityPage from './pages/Profile/ActivityPage';

import RoomSelectionPage from './pages/InnerNavi/RoomSelectionPage'; // RoomSelectionPage 추가

import PreparingPage from './pages/PreparingPage';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  // 네비게이션이 보이지 않아야 할 경로들
  const hideNavigationPaths = ['/', '/auth'];
  
  // 현재 경로가 hideNavigationPaths에 포함되어 있는지 확인
  const showNavigation = !hideNavigationPaths.includes(location.pathname);

  return (
    <div>
      <Routes>
        {/* 스플래시 페이지 */}
        <Route path="/" element={<SplashPage />} />

        {/* AuthPage로 5초 후에 이동 */}
        <Route path="/auth" element={<AuthPage />} />

        {/* 저장 페이지(시작 페이지) */}
        <Route path="/saved" element={<SavedPage />} />

        {/* 나머지 페이지들 */}
        <Route path="/map" element={<MapPage />} />
        <Route path="/inner-navi" element={<InnerNaviPage />} />
        <Route path="/unlock" element={<UnlockPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Unlock 페이지들 */}
        <Route path="/unlock-search" element={<UnlockSearchPage />} />
        <Route path="/unlock-camera" element={<UnlockCameraPage />} />
        <Route path="/receive-video" element={<ReceiveVideoPage />} />
        <Route path="/broadcast-video" element={<BroadcastVideoPage />} />

        {/* UnlockCamera 페이지들 */}
        <Route path="/unlock-camera-intro" element={<IntroductionPage />} />
        <Route path="/unlock-camera-camera" element={<CameraPage />} />
        <Route path="/unlock-camera-analyz" element={<AnalyzingPage />} />
        <Route path="/unlock-camera-result" element={<ResultPage />} />

        {/* InnerNavi 페이지들 */}
        <Route path="/innernavi-search" element={<InnerNaviSearchPage />} />
        <Route path="/innernavi-beacon" element={<BeaconPage />} />
        <Route path="/inner-receive-video" element={<InnerReceiveVideoPage />} />
        <Route path="/inner-broadcast-video" element={<InnerBroadcastVideoPage />} />

        {/* Room 선택 페이지 (역할 선택 후 룸으로 이동) */}
        <Route path="/room-selection" element={<RoomSelectionPage />} /> {/* Room 선택 페이지 추가 */}
        <Route
          path="/room/:roomId/:role"
          element={<RoleBasedPage />}  // 역할 기반 페이지 라우팅 추가
        />

        {/* Profile 페이지들 */}
        <Route path="/profile-info" element={<ProfileInfoPage />} />
        <Route path="/profile-report" element={<ReportPage />} />
        <Route path="/profile-report-issue" element={<ReportIssuePage />} />
        <Route path="/profile-activity" element={<ActivityPage />} />

        <Route path="/preparing" element={<PreparingPage />} />

        {/* 기본 경로로 접근할 때 SplashPage로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 특정 경로에서만 네비게이션을 숨김 */}
      {showNavigation && <Navigation />}
    </div>
  );
}

// 역할에 따라 다른 컴포넌트로 이동 (스트리밍 또는 시청)
function RoleBasedPage() {
  const { roomId, role } = useParams();

  if (role === 'streamer') {
    return <InnerBroadcastVideoPage roomId={roomId} />;
  } else if (role === 'viewer') {
    return <InnerReceiveVideoPage roomId={roomId} />;
  } else {
    return <Navigate to="/room-selection" />;
  }
}

export default App;
