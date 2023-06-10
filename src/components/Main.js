import { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCardsContext } from '../contexts/InitialCardsContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const initialCards = useContext(InitialCardsContext);

  return (
    <main className="content container">
      {/* <!-- Начало секции profile --> */}
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар пользователя"
            />

            <button
              onClick={props.onEditAvatar}
              className="profile__avatar-edit"
              aria-label="Изменить аватар"
            ></button>
          </div>

          <div className="profile__user-info">
            <div className="profile__wrapper">
              <h1 className="profile__username">{currentUser.name}</h1>

              <p className="profile__profession">{currentUser.about}</p>
            </div>

            <button
              onClick={props.onEditProfile}
              type="submit"
              className="profile__info-edit"
              aria-label="Редактировать данные профиля"
            ></button>
          </div>
        </div>

        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__btn-add"
          aria-label="Добавить новое место"
        ></button>

      </section>
      {/* <!-- Конец секции profile --> */}

      {/* <!-- Начало секции elements --> */}
      <section className="elements">
        <ul className="elements__list">
          {
            initialCards.map((card) => (
              <Card
                key={card._id}
                onCardClick={props.onCardClick}
                card={card}
                onCardLikeClick={props.onCardLikeClick}
                onCardDelete={props.onCardDelete}
              />
            ))
          }
        </ul>
      </section>
      {/* <!-- Конец секции elements --> */}
    </main>
  )
}

export default Main;
