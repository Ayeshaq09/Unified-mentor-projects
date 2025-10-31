const { createContext, useState } = require("react");

// ProductContext
const OfferContext = createContext();

export default OfferContext;

// ProductProvider
export const OfferProvider = (props) => {
  const host = process.env.REACT_APP_API_HOST;

  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    const url = `${host}/offer/fetchoffers`;
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
        setOffers(json.offers);
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

  const addOffer = async (offer) => {
    const url = `${host}/offer/addoffer`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          offerName: offer.offer,
          discount: offer.discount,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setOffers(offers.concat(json.offer));
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

  const deleteOffer = async (id) => {
    const url = `${host}/offer/deleteoffer/${id}`;

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
        setOffers(offers.filter((item) => item.id !== id));
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

  const updateOffer = async (offerItem) => {
    const { id, offer, discount } = offerItem;
    const url = `${host}/offer/updateoffer/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          offer, 
          discount,
        }),
      });

      const json = await response.json();
      if (json.success) {
        const newOffers = JSON.parse(JSON.stringify(offers));
        for (let i = 0; i < offers.length; i++) {
          if (offers[i].id === id) {
            newOffers[i].offer = offer;
            newOffers[i].discount = discount;
            break;
          }
        }
        setOffers(newOffers);
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
    <OfferContext.Provider
      value={{
        offers,
        fetchOffers,
        addOffer,
        updateOffer,
        deleteOffer,
      }}
    >
      {props.children}
    </OfferContext.Provider>
  );
};
