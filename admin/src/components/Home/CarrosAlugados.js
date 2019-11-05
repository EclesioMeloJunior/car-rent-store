import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

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

const CarrosAlugados = props => {
	const { carroAlugado } = props;

	return (
		<Col xs={12} lg={4} md={4}>
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
					<small className="text-muted">Período: 30/11/2019 - 03/12/2019</small>
				</Card.Footer>
			</Card>
		</Col>
	);
};

export default CarrosAlugados;
