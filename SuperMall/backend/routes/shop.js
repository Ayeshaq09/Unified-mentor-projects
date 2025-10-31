const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const db = require("../firebaseDb");

router.get("/fetchshops", fetchUser, async (req, res) => {
  let success = false;

  try {
    const shopsRef = db.ref("Shops");
    const snapshot = await shopsRef.once("value");
    let shops = [];

    snapshot.forEach((childSnapshot) => {
      let id = childSnapshot.key;
      let shopName = childSnapshot.val().shopName;
      let mobile = childSnapshot.val().mobile;
      let floor = childSnapshot.val().floor;
      let date = new Date(childSnapshot.val().date);

      shops.push({
        id,
        shopName,
        mobile,
        floor,
        date,
      });
    });

    if (shops.length > 0) {
      success = true;
      res.json({
        success,
        shops,
      });
    } else {
      return res.status(400).json({ success, error: "No shops to fetch" });
    }
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

router.post(
  "/addshop",
  fetchUser,
  [
    body("shopName", "Please enter shop name").exists(),
    body("mobile", "Please enter mobile number").exists(),
    body("floor", "Please enter floor").exists(),
  ],
  async (req, res) => {
    let success = false;

    const { shopName, mobile, floor } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const shopsRef = db.ref("Shops");
      const shop = await shopsRef
        .orderByChild("shopName")
        .equalTo(shopName)
        .once("value");
      if (shop.exists()) {
        return res.status(400).json({ success, error: "Shop already exists" });
      }
      const newShop = await shopsRef.push();
      await newShop.set({
        shopName,
        mobile,
        floor,
        date: new Date().toISOString(),
      });

      success = true;
      return res.json({
        success,
        shop: {
          id: newShop.key,
          shopName,
          mobile,
          floor,
          date: new Date().toISOString(),
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updateshop/:id",
  fetchUser,
  [
    body("shopName", "Please enter shop name").exists(),
    body("mobile", "Please enter mobile number").exists(),
    body("floor", "Please enter floor").exists(),
  ],
  async (req, res) => {
    let success = false;
    const id = req.params.id;

    const { shopName, mobile, floor } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const shopsRef = db.ref(`Shops/${id}`);
      const snapshot = await shopsRef.once("value");

      if (!snapshot) {
        return res.status(400).json({ success, error: "Shop not found" });
      }

      await shopsRef.update({
        shopName,
        mobile,
        floor,
      });

      success = true;
      return res.json({
        success,
        shop: {
          id,
          shopName,
          mobile,
          floor,
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.delete("/deleteshop/:id", fetchUser, async (req, res) => {
  let success = false;
  const id = req.params.id;

  try {
    const shopsRef = db.ref(`Shops/${id}`);
    const snapshot = await shopsRef.once("value");

    if (!snapshot) {
      return res.status(400).json({ success, error: "Shop not found" });
    }

    await shopsRef.remove();

    success = true;
    return res.json({
      success,
      shop: `Shop with id: ${id} is deleted`,
    });
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

module.exports = router;
