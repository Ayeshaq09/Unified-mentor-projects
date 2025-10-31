import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductProvider";
import "./Manage.css";
import ProductModal from "../Modal/ProductModal";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const productProvider = useContext(ProductContext);
  const { products, fetchProducts, deleteProduct } = productProvider;
  const [isModal, setIsModal] = useState(false);
  const [isUpdateImageModal, setIsUpdateImageModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpload = (id, product) => {
    setIsModal(true);
    setProductId(id);
    setProduct(product);
    setIsUpdateImageModal(true);
  };

  const handleProductUpdate = (id, product) => {
    setIsModal(true);
    setProductId(id);
    setProduct(product);
    setIsUpdateImageModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const itemDeleted = await deleteProduct(id);
      if (itemDeleted) {
        toast("Product deleted succesfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }
  };

  return (
    <>
      {isModal && (
        <ProductModal
          productId={productId}
          isUpdateImageModal={isUpdateImageModal}
          product={product}
          setIsModal={setIsModal}
        />
      )}
      <div className="manage-container">
        <h1 className="form-heading">Manage Products</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Offer</th>
                <th>Offer price</th>
                <th>Category</th>
                <th>Floor</th>
                <th>Shop</th>
                <th>Mobile</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products !== null &&
                products.length > 0 &&
                products.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>
                        <button
                          className="upload-btn"
                          onClick={() => handleUpload(item.id)}
                        >
                          Upload
                        </button>
                      </td>
                      <td className="product-desc-col">{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.offer}</td>
                      <td>{item.offerPrice}</td>
                      <td>{item.category}</td>
                      <td>{item.floor}</td>
                      <td>{item.shopName}</td>
                      <td>{item.mobile}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleProductUpdate(item.id, item)}>Edit</button>
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

export default ManageProducts;
