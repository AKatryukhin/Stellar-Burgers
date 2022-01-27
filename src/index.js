import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider} from "react-redux";
import { App, ErrorBoundary } from './components';
import store from "./services";



ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
