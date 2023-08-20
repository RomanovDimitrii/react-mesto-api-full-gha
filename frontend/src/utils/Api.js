//const url = 'https://mesto.nomoreparties.co/v1/cohort-65';

class API {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse);
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }

  editProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: 
      JSON.stringify(
       {avatar: data}
      )
    }).then(this._checkResponse);
  }

  postCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: this._headers
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        credentials: "include",
        headers: this._headers
      }).then(this._checkResponse);
      //    this.deleteLike(id);
    } else {
      // this.addLike(id);
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        credentials: "include",
        headers: this._headers
      }).then(this._checkResponse);
    }
  }

  _checkResponse(response) {
    console.log(response);
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
}

const api = new API({
 url: 'http://localhost:3000',
   headers: {
    'Accept': 'application/json',
     'Content-Type': 'application/json',
   }
 });

export { api };
