import { makeFakeReviews } from '../../mocks/mocks';
import { Review } from '../../types/review';
import { ReviewsData } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { reviewsData } from './reviews-data';

describe('Reducer: reviewsData', () => {
  const state: ReviewsData = {
    reviews: [],
  };
  const reviews: Review[] = makeFakeReviews();

  it('Case: fetchReviewsAction fulfilled - load reviews to state', () => {
    expect(reviewsData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({reviews});
  });

  it('Case: postReview fulfilled - load updated reviews to state', () => {
    expect(reviewsData.reducer(state, {type: postReviewAction.fulfilled.type, payload: reviews}))
      .toEqual({reviews});
  });
});
