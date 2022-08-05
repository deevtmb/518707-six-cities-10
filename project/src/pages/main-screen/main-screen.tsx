import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {AppRoute, SortOption, AuthorizationStatus} from '../../const';
import Logo from '../../components/logo/logo';
import PlacesList from '../../components/places-list/places-list';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-options/sort-options';
import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks';

export default function MainScreen(): JSX.Element {
  const additionalMapClass = 'cities__map';
  const placesType = 'cities';

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity);
  const currentCityInfo = currentOffers[0].city;

  const [isSortListOpened, setSortListOpened] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState<string>(SortOption.Popular);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const sortOffers = (offers: Offer[]) => {
    switch (currentSortOption) {
      case SortOption.PriceToHigh: return [...offers].sort((offerA, offerB) => offerA.price - offerB.price);
      case SortOption.PriceToLow: return [...offers].sort((offerA, offerB) => offerB.price - offerA.price);
      case SortOption.TopRated: return [...offers].sort((offerA, offerB) => offerB.rating - offerA.rating);
      default: return offers;
    }
  };

  const onSortOptionClick = (sortOptionName: string) => {
    setCurrentSortOption(sortOptionName);
    setSortListOpened(false);
  };

  const onPlaceItemHover = (offer: Offer) => {
    setActiveOffer(offer);
  };

  const onPlaceItemLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Authorized &&
                <>
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="/">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <Link to={AppRoute.Favorites}>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="/">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>}
                {authorizationStatus === AuthorizationStatus.NotAuthorized &&
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={currentCity} />
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} {currentOffers.length > 1 ? 'places' : 'place'} to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span className="places__sorting-type" tabIndex={0} onClick={() => setSortListOpened(!isSortListOpened)}>
                  {currentSortOption}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                {isSortListOpened && <SortOptions onSortOptionClick={onSortOptionClick} currentSortOption={currentSortOption} />}
              </form>
              <PlacesList
                offersList={sortOffers(currentOffers)}
                placesType={placesType}
                onPlaceItemHover={onPlaceItemHover}
                onPlaceItemLeave={onPlaceItemLeave}
              />
            </section>

            <div className="cities__right-section">
              <Map
                city={currentCityInfo}
                offers={currentOffers}
                additionalClass={additionalMapClass}
                activeOffer={activeOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
