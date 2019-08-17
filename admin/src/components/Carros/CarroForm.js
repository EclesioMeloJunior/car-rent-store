import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Field, reduxForm } from "redux-form";
import {
	ReduxCheckControl,
	ReduxFormControl
} from "@containers/ReduxFormControls";

const CarroForm = props => {
	const { handleSubmit } = props;

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Modelo</Form.Label>
					<Field
						name="modelo"
						component={ReduxFormControl}
						type="text"
						placeholder="Informe o modelo"
					/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label>Marca</Form.Label>
					<Field
						name="marca"
						component={ReduxFormControl}
						type="text"
						placeholder="Informe a marca"
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
						placeholder="Infomrme o KM atual"
					/>
				</Form.Group>
			</Form.Row>

			<Form.Group id="formGridCheckbox">
				<Field
					name="aceito_termos"
					component={ReduxCheckControl}
					type="checkbox"
					label="Aceito termos"
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Salvar
			</Button>
		</Form>
	);
};

export default reduxForm({
	form: "carro-form"
})(CarroForm);
