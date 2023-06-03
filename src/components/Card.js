import React from "react";

function Card({ userId, card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  };

  return (
    <li className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={card.link}
        alt={`Фотография ${card.name}`} />

      <button
        className={(card.owner._id === userId)
          ? `element__btn-delete`
          : `element__btn-delete element__btn-delete_deactivated`}
        type="button"
        aria-label="Кнопка удаления карточки"
      ></button>

      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>

        <div className="element__like">
          <button
            className="element__btn"
            type="button"
            aria-label="Кнопка лайк"
          ></button>

          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
};

export default Card;
