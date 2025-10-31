import { useContext, useState } from "react";
import "./Form.css";
import UserContext from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const userContext = useContext(UserContext);
  const { login, loginUser } = userContext;
  const [loginCredentials, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedIn = await loginUser(loginCredentials);
    if (loggedIn) {
      login();
      navigate("/");
      toast("You have successfully logged in");
    } else {
      toast("Something went wrong, please try again");
    }
  };

  const onChange = (e) => {
    setLoginCredential({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="form-heading">Login</h1>
          <div className="user-icon-container"></div>
          <div className="input-container">
            <input
              type="text"
              className="input form-input"
              name="email"
              value={loginCredentials.email}
              onChange={onChange}
              required
            />
            <span className="floating-label">Email</span>
          </div>
          <div className="input-container">
            <input
              type="password"
              className="input form-input"
              name="password"
              value={loginCredentials.password}
              onChange={onChange}
              required
            />
            <span className="floating-label">Password</span>
          </div>

          <button type="submit" className="btn form-btn">
            Login
          </button>
          <p className="redirect">New user? <Link to='/register'>Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
