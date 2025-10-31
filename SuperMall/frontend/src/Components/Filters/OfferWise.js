import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductProvider";
import "../Products/AllProducts.css";
import { useNavigate } from "react-router-dom";
import OfferContext from "../../context/OfferProvider";

const OfferWise = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const { offers, fetchOffers } = useContext(OfferContext);
  const navigate = useNavigate();
  const [offer, setOffer] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchOffers();
  }, []);

  const handleClick = (item) => {
    navigate("/productdetails", {
      state: {
        product: item,
      },
    });
  };

  const filtered = offer
    ? products.filter((item) => item.offer === offer)
    : [];

  return (
    <>
      <div className="filter-container">
        <div className="input-container">
          <select
            id="offer"
            className="input form-input"
            name="offer"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            required
          >
            <option selected hidden value=""></option>
            {offers !== null &&
              offers.length > 0 &&
              offers.map((item) => {
                return (
                  <option>
                    {item.offer}
                  </option>
                );
              })}
          </select>
          <label className="floating-label" for="offer">
            Select Offer
          </label>
        </div>
      </div>
      <div className="products-container">
        {(offer !== '')?
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

export default OfferWise;
