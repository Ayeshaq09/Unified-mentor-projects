import "./Form.css";
import ExpenseTracker from "../../Images/expensetrackingimg.jpeg";
import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  const { setIsLoggedIn } = props;
  const userContext = useContext(UserContext);
  const { loginUser } = userContext;
  const [credentials, setCredentials] = useState({
    email: "",
  });
  const navigate = useNavigate();

  // login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await loginUser(credentials, navigate, setIsLoggedIn);
    if (!loggedIn) {
      toast("Please check credentials!");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="outer-container">
      <div className="image-container">
        <img
          className="form-img"
          src={ExpenseTracker}
          alt="expense tracker"
        />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="form-heading">Login</h1>

          <div className="user-icon-container">
            <i className="bi bi-person-circle"></i>
          </div>

          <div className="input-container">
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
          </div>

          <button type="submit" className="btn form-btn">
            Login
          </button>

          <p className="form-para">
            New customer? &nbsp;&nbsp;
            <Link className="form-link" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
