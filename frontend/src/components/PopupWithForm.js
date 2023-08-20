import React from 'react';
import closeButtonImage from '../images/Close_button.svg';

function PopupWithForm({ title, name, children, btnText, isOpen, onClose, handleSubmit }) {
  return (
    <div className={`popup popup_${name}  ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img
            className="popup__close-button-image"
            src={closeButtonImage}
            alt="закрыть окно редактированя профиля"
          />
        </button>

        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={`form_${name}`}
          onSubmit={handleSubmit}
        >
          {children}
          <button className={`popup__save-button popup__save-button_${name}`} type="submit">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
