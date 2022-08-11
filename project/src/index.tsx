import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import {store} from './store';
import { fetchOffersAction, checkAuthorizationAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthorizationAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
