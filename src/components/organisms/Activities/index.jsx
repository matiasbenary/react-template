import React, { useEffect, useMemo } from 'react';
import { Link, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddAlarm } from 'react-icons/md';
import { actions as modalAction } from '../../../store/ducks/modal.duck';
import { actions as userActivitiesAction } from '../../../store/ducks/user/activities.duck';
import Loading from '../../molecules/Loading';
import Table from '../../molecules/Table/Table';

const Activities = () => {
    const dispatch = useDispatch();

    const hoursModal = (activity_id) => {
        dispatch(
          modalAction.modalShow({
            modalProps: {
              open: true,
              title: 'Carga de horas',
              activity_id,
            },
            modalType: 'hoursLoad',
          }),
        );
    };

    const {
        user_id,
        userActivities,
        userActivitiesLoading,
    } = useSelector((state) => ({
        user_id: state.auth.user.id,
        userActivities: state.userActivities.activities,
        userActivitiesLoading: state.activities.loading,

    }));

    useEffect(() => {
        if (!userActivities) {
          dispatch(userActivitiesAction.getActivities(user_id));
        }
    }, []);

    const iconStyle = {
        color: '#007bff',
    };

    const columns = useMemo(() => [
        {
            name: 'Actividad',
            selector: 'actividad',
            sortable: true,
            expandableRows: true,
            cell: (row) => <Link to={row.url}>{row.actividad}</Link>,
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
            name: 'Sumar horas',
            cell: (row) => <h4><MdAddAlarm style={iconStyle} onClick={() => { hoursModal(row.id); }} /></h4>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]);

    const postulationStatus = (status) => {
        switch (status) {
            case 1:
                return 'Pendiente';
            case 2:
                return 'Seleccionado';
            case 3:
                return 'No seleccionado';
            default:
                return '';
        }
    };

    if (userActivitiesLoading) {
        return <Loading />;
    }

    if (userActivities) {
        const tableStyles = {
            minWidth: '1000px',
            margin: '20px auto',
        };

        const data = userActivities.data.map((a) => ({
            id: a.id,
            actividad: a.title,
            estado: a.status_alias,
            limite_postulacion: a.deadline.slice(0, 10),
            estado_seleccion: postulationStatus(a.status_postulation),
            tipo_actividad: a.alternative_type,
            url: `/detail/${a.id}`,
        }));

        return (
            <div>
                <Table data={data} columns={columns} title="Mis actividades" styles={tableStyles} />
            </div>
        );
    }

    return null;
};

export default Activities;
