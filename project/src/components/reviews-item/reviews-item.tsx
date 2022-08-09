import {Review} from '../../types/review';
import {getRatingStarWidth} from '../../utils';
import dayjs from 'dayjs';

type ReviewsItemProps = {
  review: Review;
}

export default function ReviewsItem({review}: ReviewsItemProps): JSX.Element {
  const DATE_FORMAT = 'MMMM YYYY';

  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingStarWidth(review.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{dayjs(review.date).format(DATE_FORMAT)}</time>
      </div>
    </>
  );
}
