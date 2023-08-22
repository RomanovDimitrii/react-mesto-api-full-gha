import React from 'react';
import editSign from '../images/Avatar_edit.png';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);
  //console.log('currentUser');

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            onClick={onEditAvatar}
            src={currentUser.data.avatar || ''}
            alt="Аватар"
          />
          <img className="profile__avatar-edit" src={editSign} alt="Редактировать аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__block">
            <h1 className="profile__title">{currentUser.data.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать профиль"
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.data.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить фото"
        ></button>
      </section>
      <section className="elements">
        <ul className="photo-grid">
          {cards.reverse().map(card => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
