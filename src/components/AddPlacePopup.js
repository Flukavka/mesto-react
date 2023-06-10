import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, ...props }) {
  const [name, setNameState] = useState('');
  const [link, setLinkState] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(
      {
        name,
        link
      }
    )
  }

  return (
    <PopupWithForm
      name="element"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={e => handleSubmit(e)}
    >
      <>
        <input
          value={name || ''}
          onChange={e => setNameState(e.target.value)}
          className="popup__input popup__input_field_name"
          name="name"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />

        <span className="popup__error"></span>

        <input
          value={link || ''}
          onChange={e => setLinkState(e.target.value)}
          className="popup__input popup__input_field_link"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />

        <span className="popup__error"></span>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
