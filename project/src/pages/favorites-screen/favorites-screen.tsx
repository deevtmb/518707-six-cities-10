import {useAppSelector} from '../../hooks';
import FavoritesList from '../../components/favorites-list/favorites-list';
import Header from '../../components/header/header';
import { getFavoriteOffers } from '../../store/offers-data/selectors';
import { Link } from 'react-router-dom';

export default function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">{favoriteOffers.length ? 'Saved listing' : 'Favorites (empty)'}</h1>
            {favoriteOffers.length ? <FavoritesList favoriteOffers={favoriteOffers} /> : (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
