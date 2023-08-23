import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error popup__input-error_type_avatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
