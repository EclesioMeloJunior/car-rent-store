import React from "react";
import renderer from "react-test-renderer";
import CarrosAlugados from "./CarrosAlugados";

const CARROS_ALUGADOS_DATA = [
  {
    id: 4,
    carro: "Ford Docus 3.0",
    pessoa: {
      nome: "Márcio Fernandez",
      email: "marcio@fernandez.com",
      telefone: "69 9 8105-0108"
    },
    start_at: new Date("2019-11-29"),
    end_at: new Date("2019-12-03"),
    status: "reservado"
  },
  {
    id: 3,
    carro: "Ford Docus 3.0",
    pessoa: {
      nome: "Márcio Fernandez",
      email: "marcio@fernandez.com",
      telefone: "69 9 8105-0108"
    },
    start_at: new Date("2019-11-29"),
    end_at: new Date("2019-12-03"),
    status: "reservado"
  },
  {
    id: 2,
    carro: "Ford Docus 3.0",
    pessoa: {
      nome: "Márcio Fernandez",
      email: "marcio@fernandez.com",
      telefone: "69 9 8105-0108"
    },
    start_at: new Date("2019-11-29"),
    end_at: new Date("2019-12-03"),
    status: "pendente"
  },
  {
    id: 1,
    carro: "Ford Docus 3.0",
    pessoa: {
      nome: "Márcio Fernandez",
      email: "marcio@fernandez.com",
      telefone: "69 9 8105-0108"
    },
    start_at: new Date("2019-11-29"),
    end_at: new Date("2019-12-03"),
    status: "reservado"
  }
];

describe("Quando buscar os carros alugados na API", () => {
  test("Deve renderizar as mesmas quantidades de carros na busca", () => {
    const carrosAlugadosComponents = renderer.create(
      CARROS_ALUGADOS_DATA.map((carroAlugado, carroAlugadoIndex) => (
        <CarrosAlugados key={carroAlugadoIndex} carroAlugado={carroAlugado} />
      ))
    );

    const componentsTree = carrosAlugadosComponents.toJSON();
    expect(componentsTree.length).toBe(CARROS_ALUGADOS_DATA.length);
  });
});

describe("Quando aceitar uma reserva", () => {
  test("Deve enviar a requisição", () => {});
});
