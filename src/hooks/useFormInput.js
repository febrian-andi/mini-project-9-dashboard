import { useState } from "react";

export const useFormInput = (initialValues = {}, validate = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Perbarui nilai
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Jalankan validasi jika ada
    if (validate) {
      const error = validate(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, resetForm };
};