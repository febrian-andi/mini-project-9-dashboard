import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateData = (url) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const updateData = async (data, onSuccess, onError) => {
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
  }
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}${url}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
        onError();
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading };
};

