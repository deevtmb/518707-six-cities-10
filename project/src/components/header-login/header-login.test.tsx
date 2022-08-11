import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderLogin from './header-login';

describe('Component: HeaderLogin', () => {
  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <HeaderLogin />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
