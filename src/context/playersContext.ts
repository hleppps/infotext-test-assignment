/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

import { Character } from '../../types/global';
import { PlayersContext as PlayersContextType } from './types';

export const initialPlayersContextState: PlayersContextType = {
  players: [],
  activePlayer: undefined,
  handleSelectCharacter: (character: Character) => {},
  charactersSelected: false,
};

export const PlayersContext = createContext<PlayersContextType>(
  initialPlayersContextState,
);
