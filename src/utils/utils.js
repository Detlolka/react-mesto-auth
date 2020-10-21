
export const  configApi = {
    baseUrl: "https://api.detlolka-m.students.nomoreparties.space",
    headers: {        
        authorization: { Authorization: localStorage.authToken },
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
  };

  export const authUrl = 'https://api.detlolka-m.students.nomoreparties.space';
  
