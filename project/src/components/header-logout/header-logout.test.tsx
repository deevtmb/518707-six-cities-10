import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fakeStore } from '../../mocks/mocks';
import HeaderLogout from './header-logout';

describe('Component: HeaderLogout', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <HeaderLogout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
