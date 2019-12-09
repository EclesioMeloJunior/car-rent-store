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

const FinalizarAluguel = props => {
  const { finalizarAluguel, closeFinalizarAluguel } = props;

  const onClose = () => {
    closeFinalizarAluguel();
  };

  const onConfirmation = () => {};

  if (!finalizarAluguel.aluguel) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <Modal show={finalizarAluguel.modalOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Finalizar Aluguel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              size="sm"
              value={finalizarAluguel.aluguel.pessoa.nome}
              readOnly
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Automóvel</Form.Label>
            <Form.Control
              size="sm"
              readOnly
              value={`${finalizarAluguel.aluguel.carro.modelo}, ${finalizarAluguel.aluguel.carro.placa}`}
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
                      finalizarAluguel.aluguel.checkin._seconds,
                      finalizarAluguel.aluguel.checkin._nanoseconds
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
                  value={
                    finalizarAluguel.aluguel.checkout
                      ? moment(
                          new firebase.firestore.Timestamp(
                            finalizarAluguel.aluguel.checkout._seconds,
                            finalizarAluguel.aluguel.checkout._nanoseconds
                          ).toDate()
                        ).format("DD/MM/YYYY")
                      : ""
                  }
                  readOnly
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Atualizar KM</Form.Label>
            <Form.Control size="sm" type="text" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Observação</Form.Label>
            <Form.Control size="sm" as="textarea" rows="3" />
          </Form.Group>
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
  finalizarAluguel: state.aluguel.finalizarAluguel
});

const mapDispatchToProps = dispatch => ({
  closeFinalizarAluguel: () =>
    dispatch({ type: aluguelTypes.FINALIZAR_ALUGUEL_MODAL_CLOSE })
});

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarAluguel);
