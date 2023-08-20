import React from 'react';
import logo from '../images/Logo_header.svg';
import { useNavigate } from 'react-router-dom';

function Header({ navMenu, email, isLoggedIn, currentUserInfo }) {
  const navigate = useNavigate();

  function clearCurrentUser() {
    currentUserInfo({});
  }
  //console.log(currentUserInfo.data?.email);

  function handleNavigationButton() {
    if (navMenu === 'Войти') {
      //     console.log('enter');
      navigate('/sign-in', { replace: true });
    } else if (navMenu === 'Регистрация') {
      navigate('/sign-up', { replace: true });
    } else if (navMenu === 'Выйти') {
      isLoggedIn(false);
      localStorage.removeItem('userId');
      clearCurrentUser();

      navigate('/sign-in', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }
  //onclick = function // seitch text === 'регистрация' route /signin...
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип карта России" />
      <div className="header__nav-block">
        <h3 className="header__email">{email}</h3>
        <h3 className="header__nav-link" onClick={handleNavigationButton}>
          {navMenu}
        </h3>
      </div>
    </header>
  );
}

export default Header;
