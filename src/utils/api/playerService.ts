import { Player } from '../../../types/global';
import { Endpoints } from '../constants';
import { client } from './client';

export const getPlayers = (): Promise<Player[]> => {
  return client
    .get(Endpoints.PLAYERS)
    .then((response) => response.data)
    .catch((error) => error.data);
};

export const postPlayer = (player: Player): Promise<Player[]> => {
  return client
    .post(Endpoints.PLAYERS, player)
    .then((response) => response.data)
    .then((data) => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'players',
          newValue: JSON.stringify(data),
        }),
      );
      return data;
    })
    .catch((error) => error.data);
};
