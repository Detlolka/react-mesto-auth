import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ clickCard, deleteCard, card, onCardDelete, onCardLike }) {
     
  const currentUser = React.useContext(CurrentUserContext);  
 

  const isOwn = (card.owner._id === currentUser.userId);
  
 
  const cardRemoveButtonClassName = `element__del ${isOwn ? 'element__del_active' : ''}`;

  const isLiked = card.likes.some(card => card._id === currentUser.userId);

  const cardLikeClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;
  

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card._id)
  }

  return (
    <div className="element">
      <img
        className="element__image"
        alt={card.name}
        src={card.link}
        onClick={() => clickCard(card)}
      />
      <div className="element__about">
        <p className="element__title">{card.name}</p>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeClassName}
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardRemoveButtonClassName}
        aria-label="Удалить"        
        onClick={handleDeleteClick}
      />
    </div>
  );
}

export default Card;
