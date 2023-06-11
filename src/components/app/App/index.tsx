import { FC } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import { HotkeysScopes, routes } from '../../../utils/constants';
import { Layout } from '../Layout';

const router = createBrowserRouter(routes);

export const App: FC = () => {
  return (
    <HotkeysProvider initiallyActiveScopes={[HotkeysScopes.TABLE]}>
      <Layout>
        <RouterProvider router={router}></RouterProvider>
      </Layout>
    </HotkeysProvider>
  );
};
