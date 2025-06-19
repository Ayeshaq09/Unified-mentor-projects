import { useState } from "react";
import "./Login.css";

export default function Login(props) {
  const { setShowLogin } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="loginform-container">
      <form>
        <h1 className="login-heading">Login</h1>

        <div className="user-icon-container">
          <i class="bi bi-person-circle"></i>
        </div>

        <input type="text" placeholder="Username" className="login-input" />
        <i class="bi bi-person"></i>

        <input type={showPassword ? "text" : "password"} placeholder="Password" className="login-input" />
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

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="register-para">
          New customer?{" "}
          <a className="register-link" onClick={() => setShowLogin(false)}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
