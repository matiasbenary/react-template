import React from "react";
import DataTable from "react-data-table-component";
import Ods from "../Ods";

const Table = ({ data, columns, title, styles }) => (
  <DataTable
    title={title}
    columns={columns}
    data={data}
    pointerOnHover
    responsive
    style={styles}
    expandableRows
    expandableRowsComponent={<Ods data={data} />}
  />
);

export default Table;
