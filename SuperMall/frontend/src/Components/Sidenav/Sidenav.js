import { useState } from "react";
import "./Sidenav.css";
import { Link } from "react-router-dom";

const Sidenav = (props) => {
  const { isMenuOpen, setIsMenuOpen, role } = props;
  const [activeItem, setActiveItem] = useState(["All Products"]);
  const [isActiveItem, setIsActiveItem] = useState("All Products");

  const handleClick = () => {
    setIsMenuOpen(false);
  };

  const handleListExpand = (item) => {
    if (activeItem.includes(item)) {
      setActiveItem(activeItem.filter((i) => i !== item));
    } else {
      setActiveItem([...activeItem, item]);
    }

    console.log(activeItem);
  };

  const handleActiveItem = (item) => {
    setIsActiveItem(item);
  };

  return (
    <div
       className={`sidenav ${isMenuOpen ? "menu-open" : "menu-close"}`}
    >
      <span className="cancel">
        <i className="bi bi-x-lg cancel-icon" onClick={handleClick}></i>
      </span>
      <ul className="sidenav-list">
        <li className="sidenav-items">
          <div>
            <h1>
              <i
                className={`bi bi-chevron-right ${
                  activeItem.includes("Products") ? "open" : "close"
                }`}
                onClick={() => handleListExpand("Products")}
              ></i>
              Products
            </h1>
            <div
              className={`sidenav-item-container ${
                activeItem.includes("Products") ? "expand" : "closed"
              }`}
            >
              {role === "admin" && (
                <>
                  <Link
                    to="/addproducts"
                    className={`sidenav-item ${
                      isActiveItem === "Add Products" ? "active-item" : ""
                    }`}
                    onClick={() => handleActiveItem("Add Products")}
                  >
                    Add Products
                  </Link>
                  <Link
                    to="/manageproducts"
                    className={`sidenav-item ${
                      isActiveItem === "Manage Products" ? "active-item" : ""
                    }`}
                    onClick={() => handleActiveItem("Manage Products")}
                  >
                    Manage Products
                  </Link>
                </>
              )}
              <Link
                to="/allproducts"
                className={`sidenav-item ${
                  isActiveItem === "All Products" ? "active-item" : ""
                }`}
                onClick={() => handleActiveItem("All Products")}
              >
                All Products
              </Link>
              {role === "user" && (
                <>
                  <Link
                    to="/categorywise"
                    className={`sidenav-item ${
                      isActiveItem === "Category Wise" ? "active-item" : ""
                    }`}
                    onClick={() => handleActiveItem("Category Wise")}
                  >
                    Category Wise
                  </Link>
                  <Link
                    to="/offerwise"
                    className={`sidenav-item ${
                      isActiveItem === "Offer Wise" ? "active-item" : ""
                    }`}
                    onClick={() => handleActiveItem("Offer Wise")}
                  >
                    Offer Wise
                  </Link>
                  <Link
                    to="/shopwise"
                    className={`sidenav-item ${
                      isActiveItem === "Shop Wise" ? "active-item" : ""
                    }`}
                    onClick={() => handleActiveItem("Shop Wise")}
                  >
                    Shop Wise
                  </Link>
                  <Link
                    to="/floorwise"
                    className={`sidenav-item ${
                      isActiveItem === "Floor Wise" ? "active-item" : ""
                    }`}
                    onClick={() => handleActiveItem("Floor Wise")}
                  >
                    Floor Wise
                  </Link>
                </>
              )}
            </div>
          </div>
        </li>

        {role === "admin" && (
          <li className="sidenav-items">
            <div>
              <h1>
                <i
                  className={`bi bi-chevron-right ${
                    activeItem.includes("Shops") ? "open" : "close"
                  }`}
                  onClick={() => handleListExpand("Shops")}
                ></i>
                Shops
              </h1>
              <div
                className={`sidenav-item-container ${
                  activeItem.includes("Shops") ? "expand" : "closed"
                }`}
              >
                <Link
                  to="/manageshops"
                  className={`sidenav-item ${
                    isActiveItem === "Manage Shops" ? "active-item" : ""
                  }`}
                  onClick={() => handleActiveItem("Manage Shops")}
                >
                  Manage Shops
                </Link>
              </div>
            </div>
          </li>
        )}

        {role === "admin" && (
          <li className="sidenav-items">
            <div>
              <h1>
                <i
                  className={`bi bi-chevron-right ${
                    activeItem.includes("Categories") ? "open" : "close"
                  }`}
                  onClick={() => handleListExpand("Categories")}
                ></i>
                Categories
              </h1>
              <div
                className={`sidenav-item-container ${
                  activeItem.includes("Categories") ? "expand" : "closed"
                }`}
              >
                <Link
                  to="/managecategories"
                  className={`sidenav-item ${
                    isActiveItem === "Manage Categories" ? "active-item" : ""
                  }`}
                  onClick={() => handleActiveItem("Manage Categories")}
                >
                  Manage Categories
                </Link>
              </div>
            </div>
          </li>
        )}

        {role === "admin" && (
          <li className="sidenav-items">
            <div>
              <h1>
                <i
                  className={`bi bi-chevron-right ${
                    activeItem.includes("Floors") ? "open" : "close"
                  }`}
                  onClick={() => handleListExpand("Floors")}
                ></i>
                Floors
              </h1>
              <div
                className={`sidenav-item-container ${
                  activeItem.includes("Floors") ? "expand" : "closed"
                }`}
              >
                <Link
                  to="/managefloors"
                  className={`sidenav-item ${
                    isActiveItem === "Manage Floors" ? "active-item" : ""
                  }`}
                  onClick={() => handleActiveItem("Manage Floors")}
                >
                  Manage Floors
                </Link>
              </div>
            </div>
          </li>
        )}

        {role === "admin" && (
          <li className="sidenav-items">
            <div>
              <h1>
                <i
                  className={`bi bi-chevron-right ${
                    activeItem.includes("Offers") ? "open" : "close"
                  }`}
                  onClick={() => handleListExpand("Offers")}
                ></i>
                Offers
              </h1>
              <div
                className={`sidenav-item-container ${
                  activeItem.includes("Offers") ? "expand" : "closed"
                }`}
              >
                <Link
                  to="/manageoffers"
                  className={`sidenav-item ${
                    isActiveItem === "Manage Offers" ? "active-item" : ""
                  }`}
                  onClick={() => handleActiveItem("Manage Offers")}
                >
                  Manage Offers
                </Link>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidenav;
