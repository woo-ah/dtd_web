import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBookmark, FaMap, FaRoute, FaQuestionCircle, FaUser } from 'react-icons/fa';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/saved" className="nav-item" activeClassName="active">
        <FaBookmark />
        <span>저장</span>
      </NavLink>
      <NavLink to="/map" className="nav-item" activeClassName="active">
        <FaMap />
        <span>지도</span>
      </NavLink>
      <NavLink to="/inner-navi" className="nav-item" activeClassName="active">
        <FaRoute />
        <span>내부 길 안내</span>
      </NavLink>
      <NavLink to="/unlock" className="nav-item" activeClassName="active">
        <FaQuestionCircle />
        <span>문 여는 방법</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item" activeClassName="active">
        <FaUser />
        <span>마이 페이지</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
