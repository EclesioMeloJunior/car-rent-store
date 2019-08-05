const firebaseAdmin = require("../admin");

async function authorization(req, res, next) {
	const isNotAuthorized =
		!req.headers.authorization ||
		!req.headers.authorization.startsWith("Bearer ");

	if (isNotAuthorized) {
		return unauthorized(res);
	}

	const token = req.headers.authorization.split("Bearer ")[1];
	const user = await decodeAuthorizeToken(token);

	if (!user) {
		return unauthorized(res);
	}

	req.user = user;

	next();
}

function unauthorized(res) {
	return res.status(403).json({ unauthorized: true });
}

async function decodeAuthorizeToken(token) {
	try {
		const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(token);
		return decodedIdToken;
	} catch (error) {
		return null;
	}
}

exports.unauthorized;
module.exports = authorization;
