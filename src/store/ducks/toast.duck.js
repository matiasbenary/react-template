export const actionTypes = {
  addToast: '[ TOAST ] ADD',
  deleteToast: '[ TOAST ] DELETE',
};

const initialState = {
  list: [
  /*  {
      id: 'test12321',
      description: 'erewrwerwrw',
      type: 'success',
    },
    {
      id: 'dwwdedwed',
      description: 'This is a success toast component',
      type: 'info',
    },
    {
      id: 'tedwdwst12321',
      description: 'erewrwerwrw',
      type: 'danger',
    },
    {
      id: 'tedwdwst1asdsa2321',
      description: 'erewrwerwrw',
      type: 'warning',
    }, */
  ],
};

export const reducer = (state = initialState, action) => {
  const { list } = state;
  switch (action.type) {
    case actionTypes.addToast: {
      return {
        list: [...list, action.item],
      };
    }
    case actionTypes.deleteToast: {
      const listItemIndex = list.findIndex((e) => e.id === action.id);
      list.splice(listItemIndex, 1);
      return { list };
    }
    default:
      return state;
  }
};

// Action Creators
export const actions = {
  addToast: ({ item }) => ({
    type: actionTypes.addToast,
    item,
  }),
  deleteToast: ({ id }) => ({ type: actionTypes.deleteToast, id }),
};
