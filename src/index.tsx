import 'normalize.css';
import './index.scss';
import './assets/fonts/mk4.ttf';

import { StartOptions } from 'msw';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';

await import('./mocks/browser')
  .then(({ worker }) => {
    const workerDefaultOptions: StartOptions = {
      onUnhandledRequest: 'bypass',
    };
    if (process.env.NODE_ENV === 'development') {
      return worker.start(workerDefaultOptions);
    }
    return worker.start({
      ...workerDefaultOptions,
      serviceWorker: { url: '/infotext-test-assignment/mockServiceWorker.js' },
    });
  })
  .catch(console.error);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<App />);
