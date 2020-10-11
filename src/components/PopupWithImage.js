import React from "react";

function PopupWIthImage({ card, onClose }) {
  return (
    <div className={"popup popup_image " + (card && "popup_opened")}>
      {card && (
        <div className="popup__image-container">
          <img className="popup__picture" alt={card.name} src={card.link} />
          <p className="popup__description">{card.name}</p>
          <button
            type="button"
            className="popup__close"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
}

export default PopupWIthImage;
