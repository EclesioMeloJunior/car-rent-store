const admin = require("../admin");

async function uploadImageAndGetPath(imagePath, { bucket, metadata }) {
	const storageBucket = admin.storage().bucket(bucket);
	await storageBucket.upload(imagePath, {
		destination: imagePath,
		metadata: metadata
	});
}

module.exports = {
	uploadImageAndGetPath
};
