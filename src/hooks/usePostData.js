import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const usePostData = (url) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const postData = async (data, onSuccess, onError) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}${url}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = {};
        error.response.data.data.forEach((err) => {
          errors[err.path] = err.msg;
        });
        onError(errors);
      } else {
        onError(error.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading };
};