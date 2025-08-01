const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../firebaseDb");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

// api to register the user and assign the auth-token
router.post(
  "/createuser",
  [
    body("name", "Name cannot be empty").exists(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be less than 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);

    const { name, email } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: result.array() });
    }

    try {
      const usersRef = db.ref("Users");

      let user = await usersRef
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

      const currentDate = new Date();
      const EndDate = new Date(currentDate);
      EndDate.setFullYear(EndDate.getFullYear() + 1);

      const newUsersRef = await usersRef.push();
      await newUsersRef.set({
        name,
        email,
        password,
        role: "user",
        date: new Date().toISOString(),
        totalBarrels: 12,
        totalBarrelsStartDate: currentDate.toISOString(),
        totalBarrelsEndDate: EndDate.toISOString(),
      });

      const data = {
        user: {
          id: newUsersRef.key,
        },
      };

      const authToken = jsonwebtoken.sign(data, process.env.JWT_SECRET);

      success = true;
      return res.json({
        success,
        authToken,
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be less than 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    const { email, password } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: result.array() });
    }

    try {
      const usersRef = db.ref("Users");

      let user = await usersRef
        .orderByChild("email")
        .equalTo(email)
        .once("value");

      if (!user.exists()) {
        success = false;
        return res.status(400).json({
          success,
          error: "Invalid credentials",
        });
      }

      const userData = user.val();
      const userId = Object.keys(userData)[0];
      user = userData[userId];
      role = user.role;

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Invalid credentials",
        });
      }

      const data = {
        user: {
          id: userId,
        },
      };

      const authToken = jsonwebtoken.sign(data, process.env.JWT_SECRET);

      success = true;
      return res.json({
        success,
        authToken,
        role,
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

module.exports = router;
