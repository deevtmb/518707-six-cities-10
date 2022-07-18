import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offersList} from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  AVAILABLE_PLACES_COUNT: 419
};

root.render(
  <React.StrictMode>
    <App
      availablePlacesCount={Setting.AVAILABLE_PLACES_COUNT}
      offersList={offersList}
    />
  </React.StrictMode>,
);
