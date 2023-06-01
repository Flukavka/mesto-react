import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [user, getUserData] = React.useState({});
  const [cards, setInitialCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        getUserData({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          userId: userData._id
        })
      })
      .catch((err) => {
        console.log(err);
      });

    api.getInitialCards()
      .then((initialCards) => {
        setInitialCards(
          initialCards.map((cardData) => (
            {
              name: cardData.name,
              link: cardData.link,
              likes: cardData.likes.length,
              cardId: cardData._id,
              ownerId: cardData.owner._id
            }))
        )
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
              src={userAvatar}
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
              <h1 className="profile__username">{userName}</h1>

              <p className="profile__profession">{userDescription}</p>
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
                key={card.cardId}
                name={card.name}
                link={card.link}
                likes={card.likes}
                ownerId={card.ownerId}
                userId={user.userId}
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
