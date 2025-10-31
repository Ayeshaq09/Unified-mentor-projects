import { useContext, useState } from "react";
import "./Modal.css";
import CategoryContext from "../../context/CategoryProvider";
import { toast } from "react-toastify";

const CategoryModal = (props) => {
  const { setIsModal, category, isUpdateModal, setCategory } =
    props;
  const { addCategory, updateCategory } = useContext(CategoryContext);
  const [categoryValues, setCategoryValues] = useState({
    id: category ? category.id : '',
    category: category ? category.category : ''});

  const onChange = (e) => {
    setCategoryValues({ ...categoryValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateModal) {
      const categoryUpdated = await updateCategory(categoryValues);
      if (categoryUpdated) {
        toast("Category is updated successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    } else {
      const categoryAdded = await addCategory(categoryValues);
      if (categoryAdded) {
        toast("Category is added successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
    setCategory(null);
    handleReset();
    setIsModal(false);
  };

  const handleReset = () => {
    setCategoryValues({
      id: "",
      category: "",
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
          {isUpdateModal ? "Update Category" : "Add Category"}
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <input
              id="category"
              type="text"
              className="input form-input"
              name="category"
              value={categoryValues.category}
              onChange={onChange}
              required
            />
            <label className="floating-label" for="category">
              Category
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

export default CategoryModal;
