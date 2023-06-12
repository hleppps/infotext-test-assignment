import 'normalize.css';
import './index.scss';
import './assets/fonts/mk4.ttf';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/app/App';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { worker } = require('./mocks/browser');
worker.start();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
