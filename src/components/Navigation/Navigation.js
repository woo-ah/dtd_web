import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBookmark, FaMap, FaRoute, FaQuestionCircle, FaUser } from 'react-icons/fa';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav-navigation">
      <NavLink 
        to="/saved" 
        className={({ isActive }) => isActive ? 'nav-item nav-active' : 'nav-item'}
      >
        <FaBookmark />
        <span>저장</span>
      </NavLink>
      <NavLink 
        to="/map" 
        className={({ isActive }) => isActive ? 'nav-item nav-active' : 'nav-item'}
      >
        <FaMap />
        <span>지도</span>
      </NavLink>
      <NavLink 
        to="/unlock" 
        className={({ isActive }) => isActive ? 'nav-item nav-active' : 'nav-item'}
      >
        <FaQuestionCircle />
        <span>문 여는 방법</span>
      </NavLink>
      <NavLink 
        to="/inner-navi" 
        className={({ isActive }) => isActive ? 'nav-item nav-active' : 'nav-item'}
      >
        <FaRoute />
        <span>내부 길 안내</span>
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => isActive ? 'nav-item nav-active' : 'nav-item'}
      >
        <FaUser />
        <span>마이 페이지</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
