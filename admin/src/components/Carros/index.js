import React, { useState, useEffect, useRef } from "react";
import { compose } from "redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import withFirebase from "@firebase-app/withFirebase";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";

const limitString = text => {
	return text.length < 25 ? text : `${text.slice(0, 25)}...`;
};

const Carro = props => {
	const { carro, isLoading, onRemove, handleCheckChange } = props;
	const [carroIsLoading, setCarroIsLoading] = useState(false);

	return (
		<Col xs={12} lg={3} md={3} className="mt-4">
			<Card>
				{carro.images && (
					<Card.Img height="150" variant="top" src={carro.images[0].src} />
				)}
				<Card.Body>
					<Card.Title>{carro.modelo}</Card.Title>
					<Card.Text>{limitString(carro.observacao)}</Card.Text>

					<Form.Group controlId="formBasicCheckbox">
						<Form.Check
							checked={carro.disponivel}
							type="checkbox"
							label="Disponível"
							id={`inline-${carro.id}-3`}
							onChange={({ target }) => {
								setCarroIsLoading(true);

								handleCheckChange(target.checked).then(() =>
									setCarroIsLoading(false)
								);
							}}
						/>

						{carroIsLoading && <i className="fas fa-spinner fa-spin" />}
					</Form.Group>

					<ButtonToolbar>
						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip id={`tooltip-top`}>
									Editar informações do carro.
								</Tooltip>
							}
						>
							<Button
								as={Link}
								to={`/carros/form/${carro.id}`}
								variant="primary"
								size="sm"
								className="mr-1"
							>
								<i className="fas fa-edit" />
							</Button>
						</OverlayTrigger>

						<OverlayTrigger
							placement="top"
							overlay={
								<Tooltip id={`tooltip-top`}>
									Editar as imagens do carro.
								</Tooltip>
							}
						>
							<Button
								as={Link}
								to={`/carros/images/form/${carro.id}`}
								variant="secondary"
								size="sm"
								className="mr-1"
							>
								<i className="fas fa-images" />
							</Button>
						</OverlayTrigger>

						<OverlayTrigger
							placement="right"
							trigger="focus"
							overlay={
								<Popover id="popover-basic">
									<Popover.Title as="h3">Remover Registro</Popover.Title>
									<Popover.Content>
										Você irá remover <strong>{carro.modelo}</strong>. Confirmar?
										<Button variant="secondary" className="mr-1" size="sm">
											Cancelar
										</Button>
										<Button onClick={onRemove} variant="danger" size="sm">
											Remover
										</Button>
									</Popover.Content>
								</Popover>
							}
						>
							<Button variant="danger" size="sm">
								<i className="fas fa-trash-alt" />
							</Button>
						</OverlayTrigger>
					</ButtonToolbar>
				</Card.Body>
			</Card>
		</Col>
	);
};

const Carros = props => {
	const [carros, setCarros] = useState([]);
	const functions = props.firebase.functions();
	const firestore = props.firebase.firestore();

	useEffect(() => {
		const carsByOwners = functions.httpsCallable("fetchAllCarsByOwner");
		carsByOwners().then(carros => setCarros(carros.data));
	}, []);

	const handleRemoveCar = ({ id }) => {
		const removeCarById = functions.httpsCallable("removeCarById");
		removeCarById({ id }).then(carros => setCarros(carros.data));
	};

	const handleDisponivel = (state, carroId) => {
		const carToUpdateReference = firestore.collection("cars").doc(carroId);
		const carsReference = carToUpdateReference.update({ disponivel: state });

		return carsReference.then(() => {
			const carsByOwners = functions.httpsCallable("fetchAllCarsByOwner");
			carsByOwners().then(carros => setCarros(carros.data));
		});
	};

	return (
		<Container className="mt-4">
			<Row>
				<Col>
					<Card body>
						<Button as={Link} to="/carros/form" variant="success">
							Novo Carro
						</Button>
					</Card>
				</Col>
			</Row>

			<Row className="mt-3">
				{carros.map((carro, carroIdx) => (
					<Carro
						className={(carroIdx + 1) % 4 == 0 ? "mt-2" : "mt-0"}
						carro={carro}
						key={carroIdx}
						onRemove={() => handleRemoveCar(carro)}
						handleCheckChange={state => handleDisponivel(state, carro.id)}
					/>
				))}
			</Row>
		</Container>
	);
};

export default compose(
	withMainContainer,
	withAuthentication,
	withFirebase
)(Carros);
