import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { fakeStore } from '../../mocks/mocks';
import PlacesEmpty from './places-empty';

describe('Component: PlacesEmpty', () => {
  it('Case: rendered correctly', () => {
    const currentCity = 'Paris';

    render(
      <Provider store={fakeStore}>
        <PlacesEmpty />
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${currentCity}`)).toBeInTheDocument();
  });
});
