import useSWR from "swr";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fetcher = (url, token) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const useFetchData = (url, id = null) => {
  const token = useSelector((state) => state.auth.token);

  const { data, error, isLoading: loading, mutate } = useSWR(
    id ? `${API_URL}${url}/${id}` : `${API_URL}${url}`,
    (url) => fetcher(url, token)
  );

  const errorMessage = error
    ? error?.response?.data?.error || "Something went wrong"
    : null;

  const refetch = async () => {
    try {
      await mutate();
    } catch (refetchError) {
      console.error("Error while refetching:", refetchError);
    }
  };

  return { data, error: errorMessage, loading, refetch };
};
