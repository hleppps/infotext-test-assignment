import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Character } from '../../../types/global';
import { Button } from '../../components/ui/Button';
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
import { deletePlayers } from '../../utils/api/playerService';
import { arrayToMatrix } from '../../utils/arrayToMatrix';
import { Colors, Paths } from '../../utils/constants';
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

  const activePlayerIndex = useMemo(
    () => players.findIndex((player) => player.id === activePlayer?.id),
    [players, activePlayer],
  );

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

  const getSelectionColor = (playerIndex: number) => {
    if (playerIndex === 0) {
      return Colors.LIME;
    }
    if (playerIndex === 1) {
      return Colors.RED;
    }
    return '';
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (charactersSelected) {
      timeout = setTimeout(() => {
        navigate(Paths.VERSUS);
      }, 2000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [charactersSelected]);

  // TODO: temp solution
  const dataLoading = players.length === 0 && !activePlayer;

  const handleResetPlayers = () => {
    deletePlayers();
  };

  if (!charactersMatrix || !charactersMatrix.length || dataLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select your fighter</h1>
      <Button onClick={handleResetPlayers}>Reset players</Button>
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
          selectionColor={getSelectionColor(activePlayerIndex)}
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
