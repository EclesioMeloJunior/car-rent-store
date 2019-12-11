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
import moment from "moment";
import DetalhesAluguel from "../Aluguel/DetalhesAluguel";

const Home = props => {
  const { aluguel } = props;

  const [detalhesModal, setDetalhesModal] = useState(false);
  const [aluguelDetalhes, setAluguelDetalhes] = useState(null);

  const [carrosAlugados, setCarrosAlugados] = useState([]);

  const functions = props.firebase.functions();

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
    console.log("confirmar reserva");

    if (!aluguel.confirmarAluguel.reserva) return;

    const reserva = {
      id: aluguel.confirmarAluguel.reserva.id,
      checkout: moment(aluguel.confirmarAluguel.reserva.checkout).format(
        "YYYY-MM-DD"
      )
    };

    const confirmarAluguel = functions.httpsCallable("confirmarAluguel");

    confirmarAluguel(reserva).then(response => {
      if (!response) {
        toast("Falha ao confirmar a locação", {
          type: "error",
          hideProgressBar: true
        });
      } else {
        toast("Confirmação feita com sucesso!", {
          type: "success",
          hideProgressBar: true
        });

        getAllAlugueis();
      }
    });
  };

  const handleFinalizarReserva = async (
    { atualizarKm, observacoes },
    aluguelId
  ) => {
    console.log(aluguelId, atualizarKm, observacoes);
    const confirmarAluguel = functions.httpsCallable("finalizarAluguel");

    const response = await confirmarAluguel({
      id: aluguelId,
      km: atualizarKm,
      observacao: observacoes
    });

    if (response) {
      toast("Locação finalizada", {
        type: "success",
        hideProgressBar: true
      });

      getAllAlugueis();
    } else {
      toast("Falha ao finalizar a locação", {
        type: "error",
        hideProgressBar: true
      });
    }
  };

  const handleDetalhesModal = aluguelSelected => {
    setDetalhesModal(prev => {
      if (!prev) {
        setAluguelDetalhes(aluguelSelected);
        return true;
      }

      setAluguelDetalhes(null);
      return false;
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
                  openDetalhes={() => handleDetalhesModal(carroAlugado)}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <ConfirmarAluguel onConfirmation={handleConfirmaReserva} />
      <FinalizarAluguel onConfirmation={handleFinalizarReserva} />
      <DetalhesAluguel
        onClose={() => handleDetalhesModal(null)}
        open={detalhesModal}
        aluguel={aluguelDetalhes}
      />
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
