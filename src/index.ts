import * as Papa from 'papaparse';
import {CSVTable} from './CSVTable';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const openFileButton = document.getElementById('open-file-button')! as HTMLButtonElement;
const saveFileButton = document.getElementById('save-file-button')! as HTMLButtonElement;
const headerCheckBox = document.getElementById('header-check-box')! as HTMLInputElement;
/* eslint-enable */

let csvTable: CSVTable;
let fileHandle: FileSystemFileHandle;

openFileButton.addEventListener('click', async () => {
  const options: OpenFilePickerOptions = {
    types: [{
      accept: {
        'text/csv': ['.csv'],
      }
    }],
  };

  [fileHandle] = await window.showOpenFilePicker(options);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  csvTable = new CSVTable(document.getElementById("table-container")!, onTableEdited);

  const file = await fileHandle.getFile();
  const contents = await file.text();

  const result = Papa.parse<string[]>(contents);
  if (result.errors.length != 0) {
    console.log("Error parsing CSV:", result.errors.map(e => e.message));
  }

  csvTable.setContents(result.data);
  csvTable.createTable();
  if (headerCheckBox.checked) {
    toggleHeaders();
  }
});

saveFileButton.addEventListener('click', async () => {
  const contents = Papa.unparse(csvTable.getContents());
  writeFile(fileHandle, contents);
  onTableEdited(false);
});

headerCheckBox.addEventListener('change', () => toggleHeaders());

function toggleHeaders() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {children} = document.getElementById("table-container")!;
  children[1].classList.toggle('header');
}

function onTableEdited(hasEdits: boolean) {
  if (hasEdits) {
    saveFileButton.classList.add('btn-success');
    saveFileButton.classList.remove('btn-nochanges');
  } else {
    saveFileButton.classList.add('btn-nochanges');
    saveFileButton.classList.remove('btn-success');
  }
}

async function writeFile(fileHandle: FileSystemFileHandle, contents: FileSystemWriteChunkType) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
