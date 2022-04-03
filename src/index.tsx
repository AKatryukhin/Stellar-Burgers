import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider} from "react-redux";
import { App, ErrorBoundary } from './components';
import store from "./services/store";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={'/stellar-burgers/'}>
        <Provider store={store}>
        <App />
      </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);