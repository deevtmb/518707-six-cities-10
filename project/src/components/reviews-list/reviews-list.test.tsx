import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {fakeStore} from '../../mocks/mocks';
import { Review } from '../../types/review';
import ReviewsList from './reviews-list';

describe('Component: HeaderUserInfo', () => {
  it('Case: rendered correctly', () => {
    const reviews: Review[] = fakeStore.getState().REVIEWS_DATA.reviews;

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ReviewsList />
        </MemoryRouter>
      </Provider>
    );

    reviews.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
    });

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByText(/and describe your stay with at least/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
