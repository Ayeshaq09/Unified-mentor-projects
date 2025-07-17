import { useContext, useEffect, useState } from "react";
import "./Component Styles/SideNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const SideNavbar = (props) => {
  const [isItemActive, setIsItemActive] = useState("Manage Customers");
  const navigate = useNavigate();
  const { role, authToken } = props;
  const userContext = useContext(UserContext);
  const { user, fetchUser } = userContext;

  const handleClick = (item) => {
    setIsItemActive(item);
  };

  useEffect(() => {
    if (role === "admin") {
      setIsItemActive("Manage Customers");
      navigate("/managecustomers");
    } else {
      setIsItemActive("Booking History");
      navigate("/bookinghistory");
    }

    fetchUser(authToken);
    // eslint-disable-next-line
  }, []);

  return (
    <ul className="sidenavbar">
      <h1>
        <span className="category-title userName">{`Welcome \n${user.user.name}`}</span>
        <div className="category-separator"></div>
      </h1>

      {role === "admin" && (
        <>
          <h2>
            <span className="category-title">Customers</span>
            <div className="category-separator"></div>
          </h2>
          <li
            className={`category-item ${
              isItemActive === "Manage Customers" ? "active" : ""
            }`}
            onClick={() => handleClick("Manage Customers")}
          >
            <Link to="/managecustomers" className="category-link">
              <i className="fa-solid fa-users-gear sidenav-icon"></i>
              <p>Manage Customers</p>
            </Link>
          </li>
          <li
            className={`category-item ${
              isItemActive === "Add Customer" ? "active" : ""
            }`}
            onClick={() => handleClick("Add Customer")}
          >
            <Link to="/addcustomers" className="category-link">
              <i
                className="fa fa-user-plus sidenav-icon"
                aria-hidden="true"
              ></i>
              <p>Add Customer</p>
            </Link>
          </li>
        </>
      )}

      {role === "admin" && (
        <>
          <h2>
            <span className="category-title">Bookings</span>
            <div className="category-separator"></div>
          </h2>
          <li
            className={`category-item ${
              isItemActive === "Manage Bookings" ? "active" : ""
            }`}
            onClick={() => handleClick("Manage Bookings")}
          >
            <Link to="/managebookings" className="category-link">
              <i className="fa-solid fa-cart-shopping sidenav-icon"></i>
              <p>Manage Bookings</p>
            </Link>
          </li>
        </>
      )}

      {role === "admin" && (
        <>
          <h2>
            <span className="category-title">Settings</span>
            <div className="category-separator"></div>
          </h2>
          <li
            className={`category-item ${
              isItemActive === "Settings" ? "active" : ""
            }`}
            onClick={() => handleClick("Settings")}
          >
            <Link to="/settings" className="category-link">
              <i className="fa-solid fa-gear sidenav-icon"></i>
              <p>Settings</p>
            </Link>
          </li>
        </>
      )}

      {role === "user" && (
        <>
          <h2>
            <span className="category-title">Booking</span>
            <div className="category-separator"></div>
          </h2>
          <li
            className={`category-item ${
              isItemActive === "Booking History" ? "active" : ""
            }`}
            onClick={() => handleClick("Booking History")}
          >
            <Link to="/bookinghistory" className="category-link">
              <i className="fa-solid fa-users-gear sidenav-icon"></i>
              <p>Booking History</p>
            </Link>
          </li>
          <li
            className={`category-item ${
              isItemActive === "Add Booking" ? "active" : ""
            }`}
            onClick={() => handleClick("Add Booking")}
          >
            <Link to="/addbooking" className="category-link">
              <i
                className="fa fa-user-plus sidenav-icon"
                aria-hidden="true"
              ></i>
              <p>Add Booking</p>
            </Link>
          </li>
        </>
      )}

      {role === "admin" && (
        <>
          <h2>
            <span className="category-title">Notices</span>
            <div className="category-separator"></div>
          </h2>
          <li
            className={`category-item ${
              isItemActive === "Add Notice" ? "active" : ""
            }`}
            onClick={() => handleClick("Add Notice")}
          >
            <Link to="/addnotice" className="category-link">
              <i className="fa-solid fa-clipboard sidenav-icon"></i>
              <p>Add Notice</p>
            </Link>
          </li>
          <li
            className={`category-item ${
              isItemActive === "Notice Board" ? "active" : ""
            }`}
            onClick={() => handleClick("Notice Board")}
          >
            <Link to="/noticeboard" className="category-link">
              <i className="fa-solid fa-clipboard-list sidenav-icon"></i>
              <p>Notice Board</p>
            </Link>
          </li>
        </>
      )}

      {role === "user" && (
        <>
          <h2>
            <span className="category-title">Notices</span>
            <div className="category-separator"></div>
          </h2>
          <li
            className={`category-item ${
              isItemActive === "Notice Board" ? "active" : ""
            }`}
            onClick={() => handleClick("Settings")}
          >
            <Link to="/noticeboard" className="category-link">
              <i className="fa-solid fa-clipboard-list sidenav-icon"></i>
              <p>Notice Board</p>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default SideNavbar;
