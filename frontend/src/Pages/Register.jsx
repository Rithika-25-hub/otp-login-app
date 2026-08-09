import { useState } from "react";
import api from "../Services/api";

const Register = () => {
  const [loginCode, setLoginCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post(
        "/register/",
        formData
      );

      setLoginCode(response.data.login_code);

      setSuccessMessage(
        "Registration completed successfully"
      );

      console.log(response.data);

    } catch (error) {
      console.log("Error:", error.response?.data);

      setErrorMessage(
        error.response?.data?.email?.[0] ||
        "Registration failed"
      );
    }
  };

  return (
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
  );
};

export default Register;