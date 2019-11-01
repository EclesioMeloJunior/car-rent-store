import { compose } from "redux";
import CarroForm from "./CarroForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import withFirebase from "@firebase-app/withFirebase";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";

const CarroFormContainer = props => {
	const { match, history } = props;
	const [carro, setCarro] = useState(null);
	const functions = props.firebase.functions();
	const firestore = props.firebase.firestore();

	useEffect(() => {
		if (match.params.carId) {
			const carById = functions.httpsCallable("fetchCarById");
			carById({ car_id: match.params.carId })
				.then(carro => setCarro(carro.data))
				.catch(err => {
					toast(err.message, {
						type: "error",
						hideProgressBar: true
					});
				});
		}
	}, []);

	const handleSubmit = values => {
		const car_owner = props.user.uid;
		const car = { ...values, car_owner, disponivel: true };

		let carsReference = firestore.collection("cars");

		if (car.id) {
			const carToUpdateReference = firestore.collection("cars").doc(car.id);
			carsReference = carToUpdateReference.update(car);
		} else {
			carsReference = carsReference.add(car);
		}

		carsReference
			.then(() => history.push("/carros"))
			.catch(() => {
				toast("Problemas ao salvar o carro, verifique os campos", {
					type: "error",
					hideProgressBar: true
				});
			});
	};

	return (
		<Container className="mt-5">
			<Row>
				<Col>
					<Card>
						<Card.Header as="h5">Cadastrar Carro</Card.Header>
						<Card.Body>
							<CarroForm initialValues={carro} onSubmit={handleSubmit} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default compose(
	withMainContainer,
	withAuthentication,
	withFirebase,
	withRouter
)(CarroFormContainer);
