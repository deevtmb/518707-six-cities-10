import {useState} from 'react';
import {Offer} from '../../types/offer';
import {PLACES_LIST_CLASSES} from '../../const';
import {MouseEvent} from 'react';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offersList: Offer[];
  placesType: string;
}

export default function PlacesList({offersList, placesType}: PlacesListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState({});

  return (
    <div className={`places__list ${PLACES_LIST_CLASSES[placesType]}`}>
      {offersList.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          placeType={placesType}
          handlePlaceCardMouseOver={(evt: MouseEvent<HTMLElement>) => setActiveOffer(offer)}
        />
      ))}
    </div>
  );
}
