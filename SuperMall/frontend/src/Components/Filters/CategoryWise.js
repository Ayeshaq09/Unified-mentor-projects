import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductProvider";
import "../Products/AllProducts.css";
import { useNavigate } from "react-router-dom";
import CategoryContext from "../../context/CategoryProvider";

const CategoryWise = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const { categories, fetchCategories } = useContext(CategoryContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleClick = (item) => {
    navigate("/productdetails", {
      state: {
        product: item,
      },
    });
  };

  const filtered = category
    ? products.filter((item) => item.category === category)
    : [];

  return (
    <>
      <div className="filter-container">
        <div className="input-container">
          <select
            id="category"
            className="input form-input"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option selected hidden value=""></option>
            {categories !== null &&
              categories.length > 0 &&
              categories.map((item) => {
                return (
                  <option>
                    {item.category}
                  </option>
                );
              })}
          </select>
          <label className="floating-label" for="category">
            Select Category
          </label>
        </div>
      </div>
      <div className="products-container">
        {(category !== '')?
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

export default CategoryWise;
