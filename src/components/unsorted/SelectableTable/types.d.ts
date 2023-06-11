export type TableCell = {
  id: string | number;
  icon: string;
  disabled?: boolean;
};

export type TableCellCoordinates = { rowIndex: number; cellIndex: number };

export type TableCellChangeDelta = -1 | 1;
