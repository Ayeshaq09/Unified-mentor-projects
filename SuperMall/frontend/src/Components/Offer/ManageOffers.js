import { useContext, useEffect, useState } from "react";
import "../Products/Manage.css";
import { toast } from "react-toastify";
import OfferModal from "../Modal/OfferModal";
import OfferContext from "../../context/OfferProvider";

const ManageOffers = () => {
  const { offers, fetchOffers, deleteOffer } = useContext(OfferContext);
  const [isModal, setIsModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line
  }, []);

  const handleUpdate = (offer) => {
    setIsModal(true);
    setOffer(offer);
    setIsUpdateModal(true);
  };

  const handleAdd = () => {
    setIsModal(true);
    setIsUpdateModal(false);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      const itemDeleted = await deleteOffer(id);
      if (itemDeleted) {
        toast("Offer deleted succesfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
  };

  return (
    <>
      {isModal && (
        <OfferModal
          offer={offer}
          setOffer={setOffer}
          setIsModal={setIsModal}
          isUpdateModal={isUpdateModal}
        />
      )}
      <div className="manage-container">
        <h1 className="form-heading">Manage Offers</h1>
        <button className="btn add-btn" onClick={() => handleAdd()}>Add Offer</button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Offer Name</th>
                <th>Offer Discount(%)</th>
                <th>Edit Offer</th>
                <th>Delete Offer</th>
              </tr>
            </thead>
            <tbody>
              {offers !== null &&
                offers.length > 0 &&
                offers.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.offer}</td>
                      <td>{item.discount}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleUpdate(item)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="del-btn"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManageOffers
