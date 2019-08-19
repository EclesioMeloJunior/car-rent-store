import React from "react";
import { compose } from "redux";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarroForm from "./CarroForm";
import withFirebase from "@firebase-app/withFirebase";
import { toast } from "react-toastify";

const CarroFormContainer = props => {
	const firebase = props.firebase.firestore();

	const handleSubmit = values => {
		firebase
			.collection("cars")
			.add(values)
			.then(carReference => {
				toast("Sucesso ao salvar o carro!", {
					type: "success",
					hideProgressBar: true
				});
			})
			.catch(error => {
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
							<CarroForm onSubmit={handleSubmit} />
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
	withFirebase
)(CarroFormContainer);
