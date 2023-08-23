import React from 'react';
import likeButtonImage from '../images/like.svg';
import deleteButtonImage from '../images/DeleteButton.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
 const isOwn = (currentUser._id ===  card.owner._id);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardButtonClassName = `photo-grid__like-button-image ${
    isLiked && 'photo-grid__like-button-image_active'
  }`;
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="photo-grid__item">
      <img
        className="photo-grid__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="photo-grid__inscription">
        <h3 className="photo-grid__title">{card.name}</h3>
        <div className="photo-grid__block">
          <button className="photo-grid__like-button" type="button" onClick={handleLikeClick}>
            <img className={cardButtonClassName} src={likeButtonImage} alt="лайкнуть фото" />
          </button>
          <span className="photo-grid__like-button-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button className="photo-grid__delete-button" type="button">
          <img
            className="photo-grid__delete-button-image"
            src={deleteButtonImage}
            alt="удалить фото"
            onClick={handleDeleteClick}
          />
        </button>
      )}
    </li>
  );
}

export default Card;
