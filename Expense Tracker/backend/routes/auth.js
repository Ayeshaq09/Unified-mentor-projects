const express = require("express");
const router = express.Router();
const db = require("../firebaseDb");
const jsonwebtoken = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

// api to register user
router.post("/createuser", async (req, res) => {
  let success = false;

  const { name, email } = req.body;

  try {
    const userRef = db.ref("Users");
    let user = await userRef.orderByChild("email").equalTo(email).once("value");

    if (user.exists()) {
      success = false;
      return res.status(400).json({
        success,
        error: "User with this email address already exists",
      });
    }

    success = true;
    const newUserRef = await userRef.push();
    await newUserRef.set({
      name,
      email,
    });

    const data = {
      user: {
        id: newUserRef.key,
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
    return res.json({
      success,
      error: error.message,
    });
  }
});

// api to login user
router.post("/loginuser", async (req, res) => {
  let success = false;

  const { email } = req.body;

  try {
    const userRef = db.ref("Users");
    let user = await userRef.orderByChild("email").equalTo(email).once("value");

    if (!user.exists()) {
      success = false;
      return res.status(400).json({
        success,
        error: "Invalid credentials",
      });
    }

    success = true;
    const userData = user.val();
    const userId = Object.keys(userData)[0];

    const data = {
      user: {
        id: userId,
      },
    };

    const authToken = jsonwebtoken.sign(data, process.env.JWT_SECRET);
    return res.json({
      success,
      authToken,
    });
  } catch (error) {
    success = false;
    return res.json({
      success,
      error: error.message,
    });
  }
});

// api to get logged in user details
router.get("/getuser", fetchUser, async (req, res) => {
  let success = false;

  const id = req.user.id;

  try {
    const userRef = db.ref(`Users/${id}`);
    let user = await userRef.once("value");

    if (!user.exists()) {
      success = false;
      return res.status(400).json({
        success,
        error: "User not found",
      });
    }

    success = true;
    const userName = user.val().name;

    return res.json({
      success,
      userName,
    });
  } catch (error) {
    success = false;
    return res.json({
      success,
      error: error.message,
    });
  }
});

module.exports = router;
