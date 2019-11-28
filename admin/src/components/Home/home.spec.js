import React from "react";
import renderer from "react-test-renderer";
import CarrosAlugados from "./CarrosAlugados";
import firebase from "../../firebase";

const CARROS_ALUGADOS_DATA = [
	{
		id: 4,
		carro: "Ford Docus 3.0",
		pessoa: {
			nome: "Márcio Fernandez",
			email: "marcio@fernandez.com",
			telefone: "69 9 8105-0108"
		},
		checkin: {
			_seconds: 1,
			_nanoseconds: 1
		},
		checkout: {
			_seconds: 1,
			_nanoseconds: 1
		},
		status: "reservado"
	},
	{
		id: 4,
		carro: "Ford Docus 3.0",
		pessoa: {
			nome: "Márcio Fernandez",
			email: "marcio@fernandez.com",
			telefone: "69 9 8105-0108"
		},
		checkin: {
			_seconds: 1,
			_nanoseconds: 1
		},
		checkout: {
			_seconds: 1,
			_nanoseconds: 1
		},
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
