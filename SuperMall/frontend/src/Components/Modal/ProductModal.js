import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductProvider";
import "./Modal.css";
import { toast } from "react-toastify";
import ShopContext from "../../context/ShopProvider";
import CategoryContext from "../../context/CategoryProvider";
import OfferContext from "../../context/OfferProvider";

const ProductModal = (props) => {
  const { productId, isUpdateImageModal, setIsModal, product } = props;
  const [file, setFile] = useState(null);
  const { updateProductImage, updateProduct } =
    useContext(ProductContext);
  const { shops, fetchShops } = useContext(ShopContext);
  const { categories, fetchCategories } = useContext(CategoryContext);
  const { offers, fetchOffers } = useContext(OfferContext);

  const [productValues, setProductValues] = useState({
    productName: product ? product.productName : "",
    description: product ? product.description : "",
    price: product ? product.price : "",
    offer: product ? product.offer : "",
    offerPrice: product ? product.offerPrice : "",
    category: product ? product.category : "",
    floor: product ? product.floor : "",
    shopName: product ? product.shopName : "",
    mobile: product ? product.mobile : "",
    productImage: null,
  });

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large! Max size is 5MB.");
      return;
    }
    const imageUrl = await imageToBase64(file);
    setFile(imageUrl);
  };

  useEffect(() => {
    fetchShops();
    fetchCategories();
    fetchOffers();
    // eslint-disable-next-line
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateImageModal) {
      const updatedImage = await updateProductImage(productId, file);
      if (updatedImage) {
        toast("Image updated successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    } else {
      const productUpdated = await updateProduct(productId, productValues);
      if (productUpdated) {
        toast("Product is updated successfully");
      } else {
        toast("Something went wrong, please try again");
      }
    }

    handleReset();
    setIsModal(false);
  };

  const handleClick = () => {
    setIsModal(false);
  };

  const onChange = (e) => {
    let mobile = 0;
    let floor = 0;
    setProductValues({ ...productValues, [e.target.name]: e.target.value });

    if (e.target.name === "shopName") {
      for (let i = 0; i < shops.length; i++) {
        if (shops[i].shopName === e.target.value) {
          mobile = shops[i].mobile;
          floor = shops[i].floor;
          break;
        }
      }
      setProductValues({
        ...productValues,
        mobile,
        floor,
        shopName: e.target.value,
      });
    }
  };

  const onPriceBlur = (e) => {
    let discount = 0;
    if (e.target.name === "price") {
      if (productValues.offer !== "") {
        for (let i = 0; i < offers.length; i++) {
          if (offers[i].offer === productValues.offer) {
            discount = offers[i].discount;
            break;
          }
        }
        const discountPrice =
          parseInt(productValues.price) -
          (parseInt(productValues.price) / 100) * parseInt(discount);
        setProductValues({
          ...productValues,
          offerPrice: discountPrice,
        });
      }
    }
  };

  const onOfferBlur = (e) => {
    let discount = 0;
    if (productValues.price !== "") {
      for (let i = 0; i < offers.length; i++) {
        if (offers[i].offer === productValues.offer) {
          discount = offers[i].discount;
          break;
        }
      }
      const discountPrice =
        parseInt(productValues.price) -
        (parseInt(productValues.price) / 100) * parseInt(discount);
      setProductValues({
        ...productValues,
        offerPrice: discountPrice,
      });
    }
  };

  const handleReset = () => {
    setProductValues({
      productName: "",
      description: "",
      price: "",
      offer: "",
      offerPrice: "",
      category: "",
      floor: "",
      shopName: "",
      mobile: "",
      productImage: null,
    });
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <span className="cancel">
          <i className="bi bi-x-lg cancel-icon" onClick={handleClick}></i>
        </span>
        <h1 className="form-heading">
          {isUpdateImageModal ? "Upload Product Image" : "Update Product"}
        </h1>
        <form onSubmit={handleSubmit}>
          {isUpdateImageModal ? (
            <input
              type="file"
              accept="image/*"
              name="productImg"
              className="input modal-file-input"
              onChange={handleImageUpload}
            />
          ) : (
            <>
              <div className="input-container">
                <input
                  id="productName"
                  type="text"
                  className="input form-input"
                  name="productName"
                  value={productValues.productName}
                  onChange={onChange}
                  required
                />
                <label className="floating-label" for="productName">
                  Product Name
                </label>
              </div>

              <div className="input-container">
                <input
                  id="description"
                  type="text"
                  className="input form-input"
                  name="description"
                  value={productValues.description}
                  onChange={onChange}
                  required
                />
                <label className="floating-label" for="description">
                  Description
                </label>
              </div>

              <div className="input-container">
                <input
                  id="price"
                  type="number"
                  className="input form-input"
                  name="price"
                  value={productValues.price}
                  onChange={onChange}
                  onBlur={onPriceBlur}
                  required
                />
                <label className="floating-label" for="price">
                  Price
                </label>
              </div>

              <div className="input-container">
                <select
                  id="offer"
                  className="input form-input"
                  name="offer"
                  value={productValues.offer}
                  onChange={onChange}
                  onBlur={onOfferBlur}
                  required
                >
                  <option selected hidden value=""></option>
                  {offers !== null &&
                    offers.length > 0 &&
                    offers.map((item) => {
                      return <option>{item.offer}</option>;
                    })}
                </select>
                <label className="floating-label" for="offer">
                  Offer
                </label>
              </div>

              <div className="input-container">
                <input
                  id="offerPrice"
                  type="number"
                  className="input form-input"
                  name="offerPrice"
                  value={productValues.offerPrice}
                  onChange={onChange}
                  readOnly
                />
                <label className="floating-label" for="offerPrice">
                  Offer Price
                </label>
              </div>

              <div className="input-container">
                <select
                  id="category"
                  className="input form-input"
                  name="category"
                  value={productValues.category}
                  onChange={onChange}
                  required
                >
                  <option selected hidden value=""></option>
                  {categories !== null &&
                    categories.length > 0 &&
                    categories.map((item) => {
                      return <option>{item.category}</option>;
                    })}
                </select>
                <label className="floating-label" for="category">
                  Category
                </label>
              </div>

              <div className="input-container">
                <select
                  id="shopName"
                  className="input form-input"
                  name="shopName"
                  value={productValues.shopName}
                  onChange={onChange}
                  required
                >
                  <option selected hidden value=""></option>
                  {shops !== null &&
                    shops.length > 0 &&
                    shops.map((item) => {
                      return <option>{item.shopName}</option>;
                    })}
                </select>
                <label className="floating-label" for="shopName">
                  Shop Name
                </label>
              </div>
            </>
          )}
          <button className="btn">
            {isUpdateImageModal ? "Upload" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
