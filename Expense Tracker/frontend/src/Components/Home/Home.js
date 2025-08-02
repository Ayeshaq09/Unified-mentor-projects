import { Outlet, useNavigate } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav";
import "./Home.css";

const Home = (props) => {
  const { setIsLoggedIn } = props;
  const navigate = useNavigate();

  // on logout delete auth-token from localstorage
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(!!localStorage.getItem("authToken"));
    navigate("/login");
  };

  return (
    <>
      <div className="home-container">
          <div className="topNav-container">
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        <div className="nav-container">
          <Sidenav />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
