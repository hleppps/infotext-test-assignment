import {
  TableCell,
  TableCellChangeDelta,
  TableCellCoordinates,
} from '../types';

const checkTableTileEnabled = (
  rowIndex: number,
  cellIndex: number,
  data: TableCell[][],
) => {
  const tableTile = data[rowIndex][cellIndex];
  return !!tableTile && !tableTile.disabled;
};

const getUpdatedTileIndex = (
  currentIndex: number,
  delta: TableCellChangeDelta,
  maximalIndex: number,
) => {
  if (currentIndex === maximalIndex && delta === 1) {
    return 0;
  }
  if (currentIndex === 0 && delta === -1) {
    return maximalIndex;
  }
  return currentIndex + delta;
};

export const getUpdatedActiveTile = (
  currentActiveTile: TableCellCoordinates,
  {
    rowDelta,
    cellDelta,
  }: {
    rowDelta?: TableCellChangeDelta;
    cellDelta?: TableCellChangeDelta;
  },
  {
    data,
    totalRows,
    totalColumns,
  }: { data: TableCell[][]; totalRows: number; totalColumns: number },
): { updatedRowIndex: number; updatedCellIndex: number } => {
  const updatedRowIndex = rowDelta
    ? getUpdatedTileIndex(currentActiveTile.rowIndex, rowDelta, totalRows - 1)
    : currentActiveTile.rowIndex;
  const updatedCellIndex = cellDelta
    ? getUpdatedTileIndex(
        currentActiveTile.cellIndex,
        cellDelta,
        totalColumns - 1,
      )
    : currentActiveTile.cellIndex;

  const tableTileEnabled = checkTableTileEnabled(
    updatedRowIndex,
    updatedCellIndex,
    data,
  );

  return tableTileEnabled
    ? { updatedRowIndex, updatedCellIndex }
    : getUpdatedActiveTile(
        { rowIndex: updatedRowIndex, cellIndex: updatedCellIndex },
        { rowDelta, cellDelta },
        { data, totalRows, totalColumns },
      );
};
