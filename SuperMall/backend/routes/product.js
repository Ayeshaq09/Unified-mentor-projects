const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const db = require("../firebaseDb");

router.get("/fetchproducts", fetchUser, async (req, res) => {
  let success = false;

  try {
    const productsRef = db.ref("Products");
    const snapshot = await productsRef.once("value");
    let products = [];

    snapshot.forEach((childSnapshot) => {
      let id = childSnapshot.key;
      let productName = childSnapshot.val().productName;
      let description = childSnapshot.val().description;
      let price = childSnapshot.val().price;
      let offer = childSnapshot.val().offer;
      let offerPrice = childSnapshot.val().offerPrice;
      let category = childSnapshot.val().category;
      let floor = childSnapshot.val().floor;
      let shopName = childSnapshot.val().shopName;
      let mobile = childSnapshot.val().mobile;
      let productImage = childSnapshot.val().productImage;
      let date = new Date(childSnapshot.val().date);

      products.push({
        id,
        productName,
        description,
        price,
        offer,
        offerPrice,
        category,
        floor,
        shopName,
        mobile,
        productImage,
        date,
      });
    });

    if (products.length > 0) {
      success = true;
      res.json({
        success,
        products,
      });
    } else {
      return res.status(400).json({ success, error: "No products to fetch" });
    }
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

router.post(
  "/addproduct",
  fetchUser,
  [
    body("productName", "Please enter product name").exists(),
    body("description", "Please enter product description").exists(),
    body("price", "Please enter price").exists(),
    body("offer", "Please enter the offer").exists(),
    body("offerPrice", "Please enter offer price").exists(),
    body("category", "Please enter product category").exists(),
    body("floor", "Please enter floor").exists(),
    body("shopName", "Please enter shop name").exists(),
    body("mobile", "Please enter mobile number").exists(),
  ],
  async (req, res) => {
    let success = false;

    const {
      productName,
      description,
      price,
      offer,
      offerPrice,
      category,
      floor,
      shopName,
      mobile,
      productImage,
    } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const productsRef = db.ref("Products");
      const newProduct = await productsRef.push();
      await newProduct.set({
        productName,
        description,
        price,
        offer,
        offerPrice,
        category,
        floor,
        shopName,
        mobile,
        productImage,
        date: new Date().toISOString(),
      });

      success = true;
      return res.json({
        success,
        product: {
          id: newProduct.key,
          productName,
          description,
          price,
          offer,
          offerPrice,
          category,
          floor,
          shopName,
          mobile,
          productImage,
          date: new Date().toISOString(),
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updateproductimage/:id",
  fetchUser,
  [body("productImage", "Please upload the image").notEmpty()],
  async (req, res) => {
    let success = false;

    const { productImage } = req.body;

    const id = req.params.id;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array()[0].msg });
      }

      const productsRef = db.ref(`Products/${id}`);
      const snapshot = await productsRef.once("value");

      if (!snapshot.exists()) {
        return res.status(404).json({ success, error: "Product not found" });
      }

      await productsRef.update({
        productImage,
      });

      success = true;
      return res.json({
        success,
        product: {
          id,
          productImage,
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updateproduct/:id",
  fetchUser,
  [
    body("productName", "Please enter product name").exists(),
    body("description", "Please enter product description").exists(),
    body("price", "Please enter price").exists(),
    body("offer", "Please enter the offer").exists(),
    body("offerPrice", "Please enter offer price").exists(),
    body("category", "Please enter product category").exists(),
    body("floor", "Please enter floor").exists(),
    body("shopName", "Please enter shop name").exists(),
    body("mobile", "Please enter mobile number").exists(),
  ],
  async (req, res) => {
    let success = false;
    const id = req.params.id;

    const {
      productName,
      description,
      price,
      offer,
      offerPrice,
      category,
      floor,
      shopName,
      mobile,
    } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const productsRef = db.ref(`Products/${id}`);
      const snapshot = await productsRef.once("value");

      if (!snapshot) {
        return res.status(400).json({ success, error: "Product not found" });
      }

      await productsRef.update({
        productName,
        description,
        price,
        offer,
        offerPrice,
        category,
        floor,
        shopName,
        mobile,
      });

      success = true;
      return res.json({
        success,
        product: {
          id,
          productName,
          description,
          price,
          offer,
          offerPrice,
          category,
          floor,
          shopName,
          mobile,
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.delete(
  "/deleteproduct/:id",
  fetchUser,
  async (req, res) => {
    let success = false;
    const id = req.params.id;

    try {
      const productsRef = db.ref(`Products/${id}`);
      const snapshot = await productsRef.once("value");

      if (!snapshot) {
        return res.status(400).json({ success, error: "Product not found" });
      }

      await productsRef.remove();

      success = true;
      return res.json({
        success,
        product: `Product with id: ${id} is deleted`
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

module.exports = router;
