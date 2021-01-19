function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validationsConstraints = (type, value, inputValue, othersValues, optional) => {
  if (type === 'required') {
    return {
      error_message: 'Campo obligatorio',
      valid: Boolean(inputValue),
    };
  }
  if (type === 'only_numbers') {
    return {
      error_message: 'Sólo puedes ingresar numeros',
      valid: Boolean(inputValue.match(/^[0-9]/)),
    };
  }
  if (type === 'min_length') {
    return {
      error_message: `Ingresa mínimo ${value} caracteres`,
      valid: inputValue.length >= value,
    };
  }
  if (type === 'email') {
    return {
      error_message: `Ingresa mínimo ${value} caracteres`,
      valid: emailIsValid(inputValue),
    };
  }
  if (type === 'equal') {
    return {
      error_message: `Ingresa mínimo ${value} caracteres`,
      valid: inputValue === othersValues[optional],
    };
  }
};

export default validationsConstraints;
