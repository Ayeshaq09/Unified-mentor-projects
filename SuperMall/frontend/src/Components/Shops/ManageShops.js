import { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/ShopProvider";
import "../Products/Manage.css";
import { toast } from "react-toastify";
import ShopModal from "../Modal/ShopModal";

const ManageShops = () => {
  const { shops, fetchShops, deleteShop } = useContext(ShopContext);
  const [isModal, setIsModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [shop, setShop] = useState(null);
  const [shopId, setShopId] = useState("");

  useEffect(() => {
    fetchShops();
  }, []);

  const handleUpdate = (id, shop) => {
    setIsModal(true);
    setShopId(id);
    setShop(shop);
    setIsUpdateModal(true);
  };

  const handleAdd = () => {
    setIsModal(true);
    setIsUpdateModal(false);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      const itemDeleted = await deleteShop(id);
      if (itemDeleted) {
        toast("Shop deleted succesfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
  };

  return (
    <>
      {isModal && (
        <ShopModal
          shopId={shopId}
          shop={shop}
          setShop={setShop}
          setIsModal={setIsModal}
          isUpdateModal={isUpdateModal}
        />
      )}
      <div className="manage-container">
        <h1 className="form-heading">Manage Shops</h1>
        <button className="btn add-btn" onClick={() => handleAdd()}>Add Shop</button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Mobile Number</th>
                <th>Floor</th>
                <th>Edit Product</th>
                <th>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {shops !== null &&
                shops.length > 0 &&
                shops.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.shopName}</td>
                      <td>{item.mobile}</td>
                      <td>{item.floor}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleUpdate(item.id, item)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="del-btn"
                          onClick={() => {
                            handleDelete(item.id, item);
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
};

export default ManageShops;
