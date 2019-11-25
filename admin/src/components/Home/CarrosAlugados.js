import React from "react";
import Badge from "react-bootstrap/Badge";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
      <td>{carroAlugado.carro}</td>
      <td>30/11/2019</td>
      <td>03/12/2019</td>
      <td>{carroAlugado.pessoa.email}</td>
      <td>{carroAlugado.pessoa.telefone}</td>
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
          </DropdownButton>
        </ButtonToolbar>
      </td>
    </tr>
  );
};

export default CarrosAlugados;
