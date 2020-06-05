import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../molecules/Table/Table';

const Hours = () => {
    const dispatch = useDispatch();

    const data = [
        {
            id: 1,
            fecha: '2020-05-11',
            actividad: 'Naves de Cerca',
            horas: 2,
            estado: 'Validado',
        },
        {
            id: 2,
            fecha: '2020-05-12',
            actividad: 'Naves de Cerca',
            horas: 3,
            estado: 'Validado',
        },
        {
            id: 3,
            fecha: '2020-05-15',
            actividad: 'Otra actividad',
            horas: 2.5,
            estado: 'No validado',
        },
        {
            id: 4,
            fecha: '2020-05-15',
            actividad: 'Naves de Cerca',
            horas: 1,
            estado: 'Pendiente',
        },
    ];
    const columns = useMemo(() => [
        {
            name: 'Actividad',
            selector: 'actividad',
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: 'fecha',
            sortable: true,
            right: true,
        },
        {
            name: 'Horas',
            selector: 'horas',
            sortable: true,
            right: true,
        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
            right: true,
        },
        {
            name: 'Acciones',
            cell: () => <button type="btn" className="btn btn-primary btn-sm">Ver mas</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]);
    const tableStyles = {
        // maxWidth: '700px',
        margin: '20px auto',
    };

    return (
        <div className="container">
            <Table data={data} columns={columns} title="Mis horas" styles={tableStyles} />
        </div>
    );
};

export default Hours;
