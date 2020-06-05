import React from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ data, columns, title, styles }) => (
    <div className="container">
        <DataTable
            title={title}
            columns={columns}
            data={data}
            pointerOnHover
            style={styles}
        />
    </div>
);

export default Table;
