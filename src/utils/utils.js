
export const  configApi = {
    baseUrl: "http://api.detlolka-m.students.nomoreparties.space",
    headers: {        
        authorization: { Authorization: localStorage.authToken },
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
  };

  export const authUrl = 'http://api.detlolka-m.students.nomoreparties.space';
  
