import cylinderIcon from "../Images/cylinder-small.jpeg";
import { Link } from "react-router-dom";
import "./Component Styles/Startup.css";

export default function Startup(props) {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="header">
          <img
            src={cylinderIcon}
            alt="animated cylinder icon"
            className="cylinder-icon"
          />
          <h2 className="app-heading">Book Gas Online</h2>
        </div>
        <div>
          {props.isLoggedIn ? (
            <Link to="/login" className="login-reg-btn" onClick={() => {localStorage.removeItem('authToken')
              props.setIsLoggedIn(false)
              localStorage.removeItem('role')
            }}>Logout</Link>
          ) : (
            <>
              <Link to="/login" className="login-reg-btn">
                Login
              </Link>
              <Link to="/register" className="login-reg-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
