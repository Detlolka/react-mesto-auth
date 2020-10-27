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
    .catch((error) => {
      console.error(error);
    });
};

export const registration = (email, password) => {
    return fetch(`${authUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getContents = (jwt) => {  
    return fetch(`${authUrl}/users/me`, {
      method: 'GET',
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {                               
        return res.json();
      })
      .then((data) =>  data)
      .catch((error) => {
        console.error(error);
      });
  };
