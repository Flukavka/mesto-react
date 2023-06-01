import React from "react";

function PopupWithForm(props) {
  return (
    <div className={props.isOpen
      ? `popup popup-${props.name} popup_opened`
      : `popup popup-${props.name}`}>
      <div className="overlay"></div>

      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>

        <form className={`popup__form popup-${props.name}__form`} name={props.name} noValidate>
          {props.children}
          <button
            type="submit"
            className={`popup__btn-save popup__button popup-${props.name}__btn-save`}
          >
            {props.buttonText}
          </button>
        </form>
      </div>

      <button
        onClick={props.onClose}
        type="button"
        className={`popup__close popup__close-${props.name}`}
        aria-label="Закрыть всплывающее окно"
      ></button>
    </div >
  )
}

export default PopupWithForm;
