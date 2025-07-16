const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");

router.get("/getnotices", fetchUser, async (req, res) => {
  let success = false;

  try {
    const noticesRef = db.ref("Notices");
    const snapshot = await noticesRef.once("value");

    let notices = [];
    snapshot.forEach((childSnapshot) => {
      let key = childSnapshot.key;
      let title = childSnapshot.val().title;
      let message = childSnapshot.val().message;
      let severity = childSnapshot.val().severity;
      let startDate = new Date(childSnapshot.val().startDate);
      let endDate = childSnapshot.val().endDate;
      let duration = childSnapshot.val().duration;
      notices.push({
        key,
        title,
        message,
        severity,
        startDate,
        endDate,
        duration,
      });
    });

    if (notices.length > 0) {
      success = true;
      return res.json({
        success,
        notices,
      });
    } else {
      return res
        .status(500)
        .json({ success, error: "There are no notices to fetch" });
    }
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

router.post(
  "/addnotice",
  fetchUser,
  [
    body("title", "Title cannot be empty").exists(),
    body("message", "Message cannot be empty").exists(),
    body("severity", "Please enter the severity of the message").exists(),
    body("duration", "Please enter the duration of the message").exists(),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { title, message, severity, endDate, duration } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const noticesRef = db.ref("Notices");
      const newNotice = await noticesRef.push();
      await newNotice.set({
        title,
        message,
        severity,
        endDate,
        startDate: new Date().toISOString(),
        duration,
      });

      success = true;
      return res.json({
        success,
        notice: {
          id: newNotice.key,
          title,
          message,
          severity,
          endDate,
          startDate: new Date().toISOString(),
          duration,
        },
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updatenotice/:id",
  fetchUser,
  [
    body("title", "Title cannot be empty").exists(),
    body("message", "Message cannot be empty").exists(),
    body("severity", "Please enter the severity of the message").exists(),
    body("duration", "Please enter the duration of the message").exists(),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { title, message, severity, endDate, duration } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const noticeId = req.params.id;
      const noticesRef = db.ref(`Notices/${noticeId}`);
      const snapshot = await noticesRef.once("value");

      if (!snapshot) {
        success = false;
        return res.status(404).json({ success, error: "Notice not found" });
      }

      const updatedNotice = snapshot.val();

      await noticesRef.update({
        title,
        message,
        severity,
        endDate,
        startDate: new Date(updatedNotice.startDate).toISOString(),
        duration,
      });

      success = true;
      return res.json({
        success,
        notice: {
          id: noticesRef.key,
          title,
          message,
          severity,
          endDate,
          startDate: new Date(updatedNotice.startDate).toISOString(),
          duration,
        },
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

router.delete("/deletenotice/:id", fetchUser, async (req, res) => {
  let success = false;

  try {
    const noticeId = req.params.id;
    const noticesRef = db.ref(`Notices/${noticeId}`);
    const snapshot = await noticesRef.once("value");

    if (!snapshot) {
      success = false;
      return res.status(404).json({ success, error: "Notice not found" });
    }

    await noticesRef.remove();

    success = true;
    return res.json({
      success,
      message: `Notice id ${noticesRef.key} has been deleted`,
    });
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

module.exports = router;
