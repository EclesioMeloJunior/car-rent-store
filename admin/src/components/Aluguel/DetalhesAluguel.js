import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import firebase from "../../firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { aluguelTypes } from "../../redux/aluguel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DetalhesAluguel = props => {
  const { open, aluguel, onClose } = props;

  if (!aluguel) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Aluguel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              size="sm"
              value={aluguel.pessoa.nome}
              readOnly
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              size="sm"
              value={aluguel.pessoa.email}
              readOnly
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              size="sm"
              value={aluguel.pessoa.telefone}
              readOnly
              type="text"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Automóvel</Form.Label>
            <Form.Control
              size="sm"
              readOnly
              value={`${aluguel.carro.modelo}, ${aluguel.carro.placa}`}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              size="sm"
              readOnly
              value={aluguel.observacao}
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
                      aluguel.checkin._seconds,
                      aluguel.checkin._nanoseconds
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
                    aluguel.checkout
                      ? moment(
                          new firebase.firestore.Timestamp(
                            aluguel.checkout._seconds,
                            aluguel.checkout._nanoseconds
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetalhesAluguel;
