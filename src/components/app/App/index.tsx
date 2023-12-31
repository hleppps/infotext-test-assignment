import { FC } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { RouterProvider } from 'react-router';
import { createHashRouter } from 'react-router-dom';

import { PlayersContextProvider } from '../../../context/PlayersContextProvider';
import { HotkeysScopes, routes } from '../../../utils/constants';
import { Layout } from '../Layout';

const router = createHashRouter(routes);

export const App: FC = () => {
  return (
    <PlayersContextProvider>
      <HotkeysProvider initiallyActiveScopes={[HotkeysScopes.TABLE]}>
        <Layout>
          <RouterProvider router={router}></RouterProvider>
        </Layout>
      </HotkeysProvider>
    </PlayersContextProvider>
  );
};
