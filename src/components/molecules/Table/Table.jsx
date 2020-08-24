import React from "react";
import DataTable from "react-data-table-component";
import { downloadCSV } from "../../../utils/helper";

const Export = ({ onExport }) => (
  <button className="btn btn-primary" onClick={e => onExport(e.target.value)}>
    Exportar
  </button>
);

const Table = ({ data, columns, title, styles }) => {
  const actionsMemo = React.useMemo(() => {
    const blacklist = ["url"];

    const info = data.map(dat =>
      Object.keys(dat)
        .filter(key => !blacklist.includes(key))
        .reduce((obj, key) => {
          obj[key] = dat[key];
          return obj;
        }, {})
    );

    return <Export onExport={() => downloadCSV(info)} />;
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
