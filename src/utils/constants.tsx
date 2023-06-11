import { RouteObject } from 'react-router';

import { MainScreen } from '../screens/MainScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { VersusScreen } from '../screens/VersusScreen';

export enum Paths {
  HOME = '/',
  VERSUS = '/versus',
}

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
