import { ReactNode } from 'react';

export type TableCell = {
  id: string | number;
  content: ReactNode;
  disabled?: boolean;
};

export type TableCellCoordinates = { rowIndex: number; cellIndex: number };

export type TableCellChangeDelta = -1 | 1;
