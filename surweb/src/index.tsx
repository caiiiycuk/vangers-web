import React from 'react';
import ReactDOM from 'react-dom';
import "@blueprintjs/core/lib/css/blueprint.css";

import './index.css';
import { AppRouter } from './router';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);