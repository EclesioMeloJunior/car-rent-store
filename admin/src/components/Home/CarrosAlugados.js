import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

const CarrosAlugados = props => {
	return (
		<div className="d-flex w-100">
			<Card>
				<Card.Img
					style={{ height: "200px" }}
					variant="top"
					src="https://picsum.photos/500/500"
				/>
				<Card.Body>
					<Card.Title>Ford Focus 3.0</Card.Title>
					<b>Márcio Fernandez Moraes</b>
					<div className="w-100"></div>
					<Badge variant="primary">Reservado</Badge>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Período: 30/11/2019 - 03/12/2019</small>
				</Card.Footer>
			</Card>

			<Card>
				<Card.Img
					style={{ height: "200px" }}
					variant="top"
					src="https://picsum.photos/500/500"
				/>
				<Card.Body>
					<Card.Title>Ford Focus 3.0</Card.Title>
					<b>Márcio Fernandez Moraes</b>
					<div className="w-100"></div>
					<Badge variant="primary">Reservado</Badge>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Período: 30/11/2019 - 03/12/2019</small>
				</Card.Footer>
			</Card>

			<Card>
				<Card.Img
					style={{ height: "200px" }}
					variant="top"
					src="https://picsum.photos/500/500"
				/>
				<Card.Body>
					<Card.Title>Ford Focus 3.0</Card.Title>
					<b>Márcio Fernandez Moraes</b>
					<div className="w-100"></div>
					<Badge variant="primary">Reservado</Badge>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Período: 30/11/2019 - 03/12/2019</small>
				</Card.Footer>
			</Card>

			<Card>
				<Card.Img
					style={{ height: "200px" }}
					variant="top"
					src="https://picsum.photos/500/500"
				/>
				<Card.Body>
					<Card.Title>Ford Focus 3.0</Card.Title>
					<b>Márcio Fernandez Moraes</b>
					<div className="w-100"></div>
					<Badge variant="primary">Reservado</Badge>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Período: 30/11/2019 - 03/12/2019</small>
				</Card.Footer>
			</Card>
		</div>
	);
};

export default CarrosAlugados;
