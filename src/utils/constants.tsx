import { RouteObject } from 'react-router';

import { MainScreen } from '../screens/MainScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { VersusScreen } from '../screens/VersusScreen';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainScreen />,
  },
  { path: '/versus', element: <VersusScreen /> },
  { path: '*', element: <NotFoundScreen /> },
];
