import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import "../Component Styles/AddCustomer.css";
import { toast } from "react-toastify";

const AddCustomers = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const usersContext = useContext(UserContext);
  const { addUser } = usersContext;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      addUser(credentials);
      setCredentials({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
      toast("User Added!");
    }
    else{
      toast("Wrong credentials!");
    }
  };

  const handleReset = () => {
    setCredentials({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="addCustomer-container">
      <form onSubmit={handleSubmit}>
        <h1 className="login-heading">Add Customer</h1>

        <div className="user-icon-container">
          <i className="bi bi-person-circle"></i>
        </div>

        <input
          type="text"
          placeholder="Username"
          className="input cust-input"
          name="name"
          value={credentials.name}
          onChange={onChange}
        />
        <i className="bi bi-person input-icon"></i>

        <input
          type="email"
          placeholder="Email address"
          className="input cust-input"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
        <i className="bi bi-envelope input-icon"></i>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input cust-input"
          name="password"
          value={credentials.password}
          onChange={onChange}
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
          className="input cust-input"
          name="cpassword"
          onChange={onChange}
          value={credentials.cpassword}
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

        <div className="form-btns">
          <button
            type="reset"
            className="btn addcustomer-btn"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className="btn addcustomer-btn">
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomers;
