import { useState } from "react";
import api from "../Services/api";
import './Register.css'
const Register = () => {
  const [loginCode, setLoginCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.first_name.trim()) {
      validationErrors.first_name = "First Name is required";
    }

    if (!formData.last_name.trim()) {
      validationErrors.last_name = "Last Name is required";
    } else if (formData.last_name.trim().length < 2) {
      validationErrors.last_name =
        "Last Name must contain at least 2 characters";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      validationErrors.email = "Enter a valid email";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post("/register/", formData);

      setLoginCode(response.data.login_code);

      setSuccessMessage(
        "Registration completed successfully"
      );

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
      });

      setErrors({});

    } catch (error) {
      console.log("Error:", error.response?.data);

      const backendErrors = error.response?.data;

      if (backendErrors?.first_name) {
        setErrorMessage(backendErrors.first_name[0]);
      } else if (backendErrors?.last_name) {
        setErrorMessage(backendErrors.last_name[0]);
      } else if (backendErrors?.email) {
        setErrorMessage(backendErrors.email[0]);
      } else {
        setErrorMessage("Registration failed");
      }
    }
  };

  return (
    <div className="register-page">

    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <h1 className="text-center mb-4">
            Register
          </h1>

          <form
            onSubmit={handleSubmit}
            className="card p-4 shadow"
          >
            <div className="mb-3">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="form-control"
              />

              {errors.first_name && (
                <div className="text-danger mt-1">
                  {errors.first_name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="form-control"
              />

              {errors.last_name && (
                <div className="text-danger mt-1">
                  {errors.last_name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />

              {errors.email && (
                <div className="text-danger mt-1">
                  {errors.email}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Register
            </button>
          </form>

          {successMessage && (
            <div className="alert alert-success mt-3">
              {successMessage}
            </div>
          )}

          {loginCode && (
            <div className="card mt-3 border-success">
              <div className="card-body text-center">
                <h5 className="text-success">
                  Registration Successful
                </h5>

                <p>
                  Save this login code for checkout:
                </p>

                <h3 className="fw-bold">
                  {loginCode}
                </h3>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger mt-3">
              {errorMessage}
            </div>
          )}

        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;