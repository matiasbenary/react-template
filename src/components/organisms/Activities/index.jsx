import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
        userActivitiesLoading: state.userActivities.loading,

    }));

    useEffect(() => {
        if (!userActivities) {
          dispatch(userActivitiesAction.getActivities(user_id));
        }
    }, []);

    const iconStyle = {
        fontSize: '24px',
    };

    const columns = useMemo(() => [
        {
            name: 'Entidad de origen',
            selector: 'from_entity',
            sortable: true,
            expandableRows: true,
        },
        {
            name: 'Entidad beneficiaria',
            selector: 'to_entity',
            sortable: true,
            expandableRows: true,
        },
        {
            name: 'Actividad',
            selector: 'activity',
            sortable: true,
            expandableRows: true,
            cell: (row) => <Link to={row.url}>{row.activity}</Link>,
        },
        {
            name: 'Estado',
            selector: 'status',
            sortable: true,
            center: true,
        },
        {
            name: 'Fecha límite de postulación',
            selector: 'deadline',
            sortable: true,
            center: true,
            defaultSortAsc: false,
        },
        {
            name: 'Estado de selección',
            selector: 'selection_status',
            sortable: true,
            center: true,
        },
        {
            name: 'Tipo de actividad',
            selector: 'activity_type',
            sortable: true,
            center: true,
        },
        {
            name: 'Horas cargadas',
            selector: 'hours_total',
            sortable: true,
            center: true,
        },
        {
            name: 'Sumar horas',
            cell: (row) => {
                const isDisabled = row.estado_seleccion === 'Seleccionad@';
                return (isDisabled ? (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => { hoursModal(row.id); }}>
                        <MdAddAlarm style={iconStyle} />
                    </button>
                ) : (
                    <button type="button" className="btn btn-primary btn-sm" disabled>
                        <MdAddAlarm style={iconStyle} />
                    </button>
                ));
            },
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
                return 'Seleccionad@';
            case 3:
                return 'No seleccionad@';
            default:
                return '';
        }
    };

    if (userActivitiesLoading) {
        return <Loading />;
    }

    if (userActivities) {
        const tableStyles = {
            margin: '20px auto',
        };

        const data = userActivities.data.map((a) => ({
            id: a.id,
            activity: a.title,
            status: a.status_alias,
            deadline: a.deadline.slice(0, 10),
            selection_status: postulationStatus(a.status_postulation),
            activity_type: a.alternative_type,
            url: `/detail/${a.id}`,
            from_entity: a.fromEntity.bussiness_name,
            to_entity: a.toEntity.bussiness_name,
            hours_total: a.hoursTotal,
        }));

        return (
            <div className="container">
                <Table data={data} columns={columns} title="Mis actividades" styles={tableStyles} />
            </div>
        );
    }

    return null;
};

export default Activities;
