import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import { getReviews } from '../../store/reviews-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {Review} from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewsItem from '../reviews-item/reviews-item';

export default function ReviewsList(): JSX.Element {
  const MAX_REVIEWS_COUNT = 10;
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = [...useAppSelector(getReviews)]
    .sort((reviewA, reviewB) => new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime());

  useLayoutEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(id));
    }
  },[dispatch, id]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews
          .slice(0, MAX_REVIEWS_COUNT).map((review: Review) => (
            <li key={review.id} className="reviews__item">
              <ReviewsItem review={review} />
            </li>))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Authorized && <ReviewForm />}
    </section>
  );
}
