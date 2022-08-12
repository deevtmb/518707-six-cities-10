import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fakeStore } from '../../mocks/mocks';
import PropertyScreen from './property-screen';

describe('Component: Property screen', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter initialEntries={[`${AppRoute.Offer}1`]}>
          <PropertyScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
