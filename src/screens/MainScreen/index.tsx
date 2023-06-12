import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Character } from '../../../types/global';
import { Spinner } from '../../components/ui/Spinner';
import { CharacterTile } from '../../components/unsorted/CharacterTile';
import { SelectableTable } from '../../components/unsorted/SelectableTable';
import {
  TableCell,
  TableCellCoordinates,
} from '../../components/unsorted/SelectableTable/types';
import { SelectedCharacterSection } from '../../components/unsorted/SelectedCharacterSection';
import { PlayersContext } from '../../context/playersContext';
import { getCharacters } from '../../utils/api/characterService';
import { arrayToMatrix } from '../../utils/arrayToMatrix';
import { Paths } from '../../utils/constants';
import styles from './styles.module.scss';

const defaultSelectedTableCell: TableCellCoordinates = {
  rowIndex: 0,
  cellIndex: 0,
};

export const MainScreen: FC = () => {
  const columns = 5;
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const { activePlayer, players, handleSelectCharacter, charactersSelected } =
    useContext(PlayersContext);

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
    const selectedCharacterIndex =
      selectedTableCell.rowIndex * (charactersMatrix.length + 1) +
      selectedTableCell.cellIndex;
    const selectedCharacter = characters[selectedCharacterIndex];

    if (selectedCharacter) {
      handleSelectCharacter(selectedCharacter);
    }
  };

  useEffect(() => {
    if (charactersSelected) {
      // setTimeout(() => {
      //   navigate(Paths.VERSUS);
      // }, 2000);
    }
  }, [charactersSelected]);

  if (!charactersMatrix || !charactersMatrix.length) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>Select your fighter</h1> */}
      <button
        onClick={() => {
          localStorage.removeItem('players');
        }}
      >
        Reset players
      </button>
      <h1 className={styles.title}>{players.length}</h1>
      <h1 className={styles.title}>{activePlayer?.id}</h1>
      <div className={styles.content}>
        <SelectedCharacterSection
          title="Player 1"
          character={{
            imageSrc: players[0]?.character?.iconSrc,
            name: players[0]?.character?.name,
          }}
        />
        <SelectableTable
          data={charactersMatrix}
          columns={columns}
          defaultActiveTile={defaultSelectedTableCell}
          selectCell={handleSelectCell}
        />
        <SelectedCharacterSection
          title="Player 2"
          character={{
            imageSrc: players[1]?.character?.iconSrc,
            name: players[1]?.character?.name,
          }}
        />
      </div>
      <h2 className={styles.modeName}>Kombat zone: soul chamber</h2>
    </div>
  );
};
