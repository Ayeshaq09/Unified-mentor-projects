const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const db = require("../firebaseDb");

router.get("/fetchoffers", fetchUser, async (req, res) => {
  let success = false;

  try {
    const offersRef = db.ref("Offers");
    const snapshot = await offersRef.once("value");
    let offers = [];

    snapshot.forEach((childSnapshot) => {
      let id = childSnapshot.key;
      let offer = childSnapshot.val().offer;
      let discount = childSnapshot.val().discount;
      let date = new Date(childSnapshot.val().date);

      offers.push({
        id,
        offer,
        discount,
        date,
      });
    });

    if (offers.length > 0) {
      success = true;
      res.json({
        success,
        offers,
      });
    } else {
      return res.status(400).json({ success, error: "No offers to fetch" });
    }
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

router.post(
  "/addoffer",
  fetchUser,
  [
    body("offerName", "Please enter the offer name").exists(),
    body("discount", "Please enter the offer discount").exists(),
  ],
  async (req, res) => {
    let success = false;

    const { offerName, discount } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const offersRef = db.ref("Offers");
      const offer = await offersRef
        .orderByChild("offer")
        .equalTo(offerName)
        .once("value");
      if (offer.exists()) {
        return res.status(400).json({ success, error: "Offer already exists" });
      }
      const newOffer = await offersRef.push();
      await newOffer.set({
        offer: offerName,
        discount,
        date: new Date().toISOString(),
      });

      success = true;
      return res.json({
        success,
        offer: {
          id: newOffer.key,
          offer: offerName,
          discount,
          date: new Date().toISOString(),
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updateoffer/:id",
  fetchUser,
  [
    body("offer", "Please enter offer").exists(),
    body("discount", "Please enter the offer discount").exists(),
  ],
  async (req, res) => {
    let success = false;
    const id = req.params.id;

    const { offer, discount } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const offersRef = db.ref(`Offers/${id}`);
      const snapshot = await offersRef.once("value");

      if (!snapshot) {
        return res.status(400).json({ success, error: "Offer not found" });
      }

      await offersRef.update({
        offer,
        discount,
      });

      success = true;
      return res.json({
        success,
        offer: {
          id,
          offer,
          discount
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.delete("/deleteoffer/:id", fetchUser, async (req, res) => {
  let success = false;
  const id = req.params.id;

  try {
    const offersRef = db.ref(`Offers/${id}`);
    const snapshot = await offersRef.once("value");

    if (!snapshot) {
      return res.status(400).json({ success, error: "Offer not found" });
    }

    await offersRef.remove();

    success = true;
    return res.json({
      success,
      offer: `Offer with id: ${id} is deleted`,
    });
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

module.exports = router;
