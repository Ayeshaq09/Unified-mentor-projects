const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");
const bcrypt = require("bcryptjs");

router.get("/getusers", fetchUser, async (req, res) => {
  let success = false;

  try {
    const usersRef = db.ref("Users");
    const snapshot = await usersRef.once("value");

    let users = [];
    snapshot.forEach((childSnapshot) => {
      let key = childSnapshot.key;
      let name = childSnapshot.val().name;
      let email = childSnapshot.val().email;
      let role = childSnapshot.val().role;
      let date = new Date(childSnapshot.val().date).toLocaleDateString();
      let totalBarrels = childSnapshot.val().totalBarrels;
      let totalBarrelsStartDate = childSnapshot.val().totalBarrelsStartDate;
      let totalBarrelsEndDate = childSnapshot.val().totalBarrelsEndDate;
      if (role === "user")
        users.push({
          key,
          name,
          email,
          role,
          date,
          totalBarrels,
          totalBarrelsStartDate,
          totalBarrelsEndDate,
        });
    });

    if (users.length > 0) {
      success = true;
      return res.json({
        success,
        users,
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

router.get("/getuser", fetchUser, async (req, res) => {
  let success = false;

  try {
    const userId = req.user.id;

    const usersRef = db.ref(`Users/${userId}`);
    const snapshot = await usersRef.once("value");

    if (!snapshot.exists()) {
      success = false;
      return res.status(404).json({ success, error: "User not found" });
    }

    const user = snapshot.val();
    if (user) {
      success = true;
      return res.json({
        success,
        userId,
        user,
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

router.post(
  "/adduser",
  fetchUser,
  [
    body("name", "Name has to be atleast 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password has to be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { name, email } = req.body;

      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(req.body.password, salt);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        success = false;
        return res.status(400).json({ success, error: result.array() });
      }

      const usersRef = db.ref(`Users`);

      const user = await usersRef
        .orderByChild("email")
        .equalTo(email)
        .once("value");

      if (user.exists()) {
        success = false;
        return res.status(400).json({
          success,
          error: "User with this email address already exists",
        });
      }

      let currentDate = new Date();
      let EndDate = new Date(currentDate);
      EndDate.setFullYear(EndDate.getFullYear() + 1);
      const newUserRef = await usersRef.push();
      await newUserRef.set({
        name,
        email,
        password,
        role: "user",
        date: new Date().toISOString(),
        totalBarrels: 12,
        totalBarrelsStartDate: currentDate.toISOString(),
        totalBarrelsEndDate: EndDate.toISOString(),
      });

      success = true;
      return res.json({
        success,
        user: {
          id: newUserRef.key,
          name,
          email,
          role: "user",
          date: new Date().toISOString(),
          totalBarrels: 12,
          totalBarrelsStartDate: currentDate.toISOString(),
          totalBarrelsEndDate: EndDate.toISOString(),
        },
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updateuser/:id",
  fetchUser,
  [
    body("name", "Name has to be atleast 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;

    try {
      const userId = req.params.id;

      const { name, email } = req.body;

      const usersRef = db.ref(`Users/${userId}`);
      const snapshot = await usersRef.once("value");

      if (!snapshot.exists()) {
        success = false;
        return res.status(404).json({ success, error: "User not found" });
      }

      await usersRef.update({ name, email });
      success = true;
      return res.json({
        success,
        user: {
          id: userId,
          name,
          email,
        },
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

router.delete("/deleteuser/:id", fetchUser, async (req, res) => {
  let success = false;

  try {
    const userId = req.params.id;

    const usersRef = db.ref(`Users/${userId}`);
    const snapshot = await usersRef.once("value");

    if (!snapshot.exists()) {
      success = false;
      return res.status(404).json({ success, error: "User not found" });
    }

    const bookingsRef = db.ref(`Bookings`);
    const bookingSnapshot = await bookingsRef.once("value");

    bookingSnapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().user === userId) {
        bookingId = childSnapshot.key;
        let childRef = db.ref(`Bookings/${bookingId}`);
        childRef.remove();
      }
    });

    await usersRef.remove();
    success = true;
    return res.json({
      success,
      message: `User id: ${userId} deleted`,
    });
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

module.exports = router;
