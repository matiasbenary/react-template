// actions
export const actionTypes = {
  modalShow: '[MODAL] SHOW',
  modalHide: '[MODAL] HIDDEN',
};

const initialState = {
  modalType: null,
  modalProps: {
    open: false,
  },
};

// Reducer
// export const reducer = produce((draft = [initialState.modalType, initialState.modalProps], action) => {
//   const { type, modalType, modalProps } = action;
//   switch (type) {
//       case actionTypes.modalShow:
//         draft = [modalType, modalProps];
//         return draft;
//       case actionTypes.modalHide:
//         draft = [initialState.modalType, initialState.modalProps];
//         return draft;
//       default: {
//         return draft;
//       }
//   }
// });


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.modalShow: {
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    }
    case actionTypes.modalHide: {
      return initialState;
    }
    default:
      return state;
  }
};

// Action Creators
export const actions = {
  modalShow: ({ modalType, modalProps }) => ({ type: actionTypes.modalShow, modalType, modalProps }),
  modalHide: () => ({ type: actionTypes.modalHide }),
};
