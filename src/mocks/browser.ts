import { rest, setupWorker } from 'msw';

import { Player } from '../../types/global';
import { Endpoints } from '../utils/constants';
import { dummyCharacters } from '../utils/dummyCharacters';
import { parseStringifiedArrayOfObjects } from '../utils/parseStringifiedArrayOfObjects';
import { updatePlayers } from '../utils/updatePlayers';

const handlers = [
  rest.get(Endpoints.CHARACTERS, (req, res, ctx) => {
    return res(ctx.json({ items: dummyCharacters }));
  }),
  rest.get(Endpoints.PLAYERS, (req, res, ctx) => {
    return res(
      ctx.json(parseStringifiedArrayOfObjects(localStorage.getItem('players'))),
    );
  }),
  rest.post(Endpoints.PLAYERS, (req, res, ctx) => {
    const { body: activePlayer } = req;
    const players = parseStringifiedArrayOfObjects(
      localStorage.getItem('players'),
    );
    const updatedPlayers = updatePlayers(players, activePlayer as Player);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    return res(ctx.json(updatedPlayers));
  }),
];

export const worker = setupWorker(...handlers);
