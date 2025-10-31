import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductProvider";
import "../Products/AllProducts.css";
import { useNavigate } from "react-router-dom";
import ShopContext from "../../context/ShopProvider";

const ShopWise = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const { shops, fetchShops } = useContext(ShopContext);
  const navigate = useNavigate();
  const [shop, setShop] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchShops();
  }, []);

  const handleClick = (item) => {
    navigate("/productdetails", {
      state: {
        product: item,
      },
    });
  };

  const filtered = shop
    ? products.filter((item) => item.shopName === shop)
    : [];

  return (
    <>
      <div className="filter-container">
        <div className="input-container">
          <select
            id="shop"
            className="input form-input"
            name="shop"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            required
          >
            <option selected hidden value=""></option>
            {shops !== null &&
              shops.length > 0 &&
              shops.map((item) => {
                return (
                  <option>
                    {item.shopName}
                  </option>
                );
              })}
          </select>
          <label className="floating-label" for="offer">
            Select Shop
          </label>
        </div>
      </div>
      <div className="products-container">
        {(shop !== '')?
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

export default ShopWise;
