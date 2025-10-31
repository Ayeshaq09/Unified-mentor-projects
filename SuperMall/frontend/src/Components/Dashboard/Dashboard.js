import "./Dashboard.css";
import Sidenav from "../Sidenav/Sidenav";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../context/AuthProvider";

const Dashboard = (props) => {
  const { role } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useContext(UserContext);

  const handleClick = () => {
    setIsMenuOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    logout();
  };

  return (
    <div className="dashboard-container">
      <div className="topnav-container">
        <i className="bi bi-list menu-icon" onClick={handleClick}></i>
        <p className="logout"  onClick={handleLogout}>Logout</p>
      </div>
      <div className="sidenav-main-container">
        <div className="sidenav-container">
          <Sidenav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} role={role} />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
