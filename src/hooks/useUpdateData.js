import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateData = (url) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const updateData = async (data, onSuccess, onError) => {
    for (let key in data) {
      if (data[key] === "") {
        delete data[key];
      }
    }
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}${url}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
        console.log(error);
        onError(error.response.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading };
};

