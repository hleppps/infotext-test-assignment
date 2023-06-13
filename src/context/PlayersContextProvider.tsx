import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Character, Player } from '../../types/global';
import { getPlayers, postPlayer } from '../utils/api/playerService';
import { MAXIMUM_PLAYERS } from '../utils/constants';
import { parseStringifiedArrayOfObjects } from '../utils/parseStringifiedArrayOfObjects';
import { initialPlayersContextState, PlayersContext } from './playersContext';
import { PlayersContext as PlayersContextType } from './types';

export type PlayersContextProviderProps = {
  children: ReactNode;
};

export const PlayersContextProvider: FC<PlayersContextProviderProps> = ({
  children,
}) => {
  const [players, setPlayers] = useState(initialPlayersContextState.players);
  const [activePlayer, setActivePlayer] = useState<Player | undefined>();

  const charactersSelected = useMemo(
    () =>
      players.filter((player) => player.character).length === MAXIMUM_PLAYERS,
    [players],
  );

  const createPlayer = (): Player => ({ id: uuid(), character: null });

  const handleSetActivePlayer = () => {
    if (!activePlayer && players.length < MAXIMUM_PLAYERS) {
      const newPlayer = createPlayer();
      setActivePlayer(newPlayer);
      postPlayer(newPlayer);
    }
  };

  const handleUpdateStorage = (e: StorageEvent) => {
    const { key, newValue } = e;

    if (key === 'players') {
      setPlayers(parseStringifiedArrayOfObjects(newValue));
    }
  };

  const handleSelectCharacter = (character: Character) => {
    const updatedActivePlayer = activePlayer
      ? { ...activePlayer, character }
      : activePlayer;

    if (updatedActivePlayer) {
      postPlayer(updatedActivePlayer);
    }
    setActivePlayer(undefined);
  };

  useEffect(() => {
    handleSetActivePlayer();
  }, [players]);

  const initializePlayers = () => {
    getPlayers().then((updatedPlayers) => {
      setPlayers(updatedPlayers);
    });
  };

  useEffect(() => {
    initializePlayers();

    window.addEventListener('storage', handleUpdateStorage);
    return () => {
      window.removeEventListener('storage', handleUpdateStorage);
    };
  }, []);

  const playersContext: PlayersContextType = {
    players,
    activePlayer,
    handleSelectCharacter,
    charactersSelected,
  };

  return (
    <PlayersContext.Provider value={playersContext}>
      {children}
    </PlayersContext.Provider>
  );
};
