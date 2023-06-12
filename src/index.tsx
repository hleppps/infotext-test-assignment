import 'normalize.css';
import './index.scss';
import './assets/fonts/mk4.ttf';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';

await import('./mocks/browser')
  .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
  .catch(console.error);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
