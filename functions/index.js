const functions = require("firebase-functions");
const admin = require("./admin");
const { fromSnapshotToArray } = require("./admin/formater");

exports.fetchAllCarsByOwner = functions.https.onCall((data, context) => {
	const owner_id = context.auth.uid;

	const carsReference = admin.firestore().collection("cars");
	const carsQuery = carsReference.where("car_owner", "==", owner_id).get();

	return carsQuery.then(fromSnapshotToArray);
});

exports.fetchCarById = functions.https.onCall((data, context) => {
	const car_id = data.car_id;
	const owner_id = context.auth.uid;

	const carReference = admin
		.firestore()
		.collection("cars")
		.doc(car_id);

	const carDocument = carReference.get();

	return carDocument.then(document => {
		if (!document.exists) {
			throw new functions.https.HttpsError(
				"not-found",
				"Carro não pode ser encontrado!"
			);
		}

		const car = document.data();

		if (car.car_owner !== owner_id) {
			throw new functions.https.HttpsError(
				"permission-denied",
				"Acesso negado para este recurso!"
			);
		}

		return { id: document.id, ...car };
	});
});
