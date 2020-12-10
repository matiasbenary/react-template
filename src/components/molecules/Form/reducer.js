const reducer = (state, action) => {
  switch (action.type) {
    case 'invalid_input':
      if (state.names.includes(action.inputName)) {
        return state;
      }
      return { names: [...state.names, action.inputName] };
    case 'valid_input':
      const names = state.names.filter((item) => item !== action.inputName);
      return { names };
    default:
      return state;
  }
};

export default reducer;
