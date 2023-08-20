//export const BASE_URL = 'https://auth.nomoreparties.co';
//export const BASE_URL = 'https://api.dimitrii.mesto.nomoreparties.co/';
export const BASE_URL = 'http://localhost:3000';

export const register = (password, email) => {
  // console.log(password, email);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }).then(response => checkResponse(response));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }).then(response => checkResponse(response));
};

export const checkToken = userId => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
          'Accept': 'application/json',
      'Content-Type': 'application/json',
//      Authorization: `Bearer ${token}`
    },
    credentials: "include",
  }).then(response => checkResponse(response));
};

function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

//.then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
