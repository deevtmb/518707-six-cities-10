import {Offer} from '../../types/offer';
import {OFFER_TYPES_MAP, AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {getRatingStarWidth} from '../../utils';
import {MouseEvent} from 'react';
import { useAppDispatch } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';

type FavoriteCardProps = {
  offer: Offer;
}

export default function FavoriteCard({offer}: FavoriteCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    dispatch(changeFavoriteStatusAction({
      offerId: offer.id,
      status: offer.isFavorite ? 0 : 1,
    }));
  };

  return (
    <>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt={offer.title} />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={handleFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingStarWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{OFFER_TYPES_MAP[offer.type]}</p>
      </div>
    </>
  );
}
