import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CitiesList from './cities-list';
import { MemoryRouter } from 'react-router-dom';
import {fakeStore} from '../../mocks/mocks';
import { cities } from '../../const';

describe('Component: CitiesList', () => {
  it('Case: rendered correctly', () => {
    const CURRENT_CITY = 'Paris';

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <CitiesList currentCity={CURRENT_CITY} />
        </MemoryRouter>
      </Provider>
    );

    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });
});
