import React, { useState } from "react";
import { compose } from "redux";
import Container from "react-bootstrap/Container";
import withFirebase from "@firebase-app/withFirebase";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarrosAlugados from "./CarrosAlugados";
import GraficoCarrosAlugados from "./GraficoCarrosAlugados";

const Home = props => {
	return (
		<Container className="mt-4">
			<Row>
				<Col xs={12} lg={4} md={4}>
					<h4>Aluguéis no ano atual (2019)</h4>
					<GraficoCarrosAlugados />
				</Col>
				<Col xs={12} lg={8} md={8}>
					<CarrosAlugados />
				</Col>
			</Row>
		</Container>
	);
};

export default compose(
	withAuthentication,
	withMainContainer,
	withFirebase
)(Home);
