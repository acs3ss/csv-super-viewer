import * as Papa from 'papaparse';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const openFileButton = document.getElementById('open-file-button')! as HTMLButtonElement;
const saveFileButton = document.getElementById('save-file-button')! as HTMLButtonElement;
const headerCheckBox = document.getElementById('header-check-box')! as HTMLInputElement;
/* eslint-enable */

let fileHandle: FileSystemFileHandle;
let data: string[][];

openFileButton.addEventListener('click', async () => {
  const options: OpenFilePickerOptions = {
    types: [{
      accept: {
        'text/csv': ['.csv'],
      }
    }],
  };

  [fileHandle] = await window.showOpenFilePicker(options);

  const file = await fileHandle.getFile();
  const contents = await file.text();

  const result = Papa.parse<string[]>(contents);
  if (result.errors.length != 0) {
    console.log("Error parsing CSV:", result.errors.map(e => e.message));
  }

  data = result.data;
  createTable(data);
});

saveFileButton.addEventListener('click', async () => {
  const contents = Papa.unparse(data);
  writeFile(fileHandle, contents);
  saveBtnOff();
});

headerCheckBox.addEventListener('change', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {children} = document.getElementById("table-container")!;

  const columns = Number(document.documentElement.style.getPropertyValue('--columns'));
  for (let i = 0; i < columns; i++) {
    // columns + i to get past the initial row of add/remove buttons
    children[columns + i].classList.toggle('header');
  }
});

function createTable(data: string[][]) {
  const tableContainer: HTMLElement = resetTable();

  const maxColumns = Math.max(...data.map(row => row.length));

  // Make row of +- column buttons.
  for (let col = 0; col < maxColumns; col++) {
    // Add col button
    const actionsElem = document.createElement('div');
    const addColButton = document.createElement('button');
    addColButton.dataset.col = col.toString();
    addColButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const colNum = Number(event.target.dataset.col);
      insertColumn(data, colNum + 1);
      saveBtnOn();
    });
    addColButton.textContent = '+';
    addColButton.classList.add('btn', 'btn-secondary', 'btn-sm');
    actionsElem.append(addColButton);

    // Remove col button
    const removeColButton = document.createElement('button');
    removeColButton.dataset.col = col.toString();
    removeColButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const colNum = Number(event.target.dataset.col);
      removeColumn(data, colNum);
      saveBtnOn();
    });
    removeColButton.textContent = '-';
    removeColButton.classList.add('btn', 'btn-danger', 'btn-sm');
    actionsElem.append(removeColButton);

    tableContainer.append(actionsElem);
  }

  // Append blank div in the top right corner.
  tableContainer.append(document.createElement('div'));

  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < maxColumns; col++) {
      const divElem = document.createElement('div');
      const contents = col < data[row].length ? data[row][col] : "";
      makeCellWithEditableContents(divElem, contents, row, col);
      tableContainer.append(divElem);
    }

    // Add row button
    const actionsElem = document.createElement('div');
    const addRowButton = document.createElement('button');
    addRowButton.dataset.row = row.toString();
    addRowButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const rowNum = Number(event.target.dataset.row);
      insertRow(data, rowNum + 1);
      saveBtnOn();
    });
    addRowButton.textContent = '+';
    addRowButton.classList.add('btn', 'btn-secondary', 'btn-sm');
    actionsElem.append(addRowButton);
    // Remove row button
    const removeRowButton = document.createElement('button');
    removeRowButton.dataset.row = row.toString();
    removeRowButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const rowNum = Number(event.target.dataset.row);
      removeRow(data, rowNum);
      saveBtnOn();
    });
    removeRowButton.textContent = '-';
    removeRowButton.classList.add('btn', 'btn-danger', 'btn-sm');
    actionsElem.append(removeRowButton);
    // add actions
    tableContainer.append(actionsElem);
  }

  document.documentElement.style.setProperty('--columns', (maxColumns + 1).toString());
}

function saveBtnOn() {
  saveFileButton.classList.add('btn-secondary');
  saveFileButton.classList.remove('btn-nochanges');
}

function saveBtnOff() {
  saveFileButton.classList.add('btn-nochanges');
  saveFileButton.classList.remove('btn-secondary');
}

function makeCellWithEditableContents(cell: HTMLElement, content: string, row: number, col: number) {
  cell.setAttribute('contenteditable', 'true');
  cell.dataset.row = row.toString();
  cell.dataset.col = col.toString();
  cell.textContent = content;

  cell.addEventListener('input', event => {
    saveBtnOn();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data[Number(event.target.dataset.row)][Number(event.target.dataset.col)] = event.target.innerText;
  });
}

function insertRow(data: string[][], newRow: number) {
  // Append empty row, then update rows from end -> inserted row.
  const emptyRow = new Array(data[0].length);
  data.push(emptyRow);
  for (let i = data.length - 1; i > newRow; i--) {
    // Overwrite entire row, assuming this works.
    data[i] = data[i - 1];
  }
  data[newRow] = emptyRow.map(() => "");

  // Redraw the table.
  createTable(data);
}

function insertColumn(data: string[][], newColumn: number) {
  for (let i = 0; i < data.length; i++) {
    // Append empty col, then update rows from end -> inserted col.
    data[i].push("");
    for (let j = data[i].length - 1; j > newColumn; j--) {
      data[i][j] = data[i][j - 1];
    }
    data[i][newColumn] = "";
  }

  // Redraw the table.
  createTable(data);
}

function removeRow(data: string[][], removeRow: number) {
  // Overwrite rows from removed row -> end.
  for (let i = removeRow + 1; i < data.length; i++) {
    // Overwrite entire row, assuming this works.
    data[i - 1] = data[i];
  }
  data.pop();

  // Redraw the table.
  createTable(data);
}

function removeColumn(data: string[][], removeColumn: number) {
  for (let i = 0; i < data.length; i++) {
    // Overwrite cols from removed col -> end.
    for (let j = removeColumn + 1; j < data[i].length; j++) {
      data[i][j - 1] = data[i][j];
    }
    if (data[i].length > removeColumn) {
      data[i].pop();
    }
  }

  // Redraw the table.
  createTable(data);
}

function resetTable(): HTMLElement {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tableContainer = document.getElementById("table-container")!;
  tableContainer.remove();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tableContainerContainer = document.getElementById("table-container-container")!;
  const newTableContainer = document.createElement('div');
  newTableContainer.setAttribute('id', 'table-container');
  tableContainerContainer.appendChild(newTableContainer);
  return newTableContainer;
}

async function writeFile(fileHandle: FileSystemFileHandle, contents: FileSystemWriteChunkType) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
