import {useState} from 'react';
import {Offer} from '../../types/offer';
import {SortOption} from '../../const';
import PlacesList from '../../components/places-list/places-list';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-options/sort-options';
import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks';
import Header from '../../components/header/header';

export default function MainScreen(): JSX.Element {
  const additionalMapClass = 'cities__map';
  const placesType = 'cities';

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
      <Header />

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
