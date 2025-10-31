import { useContext, useEffect } from "react";
import ProductContext from "../../context/ProductProvider";
import "./AllProducts.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const productProvider = useContext(ProductContext);
  const { products, fetchProducts } = productProvider;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = (item) => {
    navigate("/productdetails", {
      state: {
        product: item,
      },
    });
  };

  return (
    <div className="products-container">
      {products !== null &&
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
        })}
    </div>
  );
};

export default Home;
