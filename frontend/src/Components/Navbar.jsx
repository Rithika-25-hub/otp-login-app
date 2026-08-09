import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          OTP Login App
        </Link>

        <div>
          <Link
            className="btn btn-outline-light me-2"
            to="/"
          >
            Register
          </Link>

          <Link
            className="btn btn-outline-light"
            to="/checkout"
          >
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;