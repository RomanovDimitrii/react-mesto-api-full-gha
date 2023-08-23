
import React from 'react';
import Header from './Header.js';
import FormSection from './FormSection.js';
import { useNavigate } from 'react-router-dom';
import { authorize } from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip.js';

function Login({ isLoggedIn, email }) {
  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [onSubmit, setOnSubmit] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

  const navigate = useNavigate();

  function handleLogin() {
    isLoggedIn(true);
  }

  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);

    return;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOnSubmit(true);

    authorize(passwordInput, emailInput)
      .then(user => {
        if (user._id) {
          localStorage.setItem("userId", user._id);  // было data.token data._id
          setOnSubmit(true);
          handleLogin();
          email(emailInput); 
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleChangeEmailInput(e) {
    setEmailInput(e.target.value);
  }

  function handleChangePasswordInput(e) {
    setPasswordInput(e.target.value);
  }

  return (
    <>
      <Header navMenu="Регистрация" />
      <FormSection
        name="login"
        title="Вход"
        btnText="Войти"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      >
        <input
          className="form__input form__input_type_email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeEmailInput}
          value={emailInput || ''}
        />

        <input
          className="form__input form__input_type_password"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangePasswordInput}
          value={passwordInput || ''}
        />
      </FormSection>
      <InfoTooltip isRegisted={false} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />
    </>
  );
}

export default Login;
