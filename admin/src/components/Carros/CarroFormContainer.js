import React from "react";
import { compose } from "redux";
import withMainContainer from "../../containers/withMainContainer";
import withAuthentication from "../../containers/withAuthentication";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarroForm from "./CarroForm";

const CarroFormContainer = () => {
	const handleSubmit = values => {
		console.log(values);
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
	withAuthentication
)(CarroFormContainer);
