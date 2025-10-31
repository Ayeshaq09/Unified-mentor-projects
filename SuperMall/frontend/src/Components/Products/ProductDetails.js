import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { useContext, useEffect, useRef, useState } from "react";
import CompareContext from "../../context/CompareProvider";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [discount, setDiscount] = useState();
  const navigate = useNavigate();
  const { compare1, compare2, addCompare1, addCompare2, clearCompare } =
    useContext(CompareContext);
  const compare1Ref = useRef();
  const compare2Ref = useRef();

  useEffect(() => {
    setDiscount(calcDiscount(product.price, product.offerPrice));
  }, [product.price, product.offerPrice]);

  useEffect(() => {
    if (!!compare1 && compare1Ref.current) {
      compare1Ref.current.classList.add("btn-disabled");
    }
    if (!!compare2 && compare2Ref.current) {
      compare2Ref.current.classList.add("btn-disabled");
    }
  }, [compare1, compare2]);

  const calcDiscount = (price, offerPrice) => {
    const discountPrice = price - offerPrice;
    const discount = Math.floor((discountPrice / price) * 100);
    return discount;
  };

  const handleClick = () => {
    navigate("/allproducts");
  };

  const handleCompare1 = (product) => {
    addCompare1(product);
    const compare1Local = !!localStorage.getItem("compare1");
    const compare2Local = !!localStorage.getItem("compare2");
    if (compare1Local) {
      compare1Ref.current.classList.add("btn-disabled");
    }

    if (compare1Local && compare2Local) {
      navigate("/compareproducts");
    }
  };

  const handleCompare2 = (product) => {
    addCompare2(product);
    const compare1Local = !!localStorage.getItem("compare1");
    const compare2Local = !!localStorage.getItem("compare2");
    if (compare2Local) {
      compare2Ref.current.classList.add("btn-disabled");
    }

    if (compare1Local && compare2Local) {
      navigate("/compareproducts");
    }
  };

  const handleClearCompare = () => {
    clearCompare();
    if (!!compare1 || !!compare2) {
      compare1Ref.current.classList.remove("btn-disabled");
      compare2Ref.current.classList.remove("btn-disabled");
    }
  };

  return (
    <>
      <div className="product-container">
        <h2 onClick={handleClick}>
          <i class="bi bi-arrow-left"></i>Products
        </h2>
        <div className="product-details-container">
          <div className="product-image">
            <img src={product.productImage} alt="" />
          </div>
          <div className="product-info">
            <p className="product-name">{product.productName}</p>
            <span className="product-offer-price">Rs.{product.offerPrice}</span>
            <span className="product-price">
              <del>Rs.{product.price}</del>
            </span>
            <span className="product-discount">{discount}% off</span>
            <div className="product-desc-container">
              <h3 className="product-desc-heading">Product Description</h3>
              <p className="product-desc">{product.description}</p>
            </div>
            {(localStorage.getItem('role') === 'user') && <div className="compare-btn">
              <button
                className="compare-btn1"
                ref={compare1Ref}
                onClick={() => handleCompare1(product)}
              >
                Compare1
              </button>
              <button
                className="compare-btn2"
                ref={compare2Ref}
                onClick={() => handleCompare2(product)}
              >
                Compare2
              </button>
              <button className="compare-btn2" onClick={handleClearCompare}>
                Clear
              </button>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
