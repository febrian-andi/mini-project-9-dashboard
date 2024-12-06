import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../redux/auth/authSlice";

const useTokenManager = () => {
  const dispatch = useDispatch();
  const { token, expiry } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !expiry) return;

    const timeRemaining = expiry - Date.now();
    if (timeRemaining <= 0) {
      dispatch(logout());
    } else {
      const timer = setTimeout(() => dispatch(logout()), timeRemaining);
      return () => clearTimeout(timer);
    }
  }, [token, expiry, dispatch]);
};

export default useTokenManager;