import React from "react";
import DataTable from "react-data-table-component";
import { downloadCSV } from "../../../../../utils/helper";
import Button from "../../../../molecules/Button";
import { BiAlarmAdd, BiExport } from "react-icons/bi";
import styled from "styled-components";

 const ButtonAddHours  = styled(Button)`
 padding:10px;
 margin-right: 10px;
 display:flex;
 align-items:center;
 background: #3F86F6;
 `

 const ButtonExport  = styled(Button)`
 padding:10px;
 margin:0;
 display:flex;
 align-items:center;
 border: solid 1px #3F86F6;
 color: #3F86F6;
 background:#FFFFFF;
 `

const Export = ({ onExport }) => (
  <ButtonExport onClick={(e) => onExport(e.target.value)}>
    <BiExport/>
  </ButtonExport>
);

const LoadHours = () => {
  return <ButtonAddHours><BiAlarmAdd/></ButtonAddHours>;
};

const Table = ({ data, columns, title, styles }) => {
  const actionsMemo = React.useMemo(() => {
    const blacklist = ["url"];

    const info = data.map((dat) =>
      Object.keys(dat)
        .filter((key) => !blacklist.includes(key))
        .reduce((obj, key) => {
          obj[key] = dat[key];
          return obj;
        }, {})
    );

    return (
      <>
        <LoadHours></LoadHours>
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
