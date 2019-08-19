import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const CarroImagesFormContainer = props => {
	return (
		<Container className="mt-5">
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card>
						<Card.Header as="h5">Cadastrar Carro</Card.Header>
						<Card.Body />
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default compose(
	withMainContainer,
	withAuthentication,
	withRouter
)(CarroImagesFormContainer);
