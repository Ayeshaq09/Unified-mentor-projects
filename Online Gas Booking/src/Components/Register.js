import { useState } from "react";
import "./Login.css";

export default function Register(props) {
  const { setShowLogin } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <div className="loginform-container">
        <form>
          <h1 className="login-heading">Register</h1>

          <div className="user-icon-container">
            <i class="bi bi-person-circle"></i>
          </div>

          <input type="text" placeholder="Username" className="login-input" />
          <i class="bi bi-person"></i>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="login-input"
          />
          {showPassword ? (
            <i
              class="bi bi-eye-slash"
              onClick={() => {
                setShowPassword(false);
              }}
            ></i>
          ) : (
            <i
              class="bi bi-eye"
              onClick={() => {
                setShowPassword(true);
              }}
            ></i>
          )}

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="login-input"
          />
          {showConfirmPassword ? (
            <i
              class="bi bi-eye-slash"
              onClick={() => {
                setShowConfirmPassword(false);
              }}
            ></i>
          ) : (
            <i
              class="bi bi-eye"
              onClick={() => {
                setShowConfirmPassword(true);
              }}
            ></i>
          )}

          <button type="submit" className="login-btn">
            Register
          </button>

          <p className="register-para">
            Already a customer?{" "}
            <a className="register-link" onClick={() => setShowLogin(true)}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
