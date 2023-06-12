import { Player } from '../../types/global';
import { MAXIMUM_PLAYERS } from './constants';

export const updatePlayers = (players: Player[], activePlayer: Player) => {
  const activePlayerIndex = players.findIndex(
    (player) => player.id === activePlayer.id,
  );
  const updatedPlayers = [...players];
  if (activePlayerIndex !== -1) {
    updatedPlayers[activePlayerIndex] = activePlayer;
  } else if (players.length < MAXIMUM_PLAYERS) {
    updatedPlayers.push(activePlayer);
  }
  return updatedPlayers;
};
