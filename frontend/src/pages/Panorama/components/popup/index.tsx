import { useState } from 'react';
import './index.less';

function Popup(props) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container" id="popup-container">
      <div className="popup">
        <div className="popup-content">
          <h2>{props.title}</h2>
          <p>{props.content}</p>
          <button onClick={togglePopup}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
