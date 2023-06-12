import { FC, useEffect, useMemo, useState } from 'react';

import { Character } from '../../../types/global';
import pedestalImage from '../../assets/images/pedestal.png';
import { Spinner } from '../../components/ui/Spinner';
import { CharacterTile } from '../../components/unsorted/CharacterTile';
import { SelectableTable } from '../../components/unsorted/SelectableTable';
import {
  TableCell,
  TableCellCoordinates,
} from '../../components/unsorted/SelectableTable/types';
import { getCharacters } from '../../utils/api/characterService';
import { arrayToMatrix } from '../../utils/arrayToMatrix';
import styles from './styles.module.scss';

const defaultSelectedTableCell: TableCellCoordinates = {
  rowIndex: 0,
  cellIndex: 0,
};

export const MainScreen: FC = () => {
  const columns = 5;
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharacters().then((fetchedCharacters) => {
      setCharacters(fetchedCharacters);
    });
  }, []);

  const charactersMatrix: TableCell[][] = useMemo(() => {
    const tableCells: TableCell[] = characters.map(
      ({ id, iconSrc, disabled }) => ({
        id,
        ...(disabled ? { disabled } : {}),
        content: <CharacterTile imageSrc={iconSrc} key={id} />,
      }),
    );
    return arrayToMatrix(tableCells, columns);
  }, [characters, columns]);

  const handleSelectCell = (selectedTableCell: TableCellCoordinates) => {
    const selectedCharacter = selectedTableCell
      ? charactersMatrix[selectedTableCell.rowIndex][
          selectedTableCell.cellIndex
        ]
      : undefined;

    console.log(selectedCharacter);
  };

  if (!charactersMatrix || !charactersMatrix.length) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select your fighter</h1>
      <div className={styles.content}>
        <div>
          <img src={pedestalImage} alt="Pedestal" />
        </div>
        <SelectableTable
          data={charactersMatrix}
          columns={columns}
          defaultActiveTile={defaultSelectedTableCell}
          selectCell={handleSelectCell}
        />
        <div>Right character</div>
      </div>
      <h2 className={styles.modeName}>Kombat zone: soul chamber</h2>
    </div>
  );
};
