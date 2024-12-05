import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useDeleteData = (url) => {
  const { token } = useSelector((state) => state.auth);

  const deleteData = async (id, onSuccess) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirmation.isConfirmed) return;

      await axios.delete(`${API_URL}${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
      
      onSuccess ? onSuccess() : null;

    } catch (error) {
      Swal.fire(
        "Error!",
        error?.response?.data?.error || "Failed to delete data.",
        "error"
      );
    }
  };

  return { deleteData };
};
