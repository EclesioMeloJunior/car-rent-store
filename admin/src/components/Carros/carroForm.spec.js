import React from "react";
import renderer from "react-test-renderer";
import CarroForm from "./CarroForm";

describe("Quando o usuário submter o formulário", () => {
	test("Quando as informações obrigatórias não forem preenchidas", () => {
		const component = renderer.create(<CarroForm />);

		const button = component.find("button").at(0);

		console.log(button);
	});
});
