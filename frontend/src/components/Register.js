//const baseUrl = 'https://auth.nomoreparties.co';
import React from 'react';
import Header from './Header.js';
import FormSection from './FormSection.js';
import { register } from '../utils/Auth.js';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip.js';

function Register() {
  const [emailInput, setEmailInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [onSubmit, setOnSubmit] = React.useState(false);
  const [isRegisted, setIsRegisted] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    register(passwordInput, emailInput)
      .then(data => {
        if (data.email) {
          setOnSubmit(true);
          setIsRegisted(true);
        }
      })
      .catch(err => {
        console.log(err.message);
        setIsRegisted(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleChangeEmailInput(e) {
    setEmailInput(e.target.value);
  }

  function handleChangePasswordInput(e) {
    setPasswordInput(e.target.value);
  }

  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
    if (!isRegisted) {
      return;
    }
    navigate('/sign-in', { replace: true });
  }

  return (
    <>
      <Header navMenu="Войти" />
      <FormSection
        name="registration"
        title="Регистрация"
        btnText="Зарегистрироваться"
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
        {/* <span className="form__input-error form__input-error_type_password"></span> */}
        <input
          className="form__input form__input_type_password"
          type="text"
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
      <InfoTooltip
        isRegisted={isRegisted}
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default Register;
