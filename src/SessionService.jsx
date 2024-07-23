// SessionService.js
export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user'));
  };
  
  export const setSession = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
  };
  
  export const removeSession = () => {
    sessionStorage.removeItem('user');
  };
  