const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const db = require("../firebaseDb");

router.get("/fetchfloors", fetchUser, async (req, res) => {
  let success = false;

  try {
    const floorsRef = db.ref("Floors");
    const snapshot = await floorsRef.once("value");
    let floors = [];

    snapshot.forEach((childSnapshot) => {
      let id = childSnapshot.key;
      let floor = childSnapshot.val().floor;
      let date = new Date(childSnapshot.val().date);

      floors.push({
        id,
        floor,
        date,
      });
    });

    if (floors.length > 0) {
      success = true;
      res.json({
        success,
        floors,
      });
    } else {
      return res.status(400).json({ success, error: "No floors to fetch" });
    }
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

router.post(
  "/addfloor",
  fetchUser,
  [
    body("floorName", "Please enter the floor").exists(),
  ],
  async (req, res) => {
    let success = false;

    const { floorName } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const floorsRef = db.ref("Floors");
      const floor = await floorsRef
        .orderByChild("floor")
        .equalTo(floorName)
        .once("value");
      if (floor.exists()) {
        return res.status(400).json({ success, error: "Floor already exists" });
      }
      const newFloor = await floorsRef.push();
      await newFloor.set({
        floor: floorName,
        date: new Date().toISOString(),
      });

      success = true;
      return res.json({
        success,
        floor: {
          id: newFloor.key,
          floor: floorName,
          date: new Date().toISOString(),
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updatefloor/:id",
  fetchUser,
  [
    body("floor", "Please enter floor").exists(),
  ],
  async (req, res) => {
    let success = false;
    const id = req.params.id;

    const { floor } = req.body;

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success, error: result.array() });
      }

      const floorsRef = db.ref(`Floors/${id}`);
      const snapshot = await floorsRef.once("value");

      if (!snapshot) {
        return res.status(400).json({ success, error: "Floor not found" });
      }

      await floorsRef.update({
        floor,
      });

      success = true;
      return res.json({
        success,
        floor: {
          id,
          floor
        },
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.delete("/deletefloor/:id", fetchUser, async (req, res) => {
  let success = false;
  const id = req.params.id;

  try {
    const floorsRef = db.ref(`Floors/${id}`);
    const snapshot = await floorsRef.once("value");

    if (!snapshot) {
      return res.status(400).json({ success, error: "Floor not found" });
    }

    await floorsRef.remove();

    success = true;
    return res.json({
      success,
      floor: `Floor with id: ${id} is deleted`,
    });
  } catch (error) {
    return res.status(400).json({ success, error: error.message });
  }
});

module.exports = router;
