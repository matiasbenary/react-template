export const convertArrayOfObjectsToCSV = (array) => {
  let result;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(array[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

export const downloadCSV = (array) => {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
};
/*
7 4
3 2
2 1
2 1
4/3 = 1.33
5/3 = 1.66

1 2 3 4 5 6 7 8 9
1 1 1 2 2 2 3 3 3
0 1 1 1 2 2 2 3 3
0 0 1 1 1 2 2 2 3

1 2 3 4 5 6 7 8 9
1 1 2 2 3 3 4 4 5
0 1 1 2 2 3 3 4 4

*/
export const invercionMatriz = (data, columns) => {
  if (columns === 1) return [data];
  const row = Math.ceil(data.length / columns);

  let aux = [];
  const auxFinal = [];
  let acts = [];
  let indice = 0;
  let limit = 0;

  for (let i = 0; row > i; i += 1) {
    indice = i * columns;
    aux.push(data.slice(indice, indice + columns));
  }

  for (let x = 0; x < aux.length; x += 1) {
    for (let y = 0; y < aux[x].length; y += 1) {
      if (!auxFinal[y]) auxFinal[y] = [];
      auxFinal[y][x] = aux[x][y];
    }
  }

  for (let x = 0; x < auxFinal.length; x += 1) {
    acts = [...acts, ...auxFinal[x]];
  }

  aux = [];
  indice = 0;

  const add = acts.length % columns;

  for (let i = 0; columns > i; i += 1) {
    if (add === 0) {
      limit = indice + row;
    } else {
      limit = add <= i ? indice + row - 1 : indice + row;
    }

    aux.push(acts.slice(indice, limit));
    indice = limit;
  }

  return aux;
};
