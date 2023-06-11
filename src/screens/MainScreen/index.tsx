import { FC, useMemo, useState } from 'react';

import { CharacterTile } from '../../components/unsorted/CharacterTile';
import { SelectableTable } from '../../components/unsorted/SelectableTable';
import {
  TableCell,
  TableCellCoordinates,
} from '../../components/unsorted/SelectableTable/types';
import { arrayToMatrix } from '../../utils/arrayToMatrix';
import { dummyCharacters } from '../../utils/dummyCharacters';
import styles from './styles.module.scss';

const defaultSelectedTableCell: TableCellCoordinates = {
  rowIndex: 0,
  cellIndex: 0,
};

export const MainScreen: FC = () => {
  const columns = 5;

  const [selectedTableCell, setSelectedTableCell] = useState(
    defaultSelectedTableCell,
  );

  const charactersMatrix: TableCell[][] = useMemo(() => {
    const tableCells: TableCell[] = dummyCharacters.map(
      ({ id, iconSrc, disabled }) => ({
        id,
        ...(disabled ? { disabled } : {}),
        content: <CharacterTile imageSrc={iconSrc} key={id} />,
      }),
    );
    return arrayToMatrix(tableCells, columns);
  }, [dummyCharacters, columns]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select your fighter</h1>
      <div className={styles.content}>
        <div>Left character</div>
        <SelectableTable
          data={charactersMatrix}
          columns={columns}
          defaultActiveTile={defaultSelectedTableCell}
        />
        <div>Right character</div>
      </div>
      <div>Kombat zone: soul chamber</div>
    </div>
  );
};
