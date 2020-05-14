import React, { useState, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';

const Table = () => {
    const [thing, setThing] = useState();
    const handleAction = (value) => setThing(value);
    const updateState = useCallback((state) => console.log(state));
    const columns = useMemo(() => [
        {
            name: 'Actividad',
            selector: 'actividad',
            sortable: true,
        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
            center: true,
        },
        {
            name: 'Fecha límite de postulación',
            selector: 'limite_postulacion',
            sortable: true,
            center: true,
        },
        {
            name: 'Estado de selección',
            selector: 'estado_seleccion',
            sortable: true,
            center: true,
        },
        {
            name: 'Tipo de actividad',
            selector: 'tipo_actividad',
            sortable: true,
            center: true,
        },
        {
            name: 'Acciones',
            cell: () => <button type="btn" className="btn btn-primary btn-sm" onClick={handleAction}>Horas</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]);
    const tableStyles = {
        minWidth: '1000px',
        margin: '20px auto',
    };

    return (
        <div className="container">
            <DataTable
                title="Mis actividades"
                columns={columns}
                data={data}
                onSelectedRowsChange={updateState}
                pointerOnHover
                style={tableStyles}
            />
        </div>
    );
};

const data = [
        {
            id: 1,
            actividad: 'Naves de Cerca',
            estado: 'Abierta',
            limite_postulacion: '2020-12-31',
            estado_seleccion: 'Seleccionado',
            tipo_actividad: 'Sarasa',
        },
        {
            id: 2,
            actividad: 'Nombre de otra ong',
            horas: '4',
            estado: 'Abierta',
            limite_postulacion: '2020-12-31',
            estado_seleccion: 'Seleccionado',
            tipo_actividad: 'Sarasa',
        },
        {
            id: 3,
            actividad: 'Nombre ong',
            horas: '7',
            estado: 'Abierta',
            limite_postulacion: '2020-12-31',
            estado_seleccion: 'Seleccionado',
            tipo_actividad: 'Sarasa',
        },
    ];

export default Table;