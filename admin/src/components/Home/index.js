import React, { useState, useEffect } from "react";
import { compose } from "redux";
import Container from "react-bootstrap/Container";
import withFirebase from "@firebase-app/withFirebase";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import CarrosAlugados from "./CarrosAlugados";

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
  const functions = props.firebase.functions();

  useEffect(() => {
    getAllAlugueis();
  });

  const getAllAlugueis = () => {
    const getAllAlugueis = functions.httpsCallable("getAllAlugueis");
    getAllAlugueis().then(alugueis => console.log(alugueis));
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
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Carro</th>
                <th>Saída</th>
                <th>Entrega</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carrosAlugados.map((carroAlugado, carroAlugadoIdx) => (
                <CarrosAlugados
                  carroAlugado={carroAlugado}
                  key={carroAlugadoIdx}
                />
              ))}
            </tbody>
          </Table>
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
