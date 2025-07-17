import { useState, useContext } from "react";
import "./Component Styles/Form.css";
import UserContext from "../context/UserContext";
import ImageCard from "./ImageCard";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const usersContext = useContext(UserContext);
  const { createUser } = usersContext;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      createUser(credentials, navigate);
    } else {
      toast("Password and Corfirm password doesn't match!");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="outer-container">
      <div className="main-container">
        <div className="image-container">
          <ImageCard></ImageCard>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1 className="form-heading">Register</h1>

            <div className="user-icon-container">
              <i className="bi bi-person-circle"></i>
            </div>

            <input
              type="text"
              placeholder="Username"
              className="input form-input"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
            <i className="bi bi-person input-icon"></i>

            <input
              type="email"
              placeholder="Email address"
              className="input form-input"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
            <i class="bi bi-envelope input-icon"></i>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input form-input"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
            {showPassword ? (
              <i
                className="bi bi-eye-slash input-icon"
                onClick={() => {
                  setShowPassword(false);
                }}
              ></i>
            ) : (
              <i
                className="bi bi-eye input-icon"
                onClick={() => {
                  setShowPassword(true);
                }}
              ></i>
            )}

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input form-input"
              name="cpassword"
              onChange={onChange}
              value={credentials.cpassword}
              required
            />
            {showConfirmPassword ? (
              <i
                className="bi bi-eye-slash input-icon"
                onClick={() => {
                  setShowConfirmPassword(false);
                }}
              ></i>
            ) : (
              <i
                className="bi bi-eye input-icon"
                onClick={() => {
                  setShowConfirmPassword(true);
                }}
              ></i>
            )}

            <button type="submit" className="btn form-btn">
              Register
            </button>
            <i className="bi bi-eye input-icon hidden-icon"></i>

            <p className="form-para">
              Already a customer?&nbsp;&nbsp;
              <Link className="form-link" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
