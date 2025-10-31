import { useContext, useEffect, useState } from "react";
import FloorContext from "../../context/FloorProvider";
import "../Products/Manage.css";
import { toast } from "react-toastify";
import FloorModal from "../Modal/FloorModal";

const ManageFloor = () => {
 const { floors, fetchFloors, deleteFloor } = useContext(FloorContext);
  const [isModal, setIsModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [floor, setFloor] = useState(null);

  useEffect(() => {
    fetchFloors();
    // eslint-disable-next-line
  }, []);

  const handleUpdate = (floorItem) => {
    setIsModal(true);
    setFloor(floorItem);
    setIsUpdateModal(true);
  };

  const handleAdd = () => {
    setIsModal(true);
    setIsUpdateModal(false);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this floor?")) {
      const itemDeleted = await deleteFloor(id);
      if (itemDeleted) {
        toast("Floor deleted succesfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
  };

  return (
    <>
      {isModal && (
        <FloorModal
          floor={floor}
          setFloor={setFloor}
          setIsModal={setIsModal}
          isUpdateModal={isUpdateModal}
        />
      )}
      <div className="manage-container">
        <h1 className="form-heading">Manage floors</h1>
        <button className="btn add-btn" onClick={() => handleAdd()}>Add floor</button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Floor Name</th>
                <th>Edit Product</th>
                <th>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {floors !== null &&
                floors.length > 0 &&
                floors.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.floor}</td>
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

export default ManageFloor
