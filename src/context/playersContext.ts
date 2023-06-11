import { createContext } from 'react';

import { PlayersContext as PlayersContextType } from './types';

export const PlayersContext = createContext<PlayersContextType>({ players: [] });
