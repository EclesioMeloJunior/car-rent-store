const admin = require("firebase-admin");
var serviceAccount = require("../.credentials/car-rent-store-firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://car-rent-store.firebaseio.com"
});

module.exports = admin;
