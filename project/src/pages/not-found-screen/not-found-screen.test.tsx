import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('Case: rendered correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundScreen />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/Return to Main page/i)).toBeInTheDocument();
  });
});
