import {useState} from 'react';
import {Offer} from '../../types/offer';
import {MouseEvent} from 'react';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offersList: Offer[]
}

export default function PlacesList({offersList}: PlacesListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState({});

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((offer) => <PlaceCard key={offer.id} offer={offer} handlePlaceCardMouseOver={(evt: MouseEvent<HTMLElement>) => setActiveOffer(offer)} />)}
    </div>
  );
}
