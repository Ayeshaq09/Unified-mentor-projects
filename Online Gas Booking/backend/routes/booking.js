const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");

router.get("/getbookings", fetchUser, async (req, res) => {
  let success = false;

  try {
    const bookingsRef = db.ref("Bookings");
    const snapshot = await bookingsRef.once("value");

    let bookings = [];
    snapshot.forEach((childSnapshot) => {
      let key = childSnapshot.key;
      let name = childSnapshot.val().name;
      let email = childSnapshot.val().email;
      let address = childSnapshot.val().address;
      let mobile = childSnapshot.val().mobile;
      let cylinder = childSnapshot.val().cylinder;
      let status = childSnapshot.val().status;
      let user = childSnapshot.val().user;
      let date = childSnapshot.val().date;
      bookings.push({
        key,
        name,
        email,
        address,
        mobile,
        cylinder,
        status,
        user,
        date,
      });
    });

    if (bookings.length > 0) {
      success = true;
      return res.json({
        success,
        bookings,
      });
    } else {
      return res
        .status(500)
        .json({ success, error: "There are no bookings to fetch" });
    }
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

router.get("/getuserbookings", fetchUser, async (req, res) => {
  let success = false;

  try {
    const bookingsRef = db.ref("Bookings");
    const snapshot = await bookingsRef.once("value");

    let bookings = [];
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().user === req.user.id) {
        let key = childSnapshot.key;
        let name = childSnapshot.val().name;
        let email = childSnapshot.val().email;
        let address = childSnapshot.val().address;
        let mobile = childSnapshot.val().mobile;
        let cylinder = childSnapshot.val().cylinder;
        let status = childSnapshot.val().status;
        let user = childSnapshot.val().user;
        let date = childSnapshot.val().date;

        bookings.push({
          key,
          name,
          email,
          address,
          mobile,
          cylinder,
          status,
          user,
          date,
        });
      }
    });

    if (bookings.length > 0) {
      success = true;
      return res.json({
        success,
        bookings,
      });
    } else {
      success = false;
      return res
        .status(400)
        .json({ success, error: "There are no bookings to fetch" });
    }
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

router.post(
  "/addbooking",
  fetchUser,
  [
    body("name", "Name cannot be empty").exists(),
    body("address", "Address cannot be empty").exists(),
    body("email", "Please enter valid email").isEmail(),
    body("mobile", "Please enter valid mobile number").isMobilePhone(),
    body("cylinder", "Please enter valid cylinder quatity").isLength({
      min: 1,
      max: 3,
    }),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { name, address, email, mobile, cylinder } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const bookingsRef = db.ref("Bookings");
      const newBooking = await bookingsRef.push();
      await newBooking.set({
        name,
        address,
        email,
        mobile,
        cylinder,
        status: "Pending",
        user: req.user.id,
        date: new Date().toISOString(),
      });

      success = true;
      return res.json({
        success,
        booking: {
          id: newBooking.key,
          name,
          address,
          email,
          mobile,
          cylinder,
          status: "Pending",
          user: req.user.id,
          date: new Date().toISOString(),
        },
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

router.put(
  "/updatebooking/:id",
  fetchUser,
  [
    body("address", "Address cannot be empty").exists(),
    body("mobile", "Please enter valid mobile number").isMobilePhone(),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { address, mobile } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const bookingId = req.params.id;
      const bookingsRef = db.ref(`Bookings/${bookingId}`);
      const snapshot = await bookingsRef.once("value");

      if (!snapshot) {
        success = false;
        return res.status(404).json({ success, error: "Booking not found" });
      }

      const updatedBooking = snapshot.val();

      await bookingsRef.update({
        name: updatedBooking.name,
        address,
        email: updatedBooking.email,
        mobile,
        cylinder: updatedBooking.cylinder,
        status: updatedBooking.status,
        user: updatedBooking.user,
      });

      success = true;
      return res.json({
        success,
        booking: {
          id: bookingsRef.key,
          name: updatedBooking.name,
          address,
          email: updatedBooking.email,
          mobile,
          cylinder: updatedBooking.cylinder,
          status: updatedBooking.status,
          user: updatedBooking.user,
        },
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

router.put("/updatebookingstatus/:id", fetchUser, async (req, res) => {
  let success = false;

  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    const bookingsRef = db.ref(`Bookings/${bookingId}`);
    const snapshot = await bookingsRef.once("value");

    if (!snapshot) {
      success = false;
      return res.status(404).json({ success, error: "Booking not found" });
    }

    const updatedBooking = snapshot.val();

    await bookingsRef.update({
      name: updatedBooking.name,
      address: updatedBooking.address,
      email: updatedBooking.email,
      mobile: updatedBooking.mobile,
      cylinder: updatedBooking.cylinder,
      status: status,
      user: updatedBooking.user,
      date: updatedBooking.date,
    });

    success = true;
    return res.json({
      success,
      booking: {
        id: bookingsRef.key,
        name: updatedBooking.name,
        address: updatedBooking.address,
        email: updatedBooking.email,
        mobile: updatedBooking.mobile,
        cylinder: updatedBooking.cylinder,
        status: status,
        user: updatedBooking.user,
        date: updatedBooking.date,
      },
    });
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

router.delete("/deletebooking/:id", fetchUser, async (req, res) => {
  let success = false;

  try {
    const bookingId = req.params.id;
    const bookingsRef = db.ref(`Bookings/${bookingId}`);
    const snapshot = await bookingsRef.once("value");

    if (!snapshot) {
      success = false;
      return res.status(404).json({ success, error: "Booking not found" });
    }

    await bookingsRef.remove();

    success = true;
    return res.json({
      success,
      message: `Booking id ${bookingsRef.key} has been deleted`,
    });
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

module.exports = router;
