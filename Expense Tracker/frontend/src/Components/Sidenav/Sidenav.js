import { useContext, useEffect, useState } from "react";
import Logo from "../../Images/logo.avif";
import "./Sidenav.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

const Sidenav = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  useEffect(() => {
    // set dashboard as active navbar item
    setActiveItem("Dashboard");
    navigate('/dashboard');
    getUser();
    // eslint-disable-next-line
  }, []);

  const handleClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="sidenav-container">
      <ul>
        <li className="logo-item">
          <img src={Logo} alt="expense logo" className="logo-img" />
          <h1 className="app-name">BudgetBuddy</h1>
        </li>
        <Link to='dashboard'
          className={`sidenav-item ${
            activeItem === "Dashboard" ? "active" : ""
          }`}
          onClick={() => handleClick("Dashboard")}
        >
            <i className="bi bi-bar-chart-line-fill sidenav-icon"></i>
          Dashboard
        </Link>
        <Link to='/budget'
          className={`sidenav-item ${activeItem === "Budget" ? "active" : ""}`}
          onClick={() => handleClick("Budget")}
        >
            <i className="bi bi-piggy-bank-fill sidenav-icon"></i>
          Budget
        </Link>
        <Link to='/allexpenses'
          className={`sidenav-item ${activeItem === "AllExpenses" ? "active" : ""}`}
          onClick={() => handleClick("AllExpenses")}
        >
           <i className="bi bi-receipt sidenav-icon"></i> 
          All Expenses
        </Link>
        <li className="sidenav-item profile">
          <i className="bi bi-person-circle profile-icon"></i>{user}
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;
