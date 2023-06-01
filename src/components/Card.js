import React from "react";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <img onClick={handleClick}
        className="element__image"
        src={props.link}
        alt={`Фотография ${props.name}`} />

      <button
        className={(props.ownerId === props.userId)
          ? `element__btn-delete`
          : `element__btn-delete element__btn-delete_deactivated`}
        type="button"
        aria-label="Кнопка удаления карточки"
      ></button>

      <div className="element__description">
        <h2 className="element__title">{props.name}</h2>

        <div className="element__like">
          <button
            className="element__btn"
            type="button"
            aria-label="Кнопка лайк"
          ></button>

          <span className="element__like-count">{props.likes}</span>
        </div>
      </div>
    </li>
  )
};

export default Card;
