import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductProvider";
import "../Products/AllProducts.css";
import { useNavigate } from "react-router-dom";
import FloorContext from "../../context/FloorProvider";

const FloorWise = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const { floors, fetchFloors } = useContext(FloorContext);
  const navigate = useNavigate();
  const [floor, setFloor] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchFloors();
  }, []);

  const handleClick = (item) => {
    navigate("/productdetails", {
      state: {
        product: item,
      },
    });
  };

  const filtered = floor
    ? products.filter((item) => item.floor === floor)
    : [];

  return (
    <>
      <div className="filter-container">
        <div className="input-container">
          <select
            id="floor"
            className="input form-input"
            name="floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            required
          >
            <option selected hidden value=""></option>
            {floors !== null &&
              floors.length > 0 &&
              floors.map((item) => {
                return (
                  <option>
                    {item.floor}
                  </option>
                );
              })}
          </select>
          <label className="floating-label" for="floor">
            Select Floor
          </label>
        </div>
      </div>
      <div className="products-container">
        {(floor !== '')?
        (filtered !== null &&
          filtered.length > 0 &&
          filtered.map((item) => {
            return (
              <div
                key={item.id}
                className="product"
                onClick={() => handleClick(item)}
              >
                <img src={item.productImage} />
                <p>{item.productName}</p>
                <p>Rs. {item.price}</p>
                <p>Offer {item.offerPrice}</p>
              </div>
            );
          }))
        :(products !== null &&
          products.length > 0 &&
          products.map((item) => {
            return (
              <div
                key={item.id}
                className="product"
                onClick={() => handleClick(item)}
              >
                <img src={item.productImage} />
                <p>{item.productName}</p>
                <p>Rs. {item.price}</p>
                <p>Offer {item.offerPrice}</p>
              </div>
            );
          }))}
      </div>
    </>
  );
};

export default FloorWise;
