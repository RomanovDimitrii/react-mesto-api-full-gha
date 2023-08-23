// https://4x4photo.ru/wp-content/uploads/2023/03/48fdc42d-af55-4941-bbef-58bd9fe50b92-768x768.jpg
// https://sun9-56.userapi.com/R7vFEWqEL5HlOhb_IdsBJtxDpSXjiSauxVU3Ig/WYfsiVQVZz8.jpg

import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header.js';
import NotFound from './NotFound.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import { checkToken } from '../utils/Auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUserInfo, setCurrentUserInfo] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const checkTokenData = () => {
    const userId = localStorage.getItem("userId");
    checkToken(userId)
      .then(data => {
        if (!data.email) {
          return;
        }
        setIsLoggedIn(true);
 //       console.log('check');
        setCurrentUserInfo(data);
      setCurrentUser(data);
        navigate(location.pathname);
      })
      .catch(e => {
        console.log(e);
        setIsLoggedIn(false);
        localStorage.removeItem("userId");
        setCurrentUserInfo({});
      });
  };

  React.useEffect(() => {
    checkTokenData();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([profileData, cardsData]) => {
        setCurrentUser(profileData);
        setCards(cardsData);
      })

      .catch(error => {
        console.error(`Ошибка при получении данных профайла и карточек: ${error}`);
      });
  }, [isLoggedIn]);

  function handleUpdateUser(name, about) {
    console.log('handleupdUser');
    if (!name || !about) {
      return;
    }
    api
      .editProfile(name, about)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => {
        console.error(`Ошибка при передаче данных профайла : ${error}`);
      });
  }

  function handleAddPlace(name, link) {
    if (!name || !link) {
      return;
    }
    api
      .postCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.error(`Ошибка при передаче данных карточек : ${error}`);
      });
  }

  function handleUpdateAvatar(link) {
    if (!link) {
      return;
    }
    api
      .editProfileAvatar(link)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => {
        console.error(`Ошибка при передаче данных аватара : ${error}`);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);  

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c))); 
      })
      .catch(error => {
        console.error(`Ошибка при передаче данных профайла : ${error}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(error => {
        console.error(`Ошибка при передаче данных профайла : ${error}`);
      });
  }

  const isOpen =
    isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <Routes>
      <Route path="/sign-up" element={<Register />} />
      <Route path="/sign-in" element={<Login isLoggedIn={setIsLoggedIn} email={setEmail} />} />
      <Route
        path="/"
        element={
          <ProtectedRouteElement
            isLoggedIn={isLoggedIn}
            element={
              <div>
                <Header
                  navMenu="Выйти"
                  email={currentUserInfo.email || email}
                  isLoggedIn={setIsLoggedIn}
                  currentUserInfo={setCurrentUserInfo}
                />
                <CurrentUserContext.Provider value={currentUser}>
                  <CardsContext.Provider value={cards}>
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={setSelectedCard}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                  </CardsContext.Provider>
                  <Footer />

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
                    onAddPlace={handleAddPlace}
                  />

                  <ImagePopup
                    card={selectedCard}
                    isOpen={selectedCard ? true : false}
                    onClose={closeAllPopups}
                  />
                </CurrentUserContext.Provider>
              </div>
            }
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
