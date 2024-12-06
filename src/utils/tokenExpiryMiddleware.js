import { logout } from '../redux/auth/authSlice';

const tokenExpiryMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { token, expiry, isLoggingOut } = state.auth;

  if (token && expiry && Date.now() >= expiry && !isLoggingOut) {
    store.dispatch(logout());
  }

  return next(action);
};

export default tokenExpiryMiddleware;
