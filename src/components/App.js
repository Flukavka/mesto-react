import { useEffect, useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCardsContext } from '../contexts/InitialCardsContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [selectedCard, setCardImageState] = useState(null);
  const [currentUser, setCurrentUserState] = useState({});
  const [initialCards, setInitialCardsState] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => setCurrentUserState(userData))
      .catch(err => console.log(err));

    api.getInitialCards()
      .then((initialCards) => setInitialCardsState(initialCards))
      .catch(err => console.log(err));
  }, [])

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
    setCardImageState(null);
  }

  function handleCardClick(card) {
    setCardImageState(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    (!isLiked ? api.likeCard(card) : api.unlikeCard(card))
      .then((newCard) => {
        setInitialCardsState((cards) => cards.map((cards) => (
          (cards._id === card._id) ? newCard : cards)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    const isUserCard = card.owner._id === currentUser._id;
    isUserCard && api.deleteCard(card)
      .then(() => {
        setInitialCardsState(initialCards =>
          initialCards.filter(currentCard => currentCard._id !== card._id))
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(userData => setCurrentUserState(userData))
      .catch(err => console.log(err));
    closeAllPopups();
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar({ avatar })
      .then(userData => setCurrentUserState(userData))
      .catch(err => console.log(err));
    closeAllPopups();
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
      .then(newCard => (
        setInitialCardsState([newCard, ...initialCards])))
      .catch(err => console.log(err));
    closeAllPopups();
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <InitialCardsContext.Provider value={initialCards}>
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLikeClick={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="clarification"
            title="Вы уверены?"
            buttonText="Да"
          />

          <Footer />
        </InitialCardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
