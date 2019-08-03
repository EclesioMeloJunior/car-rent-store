const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const middleware = {
	authentication: require("./middlewares/authorization")
};

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(middleware.authentication);

app.get("/message", (req, res) => res.json({ message: "Eclésio Melo Júnior" }));

exports.server = functions.https.onRequest(app);
