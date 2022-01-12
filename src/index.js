import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, ErrorBoundary } from './components';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
