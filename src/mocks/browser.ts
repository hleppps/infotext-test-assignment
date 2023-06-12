import { rest, setupWorker } from 'msw';

import { dummyCharacters } from '../utils/dummyCharacters';

export const worker = setupWorker(
  rest.get('/api/characters', (req, res, ctx) => {
    return res(ctx.json({ items: dummyCharacters }));
  }),
);
