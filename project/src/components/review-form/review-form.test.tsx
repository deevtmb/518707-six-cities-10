import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {fakeStore} from '../../mocks/mocks';
import ReviewForm from './review-form';

describe('Component: ReviewForm', () => {
  it('Case: rendered correctly', () => {
    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ReviewForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByText(/and describe your stay with at least/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
