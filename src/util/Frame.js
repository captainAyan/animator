export default class Frame {
  constructor(numberOfColumnsAndRows) {
    this.numberOfColumnsAndRows = numberOfColumnsAndRows;
    this.grid = [];

    for (let i = 0; i < this.numberOfColumnsAndRows; i++) {
      const row = [];
      for (let j = 0; j < this.numberOfColumnsAndRows; j++) {
        row.push("#ffffff");
      }
      this.grid.push(row);
    }
  }
}
