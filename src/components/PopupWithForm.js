import React from "react";

function PopupWithForm({name, title, buttonName, isOpen, onClose, children, onSubmit}) {
  return (
    <div
      className={
        `popup popup_${name} ` + (isOpen && "popup_opened")
      }
    >
      <div className="popup__container">
        <form
          onSubmit={onSubmit}
          className="popup__form"
          name={name}
          method="GET"
          action="#"
          noValidate
        >
          <p className="popup__title">{title}</p>
          {children}
          <button type="submit" className="popup__save">
            {buttonName}
          </button>
          <button
            type="button"
            className="popup__close"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
