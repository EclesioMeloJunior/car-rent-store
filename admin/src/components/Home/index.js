import React, { useState } from "react";
import { compose } from "redux";
import Container from "react-bootstrap/Container";
import withFirebase from "@firebase-app/withFirebase";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const CARROS_ALUGADOS_DATA = [
	{
		id: 4,
		carro: "Ford Docus 3.0",
		pessoa: {
			nome: "Márcio Fernandez",
			email: "marcio@fernandez.com",
			telefone: "69 9 8105-0108"
		},
		start_at: new Date("2019-11-29"),
		end_at: new Date("2019-12-03"),
		status: "reservado"
	},
	{
		id: 3,
		carro: "Ford Docus 3.0",
		pessoa: {
			nome: "Márcio Fernandez",
			email: "marcio@fernandez.com",
			telefone: "69 9 8105-0108"
		},
		start_at: new Date("2019-11-29"),
		end_at: new Date("2019-12-03"),
		status: "reservado"
	},
	{
		id: 2,
		carro: "Ford Docus 3.0",
		pessoa: {
			nome: "Márcio Fernandez",
			email: "marcio@fernandez.com",
			telefone: "69 9 8105-0108"
		},
		start_at: new Date("2019-11-29"),
		end_at: new Date("2019-12-03"),
		status: "pendente"
	},
	{
		id: 1,
		carro: "Ford Docus 3.0",
		pessoa: {
			nome: "Márcio Fernandez",
			email: "marcio@fernandez.com",
			telefone: "69 9 8105-0108"
		},
		start_at: new Date("2019-11-29"),
		end_at: new Date("2019-12-03"),
		status: "reservado"
	}
];

const Home = props => {
	const [carrosAlugados, setCarrosAlugados] = useState(CARROS_ALUGADOS_DATA);

	const defineStatus = status => {
		switch (status) {
			case "reservado": {
				return <Badge variant="dark">Reservado</Badge>;
			}
			case "pendente": {
				return <Badge variant="warning">Pendente</Badge>;
			}
			default:
				return <React.Fragment />;
		}
	};

	return (
		<Container className="mt-4">
			<div className="d-flex justify-content-between align-items-center">
				<h2 className="flex-fill w-100">Carros Reservados e Alugados</h2>

				<InputGroup>
					<FormControl
						placeholder="Número, locador, veículo..."
						aria-label="Procurar reserva"
						aria-describedby="basic-addon2"
					/>
					<InputGroup.Append>
						<Button variant="outline-secondary">Search</Button>
					</InputGroup.Append>
				</InputGroup>
			</div>

			<Row className="mt-4 mb-4">
				{carrosAlugados.map((carroAlugado, carroAlugadoIdx) => (
					<Col xs={12} lg={4} md={4} key={carroAlugadoIdx}>
						<Card className="mt-3">
							<Card.Img
								style={{ height: "200px" }}
								variant="top"
								src="https://picsum.photos/500/500"
							/>
							<Card.Body>
								<small>#{carroAlugado.id}</small>
								<Card.Title>{carroAlugado.carro}</Card.Title>

								<div>
									<i class="fas fa-user mr-2"></i>
									<b>{carroAlugado.pessoa.nome}</b>
								</div>

								<div>
									<i class="fas fa-envelope mr-2"></i>
									<i>{carroAlugado.pessoa.email}</i>
								</div>

								<div>
									<i class="fas fa-phone mr-2"></i>
									<small>{carroAlugado.pessoa.telefone}</small>
								</div>
								<div className="mb-1">{defineStatus(carroAlugado.status)}</div>

								{carroAlugado.status === "pendente" && (
									<div>
										<ButtonGroup size="sm" aria-label="Carros Alugados Ações">
											<Button variant="success">Aceitar</Button>
											<Button variant="danger">Recusar</Button>
										</ButtonGroup>
									</div>
								)}

								{carroAlugado.status === "reservado" && (
									<div>
										<ButtonGroup size="sm" aria-label="Carros Alugados Ações">
											<Button variant="primary">Fechar</Button>
											<Button variant="secondary">Cancelar</Button>
										</ButtonGroup>
									</div>
								)}
							</Card.Body>

							<Card.Footer>
								<small className="text-muted">
									Período: 30/11/2019 - 03/12/2019
								</small>
							</Card.Footer>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default compose(
	withAuthentication,
	withMainContainer,
	withFirebase
)(Home);
