import { FC, useCallback, useMemo, useState } from 'react';
import { Key } from 'ts-key-enum';

import { useTableHotKeys } from '../../../hooks/useTableHotKeys';
import styles from './styles.module.scss';
import { TableCell, TableCellChangeDelta, TableCellCoordinates } from './types';
import { getTableCellClassNames } from './utils/getTableCellClassNames';
import { getUpdatedActiveTile } from './utils/getUpdatedActiveTile';

export interface SelectableTableProps {
  columns: number;
  data: TableCell[][];
  defaultActiveTile: TableCellCoordinates;
  selectCell: (cellCoordinates: TableCellCoordinates) => void;
  selectionColor: string;
}

export const SelectableTable: FC<SelectableTableProps> = ({
  data,
  columns: totalColumns,
  defaultActiveTile,
  selectCell,
  selectionColor,
}) => {
  const [activeTableTile, setActiveTableTile] = useState(defaultActiveTile);
  const selectable = useMemo(() => selectionColor !== '', [selectionColor]);

  const totalRows = useMemo(() => data.length, [data]);

  const handleChangeActiveTile = useCallback(
    ({
      rowDelta,
      cellDelta,
    }: {
      rowDelta?: TableCellChangeDelta;
      cellDelta?: TableCellChangeDelta;
    }) => {
      if (selectable) {
        setActiveTableTile((currentActiveTile) => {
          const { updatedRowIndex, updatedCellIndex } = getUpdatedActiveTile(
            currentActiveTile,
            {
              rowDelta,
              cellDelta,
            },
            { data, totalRows, totalColumns },
          );

          return { rowIndex: updatedRowIndex, cellIndex: updatedCellIndex };
        });
      }
    },
    [selectable],
  );

  useTableHotKeys(Key.Enter, () => {
    if (selectable) {
      selectCell(activeTableTile);
    }
  });

  useTableHotKeys(Key.ArrowUp, () => {
    handleChangeActiveTile({ rowDelta: -1 });
  });

  useTableHotKeys(Key.ArrowDown, () => {
    handleChangeActiveTile({ rowDelta: 1 });
  });

  useTableHotKeys(Key.ArrowRight, () => {
    handleChangeActiveTile({ cellDelta: 1 });
  });

  useTableHotKeys(Key.ArrowLeft, () => {
    handleChangeActiveTile({ cellDelta: -1 });
  });

  const getTableCell = (
    row: TableCell[],
    rowIndex: number,
    selectable: boolean,
  ) =>
    row.map((cell, cellIndex) => {
      const active =
        activeTableTile.rowIndex === rowIndex &&
        activeTableTile.cellIndex === cellIndex;
      return (
        <li
          style={{ outlineColor: selectionColor }}
          className={getTableCellClassNames(active, selectable, cell.disabled)}
          key={cellIndex}
        >
          {cell.content}
        </li>
      );
    });

  const getTableContent = (tableData: TableCell[][], selectable: boolean) =>
    tableData.map((row, rowIndex) => (
      <ul className={styles.tableRow} key={rowIndex}>
        {getTableCell(row, rowIndex, selectable)}
      </ul>
    ));

  return (
    <div className={styles.table}>{getTableContent(data, selectable)}</div>
  );
};
