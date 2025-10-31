const express = require("express");
const router = express.Router();
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter the correct password").exists(),
  ],
  async (req, res) => {
    let success = false;

    const { email, password } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, error: result.array() });
    }

    try {
      const usersRef = db.ref("Users");
      let user = await usersRef
        .orderByChild("email")
        .equalTo(email)
        .once("value");
      if (!user.exists()) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const userData = user.val();
      const userId = Object.keys(userData)[0];
      user = userData[userId];
      const role = user.role;
      const userPassword = user.password;

      if (password !== userPassword) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const data = {
        user: {
          id: userId,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      success = true;
      return res.json({
        success,
        authToken,
        role,
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

router.post(
  "/register",
  [
    body("name", "Name cannot be empty").exists(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;

    const { name, email, password } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, error: result.array() });
    }

    try {
      const usersRef = db.ref("Users");
      let user = await usersRef
        .orderByChild("email")
        .equalTo(email)
        .once("value");
      if (user.exists()) {
        return res.status(400).json({ success, error: "Email exists" });
      }

      const newUserRef = await usersRef.push();
      await newUserRef.set({
        name,
        email,
        password,
        role: "user",
      });

      const data = {
        user:{
          id: newUserRef.key
        }
      }

      const authToken = jwt.sign(data, process.env.JWT_SECRET);

      success = true;
      return res.json({
        success,
        authToken,
        role: "user",
      });
    } catch (error) {
      return res.status(400).json({ success, error: error.message });
    }
  }
);

module.exports = router;
