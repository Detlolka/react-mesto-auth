import React from 'react';
import Success from '../images/success_auth.svg';
import Failed from '../images/failed_auth.svg';

const InfoTooltip = ({ isOpen, onClose }) => {
  return (
    <div className={`popup popup_tooltip ${isOpen ? 'popup_opened' : null}`}>
      <div className='popup__container popup__container_tooltip'>
        <img
          alt='иконка'
          className='popup__picture'
          src={isOpen.data ? Success : Failed}
        />
        <h2 className='popup__title popup__title_tooltip'>
          {isOpen.data ? 'Вы успешно зарегистрировались!' : isOpen.error}
        </h2>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InfoTooltip;
