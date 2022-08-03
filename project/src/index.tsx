import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {offersList} from './mocks/offers';
import {reviewsList} from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  AVAILABLE_PLACES_COUNT: 419
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        availablePlacesCount={Setting.AVAILABLE_PLACES_COUNT}
        offersList={offersList}
        reviewsList={reviewsList}
      />
    </Provider>
  </React.StrictMode>,
);
