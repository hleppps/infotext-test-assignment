import { FC, ReactNode, useState } from 'react';

import { Player } from '../../types/global';
import { PlayersContext } from './playersContext';

export type PlayersContextProviderProps = {
  children: ReactNode;
};

export const PlayersContextProvider: FC<PlayersContextProviderProps> = ({
  children,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const playersContext = {
    players,
  };

  return (
    <PlayersContext.Provider value={playersContext}>
      {children}
    </PlayersContext.Provider>
  );
};
