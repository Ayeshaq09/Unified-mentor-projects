// firebasedb connection
const admin = require('firebase-admin');
const serviceAccountKey = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://super-mall-846cf-default-rtdb.firebaseio.com/"
});

const db = admin.database();
module.exports = db;