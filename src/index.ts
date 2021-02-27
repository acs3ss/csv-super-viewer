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
  console.log(result);
  createTable(data);
});

saveFileButton.addEventListener('click', async () => {
  const contents = Papa.unparse(data);
  writeFile(fileHandle, contents);
  saveBtnOff();
});

function createTable(data: string[][]) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tableContainer = document.getElementById('table-container')!;
  while (tableContainer.hasChildNodes()) {
    tableContainer.lastChild?.remove();
  }

  // Include header.
  // const useHeaders = headerCheckBox.checked && data.length > 0;
  // if (useHeaders) {
  //   const theadElem = document.createElement('thead');
  //   tableContainer.appendChild(theadElem);
  //   const trElem = document.createElement('tr');
  //   theadElem.appendChild(trElem);
  //   for (let col = 0; col < data[0].length; col++) {
  //     const thElem = document.createElement('th');
  //     makeCellWithEditableContents(thElem, data[0][col], 0, col);
  //     trElem.appendChild(thElem);
  //   }
  //   tableContainer.appendChild(trElem);
  // }

  // const tbodyElem = document.createElement('tbody');
  // tableContainer.appendChild(tbodyElem);
  // for (let row = useHeaders ? 1 : 0; row < data.length; row++) {
  //   const trElem = document.createElement('tr');
  //   for (let col = 0; col < data[row].length; col++) {
  //     const tdElem = document.createElement('td');
  //     makeCellWithEditableContents(tdElem, data[row][col], row, col);
  //     trElem.appendChild(tdElem);
  //   }
  //   tbodyElem.appendChild(trElem);
  // }

  const useHeaders = headerCheckBox.checked && data.length > 0;
  if (useHeaders) {
    for (let col = 0; col < data[0].length; col++) {
      const divElem = document.createElement('div');
      makeCellWithEditableContents(divElem, data[0][col], 0, col);
      tableContainer.append(divElem);
    }
  }

  let maxColumns = useHeaders ? data[0].length : 0;
  for (let row = useHeaders ? 1 : 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      const divElem = document.createElement('div');
      makeCellWithEditableContents(divElem, data[row][col], row, col);
      tableContainer.append(divElem);
    }

    maxColumns = Math.max(maxColumns, data[row].length + 1);

    const actionsElem = document.createElement('div');
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('btn', 'btn-primary', 'btn-sm');
    actionsElem.append(addButton);
    tableContainer.append(actionsElem);
  }

  document.documentElement.style.setProperty('--columns', maxColumns.toString());
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

// function insertRow(data: string[][], newRow: number) {
//   // Append empty row, then update rows from end -> inserted row.
//   const empty_row = new Array(data[0].length);
//   // TODO: Fill row with row/col info, listeners.
//   // row: data[i].length + 1
//   // col: loop through
//   data.push(empty_row);
//   for (let i = data.length - 1; i > row; i--) {
//     for (let j = 0; j < data[i].length; j++) {
//       // TODO: Make this update the appropriate info.
//       data[i - 1][j] = data[i][j];
//     }
//   }
// }

// function insertColumn(data: string[][], newColumn: number) {
//   for (let i = 0; i < data.length; i++) {
//     // TODO: Fill cell with row/col info, listeners.
//     // row: i
//     // col: data[i].length + 1
//     data[i].push("");
//     for (let j = data[i].length - 1; j > newColumn; j--) {
//       // TODO: Make this update the appropriate info.
//       data[i][j - 1] = data[i][j];
//     }
//   }
// }

async function writeFile(fileHandle: FileSystemFileHandle, contents: FileSystemWriteChunkType) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
