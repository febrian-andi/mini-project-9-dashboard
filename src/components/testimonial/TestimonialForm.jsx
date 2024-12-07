import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import { usePostData } from "../../hooks/usePostData";
import { useFetchData } from "../../hooks/useFetchData";
import { useUpdateData } from "../../hooks/useUpdateData";

function TestimonialForm({ isEdit = false }) {
  const navigate = useNavigate();
  const id = useParams().id;
  const [image, setImage] = useState(null);

  const { postData, loading: loadingPostData } = usePostData("/testimonial");

  const { updateData, loading: loadingUpdateData } = useUpdateData(
    `/testimonial/${id}`
  );

  const { data, loading: loadingFetchData } = isEdit
    ? useFetchData(`/testimonial/${id}`)
    : { data: null, loading: false };

  const { values, setValues, handleChange } = useFormInput({
    name: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (isEdit && data) {
      setValues({
        name: data.data.name || "",
        title: data.data.title || "",
        message: data.data.message || "",
      });
    }
  }, [isEdit, data]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (validTypes.includes(file.type)) {
        setImage(file);
      } else {
        alert("Please upload a valid image (jpeg, png).");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEdit && !image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("title", values.title);
    formData.append("message", values.message);
    formData.append("foto_profile", image);

    if (isEdit) {
      updateData( formData, () => {
        navigate("/testimonial");
      });
      return;
    } else {
      postData(
        formData,
        () => {
          navigate("/testimonial");
        },
        (errors) => {
          alert(Object.values(errors).join("\n"));
        }
      );
    }
  };

  return (
    <div className="rounded w-full md:w-96 mx-auto mb-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit testimonial" : "Add New testimonial"}
      </h1>
      {loadingFetchData ? (
        <div className="flex space-x-2 justify-center">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Photo Profile</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Title"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full h-[150px]"
              placeholder="Message (minimum 10 characters)"
              required
            />
          </div>
          <div className="flex justify-end gap-x-2">
            <Link
              to="/testimonial"
              className={`border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:text-white hover:bg-red-600 ml-4 ${
                loadingPostData || loadingUpdateData ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loadingPostData || loadingUpdateData}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[80px] ${
                loadingPostData || loadingUpdateData ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loadingPostData || loadingUpdateData}
            >
              {loadingPostData || loadingUpdateData ? (
                <div className="w-5 h-5 mx-auto border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default TestimonialForm;