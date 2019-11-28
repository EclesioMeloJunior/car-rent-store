export const aluguelTypes = {
  CONFIRMAR_ALUGUEL_MODAL_OPEN: "@aluguel/CONFIRMAR_RESERVA_MODAL_OPEN",
  CONFIRMAR_ALUGUEL_MODAL_CLOSE: "@aluguel/CONFIRMAR_RESERVA_MODAL_CLOSE",

  FINALIZAR_ALUGUEL_MODAL_OPEN: "@aluguel/FINALIZAR_ALUGUEL_MODAL_OPEN",
  FINALIZAR_ALUGUEL_MODAL_CLOSE: "@aluguel/FINALIZAR_ALUGUEL_MODAL_CLOSE"
};

const aluguelInitialState = {
  confirmarAluguel: {
    modalOpen: false,
    reserva: null
  },

  finalizarAluguel: {
    modalOpen: false,
    aluguel: null
  }
};

const aluguel = (state = aluguelInitialState, action) => {
  switch (action.type) {
    case aluguelTypes.CONFIRMAR_ALUGUEL_MODAL_OPEN: {
      return {
        ...state,
        confirmarAluguel: {
          ...state.confirmarAluguel,
          modalOpen: true,
          reserva: action.payload
        }
      };
    }

    case aluguelTypes.FINALIZAR_ALUGUEL_MODAL_OPEN: {
      return {
        ...state,
        finalizarAluguel: {
          ...state.confirmarAluguel,
          modalOpen: true,
          aluguel: action.payload
        }
      };
    }

    case aluguelTypes.CONFIRMAR_ALUGUEL_MODAL_CLOSE: {
      return {
        ...state,
        confirmarAluguel: {
          ...state.confirmarAluguel,
          modalOpen: false,
          reserva: null
        }
      };
    }

    case aluguelTypes.CONFIRMAR_ALUGUEL_MODAL_CLOSE: {
      return {
        ...state,
        finalizarAluguel: {
          ...state.confirmarAluguel,
          modalOpen: false,
          aluguel: null
        }
      };
    }

    default:
      return state;
  }
};

export default aluguel;
