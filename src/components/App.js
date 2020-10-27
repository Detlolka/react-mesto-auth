/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import { getContents } from "../utils/apiAuth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMail, setUserMail] = useState('');
  const [onError, setOnError] = useState('');

  const history = useHistory(); 
  
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');                    
    if (jwt) {
      getContents(jwt)
        .then((res) => {          
          if (res) {                                             
            setLoggedIn(true);            
            setUserMail(res.email);            
            history.push('/main');
          } else {
            setLoggedIn(false);                       
            localStorage.removeItem('jwt');            
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function handleLogin () {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);  
  const [cardDate, setCardDate] = useState(null);

  const [currentUser, setCurrentUser] = useState({    
    name: '',
    about: '',
    avatar: '',
    _id: '',        
  });
  
  function handleEditProfileClick () {    
      setEditProfilePopupOpen(true);  
  }

  function handleEditPlaceClick () {    
      setAddPlacePopupOpen(true);    
  }

  function handleEditAvatarClick () {
      setEditAvatarPopupOpen(true);
  }

  function handleEditDeleteClick () {
      setDeletePlacePopupOpen(true);
  }

  function handleEditImageClick (card) {
    setCardDate ({
      name: card.name,
      link: card.link,
    });
  }  

  function closeAllPopups () {    
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setEditAvatarPopupOpen(false);
      setCardDate(null)
      setDeletePlacePopupOpen(false);
      setRegisterPopupOpen(false);    
  }

  // Закрытие попаов на Оверлей
  function closeOverlay (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  document.addEventListener('click', closeOverlay);

  // Закрытие попапов на Escape
  function closeEsc (evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  document.addEventListener('keydown', closeEsc);

  //смена данных пользователя
  function handleUpdateUser (name, about) {
    api
      .changeUserInfo(name, about)
      .then((user) => {               
          setCurrentUser(user.data);        
      })
      .catch((err) => console.error(err));
  };

  //Смена аватара пользователя
  function handleUpdateAvatar (avatar) {
    api
      .changeAvatar(avatar)
      .then((user) => {
        setCurrentUser(user.data);
     })
      .catch((err) => console.error(err));
  };

  
  const [cards, setCards] = useState([]);

//Удаление карточки 

  function handleCardDelete (cardId) {         
    api
      .removeCard(cardId)
      .then((res) => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards)
      })
      .catch((err) => console.error(err));
  };

  //Постановка лайка и удаление лайка
  function changeCardLike (card) {
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );
    api
      .likeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) =>
          c._id === card._id ? newCard : c
        );
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  };

  //Добавление новой карточки
  function handleAddPlace (name, link) {    
    api
      .createCard(name, link)
      .then((newCard) => {
        console.log(newCard)        
          setCards([newCard, ...cards])        
      })
      .catch((err) => console.error(err));
  };

  

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardItems, user]) => {                
          setCurrentUser(user)
          setCards(cardItems);         
        }
      )
      .catch((err) => console.error(err));
 
      }, [loggedIn]);
  
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userMail={userMail} onExit={handleLogout} />
          <Switch>
          <ProtectedRoute path="/main"
            component={Main}
            loggedIn={loggedIn}          
            onEditProfile={handleEditProfileClick}
            onEditPlace={handleEditPlaceClick}
            onEditImage={handleEditImageClick}
            onDeletePlace={handleEditDeleteClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={changeCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path='/signup'>
              <Register
                registrationPopupOpen={setRegisterPopupOpen}
                isOpen={isRegisterPopupOpen}
                setError={setOnError}
              />
            </Route>
            <Route path='/signin'>
              <Login handleLogin={handleLogin} onError={onError} setError={setOnError} registrationPopupOpen={setRegisterPopupOpen} />
            </Route>
            <Route>{loggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}</Route>
          </Switch>
          <Footer />
          <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} />
          <PopupWithForm
            name="delete-place"
            title="Вы уверены?"
            buttonName="Да"
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={(name, about) => handleUpdateUser(name, about)}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={({ avatar }) => handleUpdateAvatar(avatar)}
          />

          <AddPlacePopup            
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}            
          />

          <PopupWithImage
            card={cardDate}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    );
  
}

export default App;
