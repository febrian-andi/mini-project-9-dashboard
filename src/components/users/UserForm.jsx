import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import { usePostData } from "../../hooks/usePostData";
import { useFetchData } from "../../hooks/useFetchData";
import { useUpdateData } from "../../hooks/useUpdateData";

function UserForm({ isEdit = false }) {
  const navigate = useNavigate();
  const id = useParams().id;
  const [confirm_password, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  const { postData, loading: loadingPostData } = usePostData("/users");
  const { updateData, loading: loadingUpdateData } = useUpdateData(
    `/users/${id}`
  );
  const { data, loading: loadingFetchData } = isEdit
    ? useFetchData(`/users/${id}`)
    : { data: null, loading: false };
  const { values, setValues, handleChange } = useFormInput({
    name: "",
    username: "",
    email: "",
    title: "Admin",
    linkedin_url: "",
    password: "",
    ig_url: "",
  });

  useEffect(() => {
    if (isEdit && data) {
      setValues({
        name: data.user.name || "",
        username: data.user.username || "",
        email: data.user.email || "",
        linkedin_url: data.user.linkedin_url || "",
        ig_url: data.user.ig_url || "",
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

    if (values.password !== confirm_password) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("title", values.title);
    formData.append("linkedin_url", values.linkedin_url);
    formData.append("ig_url", values.ig_url);
    formData.append("password", values.password);
    formData.append("photo", image);

    console.log(formData);

    if (isEdit) {
      updateData(formData, () => {
        navigate("/users");
      });
      return;
    } else {
      postData(
        formData,
        () => {
          navigate("/users");
        },
        (errors) => {
          alert(errors);
        }
      );
    }
  };

  return (
    <div className="rounded w-full md:w-96 mx-auto mb-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit User" : "Add New User"}
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
              name="username"
              value={values.username}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              name="linkedin_url"
              value={values.linkedin_url}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="LinkedIn URL"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              name="ig_url"
              value={values.ig_url}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Instagram URL"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirm_password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="flex justify-end gap-x-2">
            <Link
              to="/users"
              className={`border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:text-white hover:bg-red-600 ml-4 ${
                loadingPostData || loadingUpdateData
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={loadingPostData || loadingUpdateData}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[80px] ${
                loadingPostData || loadingUpdateData
                  ? "opacity-50 cursor-not-allowed"
                  : ""
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

export default UserForm;
