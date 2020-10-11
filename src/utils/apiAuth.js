import { authUrl } from "./utils.js";

export const authorization = (email, password) => {
  return fetch(`${authUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
