import { configApi } from './utils.js';


 class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;                       
  }
  
  _response(res) {
      if (res.ok) {          
          return res.json()
      }
      return Promise.reject(`Что то пошло не так: ${res.status}`)      
  }

 //GET-запрос карточек
  getInitialCards() {                       
    return fetch(`${this._baseUrl}/cards`, {
     headers: {        
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',        
  }})
    .then(this._response)    
}

// POST-запрос на добавление карточки
  createCard (name, link) {  
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {        
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',        
    },
      body: JSON.stringify({
        name,
        link,                
      })      
    })
    .then(this._response)
  }

// DELETE - запрос на удаление карточки
  removeCard(cardId) { 
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {        
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',        
    }
    })
    .then(this._response);
  }

// PUT и DELETE запросы на лайк
  likeCardStatus(cardId, isLiked) {
    if(isLiked) {  
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {        
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',        
    }
    })
    .then(this._response);
   }
   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {        
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',        
  }
  })
  .then(this._response);
  }


// GET-запрос на получение данных пользователя
  getUserInfo() {     
    return fetch(`${this._baseUrl}/users/me`, {      
      headers: {        
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',        
    }
    })
    .then(this._response)    
  }

// PATCH-запрос на обновление даннных пользователя с сервера
  changeUserInfo(name, about) {  
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {        
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',        
      },
        body: JSON.stringify({
            name,
            about
        })        
    })
    .then(this._response)   
 }
 
// PATCH - запрос на обновление аватарки
  changeAvatar(avatar) {  
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {        
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',        
    },
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._response);
  }
}

const api = new Api(configApi);

export default api;






