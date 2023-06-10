//import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, ...props }) {
  const avatar = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar.current.value
    });

    avatar.current.value = '';
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={e => handleSubmit(e)}
    >
      <>
        <input
          ref={avatar}
          className="popup__input popup__input_field_avatar"
          name="avatar"
          type="url"
          placeholder="Введите ссылку"
          required
        />

        <span className="popup__error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
