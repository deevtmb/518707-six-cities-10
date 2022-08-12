import {Offer} from '../../types/offer';
import {AppRoute, AuthorizationStatus, OFFER_TYPES_MAP} from '../../const';
import {Link, useNavigate} from 'react-router-dom';
import {getRatingStarWidth} from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MouseEvent } from 'react';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PlaceCardProps = {
  offer: Offer;
  placeType: string;
}

export default function PlaceCard({offer, placeType}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteButtonClick = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      navigate(AppRoute.Login);
    }

    dispatch(changeFavoriteStatusAction({
      offerId: offer.id,
      status: offer.isFavorite ? 0 : 1,
    }));
  };

  return (
    <>
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${placeType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
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
