const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const middlewares = {
	authentication: require("./middlewares/authorization")
};

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(middlewares.authentication);

app.get("/hello", (req, res) => res.json({ user: req.user }));

module.exports = functions.https.onRequest(app);
