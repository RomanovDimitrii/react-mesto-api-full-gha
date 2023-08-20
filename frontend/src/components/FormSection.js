import React from 'react';
import { Link } from 'react-router-dom';

function FormSection({ name, title, btnText, children, handleSubmit }) {
  return (
    <section className="form-section">
      <h2 className="form-section__title">{title}</h2>
      <form
        className={`form form_${name}`}
        name={`form_${name}`}
        onSubmit={handleSubmit}
        noValidate
      >
        {children}
        <button className={`form__save-button`} type="submit">
          {btnText}
        </button>
        {name === 'registration' && (
          <Link to="/sign-in" className="form-section__link">
            Уже зарегистрированы? Войти
          </Link>
        )}
        )
      </form>
    </section>
  );
}

export default FormSection;
