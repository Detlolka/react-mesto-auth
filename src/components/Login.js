import React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { authorization } from "../utils/apiAuth";

function Login({ handleLogin, onError, setError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      console.error("Заполните все поля");
    }

    const clearForm = () => {
      setEmail("");
      setPassword("");
    };

    authorization(email, password)
      .then((data) => {
        if (data.token) {
          clearForm();
          handleLogin();
          setError("");
          history.push("/main");
        } else if (data.message) {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          required={true}
          placeholder="Email"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <div className="auth__input-box">
          <input
            className="auth__input"
            type="password"
            placeholder="Пароль"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <p className="auth__error">{onError}</p>
        </div>
        <button type="submit" className="auth__submit-button">
          Войти
        </button>
        <Link className="auth__link" to="/signup">
          Ещё не зарегистрированы? Регистрация
        </Link>
      </form>
    </div>
  );
}

export default Login;
