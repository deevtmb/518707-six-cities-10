import {Offer} from '../../types/offer';
import {OFFER_TYPES_MAP, AppRoute} from '../../const';
import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {getRatingStarWidth} from '../../utils';

type PlaceCardProps = {
  key: number;
  offer: Offer;
  placeType: string;
  handlePlaceCardMouseOver: (evt: MouseEvent<HTMLElement>) => void
}

export default function PlaceCard({key, offer, placeType, handlePlaceCardMouseOver}: PlaceCardProps): JSX.Element {
  return (
    <article key={key} className={`${placeType}__card place-card`} onMouseOver={handlePlaceCardMouseOver}>
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${placeType}__image-wrapper place-card__image-wrapper`}>
        <a href="/">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
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
          <Link to={`${AppRoute.Room}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{OFFER_TYPES_MAP[offer.type]}</p>
      </div>
    </article>
  );
}
