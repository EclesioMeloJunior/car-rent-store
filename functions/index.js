const functions = require("firebase-functions");
const admin = require("./admin");
const { fromSnapshotToArray } = require("./admin/formater");

const findCarsByOwnerId = async ownerId => {
  const carsReference = admin.firestore().collection("cars");
  const carsQuery = await carsReference.where("car_owner", "==", ownerId).get();

  return fromSnapshotToArray(carsQuery);
};

exports.fetchAllCarsByOwner = functions.https.onCall((data, context) => {
  const owner_id = context.auth.uid;
  return findCarsByOwnerId(owner_id);
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

exports.removeCarById = functions.https.onCall((data, context) => {
  const { id } = data;
  const owner_id = context.auth.uid;

  const carReference = admin
    .firestore()
    .collection("cars")
    .doc(id);

  return carReference.delete().then(() => {
    return findCarsByOwnerId(owner_id);
  });
});

exports.changeCarDisponibilidade = functions.https.onCall((data, context) => {
  const owner_id = context.auth.uid;

  const carReference = admin
    .firestore()
    .collection("cars")
    .doc(car_id);

  const carDocument = carReference.get();

  return carReference.delete().then(() => {
    return findCarsByOwnerId(owner_id);
  });
});

exports.getAllAlugueis = functions.https.onCall(async (data, context) => {
  const alugueisReference = admin.firestore().collection("alugueis");
  const alugueisQuery = await alugueisReference.get();

  const alugueis = await fromSnapshotToArray(alugueisQuery);
});

exports.buscarCarros = functions.https.onRequest((request, response) => {
  return response.json({
    source:
      "https://firebasestorage.googleapis.com/v0/b/car-rent-store.appspot.com/o/cars%2FbaiKxGuvi3qNr1duXsT6%2F592912017561507.jpg_baiKxGuvi3qNr1duXsT6_1567000137943.jpeg?alt=media&token=48e8f9e8-ce2c-46af-a40d-1e011bbf22e1",
    name: "Carro",
    description: "Disponível"
  });
});
