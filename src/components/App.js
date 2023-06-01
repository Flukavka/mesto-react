import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false);
  const [selectedCard, setCardImageState] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarState(true);
  };

  function handleEditProfileClick() {
    setEditProfileState(true);
  };

  function handleAddPlaceClick() {
    setAddPlaceState(true);
  };

  function closeAllPopups() {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setCardImageState(false);
  }

  function handleCardClick(card) {
    setCardImageState(card);
  }

  return (
    <div className="root">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input
              className="popup__input popup__input_field_name"
              name="name"
              type="text"
              placeholder="Введите имя"
              minLength="2"
              maxLength="40"
              required
            />

            <span className="popup__error"></span>

            <input
              className="popup__input popup__input_field_about"
              name="about"
              type="text"
              placeholder="Введите профессию"
              minLength="2"
              maxLength="200"
              required
            />

            <span className="popup__error"></span>
          </>}
      />

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input
              className="popup__input popup__input_field_avatar"
              name="avatar"
              type="url"
              placeholder="Введите ссылку"
              required
            />

            <span className="popup__error"></span>
          </>}
      />

      <PopupWithForm
        name="element"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input
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
              className="popup__input popup__input_field_link"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />

            <span className="popup__error"></span>
          </>
        }
      />

      <PopupWithForm
        name="clarification"
        title="Вы уверены?"
        buttonText="Да"
      />

      <Footer />
    </div>
  );
}

export default App;
