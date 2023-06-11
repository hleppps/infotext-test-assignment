import { FC } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import { routes } from '../../../utils/constants';
import { Layout } from '../Layout';

const router = createBrowserRouter(routes);

export const App: FC = () => {
  return (
    <Layout>
      <RouterProvider router={router}></RouterProvider>
    </Layout>
  );
};
