var admin = require("firebase-admin");

var serviceAccountKey = require("./serviceAccountKey.json");

// firebase db connection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://expense-tracker-9dd67-default-rtdb.firebaseio.com"
});

const db = admin.database();
module.exports = db;