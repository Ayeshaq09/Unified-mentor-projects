const { createContext, useState } = require("react");

// ProductContext
const ProductContext = createContext();

export default ProductContext;

// ProductProvider
export const ProductProvider = (props) => {
  const host = process.env.REACT_APP_API_HOST;

  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const url = `${host}/product/fetchproducts`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setProducts(json.products);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const addProduct = async (product) => {
    const url = `${host}/product/addproduct`;

    const {
      productName,
      description,
      price,
      offer,
      offerPrice,
      category,
      floor,
      shopName,
      mobile,
      productImage,
    } = product;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          productName,
          description,
          price,
          offer,
          offerPrice,
          category,
          floor,
          shopName,
          mobile,
          productImage,
        }),
      });

      const json = await response.json();
      if (json.success) {
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const updateProductImage = async (id, productImage) => {
    const url = `${host}/product/updateproductimage/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          productImage,
        }),
      });

      const json = await response.json();
      if (json.success) {
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    const url = `${host}/product/deleteProduct/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setProducts(products.filter((item) => item.id !== id));
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const updateProduct = async (id, product) => {
    const url = `${host}/product/updateproduct/${id}`;
    const {
      productName,
      description,
      price,
      offer,
      offerPrice,
      category,
      floor,
      shopName,
      mobile,
    } = product;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          productName,
          description,
          price,
          offer,
          offerPrice,
          category,
          floor,
          shopName,
          mobile,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const newProducts = JSON.parse(JSON.stringify(products));
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === id) {
            newProducts[i].productName = productName;
            newProducts[i].description = description;
            newProducts[i].price = price;
            newProducts[i].offer = offer;
            newProducts[i].offerPrice = offerPrice;
            newProducts[i].category = category;
            newProducts[i].floor = floor;
            newProducts[i].shopName = shopName;
            newProducts[i].mobile = mobile;
            break;
          }
        }
        setProducts(newProducts);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        addProduct,
        updateProductImage,
        updateProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
