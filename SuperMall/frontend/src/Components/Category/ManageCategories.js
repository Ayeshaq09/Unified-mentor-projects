import { useContext, useEffect, useState } from "react";
import CategoryContext from "../../context/CategoryProvider";
import "../Products/Manage.css";
import { toast } from "react-toastify";
import CategoryModal from "../Modal/CategoryModal";

const ManageCategories = () => {
  const { categories, fetchCategories, deleteCategory } = useContext(CategoryContext);
  const [isModal, setIsModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = (category) => {
    setIsModal(true);
    setCategory(category);
    setIsUpdateModal(true);
  };

  const handleAdd = () => {
    setIsModal(true);
    setIsUpdateModal(false);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const itemDeleted = await deleteCategory(id);
      if (itemDeleted) {
        toast("category deleted succesfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
  };

  return (
    <>
      {isModal && (
        <CategoryModal
          category={category}
          setCategory={setCategory}
          setIsModal={setIsModal}
          isUpdateModal={isUpdateModal}
        />
      )}
      <div className="manage-container">
        <h1 className="form-heading">Manage Categories</h1>
        <button className="btn add-btn" onClick={() => handleAdd()}>Add Category</button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Edit Product</th>
                <th>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {categories !== null &&
                categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.category}</td>
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

export default ManageCategories
