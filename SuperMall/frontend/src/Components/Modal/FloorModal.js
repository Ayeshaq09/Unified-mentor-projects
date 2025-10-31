import { useContext, useState } from "react";
import "./Modal.css";
import floorContext from "../../context/FloorProvider";
import { toast } from "react-toastify";

const FloorModal = (props) => {
  const { setIsModal, floor, isUpdateModal, setFloor } =
    props;
  const { addFloor, updateFloor } = useContext(floorContext);
  const [floorValues, setFloorValues] = useState({
    id: floor ? floor.id : '',
    floor: floor ? floor.floor : ''});

  const onChange = (e) => {
    setFloorValues({ ...floorValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateModal) {
      const floorUpdated = await updateFloor(floorValues);
      if (floorUpdated) {
        toast("floor is updated successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    } else {
      const floorAdded = await addFloor(floorValues.floor);
      if (floorAdded) {
        toast("floor is added successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
    setFloor(null);
    handleReset();
    setIsModal(false);
  };

  const handleReset = () => {
    setFloorValues({
      id: "",
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
          {isUpdateModal ? "Update floor" : "Add floor"}
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <input
              id="floor"
              type="number"
              className="input form-input"
              name="floor"
              value={floorValues.floor}
              onChange={onChange}
              min={1}
              max={5}
              required
            />
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

export default FloorModal;
