import {Offer} from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoriteListProps = {
  favoriteOffers: Offer[];
}

export default function FavoritesList({favoriteOffers}: FavoriteListProps): JSX.Element {
  const favoriteOffersCities = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  return (
    <ul className="favorites__list">
      {favoriteOffersCities.map((city): JSX.Element => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers
              .filter((offer) => offer.city.name === city)
              .map((offer) => <FavoriteCard key={offer.id} offer={offer}/>)}
          </div>
        </li>
      ))}
    </ul>
  );
}
