import { rest, setupWorker } from 'msw';

import { Player } from '../../types/global';
import { Endpoints, Stores } from '../utils/constants';
import { dummyCharacters } from '../utils/dummyCharacters';
import { dummyVersusCodes } from '../utils/dummyVersusCodes';
import { parseStringifiedArrayOfObjects } from '../utils/parseStringifiedArrayOfObjects';
import { updatePlayers } from '../utils/updatePlayers';

const handlers = [
  rest.get(Endpoints.VERSUS_CODES, (req, res, ctx) => {
    return res(ctx.json({ items: dummyVersusCodes }));
  }),
  rest.get(Endpoints.CHARACTERS, (req, res, ctx) => {
    return res(ctx.json({ items: dummyCharacters }));
  }),
  rest.get(Endpoints.PLAYERS, (req, res, ctx) => {
    return res(
      ctx.json(
        parseStringifiedArrayOfObjects(localStorage.getItem(Stores.Players)),
      ),
    );
  }),
  rest.post(Endpoints.PLAYERS, (req, res, ctx) => {
    const { body: activePlayer } = req;
    const players = parseStringifiedArrayOfObjects(
      localStorage.getItem(Stores.Players),
    );
    const updatedPlayers = updatePlayers(players, activePlayer as Player);
    localStorage.setItem(Stores.Players, JSON.stringify(updatedPlayers));
    return res(ctx.json(updatedPlayers));
  }),
  rest.delete(Endpoints.PLAYERS, (req, res, ctx) => {
    localStorage.removeItem(Stores.Players);
    return res(ctx.json({ items: [] }));
  }),
];

export const worker = setupWorker(...handlers);
