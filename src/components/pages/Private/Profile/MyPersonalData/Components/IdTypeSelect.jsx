import React from 'react';
import Select from '../../../../../molecules/Form/components/Select';

const idTypes = [
  { label: 'DNI', value: 'DNI' },
  { label: 'LE', value: 'LE' },
  { label: 'PASAPORTE', value: 'PASAPORTE' },
];

const IdTypeSelect = () => (
  <Select
    label="Tipo de documento"
    name="id_type"
    options={idTypes}
    validations={[
      { key: 'required', val: true }]}
  />
);

export default IdTypeSelect;
