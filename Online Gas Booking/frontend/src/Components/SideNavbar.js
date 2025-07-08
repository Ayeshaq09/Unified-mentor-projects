import { useState } from "react";
import "./Component Styles/SideNavbar.css";
import { Link } from "react-router-dom";

const SideNavbar = () => {
  const role = localStorage.getItem("role");
  const [isItemActive, setIsItemActive] = useState(null);

  const handleClick = (item) => {
    setIsItemActive(item);
  };

  return (
    <ul className="sidenavbar">
      <h2>
        <span className="category-title">Account</span>
        <div className="category-separator"></div>
      </h2>
      <li
        className={`category-item ${
          isItemActive === "Manage Account" ? "active" : ""
        }`}
        onClick={() => handleClick("Manage Account")}
      >
        <a className="category-link">
          <i className="fa-solid fa-user-pen sidenav-icon"></i>
          <p>Manage Account</p>
        </a>
      </li>

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
              <i className="fa fa-user-plus sidenav-icon" aria-hidden="true"></i>
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
              <i className="fa fa-user-plus sidenav-icon" aria-hidden="true"></i>
              <p>Add Booking</p>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default SideNavbar;
