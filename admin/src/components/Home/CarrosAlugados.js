import React from "react";
import moment from "moment";
import firebase from "../../firebase";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import { connect } from "react-redux";
import { aluguelTypes } from "../../redux/aluguel";

const defineStatus = status => {
  switch (status) {
    case "reservado": {
      return <Badge variant="dark">Alugado</Badge>;
    }
    case "pendente": {
      return <Badge variant="warning">Pendente</Badge>;
    }
    default:
      return <React.Fragment />;
  }
};

const defineActions = (
  status,
  confirmarAluguel,
  finalizarAluguel,
  cancelarReserva
) => {
  switch (status) {
    case "reservado": {
      return (
        <React.Fragment>
          <Dropdown.Item eventKey="1" onClick={() => finalizarAluguel()}>
            Finalizar Aluguel
          </Dropdown.Item>
        </React.Fragment>
      );
    }
    case "pendente": {
      return (
        <React.Fragment>
          <Dropdown.Item eventKey="1" onClick={() => confirmarAluguel()}>
            Confirmar Aluguel
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => cancelarReserva()}>
            Cancelar Reserva
          </Dropdown.Item>
        </React.Fragment>
      );
    }
    default:
      return <React.Fragment />;
  }
};

const CarrosAlugados = props => {
  const { carroAlugado, confirmarAluguel, finalizarAluguel } = props;

  const cancelarReserva = () => {};

  const handleFinalizarAluguel = () => {
    finalizarAluguel(carroAlugado);
  };

  const handleConfirmarAluguel = () => {
    console.log("Aqui");
    confirmarAluguel(carroAlugado);
  };

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
        {carroAlugado.checkout
          ? moment(
              new firebase.firestore.Timestamp(
                carroAlugado.checkout._seconds,
                carroAlugado.checkout._nanoseconds
              ).toDate()
            ).format("DD/MM/YYYY")
          : ""}
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
            {defineActions(
              carroAlugado.status,
              handleConfirmarAluguel,
              handleFinalizarAluguel,
              cancelarReserva
            )}
            <React.Fragment>
              <Dropdown.Item eventKey="1">Detalhes do Aluguel</Dropdown.Item>
            </React.Fragment>
          </DropdownButton>
        </ButtonToolbar>
      </td>
    </tr>
  );
};

const mapDispatchToProps = dispatch => ({
  confirmarAluguel: carroAlugado =>
    dispatch({
      type: aluguelTypes.CONFIRMAR_ALUGUEL_MODAL_OPEN,
      payload: carroAlugado
    }),

  finalizarAluguel: carroAlugado =>
    dispatch({
      type: aluguelTypes.FINALIZAR_ALUGUEL_MODAL_OPEN,
      payload: carroAlugado
    })
});

export default connect(() => ({}), mapDispatchToProps)(CarrosAlugados);
