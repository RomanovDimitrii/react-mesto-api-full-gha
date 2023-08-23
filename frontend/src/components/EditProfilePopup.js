import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameInput, setNameInput] = React.useState('');
  const [aboutInput, setAboutInput] = React.useState('');

  React.useEffect(() => {
    setNameInput(currentUser.name);
    setAboutInput(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(nameInput, aboutInput);
  }

  function handleChangeNameInput(e) {
    setNameInput(e.target.value);
  }

  function handleChangeAboutInput(e) {
    setAboutInput(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        id="heading"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChangeNameInput}
        value={nameInput || ''}
        formNoValidate
      />
      <span className="popup__input-error popup__input-error_type_name"></span>
      <input
        className="popup__input popup__input_type_about"
        type="text"
        name="about"
        id="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeAboutInput}
        value={aboutInput || ''}
      />
      <span className="popup__input-error popup__input-error_type_about"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
