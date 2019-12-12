import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';


const Footer = () => (
  <footer className="bg-light p-3 text-center">
    <FontAwesomeIcon icon={faBiohazard} style={{ color: '#B91D21' }} spin size='3x' />
    <h5>
      Stay Alive!© Developed by <a href="https://github.com/markus902/Stay_Alive">Critical Code</a>
    </h5>
  </footer>
);

export default Footer;
