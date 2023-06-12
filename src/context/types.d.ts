import { Character, Player } from '../../types/global';

export type PlayersContext = {
  players: Player[];
  activePlayer: Player | undefined;
  handleSelectCharacter: (character: Character) => void;
  charactersSelected: boolean;
};
