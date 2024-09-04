import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SavedPage from './pages/SavedPage'; // 필요한 경로에 맞게 수정
import MapPage from './pages/MapPage';
import InnerNaviPage from './pages/InnerNaviPage';
import UnlockPage from './pages/UnlockPage';
import ProfilePage from './pages/ProfilePage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const showNavigation = true; // 기본적으로 네비게이션을 항상 표시

  return (
    <div>
      <Routes>
        {/* 기본 경로로 접근할 때 SavedPage로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/saved" replace />} />

        {/* 나머지 페이지들 */}
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/inner-navi" element={<InnerNaviPage />} />
        <Route path="/unlock" element={<UnlockPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      {/* 네비게이션을 항상 표시 */}
      {showNavigation && <Navigation />}
    </div>
  );
}

export default App;
