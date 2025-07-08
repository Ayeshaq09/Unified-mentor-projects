import { useState, useContext } from "react";
import "./Component Styles/Login.css";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ImageCard from "./ImageCard";

export default function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const usersContext = useContext(UserContext);
  const { loginUser } = usersContext;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials, navigate, props.setIsLoggedIn);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="main-outer-container">
      <div className="main">
        <div className="image-container">
          <ImageCard></ImageCard>
        </div>
        <div className="login-register-form">
          <div className="loginform-container">
            <form onSubmit={handleSubmit}>
              <h1 className="login-heading">Login</h1>

              <div className="user-icon-container">
                <i className="bi bi-person-circle"></i>
              </div>

              <input
                type="text"
                placeholder="Email"
                className="input login-input"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <i className="bi bi-envelope"></i>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input login-input"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
              {showPassword ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                ></i>
              ) : (
                <i
                  className="bi bi-eye"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                ></i>
              )}

              <button type="submit" className="btn login-btn">
                Login
              </button>

              <p className="register-para">
                New customer? &nbsp;&nbsp;
                <Link className="register-link" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
