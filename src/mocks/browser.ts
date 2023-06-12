import { rest, setupWorker } from 'msw';

import { Endpoints } from '../utils/constants';
import { dummyCharacters } from '../utils/dummyCharacters';

export const worker = setupWorker(
  rest.get(Endpoints.GET_CHARACTERS, (req, res, ctx) => {
    return res(ctx.json({ items: dummyCharacters }));
  }),
);
