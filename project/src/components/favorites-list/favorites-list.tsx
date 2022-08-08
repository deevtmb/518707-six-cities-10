import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { offersData } from '../../store/offers-data/offers-data';
import {Offer} from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoriteListProps = {
  favoriteOffers: Offer[];
}

export default function FavoritesList({favoriteOffers}: FavoriteListProps): JSX.Element {
  const favoriteOffersCities = [...new Set(favoriteOffers.map((offer) => offer.city.name))];
  const dispatch = useAppDispatch();

  return (
    <ul className="favorites__list">
      {favoriteOffersCities.map((city): JSX.Element => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item" onClick={() => dispatch(offersData.actions.changeSelectedCity(city))}>
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers
              .filter((offer) => offer.city.name === city)
              .map((offer) => (
                <article key={offer.id} className="favorites__card place-card">
                  <FavoriteCard offer={offer}/>
                </article>))}
          </div>
        </li>
      ))}
    </ul>
  );
}
