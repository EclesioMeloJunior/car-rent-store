import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import firebase from "../../firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { aluguelTypes } from "../../redux/aluguel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ConfirmarAluguel = props => {
  const { confirmarAluguel, closeConfirmarAluguel } = props;

  const onClose = () => {
    closeConfirmarAluguel();
  };

  const onConfirmation = () => {};

  if (!confirmarAluguel.reserva) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <Modal show={confirmarAluguel.modalOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Aluguel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Confira os dados e confirme o aluguel do automóvel.
        <Form className="mt-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              size="sm"
              value={confirmarAluguel.reserva.pessoa.nome}
              readOnly
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Automóvel</Form.Label>
            <Form.Control
              size="sm"
              readOnly
              value={`${confirmarAluguel.reserva.carro.modelo}, ${confirmarAluguel.reserva.carro.placa}`}
              type="text"
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Entrega</Form.Label>
                <Form.Control
                  size="sm"
                  value={moment(
                    new firebase.firestore.Timestamp(
                      confirmarAluguel.reserva.checkin._seconds,
                      confirmarAluguel.reserva.checkin._nanoseconds
                    ).toDate()
                  ).format("DD/MM/YYYY")}
                  readOnly
                  type="text"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Devolução Em</Form.Label>
                <Form.Control
                  size="sm"
                  value={moment(
                    new firebase.firestore.Timestamp(
                      confirmarAluguel.reserva.checkout._seconds,
                      confirmarAluguel.reserva.checkout._nanoseconds
                    ).toDate()
                  ).format("DD/MM/YYYY")}
                  readOnly
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirmation}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  confirmarAluguel: state.aluguel.confirmarAluguel
});

const mapDispatchToProps = dispatch => ({
  closeConfirmarAluguel: () =>
    dispatch({ type: aluguelTypes.CONFIRMAR_ALUGUEL_MODAL_CLOSE })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmarAluguel);
