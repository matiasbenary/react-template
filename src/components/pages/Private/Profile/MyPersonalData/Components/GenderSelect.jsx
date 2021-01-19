import React from 'react';
import Select from '../../../../../molecules/Form/components/Select';

const genderTypes = [
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Femenino', value: 'Femenino' },
  { label: 'No indica', value: 'No indica' },
];

const GenderSelect = () => (
  <Select
    label="Genero"
    name="gender"
    options={genderTypes}
    validations={[
      { key: 'required', val: true }]}
  />
);

export default GenderSelect;
