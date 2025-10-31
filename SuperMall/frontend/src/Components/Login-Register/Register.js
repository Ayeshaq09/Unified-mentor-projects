import { useContext, useState } from "react";
import "./Form.css";
import UserContext from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const userContext = useContext(UserContext);
  const { registerUser } = userContext;
  const [registerCredentials, setRegisterCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registered = await registerUser(registerCredentials);
    if (registered) {
      navigate("/login");
      toast("You have registered successfully");
    } else {
      toast("Something went wrong, please try again");
    }
  };

  const onChange = (e) => {
    setRegisterCredential({
      ...registerCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main-container">
      <div className="form-container register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h1 className="form-heading">Register</h1>
          <div className="user-icon-container"></div>
          <div className="input-container">
            <input
              type="text"
              className="input form-input"
              name="name"
              value={registerCredentials.name}
              onChange={onChange}
              required
            />
            <span className="floating-label">Name</span>
          </div>
          <div className="input-container">
            <input
              type="text"
              className="input form-input"
              name="email"
              value={registerCredentials.email}
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
              value={registerCredentials.password}
              onChange={onChange}
              required
            />
            <span className="floating-label">Password</span>
          </div>

          <button type="submit" className="btn form-btn">
            Register
          </button>
          <p className="redirect">Already a user? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register
