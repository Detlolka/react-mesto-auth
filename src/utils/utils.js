
export const  configApi = {
    baseUrl: "http://localhost:3000",
    headers: {        
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',        
    }
  };


  export const authUrl = 'http://localhost:3000';
  
