import React from 'react';
import closeButtonImage from '../images/Close_button.svg';
import authSuccessImage from '../images/auth_success.png';
import authErrorImage from '../images/auth_error.png';

function InfoTooltip({ isOpen, onClose, isRegisted }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__infotooltip-container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img className="popup__close-button-image" src={closeButtonImage} alt="закрыть окно" />
        </button>
        <img
          className="popup__infotooltip-image"
          src={isRegisted ? authSuccessImage : authErrorImage}
          alt={isRegisted ? 'Успешная регистрация' : 'Ошибка при регистрации'}
        />
        <h2 className="popup__infotooltip-message">
          {isRegisted
            ? 'Вы успешно зарегистрировались'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
