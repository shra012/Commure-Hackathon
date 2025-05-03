import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header__inner container">
      <div className="header__left">
        <FaShieldAlt className="header__logo" />
        <span className="header__title">Claims Guardian</span>
      </div>
    </div>
  </header>
);

export default Header;
