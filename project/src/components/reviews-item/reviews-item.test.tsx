import { render, screen } from '@testing-library/react';
import {makeFakeReviews} from '../../mocks/mocks';
import ReviewsItem from './reviews-item';


describe('Component: ReviewsItem', () => {
  it('Case: rendered correctly', () => {
    const review = makeFakeReviews()[0];

    render(<ReviewsItem review={review}/>);

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
  });
});
