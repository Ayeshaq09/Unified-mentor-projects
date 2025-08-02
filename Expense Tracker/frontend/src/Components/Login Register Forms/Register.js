import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import ExpenseTracker from "../../Images/expensetrackingimg.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Form.css";

const Register = () => {
  const userContext = useContext(UserContext);
  const { registerUser } = userContext;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  // register user
  const handleSubmit = (e) => {
    e.preventDefault();
    const registered = registerUser(credentials, navigate);
    if (!registered) {
      toast("Please check credentials!");
    } else {
      toast("Registered successfully. Please login!");
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
          <h1 className="form-heading">Register</h1>

          <div className="user-icon-container">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              className="input form-input"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
            <i className="bi bi-pen input-icon"></i>
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
            Register
          </button>

          <p className="form-para">
            Already a customer? &nbsp;&nbsp;
            <Link className="form-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
