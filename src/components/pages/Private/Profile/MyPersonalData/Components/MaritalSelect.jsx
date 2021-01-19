import React from 'react';
import Select from '../../../../../molecules/Form/components/Select';

const maritalStatus = [
  { label: 'Soltero/a', value: 'Soltero' },
  { label: 'Casado/a', value: 'Casado' },
  { label: 'Viudo/a', value: 'Viudo' },
  { label: 'Divorciado/a', value: 'Divorciado' },
];

const MaritalSelect = () => (
  <Select
    label="Estado civil"
    name="marital_status"
    options={maritalStatus}
    validations={[
      { key: 'required', val: true }]}
  />
);

export default MaritalSelect;
