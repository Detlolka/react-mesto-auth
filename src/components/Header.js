import React from "react";
import logo from "../images/logo/logo_header.svg";
import { Route, useHistory, Link } from 'react-router-dom';


function Header({ userMail, onExit }) {

  const history = useHistory();

  const exit = () => {
    onExit();
    localStorage.removeItem("jwt");
    history.push("/login");
  };

  return (
    <header className="header">
      <Route path="/signup">
        <img className="header__logo" src={logo} alt="Логотип" />
        <Link className="header__link" to="/signin">
          Войти
        </Link>
      </Route>
      <Route path="/signin">
        <img className="header__logo" src={logo} alt="Логотип" />
        <Link className="header__link" to="/signup">
          Регистрация
        </Link>
      </Route>
      <Route path="/main">
        <img className="header__logo" src={logo} alt="Логотип" />
        <p className="header__user-mail">{userMail}</p>
        <Link className="header__link" to="/signin" onClick={exit}>
          Выйти
        </Link>
      </Route>
    </header>
  );
}

export default Header;
