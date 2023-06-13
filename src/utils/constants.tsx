import { RouteObject } from 'react-router';

import { MainScreen } from '../screens/MainScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { VersusScreen } from '../screens/VersusScreen';

export enum Paths {
  HOME = '/',
  VERSUS = '/versus',
}

export const GITHUB_PAGES_HOMEPAGE = '/infotext-test-assignment';

export const routes: RouteObject[] = [
  {
    path: Paths.HOME,
    element: <MainScreen />,
  },
  { path: Paths.VERSUS, element: <VersusScreen /> },
  { path: '*', element: <NotFoundScreen /> },
];

export enum HotkeysScopes {
  TABLE = 'table',
}

export enum Endpoints {
  CHARACTERS = '/characters',
  PLAYERS = '/players',
  VERSUS_CODES = '/versus_codes',
}

export enum Colors {
  LIME = '#00de00',
  RED = '#FF0000',
}

export enum Stores {
  Players = 'players',
}

export const MAXIMUM_PLAYERS = 2;
