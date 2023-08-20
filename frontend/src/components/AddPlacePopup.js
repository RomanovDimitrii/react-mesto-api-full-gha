import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeInput, setPlaceInput] = React.useState('');
  const [placeLinkInput, setPlaceLinkInput] = React.useState('');

  function handleChangePlaceInput(e) {
    setPlaceInput(e.target.value);
  }

  function handleChangePlaceLinkInput(e) {
    setPlaceLinkInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(placeInput, placeLinkInput);
  }

  React.useEffect(() => {
    setPlaceInput('');
    setPlaceLinkInput('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place"
        type="text"
        name="place"
        id="place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangePlaceInput}
        value={placeInput || ''}
      />
      <span className="popup__input-error popup__input-error_type_place"></span>

      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangePlaceLinkInput}
        value={placeLinkInput || ''}
      />

      <span className="popup__input-error popup__input-error_type_link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
