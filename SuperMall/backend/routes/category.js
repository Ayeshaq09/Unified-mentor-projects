const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const db = require("../firebaseDb");

router.get("/fetchcategories", fetchUser, async (req, res) => {
  let success = false;

  try {
    const categoriesRef = db.ref("Categories");
    const snapshot = await categoriesRef.once("value");
    let categories = [];

    snapshot.forEach((childSnapshot) => {
      let id = childSnapshot.key;
      let category = childSnapshot.val().category;
      let date = new Date(childSnapshot.val().date);

      categories.push({
        id,
        category,
        date,
      });
    });

    if (categories.length > 0) {
      success = true;
      res.json({
        success,
        categories,
      });
    } else {
      return res.status(400).json({ success, error: "No categories to fetch" });
    }
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

router.post(
  "/addcategory",
  fetchUser,
  [body("categoryName", "Please enter category name").exists()],
  async (req, res) => {
    let success = false;

    const { categoryName } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const categoriesRef = db.ref("Categories");
      const category = await categoriesRef
        .orderByChild("category")
        .equalTo(categoryName)
        .once("value");
      if (category.exists()) {
        return res
          .status(400)
          .json({ success, error: "Category already exists" });
      }
      const newCategory = await categoriesRef.push();
      await newCategory.set({
        category: categoryName,
        date: new Date().toISOString(),
      });

      success = true;
      return res.json({
        success,
        category: {
          id: newCategory.key,
          category: categoryName,
          date: new Date().toISOString(),
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updatecategory/:id",
  fetchUser,
  [body("category", "Please enter category").exists()],
  async (req, res) => {
    let success = false;
    const id = req.params.id;

    const { category } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const categoriesRef = db.ref(`Categories/${id}`);
      const snapshot = await categoriesRef.once("value");

      if (!snapshot) {
        return res.status(400).json({ success, error: "Category not found" });
      }

      await categoriesRef.update({
        category,
      });

      success = true;
      return res.json({
        success,
        category: {
          id,
          category,
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.delete("/deletecategory/:id", fetchUser, async (req, res) => {
  let success = false;
  const id = req.params.id;

  try {
    const categoriesRef = db.ref(`Categories/${id}`);
    const categorySnapshot = await categoriesRef.once("value");

    if (!categorySnapshot) {
      return res.status(400).json({ success, error: "Category not found" });
    }

    const { category } = categorySnapshot.val();

    const productsRef = db.ref("Products");
    const productSnapshot = await productsRef
      .orderByChild("category")
      .equalTo(category)
      .once("value");

    if (productSnapshot.exists()) {
      const products = productSnapshot.val();
      for (let productId in products) {
        await db.ref(`Products/${productId}`).remove();
      }
    }

    await categoriesRef.remove();

    success = true;
    return res.json({
      success,
      category: `Category with id: ${id} is deleted`,
    });
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

module.exports = router;
