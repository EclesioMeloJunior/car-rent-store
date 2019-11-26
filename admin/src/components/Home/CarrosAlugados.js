import React from "react";
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import firebase from "../../firebase";

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

const defineActions = status => {
  switch (status) {
    case "reservado": {
      return (
        <React.Fragment>
          <Dropdown.Item eventKey="1">Finalizar Aluguel</Dropdown.Item>
        </React.Fragment>
      );
    }
    case "pendente": {
      return (
        <React.Fragment>
          <Dropdown.Item eventKey="1">Confirmar Aluguel</Dropdown.Item>
          <Dropdown.Item eventKey="2">Cancelar Reserva</Dropdown.Item>
        </React.Fragment>
      );
    }
    default:
      return <React.Fragment />;
  }
};

const CarrosAlugados = props => {
  const { carroAlugado } = props;

  return (
    <tr>
      <td>{carroAlugado.id}</td>
      <td>{carroAlugado.pessoa.nome}</td>
      <td>
        {moment(
          new firebase.firestore.Timestamp(
            carroAlugado.checkin._seconds,
            carroAlugado.checkin._nanoseconds
          ).toDate()
        ).format("DD/MM/YYYY")}
      </td>
      <td>
        {moment(
          new firebase.firestore.Timestamp(
            carroAlugado.checkout._seconds,
            carroAlugado.checkout._nanoseconds
          ).toDate()
        ).format("DD/MM/YYYY")}
      </td>
      <td>{defineStatus(carroAlugado.status)}</td>
      <td>
        <ButtonToolbar>
          <DropdownButton
            size="sm"
            variant="secondary"
            title="Ações"
            id={`dropdown-button-drop-${carroAlugado.id}`}
            key={carroAlugado.id}
          >
            {defineActions(carroAlugado.status)}
            <React.Fragment>
              <Dropdown.Item eventKey="1">Detalhes do Aluguel</Dropdown.Item>
            </React.Fragment>
          </DropdownButton>
        </ButtonToolbar>
      </td>
    </tr>
  );
};

export default CarrosAlugados;
