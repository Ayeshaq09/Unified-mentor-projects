import { useState, useContext } from "react";
import "./Component Styles/Register.css";
import UserContext from "../context/UserContext";
import ImageCard from "./ImageCard";
import { Link, useNavigate } from "react-router-dom";
import { toast }  from 'react-toastify';

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
    }else{
      toast('Password and Corfirm password doesn\'t match!');
    }
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
              <h1 className="login-heading">Register</h1>

              <div className="user-icon-container">
                <i className="bi bi-person-circle"></i>
              </div>

              <input
                type="text"
                placeholder="Username"
                className="input register-input"
                name="name"
                value={credentials.name}
                onChange={onChange}
                required
              />
              <i className="bi bi-person input-icon"></i>

              <input
                type="email"
                placeholder="Email address"
                className="input register-input"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <i class="bi bi-envelope input-icon"></i>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input register-input"
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
                className="input register-input"
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

              <button type="submit" className="btn login-btn">
                Register
              </button>

              <p className="register-para">
                Already a customer?&nbsp;&nbsp;
                <Link className="register-link" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
