import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const handleCardName = (evt) => {
    setCardName(evt.target.value);
  };

  const handleCardLink = (evt) => {
    setCardLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(cardName, cardLink);
    onClose();    
  };

  React.useEffect(() => {
    if(isOpen) {
      setCardName("");
      setCardLink("");
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <React.Fragment>
          <input
            type="text"
            name="placeName"            
            className="popup__input popup__input_place"
            id="input-place"
            placeholder="Название"
            required
            minLength="1"
            maxLength="30"
            value={cardName}
            onChange={handleCardName}
            pattern="[А-ЯЁа-яёA-Za-z-\s]*"
          />
          <span className="error" id="input-place-error" />

          <input
            type="url"
            name="placePhoto"            
            className="popup__input popup__input_image"
            id="input-url"
            placeholder="Ссылка на картинку"
            onChange={handleCardLink}
            value={cardLink}
            required
          />
          <span className="error" id="input-url-error" />
        </React.Fragment>
      }
    />
  );
}

export default AddPlacePopup;
