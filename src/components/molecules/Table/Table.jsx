import React from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ data, columns, title, styles }) => (
    <div>
        <DataTable
            title={title}
            columns={columns}
            data={data}
            pointerOnHover
            responsive
            style={styles}
        />
    </div>
);

export default Table;
