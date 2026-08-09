import { useState } from "react";
import api from "../services/api";

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loginCode, setLoginCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    shipping_address: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(value)) {
        try {
          const response = await api.post("/check-email/", {
            email: value,
          });

          if (response.data.registered) {
            console.log("EMAIL FOUND")
            setShowModal(true);
          }
        } catch (error) {
          console.log("CHECK EMAIL ERROR:", error.response?.data);
        }
      }
    }
  };

const handleVerifyCode = async () => {
  try {
    const response = await api.post("/verify-code/", {
      email: formData.email,
      login_code: loginCode,
    });

    console.log("Verify Response:", response.data);

    setIsVerified(true);

    console.log("isVerified set to true");

  } catch (error) {
    console.log("VERIFY ERROR:", error.response?.data);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await api.post("/checkout/", {
        email: formData.email,
        phone: formData.phone,
        shipping_address: formData.shipping_address,
      });

      console.log("Checkout Success:", response.data);

      setSuccessMessage(response.data.message);
      setErrorMessage("");

      setFormData({
        email: "",
        phone: "",
        shipping_address: "",
      });

      setUser(null);
      setIsVerified(false);
      setLoginCode("");
    } catch (error) {
      console.log("CHECKOUT ERROR:", error.response?.data);
      alert(JSON.stringify(error.response?.data));
      setErrorMessage("Checkout failed");
    }
  };
  console.log("isVerified =", isVerified);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Checkout</h1>

          {user && (
            <div className="alert alert-info">
              Welcome {user.first_name} {user.last_name}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card p-4 shadow">
            {!isVerified && (
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Registered Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            )}

            {isVerified && (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    name="shipping_address"
                    placeholder="Shipping Address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Continue
                </button>
              </>
            )}
          </form>

          {showModal && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 9999,
              }}
            >
              <div
                className="bg-white p-4 rounded shadow"
                style={{ width: "400px" }}
              >
                <h4 className="text-center mb-3">🔐 Login Verification</h4>

                <p className="text-muted text-center">
                  Enter the login code generated during registration
                </p>

                <input
                  type="text"
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  placeholder="Enter Login Code"
                  className="form-control"
                />

                {errorMessage && (
                  <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}

                <div className="d-grid gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleVerifyCode}
                  >
                    Verify Code
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
