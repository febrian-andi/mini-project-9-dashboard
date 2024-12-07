import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../redux/auth/authSlice";

const useTokenManager = () => {
  const dispatch = useDispatch();
  const { token, expiry } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !expiry) return;

    const timer = setTimeout(() => {
      if (Date.now() >= expiry) {
        dispatch(logout());
      }
    }, expiry - Date.now());

    return () => clearTimeout(timer);
  }, [token, expiry, dispatch]);
};

export default useTokenManager;
