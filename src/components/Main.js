import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

class Main extends React.Component {

  static contextType = CurrentUserContext;  

  render() {
    return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar" onClick={this.props.onEditAvatar}>
            <img
              className="profile__image"
              src={this.context.userAvatar}
              alt="Аватарка"
            />
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__title">{this.context.userName}</h1>
              <button
                type="button"
                className="profile__editButton"
                onClick={this.props.onEditProfile}
              ></button>
            </div>
            <h2 className="profile__subtitle">{this.context.userAbout}</h2>
          </div>
          <button
            type="button"
            className="profile__addButton"
            onClick={this.props.onEditPlace}
          ></button>
        </section>
        <section className="elements">
          {this.props.cards.map((card, i) => {
            return (
              <Card
                onCardLike={this.props.onCardLike}                
                clickCard={this.props.onEditImage}
                deleteCard={this.props.onDeletePlace}
                onCardDelete={this.props.onCardDelete}
                card={card}
                key={i}
              />
            );
          })}
        </section>
      </main>
    );
  }
}

export default Main;
