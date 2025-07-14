const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");

router.get("/getsettings", fetchUser, async (req, res) => {
  let success = false;

  try {
    const settingsRef = db.ref(`Settings`);
    const snapshot = await settingsRef.once("value");
    let settings = [];

    if (snapshot.exists()) {
      let name = snapshot.val().name;
      let email = snapshot.val().email;
      let subject = snapshot.val().subject;
      let cylinder = snapshot.val().cylinder;
      settings.push({ name, email, subject, cylinder });
    }

    if (settings.length > 0) {
      success = true;
      return res.json({
        success,
        settings,
      });
    } else {
      return res
        .status(500)
        .json({ success, error: "There are no users to fetch" });
    }
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

router.put(
  "/updatesettings",
  fetchUser,
  [
    body("name", "Name cannot be empty").exists(),
    body("subject", "Subject cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { name, email, subject, cylinder } = req.body;
      const settingsRef = db.ref(`Settings`);

      settingsRef.update({ name, email, subject, cylinder });
      success = true;
      res.json({
        success,
        settings: {
          name,
          email,
          subject,
          cylinder,
        },
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

module.exports = router;
