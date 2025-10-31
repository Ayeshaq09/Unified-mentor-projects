import { useContext, useEffect, useState } from "react";
import "./Modal.css";
import ShopContext from "../../context/ShopProvider";
import { toast } from "react-toastify";
import FloorContext from "../../context/FloorProvider";

const ShopModal = (props) => {
  const { setIsModal, shopId, shop, isUpdateModal, setShop } = props;
  const { addShop, updateShop } = useContext(ShopContext);
  const { floors, fetchFloors } = useContext(FloorContext);
  const [shopValues, setShopValues] = useState({
    shopName: shop ? shop.shopName : "",
    mobile: shop ? shop.mobile : "",
    floor: shop ? shop.floor : "",
  });

  useEffect(() => {
    fetchFloors();
  })

  const onChange = (e) => {
    setShopValues({ ...shopValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateModal) {
      const shopUpdated = await updateShop(shopId, shopValues);
      if (shopUpdated) {
        toast("Shop is updated successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    } else {
      const shopAdded = await addShop(shopValues);
      if (shopAdded) {
        toast("Shop is added successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
    setShop(null);
    handleReset();
    setIsModal(false);
  };

  const handleReset = () => {
    setShopValues({
      shopName: "",
      mobile: "",
      floor: "",
    });
  };

  const handleClick = () => {
    setIsModal(false);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="cancel">
          <i className="bi bi-x-lg cancel-icon" onClick={handleClick}></i>
        </span>
        <h1 className="form-heading">
          {isUpdateModal ? "Update Shop" : "Add Shop"}
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <input
              id="shopName"
              type="text"
              className="input form-input"
              name="shopName"
              value={shopValues.shopName}
              onChange={onChange}
              required
            />
            <label className="floating-label" for="shopName">
              Shop Name
            </label>
          </div>

          <div className="input-container">
            <input
              id="mobile"
              type="tel"
              className="input form-input"
              name="mobile"
              value={shopValues.mobile}
              onChange={onChange}
              required
            />
            <label className="floating-label" for="mobile">
              Mobile Number
            </label>
          </div>

          <div className="input-container">
          <select
            name="floor"
            className="input form-input"
            id="floor"
            value={shopValues.floor}
            onChange={onChange}
            required
          >
            <option selected hidden value=""></option>
             {(floors !==null && floors.length > 0) && floors.map((item) => {
              return <option>{item.floor}</option>
            })}
          </select>
          <label className="floating-label" for="floor">
            Floor
          </label>
        </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn form-btn"
              onClick={handleReset}
            >
              Reset
            </button>
            <button type="submit" className="btn form-btn">
              {isUpdateModal ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopModal;
