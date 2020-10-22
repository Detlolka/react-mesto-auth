import React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { registration } from "../utils/apiAuth.js";

const Register = ({ registrationPopupOpen, setError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registration(email, password)
      .then((res) => {        
        if (res._id) {
          registrationPopupOpen(res);
          setError("");
          history.push("/signin");
        } else {
          registrationPopupOpen(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Электронная почта"
          required={true}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          required={true}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="submit" className="auth__submit-button">
          Зарегистрироваться
        </button>
        <Link className="auth__link" to="/signin">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
