import React, { useState, useEffect } from "react";
import _ from "lodash";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Field, reduxForm } from "redux-form";
import { createTextMask, createNumberMask } from "redux-form-input-masks";
import {
	ReduxCheckControl,
	ReduxFormControl
} from "@containers/ReduxFormControls";
import { getAllManufactures } from "@utils/cars";

const placaFieldDefinitions = {
	9: {
		regExp: /[0-9]/
	},
	A: {
		regExp: /[A-Za-z]/,
		transform: char => char.toUpperCase()
	}
};

const placaFieldMask = createTextMask({
	pattern: "AAA-9999",
	maskDefinitions: placaFieldDefinitions
});

const kmAtualFieldMask = createNumberMask({
	prefix: "KM ",
	locale: "pt-BR",
	decimalPlaces: 2
});

const CarroForm = props => {
	const { handleSubmit, submitting } = props;

	const [fabricantes, setFabricantes] = useState(["Aguarde..."]);

	useEffect(() => {
		setFabricantes(getAllManufactures());
	}, []);

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Fabricante</Form.Label>
					<Field
						name="marca"
						component={ReduxFormControl}
						type="text"
						as="select"
						required
						placeholder="Informe a marca"
					>
						{fabricantes.map((fabricante, fabricanteIdx) => (
							<option key={fabricanteIdx} value={fabricante}>
								{fabricante}
							</option>
						))}
					</Field>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Modelo</Form.Label>
					<Field
						name="modelo"
						component={ReduxFormControl}
						type="text"
						placeholder="Informe o modelo"
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>Placa</Form.Label>
					<Field
						component={ReduxFormControl}
						name="placa"
						type="text"
						{...placaFieldMask}
						placeholder="Informe a placa"
					/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridState">
					<Form.Label>Ano</Form.Label>
					<Field
						component={ReduxFormControl}
						type="text"
						name="ano"
						placeholder="Informe o ano"
					/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridZip">
					<Form.Label>Cor</Form.Label>
					<Field
						component={ReduxFormControl}
						type="text"
						name="cor"
						placeholder="Informe a cor"
					/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridState">
					<Form.Label>KM Atual</Form.Label>
					<Field
						component={ReduxFormControl}
						type="text"
						name="km_atual"
						{...kmAtualFieldMask}
						placeholder="Infomrme o KM atual"
					/>
				</Form.Group>
			</Form.Row>

			<Button variant="primary" type="submit" disabled={submitting}>
				Salvar
			</Button>
		</Form>
	);
};

const validate = values => {
	const errors = {};

	if (!values.marca) {
		errors.marca = "A marca é necessária!";
	}

	if (!values.modelo) {
		errors.modelo = "O modelo é necessário!";
	}

	if (!values.placa) {
		errors.placa = "A placa é necessária!";
	}

	return errors;
};

export default reduxForm({
	form: "carro-form",
	validate
})(CarroForm);
