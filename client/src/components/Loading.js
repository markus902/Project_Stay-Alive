import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';

const Loading = () => (
  <div className="spinner">
    <FontAwesomeIcon icon={faBiohazard} spin size='10x' />
  </div>
);

export default Loading;
