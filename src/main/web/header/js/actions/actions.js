export const SHOW_SIGN_IN_MODAL = 'SHOW_SIGN_IN_MODAL';
export const HIDE_SIGN_IN_MODAL = 'HIDE_SIGN_IN_MODAL';
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL';

export const showSignInModal = () => {
  return {
    type: SHOW_SIGN_IN_MODAL
  }
};

export const hideSignInModal = () => {
  return {
    type: HIDE_SIGN_IN_MODAL
  }
};

export const showLoginModal = () => {
  return {
    type: SHOW_LOGIN_MODAL
  }
};

export const hideLoginModal = () => {
  return {
    type: HIDE_LOGIN_MODAL
  }
};