import React from "react";
import { compose } from "redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import withMainContainer from "../../containers/withMainContainer";
import withAuthentication from "../../containers/withAuthentication";

const Carros = props => {
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
		</Container>
	);
};

export default compose(
	withMainContainer,
	withAuthentication
)(Carros);
