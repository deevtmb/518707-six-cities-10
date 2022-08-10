import {FormEvent, useRef, useState} from 'react';
import {ChangeEvent} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { getCurrentOfferInfo } from '../../store/offers-data/selectors';

export default function ReviewForm(): JSX.Element {
  const MIN_REVIEW_LENGTH = 50;
  const MAX_REVIEW_LENGTH = 300;

  const dispatch = useAppDispatch();
  const [review, setReview] = useState({comment: '', rating: 0});
  const currentOffer = useAppSelector(getCurrentOfferInfo);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (formRef.current && submitButtonRef.current) {
      submitButtonRef.current.disabled = true;

      if (currentOffer) {
        const offerId = currentOffer.id;
        const {meta: {requestStatus}} = await dispatch(postReviewAction({offerId, ...review}));

        if (requestStatus === 'fulfilled') {
          setReview({comment: '', rating: 0});
          formRef.current.reset();
        }

        submitButtonRef.current.disabled = false;
      }
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          defaultChecked={false}
          onClick={() => setReview({...review, rating: 5})}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          defaultChecked={false}
          onClick={() => setReview({...review, rating: 4})}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          defaultChecked={false}
          onClick={() => setReview({...review, rating: 3})}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          defaultChecked={false}
          onClick={() => setReview({...review, rating: 2})}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          defaultChecked={false}
          onClick={() => setReview({...review, rating: 1})}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        minLength={MIN_REVIEW_LENGTH}
        maxLength={MAX_REVIEW_LENGTH}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setReview({...review, comment: evt.target.value})}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.comment.length <= MIN_REVIEW_LENGTH || !review.rating}
          ref={submitButtonRef}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
