import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';
import { actions as userActivitiesHoursAction } from '../../../../store/ducks/user/activitiesHours.duck';
import Loading from '../../../molecules/Loading';
import Table from './components/Table';
import Pagination from '../../../molecules/Pagination';
import Button from '../../../molecules/Button';
import EditModal from './components/EditModal';

const ButtonAddHours = styled(Button)`
  padding: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  background: #3f86f6;
`;

const ButtonDisable = styled(Button)`
  padding: 10px;
  margin-right: 10px;
  display: flex;
`;

const Hours = () => {
  const dispatch = useDispatch();
  const [meta, setMeta] = useState({});
  const {
    user_id,
    userActivitiesHours,
    userActivitiesHoursLoading,
  } = useSelector((state) => ({
    user_id: state.auth.user.id,
    userActivitiesHours: state.userActivitiesHours.hours,
    userActivitiesHoursLoading: state.userActivitiesHours.loading,
  }));

  const [editModal, setEditModal] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const refreshNow = () => {
    setRefresh(!refresh);
    setEditModal(undefined);
  };

  useEffect(() => {
    if (!userActivitiesHours) {
      dispatch(userActivitiesHoursAction.getHours({ user_id }));
    }
  }, [dispatch, user_id, userActivitiesHours, refresh]);

  useEffect(() => {
    dispatch(userActivitiesHoursAction.getHours({ user_id }));
  }, [refresh]);

  useEffect(() => {
    if (userActivitiesHours) {
      setMeta(userActivitiesHours.meta);
    }
  }, [userActivitiesHours, setMeta]);

  // const [dataEditModal, setDataEditModal] = useState({});

  const openEditModal = (row) => {
    setEditModal(row);
  };

  const columns = useMemo(
    () => [
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
        name: 'Editar',
        selector: 'editar',
        sortable: false,
        cell: (row) => (row.estado === 'Validado'
          ? <ButtonDisable><FaEdit /></ButtonDisable>
          : <ButtonAddHours onClick={() => openEditModal(row)}><FaEdit /></ButtonAddHours>),
      },
      {
        name: 'Estado',
        selector: 'estado',
        sortable: true,
        right: true,
      },
    ],
    [],
  );

  const hoursValidation = (validated) => (validated ? 'Validado' : 'No validado');

  if (userActivitiesHoursLoading) {
    return <Loading />;
  }

  if (userActivitiesHours) {
    const data = userActivitiesHours.data.map((u) => ({
      id: u.id,
      fecha: u.activity_day.slice(0, 10),
      actividad: u.activity ? u.activity.title : 'Actividad borrada',
      horas: u.hours,
      estado: hoursValidation(u.validated_to),
      url: `/detail/${u.activity_id}`,
      commentary: u.commentary,
    }));

    return (
      <>
        <EditModal data={editModal} refresh={refreshNow} />
        <div className="container mt-4">
          <div className="card shadow  bg-white rounded">
            <div className="card-block">
              <div className="card-body">
                <Table data={data} columns={columns} title="Mis Horas" />
                <Pagination
                  meta={meta}
                  action={(payload) => userActivitiesHoursAction.getHours({ ...payload, user_id })}
                  className="d-flex justify-content-end mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Hours;
