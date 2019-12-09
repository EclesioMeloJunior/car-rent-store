import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import withFirebase from "../../firebase/withFirebase";
import withMainContainer from "../../containers/withMainContainer";
import withAuthentication from "../../containers/withAuthentication";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Table from "react-bootstrap/Table";
import CarrosAlugados from "./CarrosAlugados";
import ConfirmarAluguel from "../Aluguel/ConfirmarAluguel";
import FinalizarAluguel from "../Aluguel/FinalizarAluguel";

const Home = props => {
  const { aluguel } = props;
  const [carrosAlugados, setCarrosAlugados] = useState([]);

  const functions = props.firebase.functions();
  const firestore = props.firebase.firestore();

  useEffect(() => {
    getAllAlugueis();
  }, []);

  const getAllAlugueis = () => {
    const getAllAlugueis = functions.httpsCallable("getAllAlugueis");
    getAllAlugueis().then(alugueis => {
      setCarrosAlugados(alugueis.data);
    });
  };

  const handleConfirmaReserva = async () => {
    if (!aluguel.confirmarAluguel.reserva) return;

    const reserva = {
      ...aluguel.confirmarAluguel.reserva,
      status: "reservado",
      checkout: new Date(aluguel.confirmarAluguel.reserva.checkout)
    };

    firestore
      .collection("alugueis")
      .doc(reserva.id)
      .update(reserva)
      .then(() => {
        toast("Confirmação efetuada com sucesso", {
          type: "success",
          hideProgressBar: true
        });
      });
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
                <th>Checkin</th>
                <th>Checkout</th>
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

      <ConfirmarAluguel onConfirmation={handleConfirmaReserva} />

      <FinalizarAluguel />
    </Container>
  );
};

const mapStateToProps = state => ({
  aluguel: state.aluguel
});

export default compose(
  withAuthentication,
  withMainContainer,
  withFirebase,
  connect(mapStateToProps)
)(Home);
