export class CSVTable {
  private data: string[][] = [[]];
  private tableContainer: HTMLElement;
  private maxColumns = 0;
  private editedCallback: (hasEdits: boolean) => void;

  public constructor(container: HTMLElement, editedCallback: (hasEdits: boolean) => void) {
    this.tableContainer = container;
    this.editedCallback = editedCallback;
  }

  public getContents(): string[][] {
    return this.data;
  }

  public setContents(contents: string[][]): void {
    this.data = contents;
  }

  public getMaxColumns(): number {
    return this.maxColumns;
  }

  public appendRow(row: string[]): void {
    this.data.push(row);
    this.editedCallback(true);
    // TODO: check length against maxColumn
  }

  public createTable(): void {
    this.tableContainer = this.resetTable();

    this.maxColumns = Math.max(...this.data.map(row => row.length));

    const headerRowDivElem = document.createElement('div');
    // Make row of +- column buttons.
    for (let col = 0; col < this.maxColumns; col++) {
      const actionsElem: HTMLDivElement = this.insertColumnActions(col);
      headerRowDivElem.append(actionsElem);
    }

    // Append blank div in the top right corner.
    headerRowDivElem.append(document.createElement('div'));
    this.tableContainer.append(headerRowDivElem);

    for (let row = 0; row < this.data.length; row++) {
      // TODO: There's gotta be a more efficient way to do this
      // Appending empty strings for the front end
      const content = this.data[row];
      while (content.length < this.maxColumns) {
        content.push("");
      }
      const rowDivElem = this.makeRowWithEditableContent(content, row);
      // Append row to container.
      this.tableContainer.append(rowDivElem);
    }

    document.documentElement.style.setProperty('--columns', (this.maxColumns + 1).toString());
    this.editedCallback(false);
  }

  public insertRow(currentRowDiv: HTMLDivElement, newRow: number): void {
    // Append empty row, then update rows from end -> inserted row.
    const emptyRow = new Array(this.maxColumns).fill("");
    this.data.push(emptyRow);
    for (let i = this.data.length - 1; i > newRow; i--) {
      // Overwrite entire row.
      this.data[i] = this.data[i - 1];
    }
    this.data[newRow] = emptyRow;

    // Create new row
    const newRowDiv = this.makeRowWithEditableContent(emptyRow, newRow);

    let nextRowDiv = currentRowDiv;
    // Update lower rows in the front end.
    while (nextRowDiv.nextElementSibling) {
      nextRowDiv = nextRowDiv.nextElementSibling as HTMLDivElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      nextRowDiv.dataset.row! = (Number(nextRowDiv.dataset.row!) + 1).toString();
    }

    currentRowDiv.insertAdjacentElement('afterend', newRowDiv);

    this.editedCallback(true);
  }

  public insertColumn(newColumn: number): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let currentRow = this.tableContainer.firstElementChild!;

    // Update buttons to the right.
    for (let j = newColumn; j < this.maxColumns; j++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentRow.children[j].dataset.col = (Number(currentRow.children[j].dataset.col) + 1).toString();
    }

    const actionsElem: HTMLDivElement = this.insertColumnActions(newColumn);
    currentRow.children[newColumn].insertAdjacentElement('beforebegin', actionsElem);

    for (let i = 0; i < this.data.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      currentRow = currentRow.nextElementSibling!;
      // Append empty col, then update rows from end -> inserted col.
      this.data[i].push("");
      for (let j = this.data[i].length - 1; j > newColumn; j--) {
        // Update backend.
        this.data[i][j] = this.data[i][j - 1];

        // Update frontend.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentRow.children[j].dataset.col = (Number(currentRow.children[j].dataset.col) + 1).toString();
      }
      // Update backend.
      this.data[i][newColumn] = "";

      // Update frontend.
      const divElem = document.createElement('div');
      this.makeCellWithEditableContents(divElem, '', newColumn);
      currentRow.children[newColumn].insertAdjacentElement('beforebegin', divElem);
    }

    this.maxColumns++;
    document.documentElement.style.setProperty('--columns', (this.maxColumns + 1).toString());

    this.editedCallback(true);
  }

  public removeRow(currentRowDiv: HTMLDivElement, removeRow: number): void {
    // Overwrite rows from removed row -> end.
    for (let i = removeRow + 1; i < this.data.length; i++) {
      // Overwrite entire row.
      this.data[i - 1] = this.data[i];
    }
    this.data.pop();

    let nextRowDiv = currentRowDiv;
    // Update lower rows in the front end.
    while (nextRowDiv.nextElementSibling) {
      nextRowDiv = nextRowDiv.nextElementSibling as HTMLDivElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      nextRowDiv.dataset.row! = (Number(nextRowDiv.dataset.row!) - 1).toString();
    }

    currentRowDiv.remove();

    this.editedCallback(true);
  }

  public removeColumn(removeColumn: number): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let currentRow = this.tableContainer.firstElementChild!;

    // Update buttons to the right.
    for (let j = removeColumn + 1; j < this.maxColumns; j++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentRow.children[j].dataset.col = (Number(currentRow.children[j].dataset.col) - 1).toString();
    }

    currentRow.children[removeColumn].remove();

    for (let i = 0; i < this.data.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      currentRow = currentRow.nextElementSibling!;

      // Overwrite cols from removed col -> end.
      for (let j = removeColumn + 1; j < this.data[i].length; j++) {
        // Update backend.
        this.data[i][j - 1] = this.data[i][j];

        // Update frontend.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentRow.children[j].dataset.col = (Number(currentRow.children[j].dataset.col) - 1).toString();
      }
      if (this.data[i].length > removeColumn) {
        this.data[i].pop();
        currentRow.children[removeColumn].remove();
      }
    }

    this.maxColumns--;
    document.documentElement.style.setProperty('--columns', (this.maxColumns + 1).toString());

    this.editedCallback(true);
  }

  public resetTable(): HTMLElement {
    this.tableContainer.remove();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tableContainerContainer = document.getElementById("table-container-container")!;
    const newTableContainer = document.createElement('div');
    newTableContainer.setAttribute('id', 'table-container');
    tableContainerContainer.appendChild(newTableContainer);
    return newTableContainer;
  }

  private insertColumnActions(col: number): HTMLDivElement {
    // Add new button to button row.
    const actionsElem = document.createElement('div');
    actionsElem.classList.add('actions');
    actionsElem.dataset.col = col.toString();
    const buttonGroupElem = document.createElement('div');
    buttonGroupElem.classList.add('btn-group');
    buttonGroupElem.setAttribute('role', 'toolbar');

    // Add col button
    const addColButton = document.createElement('button');
    addColButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const colNum = Number(event.target.parentElement.parentElement.dataset.col);
      this.insertColumn(colNum + 1);
    });
    addColButton.textContent = '\u002b'; // Plus
    addColButton.classList.add('btn', 'btn-success', 'btn-sm');
    buttonGroupElem.append(addColButton);

    // Remove col button
    const removeColButton = document.createElement('button');
    removeColButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const colNum = Number(event.target.parentElement.parentElement.dataset.col);
      this.removeColumn(colNum);
    });
    removeColButton.textContent = '\u2212'; // Minus
    removeColButton.classList.add('btn', 'btn-danger', 'btn-sm');
    buttonGroupElem.append(removeColButton);

    actionsElem.append(buttonGroupElem);
    return actionsElem;
  }

  private makeRowWithEditableContent(content: string[], row: number): HTMLDivElement {
    const rowDivElem = document.createElement('div');
    rowDivElem.dataset.row = row.toString();
    for (let col = 0; col < this.maxColumns; col++) {
      // Create editable cell.
      const divElem = document.createElement('div');
      this.makeCellWithEditableContents(divElem, content[col], col);
      rowDivElem.append(divElem);
    }

    const actionsElem = document.createElement('div');
    actionsElem.classList.add('actions');
    const buttonGroupElem = document.createElement('div');
    buttonGroupElem.classList.add('btn-group');
    buttonGroupElem.setAttribute('role', 'toolbar');

    // Add row button
    const addRowButton = document.createElement('button');
    addRowButton.dataset.row = row.toString();
    addRowButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const target = (event.target as HTMLButtonElement).parentElement!.parentElement!.parentElement! as HTMLDivElement;
      const currentRow = Number(target.dataset.row);
      this.insertRow(target, currentRow + 1);
    });
    addRowButton.textContent = '\u002b'; // Plus
    addRowButton.classList.add('btn', 'btn-success', 'btn-sm');
    buttonGroupElem.append(addRowButton);

    // Remove row button
    const removeRowButton = document.createElement('button');
    removeRowButton.dataset.row = row.toString();
    removeRowButton.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const target = (event.target as HTMLButtonElement).parentElement!.parentElement!.parentElement! as HTMLDivElement;
      const currentRow = Number(target.dataset.row);
      this.removeRow(target, currentRow);
    });
    removeRowButton.textContent = '\u2212'; // Minus
    removeRowButton.classList.add('btn', 'btn-danger', 'btn-sm');
    buttonGroupElem.append(removeRowButton);

    // add actions
    actionsElem.append(buttonGroupElem);
    rowDivElem.append(actionsElem);
    return rowDivElem;
  }

  private makeCellWithEditableContents(cell: HTMLElement, content: string, col: number): void {
    cell.setAttribute('contenteditable', 'true');
    cell.dataset.col = col.toString();
    cell.textContent = content;

    cell.addEventListener('input', event => {
      const colElement = event.target as HTMLDivElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.data[Number(colElement.parentElement!.dataset.row)][Number(colElement.dataset.col)] = colElement.innerText;
      this.editedCallback(true);
    });
  }
}
