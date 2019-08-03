const firebaseAdmin = require("../admin/firebase");

async function authorization(req, res, next) {
	const isAuthorized =
		(!req.headers.authorization ||
			!req.headers.authorization.startsWith("Bearer ")) &&
		!(req.cookies && req.cookies.__session);

	if (!isAuthorized) {
		return unauthorized(res);
	}

	const token =
		req.headers.authorization.split("Bearer ")[1] || req.cookies.__session;

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
