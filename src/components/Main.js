import { useEffect, useState } from 'react';
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUser(userData)
      })
      .catch((err) => {
        console.log(err);
      });

    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content container">
      {/* <!-- Начало секции profile --> */}
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={user.avatar}
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
              <h1 className="profile__username">{user.name}</h1>

              <p className="profile__profession">{user.about}</p>
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
            cards.map((card) => (
              <Card
                key={card._id}
                userId={user._id}
                onCardClick={props.onCardClick}
                card={card}
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
