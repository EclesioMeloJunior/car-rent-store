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

  const getCarroById = async aluguel => {
    const carroId = aluguel.carro;

    const carro = await admin
      .firestore()
      .collection("cars")
      .doc(carroId)
      .get();

    if (carro.exists) {
      return carro.data();
    }

    return null;
  };

  const alugueis = [];

  for (const aluguel of fromSnapshotToArray(alugueisQuery)) {
    const carro = await getCarroById(aluguel);

    if (carro) {
      alugueis.push({ ...aluguel, carro });
    } else {
      alugueis.push({ ...aluguel });
    }
  }

  return alugueis;
});

exports.getAluguelById = functions.https.onCall(async (data, context) => {
  const { id } = data;

  if (!id) return null;

  const aluguel = await admin
    .firestore()
    .collection("alugueis")
    .doc(id)
    .get();

  const carroAluguelId = aluguel.data().carro;

  const carro = await admin
    .firestore()
    .collection("cars")
    .doc(carroAluguelId)
    .get();

  return {
    ...aluguel.data(),
    carro: {
      ...carro
    }
  };
});

exports.confirmarAluguel = functions.https.onCall(async (data, context) => {
  const { id, checkout } = data;

  console.log(checkout);

  if (!id || !checkout || checkout === "Invalid date") return null;

  const checkoutToDate = new Date(checkout);

  return await admin
    .firestore()
    .collection("alugueis")
    .doc(id)
    .update({
      status: "reservado",
      checkout: checkoutToDate
    });
});

exports.finalizarAluguel = functions.https.onCall(async (data, context) => {
  const { id, km, observacao } = data;

  const aluguel = await admin
    .firestore()
    .collection("alugueis")
    .doc(id)
    .get();

  const carroAluguelId = aluguel.data().carro;

  const carro = await admin
    .firestore()
    .collection("cars")
    .doc(carroAluguelId)
    .get();

  const carroKm = Number(carro.data().km_atual);

  const carroNovoKm = carroKm + km ? Number(km) : 0;

  await admin
    .firestore()
    .collection("cars")
    .doc(carroAluguelId)
    .update({
      km_atual: carroNovoKm,
      disponivel: true
    });

  return await admin
    .firestore()
    .collection("alugueis")
    .doc(id)
    .update({
      status: "finalizado",
      observacao
    });
});

exports.interacoes = functions.https.onRequest(async (request, response) => {
  const owner = request.headers["authorization"];
  const type = request.body.type || "buscar_carros";

  if (!owner) {
    return response.json({ message: "Contate o administrador da locadora" });
  }

  switch (type) {
    case "buscar_carros": {
      const carros = await buscarCarros(owner, request.body);
      return response.json({ data: carros });
    }

    case "realizar_reserva": {
      const numero_reserva = await realizarReserva(owner, request.body);
      return response.json({ numero_reserva });
    }

    default: {
      return response.json({ data: [] });
    }
  }
});

const buscarCarros = async (ownerId, { marca, modelo }) => {
  const cars = await findCarsByOwnerId(ownerId);

  const marcaLower = marca ? marca.toLowerCase() : "";
  const modeloLower = modelo ? modelo.toLowerCase() : "";

  return cars
    .filter(carro => carro.disponivel)
    .filter(carro => {
      const carroMarca = carro.marca.toLowerCase();
      const carroModelo = carro.modelo.toLowerCase();

      if (!marcaLower && !modeloLower) return true;

      if (marcaLower && modeloLower) {
        return (
          marcaLower &&
          carroMarca.includes(marcaLower) &&
          modeloLower &&
          carroModelo.includes(modeloLower)
        );
      }

      return (
        (marcaLower && carroMarca.includes(marcaLower)) ||
        (modeloLower && carroModelo.includes(modeloLower))
      );
    })

    .map(carro => {
      const carDescription = `Ano: ${carro.ano}\nPlaca: ${carro.placa}\nKm: ${carro.km_atual}`;

      return {
        id: carro.id,
        placa: carro.placa,
        name: carro.modelo,
        source: carro.images[0].src,
        description: carDescription,
        modelo: carro.modelo,
        marca: carro.marca,
        valor: carro.valorHora
      };
    });
};

const realizarReserva = async (ownerId, requestBody) => {
  const { data, horas, carro, email, telefone, nome } = requestBody;

  const findCarByPlaca = async (ownerId, placa) => {
    const carsReference = admin.firestore().collection("cars");

    const carsQuery = await carsReference
      .where("car_owner", "==", ownerId)
      .where("placa", "==", placa)
      .get();

    const carros = fromSnapshotToArray(carsQuery);

    if (carros.length === 0) return null;

    return carros[0];
  };

  const changeCarDisponibility = async carId => {
    const carReference = admin
      .firestore()
      .collection("cars")
      .doc(carId);

    await carReference.update({
      disponivel: false
    });
  };

  const createReserva = async reservaModel => {
    await changeCarDisponibility(reservaModel.carro);

    return await admin
      .firestore()
      .collection("alugueis")
      .add(reservaModel);
  };

  const placaCarro = carro.split(":")[1].trim();
  const carroToRent = await findCarByPlaca(ownerId, placaCarro);

  if (!carroToRent) return null;
  if (!carroToRent.disponivel) return null;

  const carroId = carroToRent.id;

  const reservaModel = {
    carro: carroId,
    checkout: null,
    checkin: new Date(`${data}T${horas}`),
    pessoa: {
      email,
      telefone,
      nome
    },
    status: "pendente"
  };

  const reserva = await createReserva(reservaModel);

  return reserva.id;
};
