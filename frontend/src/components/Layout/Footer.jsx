import './Footer.css';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="footer__brand-name">Claims Guardian</span>
        </div>
        <div className="footer__links">
          <a
            href="https://github.com/shra012/Commure-Hackathon"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <FaGithub className="footer__link-icon" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.healthclaim.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <span>HealthClaim</span>
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__text">
          Designed for efficient medical claims processing and validation
        </p>
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Claims Guardian. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
