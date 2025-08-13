import React from 'react';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5">
      <div className="container">
        <span>&copy; {new Date().getFullYear()} Way to Work. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
