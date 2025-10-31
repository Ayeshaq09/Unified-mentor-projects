import { useContext, useState } from "react";
import "./Modal.css";
import OfferContext from "../../context/OfferProvider";
import { toast } from "react-toastify";

const OfferModal = (props) => {
  const { setIsModal, offer, isUpdateModal, setOffer } = props;
  const { addOffer, updateOffer } = useContext(OfferContext);
  const [offerValues, setOfferValues] = useState({
    id: offer ? offer.id : "",
    offer: offer ? offer.offer : "",
    discount: offer ? offer.discount : "",
  });

  const onChange = (e) => {
    setOfferValues({ ...offerValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateModal) {
      const offerUpdated = await updateOffer(offerValues);
      if (offerUpdated) {
        toast("Offer is updated successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    } else {
      const offerAdded = await addOffer(offerValues);
      if (offerAdded) {
        toast("Offer is added successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
    setOffer(null);
    handleReset();
    setIsModal(false);
  };

  const handleReset = () => {
    setOfferValues({
      id: "",
      offer: "",
      discount: "",
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
          {isUpdateModal ? "Update Offer" : "Add Offer"}
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <input
              id="offer"
              type="text"
              className="input form-input"
              name="offer"
              value={offerValues.offer}
              onChange={onChange}
              required
            />
            <label className="floating-label" for="offer">
              Offer
            </label>
          </div>

          <div className="input-container">
            <input
              id="discount"
              type="number"
              min="1"
              max="100"
              className="input form-input"
              name="discount"
              value={offerValues.discount}
              onChange={onChange}
              required
            />
            <label className="floating-label" for="discount">
              Offer Discount
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

export default OfferModal;
