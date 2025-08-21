import React from 'react';
import '../style.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>ChakraX</h2>
          <p>Your trusted ride partner — safe, fast, and reliable.</p>
          <a href="#" className="help-link">Visit Help Center</a>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About us</li>
            <li>Our offerings</li>
            <li>Newsroom</li>
            <li>Investors</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Products</h4>
          <ul>
            <li>Ride</li>
            <li>Drive</li>
            <li>ChakraX for Business</li>
            <li>ChakraX Freight</li>
            <li>Gift Cards</li>
            <li>ChakraX Health</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 ChakraX Technologies Inc.</p>
        <a href="#">Privacy</a> |
        <a href="#">Accessibility</a> |
        <a href="#">Terms</a> |
        <a href="#">Contact</a>
      </div>
    </footer>
  );
}

export default Footer;
