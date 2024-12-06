import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import { usePostData } from "../../hooks/usePostData";
import { useFetchData } from "../../hooks/useFetchData";
import { useUpdateData } from "../../hooks/useUpdateData";

function PortfolioForm({ isEdit = false }) {
  const navigate = useNavigate();
  const id = useParams().id;
  const [image, setImage] = useState(null);

  const { postData, loadingPostData } = usePostData("/portfolio");

  const { updateData, loading: loadingUpdateData } = useUpdateData(
    `/portfolio/${id}`
  );

  const { data, loading: loadingFetchData } = isEdit
    ? useFetchData(`/portfolio/${id}`)
    : { data: null, loading: false };

  const { values, setValues, handleChange } = useFormInput({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (isEdit && data) {
      setValues({
        title: data.data.title || "",
        content: data.data.content || "",
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
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("banner", image);

    if (isEdit) {
      updateData( formData, () => {
        navigate("/portfolio");
      });
      return;
    } else {
      postData(
        formData,
        () => {
          navigate("/portfolio");
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
        {isEdit ? "Edit Portfolio" : "Add New Portfolio"}
      </h1>
      {loadingFetchData ? (
        <div className="flex space-x-2 justify-center">
          <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Banner Image</label>
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
              name="content"
              value={values.content}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full h-[150px]"
              placeholder="Description"
              required
            />
          </div>
          <div className="flex justify-end gap-x-2">
            <Link
              to="/portfolio"
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

export default PortfolioForm;