import React from "react";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, isOpen, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const hadneChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeAbout = (evt) => {
    setAbout(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(name, about);
    onClose();
  };

  useEffect(() => {
    setName(currentUser.userName);
    setAbout(currentUser.userAbout);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <React.Fragment>
          <input
            type="text"
            name="profileName"
            value={name}
            className="popup__input popup__input_name"
            id="input-name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            pattern="[А-ЯЁа-яёA-Za-z-\s]*"
            onChange={hadneChangeName}
          />
          <span className="error" id="input-name-error" />

          <input
            type="text"
            name="profileAbout"
            value={about}
            className="popup__input popup__input_about"
            id="input-about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeAbout}
          />
          <span className="error" id="input-about-error" />
        </React.Fragment>
      }
    />
  );
}

export default EditProfilePopup;