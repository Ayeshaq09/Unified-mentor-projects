const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");
const nodemailer = require("nodemailer");

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
      let date = new Date(childSnapshot.val().date).toLocaleDateString("en-GB");
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
        let date = new Date(childSnapshot.val().date).toLocaleDateString('en-GB');
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
        date: new Date().toLocaleDateString('en-US'),
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
          date: new Date().toLocaleDateString('en-GB'),
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

router.put("/updatebarrel", fetchUser, async (req, res) => {
  let success = false;

  try {
    const { barrels } = req.body;

    const userId = req.user.id;
    const usersRef = db.ref(`Users/${userId}`);
    const snapshot = await usersRef.once("value");

    if (!snapshot) {
      success = false;
      return res.status(404).json({ success, error: "User not found" });
    }

    const user = snapshot.val().name;
    const totalBarrels = snapshot.val().totalBarrels;
    const currentDate = new Date();
    const startDate = new Date(snapshot.val().totalBarrelsStartDate);
    const endDate = new Date(snapshot.val().totalBarrelsEndDate);

    let remainingBarrels = 0;

    if (currentDate < startDate || currentDate > endDate) {
      return res
        .status(400)
        .json({ success: false, error: "Barrel booking period has expired! Please contact Admin" });
    }

    if (parseInt(totalBarrels) < parseInt(barrels)) {
      return res
        .status(400)
        .json({ success: false, error: "Not enough Barrels to book!" });
    }

    remainingBarrels = parseInt(totalBarrels) - parseInt(barrels);
    await usersRef.update({
      totalBarrels: remainingBarrels,
    });

    success = true;
    return res.json({
      success,
      booking: {
        name: user,
        totalBarrels: remainingBarrels,
      },
    });
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
});

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

    const userId = snapshot.val().user;
    const usersRef = db.ref(`Users/${userId}`);
    const UserSnapshot = await usersRef.once("value");

    if (UserSnapshot && status==='Cancelled') {
      totalBarrels = UserSnapshot.val().totalBarrels;
      cancelledBarrels = snapshot.val().cylinder;
      totalBarrels = parseInt(totalBarrels) + parseInt(cancelledBarrels);
      usersRef.update({
        totalBarrels: totalBarrels
      });
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

    const userId = snapshot.val().user;
    const usersRef = db.ref(`Users/${userId}`);
    const userSnapshot = await usersRef.once("value");

    if (userSnapshot){
      const totalBarrels = userSnapshot.val().totalBarrels;
      const barrelsToAdd = snapshot.val().cylinder;
      const barrels = parseInt(totalBarrels) + parseInt(barrelsToAdd);
      await usersRef.update({
        totalBarrels: barrels
      })
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

router.post(
  "/sendemail",
  fetchUser,
  [
    body("fromName", "Sender name cannot be empty").exists(),
    body("fromEmail", "Sender email cannot be empty").exists(),
    body("toEmail", "User email cannot be empty").exists(),
    body("toName", "User name cannot be empty").exists(),
    body("subject", "Subject cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { toName, toEmail, bookingStatus, fromName, fromEmail, subject } =
        req.body;

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: fromEmail || process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: fromEmail || process.env.EMAIL_USER,
        to: toEmail,
        subject: subject,
        text: `Hello ${toName},\nYour booking has been ${bookingStatus}.\n\n\n\n\nRegards, ${fromName}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          success = false;
          return res.status(400).json({ success, error });
        }
        success = true;
        res.json({ success, "mailSent: ": info.response });
      });
    } catch (error) {
      success = false;
      return res.status(500).json({ success, error: error.message });
    }
  }
);

module.exports = router;
