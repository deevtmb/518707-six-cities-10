import {Review} from '../../types/review';
import ReviewsItem from '../review/reviews-item';

type ReviewsListProps = {
  reviews: Review[];
}

export default function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review: Review) => <ReviewsItem key={review.id} review={review} />)}
    </ul>
  );
}
