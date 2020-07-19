import React from 'react';
import DataTable from 'react-data-table-component';
import Ods from '../Ods';
import Commentary from '../Commentary';

const Table = ({
 data, columns, title, styles,
}) => (
    <div>
        <DataTable
            title={title}
            columns={columns}
            data={data}
            pointerOnHover
            responsive
            style={styles}
            expandableRows
            expandableRowsComponent={
                title === 'Mis horas'
                ? <Commentary data={data} />
                : <Ods data={data} />
            }
        />
    </div>
);

export default Table;
