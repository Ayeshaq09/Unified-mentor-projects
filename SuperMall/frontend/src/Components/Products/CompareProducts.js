import { useNavigate } from "react-router-dom";
import "./CompareProducts.css";
import { useContext, useEffect, useState } from "react";
import CompareContext from "../../context/CompareProvider";

const CompareProducts = () => {
  const [product1, setProduct1] = useState(
    JSON.parse(localStorage.getItem("compare1"))
  );
  const [product2, setProduct2] = useState(
    JSON.parse(localStorage.getItem("compare2"))
  );
  const navigate = useNavigate();
  const { clearCompare } =
    useContext(CompareContext);

  const handleClick = () => {
    setProduct1("");
    setProduct2("");
    clearCompare();
    navigate("/allproducts");
  };

  return (
    <div className="compare-products-container">
      <h2 className="" onClick={handleClick}>
        <i className="bi bi-arrow-left"></i>Products
      </h2>
      <div className="compare-products-details-container">
        <div className="compare-products-heading">
          <div className="product1-heading">Product1</div>
          <div className="product2-heading">Product2</div>
        </div>
        <h4 className="product-name-heading">Name</h4>
        <div className="compare-products-name">
          <div className="product1-name">{product1.productName}</div>
          <div className="product2-name">{product2.productName}</div>
        </div>

        <h4 className="product-price-heading">Price</h4>
        <div className="compare-products-price">
          <div className="product1-price">{product1.price}</div>
          <div className="product2-price">{product2.price}</div>
        </div>

        <h4 className="product-offer-price-heading">Offer Price</h4>
        <div className="compare-products-offer-price">
          <div className="product1-offer-price">{product1.offerPrice}</div>
          <div className="product2-offer-price">{product2.offerPrice}</div>
        </div>

        <h4 className="product-brand-heading">Brand</h4>
        <div className="compare-products-brand">
          <div className="product1-brand">{product1.brand}</div>
          <div className="product2-brand">{product2.brand}</div>
        </div>

        <h4 className="product-category-heading">Category</h4>
        <div className="compare-products-category">
          <div className="product1-category">{product1.category}</div>
          <div className="product2-category">{product2.category}</div>
        </div>

        <h4 className="cproduct-desc-heading">Description</h4>
        <div className="compare-products-desc">
          <div className="product1-desc">{product1.description}</div>
          <div className="product2-desc">{product2.description}</div>
        </div>

        <h4 className="product-shop-details-heading">Shop Details</h4>
        <div className="compare-products-shop-details">
          <div className="compare-product-shopname">
            <div className="product1-shop-shopname">{product1.shopName}</div>
            <div className="product2-shop-shopname">{product2.shopName}</div>
          </div>
          <div className="compare-product-shop-floor">
            <div className="product1-shop-floor">{product1.floor}</div>
            <div className="product2-shop-floor">{product2.floor}</div>
          </div>
          <div className="compare-product-shop-mobile">
            <div className="product1-shop-mobile">{product1.mobile}</div>
            <div className="product2-shop-mobile">{product2.mobile}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
