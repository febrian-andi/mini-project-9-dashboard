import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import { usePostData } from "../../hooks/usePostData";

function UserForm() {
  const navigate = useNavigate();
  const { values, handleChange } = useFormInput({
    name: "",
    email: "",
    title: "Admin",
    linkedin_url: "",
    password: "",
    ig_url: "",
  });

  const [image, setImage] = useState(null);
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.includes(file.type)) {
        setImage(file);
      } else {
        alert("Please upload a valid image (jpeg, png, gif).");
      }
    }
  };

  const [confirm_password, setConfirmPassword] = useState("");
  const { postData, loading } = usePostData("/users");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
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
    formData.append("twitter_url", values.twitter_url);
    formData.append("photo", image);

    postData(
      formData,
      () => {
        navigate("/users");
      },
      (errors) => {
        alert(Object.values(errors).join("\n"));
      }
    );
  };

  return (
    <div className="rounded w-full sm:w-1/2 mx-auto p-6 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image (optional)</label>
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
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[80px] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 mx-auto border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
