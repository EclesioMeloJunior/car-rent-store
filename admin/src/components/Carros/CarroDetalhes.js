import React from "react";
import Form from "react-bootstrap/Form";

const CarroDetalhes = props => {
	const { carro } = props;

	if (!carro) return <React.Fragment />;

	return (
		<Form>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Marca</Form.Label>
				<Form.Control size="sm" value={carro.marca} readOnly type="text" />
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
				<Form.Label>Modelo</Form.Label>
				<Form.Control size="sm" readOnly value={carro.modelo} type="text" />
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
				<Form.Label>Placa</Form.Label>
				<Form.Control size="sm" readOnly value={carro.placa} type="text" />
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
				<Form.Label>Cor</Form.Label>
				<Form.Control size="sm" readOnly value={carro.cor} type="text" />
			</Form.Group>
		</Form>
	);
};

export default CarroDetalhes;
