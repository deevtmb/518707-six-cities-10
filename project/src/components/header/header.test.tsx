import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {fakeStore} from '../../mocks/mocks';
import Header from './header';

describe('Component: Header', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
