import React from 'react';
import Header from './Header.js';

export function NotFound() {
  return (
    <div>
      <Header navMenu="Войти" />
      <div>
        <h1 className="page-notfound-text">Ошибка 404. Страница не найдена</h1>
      </div>
    </div>
  );
}

export default NotFound;
