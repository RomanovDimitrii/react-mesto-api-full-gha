import React from 'react';
import closeButtonImage from '../images/Close_button.svg';

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img className="popup__close-button-image" src={closeButtonImage} alt="закрыть окно" />
        </button>
        <img className="popup__image" src={isOpen ? card.link : ''} alt={isOpen ? card.name : ''} />
        <h2 className="popup__image-title">{isOpen ? card.name : ''}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
