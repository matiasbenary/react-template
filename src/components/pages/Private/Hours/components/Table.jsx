import React from 'react';
import DataTable from 'react-data-table-component';
import { BiAlarmAdd, BiExport } from 'react-icons/bi';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Button from '../../../../molecules/Button';
import { downloadCSV } from '../../../../../utils/helper';
import { actions as modalAction } from '../../../../../store/ducks/modal.duck';

const ButtonAddHours = styled(Button)`
  padding: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  background: #3f86f6;
`;

const ButtonExport = styled(Button)`
  padding: 10px;
  margin: 0;
  display: flex;
  align-items: center;
  border: solid 1px #3f86f6;
  color: #3f86f6;
  background: #ffffff;
`;

const Export = ({ onExport }) => (
  <ButtonExport onClick={(e) => onExport(e.target.value)}>
    <BiExport />
  </ButtonExport>
);

const LoadHours = () => {
  const dispatch = useDispatch();

  const hoursModal = () => {
    dispatch(
      modalAction.modalShow({
        modalProps: {
          open: true,
        },
        modalType: 'addHours',
      }),
    );
  };

  return (
    <ButtonAddHours onClick={hoursModal}>
      <BiAlarmAdd />
    </ButtonAddHours>
  );
};

const Table = ({
  data, columns, title, styles,
}) => {
  const actionsMemo = React.useMemo(() => {
    const blacklist = ['url'];

    const info = data.map((dat) => Object.keys(dat)
      .filter((key) => !blacklist.includes(key))
      .reduce((obj, key) => {
        obj[key] = dat[key];
        return obj;
      }, {}));

    return (
      <>
        <LoadHours />
        <Export onExport={() => downloadCSV(info)} />
      </>
    );
  }, [data]);

  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      pointerOnHover
      responsive
      style={styles}
      actions={actionsMemo}
    />
  );
};
export default Table;
