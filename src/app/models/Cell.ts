export class Cell {
    row: number;
    column: number;
    shape: string;
    constructor(row: number, column: number, shape: string) {
        this.row = row;
        this.column = column;
        this.shape = shape;
    }
}
