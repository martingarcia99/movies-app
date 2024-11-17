import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";


const Popup = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`popup ${message.type} ${visible ? "popup-show" : "popup-hide"}`}> 
      {message.message}
      {message.type=='success' ? <FaCheck data-testid='facheck'/> : <ImCross data-testid='imcross'/>}
    </div>
  );
};

export default Popup;
