export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (email, id) => {
  return {
    type: LOGIN,
    email,
    id
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  }
};