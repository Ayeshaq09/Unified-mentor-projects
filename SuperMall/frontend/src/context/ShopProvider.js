const { createContext, useState } = require("react");

// ProductContext
const ShopContext = createContext();

export default ShopContext;

// ProductProvider
export const ShopProvider = (props) => {
  const host = process.env.REACT_APP_API_HOST;

  const [shops, setShops] = useState(null);

  const fetchShops = async () => {
    const url = `${host}/shop/fetchshops`;

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
        setShops(json.shops);
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

  const addShop = async (shop) => {
    const url = `${host}/shop/addshop`;

    const {
      shopName,
      mobile,
      floor,
    } = shop;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          shopName,
          mobile,
          floor,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setShops(shops.concat(json.shop));
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

  const deleteShop = async (id) => {
    const url = `${host}/shop/deleteshop/${id}`;

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
        setShops(shops.filter((item) => item.id !== id));
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

  const updateShop = async (id, shop) => {
    const url = `${host}/shop/updateshop/${id}`;
    const {
      shopName,
      mobile,
      floor,
    } = shop;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          shopName,
          mobile,
          floor,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const newShops = JSON.parse(JSON.stringify(shops));
        for (let i = 0; i < shops.length; i++) {
          if (shops[i].id === id) {
            newShops[i].shopName = shopName;
            newShops[i].mobile = mobile;
            newShops[i].floor = floor;
            break;
          }
        }
        setShops(newShops);
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
    <ShopContext.Provider
      value={{
        shops,
        fetchShops,
        addShop,
        updateShop,
        deleteShop,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
