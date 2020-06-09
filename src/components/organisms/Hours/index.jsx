import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions as userActivitiesHoursAction } from '../../../store/ducks/user/activitiesHours.duck';
import Loading from '../../molecules/Loading';
import Table from '../../molecules/Table/Table';

const Hours = () => {
    const dispatch = useDispatch();

    const {
        user_id,
        userActivitiesHours,
        userActivitiesHoursLoading,
    } = useSelector((state) => ({
        user_id: state.auth.user.id,
        userActivitiesHours: state.userActivitiesHours.hours,
        userActivitiesHoursLoading: state.userActivitiesHours.loading,
    }));

    useEffect(() => {
        if (!userActivitiesHours) {
            dispatch(userActivitiesHoursAction.getHours(user_id));
        }
    }, []);

    const columns = useMemo(() => [
        {
            name: 'Actividad',
            selector: 'actividad',
            sortable: true,
            cell: (row) => <Link to={row.url}>{row.actividad}</Link>,
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
    ]);

    const hoursValidation = (validated) => (validated ? 'Validado' : 'No validado');

    if (userActivitiesHoursLoading) {
        return <Loading />;
    }

    if (userActivitiesHours) {
        const tableStyles = {
            margin: '20px auto',
        };

        const data = userActivitiesHours.data.map((u) => ({
            id: u.id,
            fecha: u.created_at.slice(0, 10),
            actividad: (u.activity ? u.activity.title : 'Actividad borrada'),
            horas: u.hours,
            estado: hoursValidation(u.validated_to),
            url: `/detail/${u.activity_id}`,
        }));

        return (
            <div className="container">
                <Table data={data} columns={columns} title="Mis horas" styles={tableStyles} />
            </div>
        );
    }

    return null;
};

export default Hours;
