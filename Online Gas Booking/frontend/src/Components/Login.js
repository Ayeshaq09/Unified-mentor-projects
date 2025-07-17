import { useState, useContext } from "react";
import "./Component Styles/Form.css";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ImageCard from "./ImageCard";
import { toast } from "react-toastify";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await loginUser(
      credentials,
      navigate,
      props.setIsLoggedIn
    );
    if (!loggedIn) {
      toast("Wrong credentials");
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
            <h1 className="form-heading">Login</h1>

            <div className="user-icon-container">
              <i className="bi bi-person-circle"></i>
            </div>

            <input
              type="text"
              placeholder="Email"
              className="input form-input"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
            <i className="bi bi-envelope input-icon"></i>

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

            <button type="submit" className="btn form-btn">
              Login
            </button>
            <i className="bi bi-eye input-icon hidden-icon"></i>

            <p className="form-para">
              New customer? &nbsp;&nbsp;
              <Link className="form-link" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
