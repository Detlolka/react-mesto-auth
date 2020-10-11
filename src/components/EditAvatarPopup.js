import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar}) {

    const avatarRef = React.useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        onClose();
        
    }

    React.useEffect(() => {
      if(isOpen) {
        avatarRef.current.value = '';
      }
    }, [isOpen])

    return (
        <PopupWithForm
        onSubmit={handleSubmit}
        name="avatar"
        title="Обновить аватар"
        buttonName="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        children={
          <React.Fragment>
            <input
              type="url"
              name="avatarPhoto"              
              className="popup__input popup__input_avatar"
              id="input-avatar"
              placeholder="Введите URL"
              ref={avatarRef}
              value={avatarRef.value}
              required
            />
            <span className="error" id="input-avatar-error" />
          </React.Fragment>
        }
      />

    )
}

export default EditAvatarPopup;