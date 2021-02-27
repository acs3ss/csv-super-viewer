import * as Papa from 'papaparse';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const openFileButton = document.getElementById('open-file-button')!;
const saveFileButton = document.getElementById('save-file-button')!;
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
  console.log("File saved");
  saveBtnOff();
});

function createTable(data: string[][]) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tableContainer = document.getElementById('table-container')!;
  while (tableContainer.hasChildNodes()) {
    tableContainer.lastChild?.remove();
  }

  // Include header.
  const useHeaders = headerCheckBox.checked && data.length > 0;
  if (useHeaders) {
    const theadElem = document.createElement('thead');
    tableContainer.appendChild(theadElem);
    const trElem = document.createElement('tr');
    theadElem.appendChild(trElem);
    for (let col = 0; col < data[0].length; col++) {
      const thElem = document.createElement('th');
      makeCellWithEditableContents(thElem, data[0][col], 0, col);
      trElem.appendChild(thElem);
    }
    tableContainer.appendChild(trElem);
  }

  const tbodyElem = document.createElement('tbody');
  tableContainer.appendChild(tbodyElem);
  for (let row = useHeaders ? 1 : 0; row < data.length; row++) {
    const trElem = document.createElement('tr');
    for (let col = 0; col < data[row].length; col++) {
      const tdElem = document.createElement('td');
      makeCellWithEditableContents(tdElem, data[row][col], row, col);
      trElem.appendChild(tdElem);
    }
    tbodyElem.appendChild(trElem);
  }
}

function saveBtnOn() {
  saveFileButton.classList.add('btn-secondary');
  saveFileButton.classList.remove('btn-nochanges');
}

function saveBtnOff() {
  saveFileButton.classList.add('btn-nochanges');
  saveFileButton.classList.remove('btn-secondary');
}

function makeCellWithEditableContents(cell: HTMLTableDataCellElement, content: string, row: number, col: number) {
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

async function writeFile(fileHandle: FileSystemFileHandle, contents: FileSystemWriteChunkType) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
