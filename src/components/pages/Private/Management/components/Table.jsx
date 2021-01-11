import React from 'react';
import DataTable from 'react-data-table-component';
import Description from './Description';

const columns = [
  {
    name: 'Nombre del responsable',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Email del responsable',
    selector: 'email',
    sortable: true,
    grow: 2,
  },
  {
    name: 'Razon social',
    selector: 'bussiness_name',
    sortable: true,
  },
  {
    name: 'Nombre de fantasia',
    selector: 'fantasy_name',
    sortable: true,
  },
  {
    name: 'Horas total comprometidas',
    selector: 'committed_hours',
    sortable: true,
    right: true,
  },
  {
    name: 'Horas total reales',
    selector: 'actual_hours',
    sortable: true,
    right: true,
  },
  {
    name: 'Fecha de inicio',
    selector: 'from',
    sortable: true,
  },
  {
    name: 'Fecha de finalizacion',
    selector: 'to',
    sortable: true,
  },
];

const Table = ({ data }) => (
  <DataTable
    title="Mi gestion"
    columns={columns}
    data={data}
    expandableRows
    expandableRowsComponent={<Description data={data} />}
  />
);
export default Table;
